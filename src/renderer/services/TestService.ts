/**
 * 项目业务类
 */
import {SettingStore} from "../store/SettingStore";
import {ProjectConfig} from "../domain/ProjectConfig";
import {FilesUtil} from "../util/FileUtil";
import {Widget} from "../domain/Widget";
import {CommandUtil} from "../util/CommandUtil";
const path = require("path");
const fsUtil = require("fs-utils");
const fs = require('fs');
const httpServer = require('http-server');
const secret = require('./secret.js');

export class TestService{

    token: string;

    sysPath: string;

    port = 9001;

    constructor() {

        var date = new Date();
        var y = date.getUTCFullYear();
        var m = date.getUTCMonth() + 1;
        var d = date.getDate();
        var token = y + "" + m + "" + d;
        console.log('token:'+token)
        var encryToken = secret.encrypt(token);
        this.token = encryToken;
        const userPath = process.env.HOME || process.env.USERPROFILE;
        this.sysPath = userPath + '/test/';
    }


    initServer() {

        const port = 9001;

        const status = sessionStorage.getItem('status');
        if( !status  || status === 'close') {
            console.log('httpServer', httpServer.HttpServer);
            httpServer.createServer({root: this.sysPath}).listen(port);
            sessionStorage.setItem('status', 'open');
        }

    }


    async startup(file: any) {
        const userPath = process.env.HOME || process.env.USERPROFILE;
        const sysPath = userPath + '/test/';
        console.log('file', file);
        console.log('output', sysPath);


        if( !file) {
            return;
        }

        const widgetPath = sysPath + file.name.split('.')[0];

        //判断根目录是否存在
        const isExist = fs.existsSync(sysPath);
        if ( !isExist ) {
            fs.mkdirSync(sysPath);
        }

        //判断项目目录是否存在
        const isExistW = fs.existsSync(widgetPath);
        if ( !isExistW ) {
            fs.mkdirSync(widgetPath);
        }


        const decompress = require('decompress');
        //1.解压playcanvas包到输出目录
        const files = await decompress(file.raw.path, widgetPath);
        console.log('解压zip包' , widgetPath);
        await this.reload();
    }

    async reload() {
        const list = await FilesUtil.readdir(this.sysPath) as Array<string>;
        console.log('list', list);
        const projectsObj = [];
        for ( let i = 0 ; i < list.length ; i ++) {
            const name = list[i];
            const project = {
                name : name,
                url : `http://localhost:${this.port}/${name}/index.html#dev#${this.token}`
            };
            projectsObj.push(project);
        }

        window['$vue'].projectList = projectsObj;
        localStorage.setItem('projectList', JSON.stringify(projectsObj));
    }

    removeDir(dir) {
        let files = fs.readdirSync(dir)
        for(let i=0;i<files.length;i++){
            let newPath = path.join(dir,files[i]);
            let stat = fs.statSync(newPath)
            if(stat.isDirectory()){
                //如果是文件夹就递归下去
                this.removeDir(newPath);
            }else {
                //删除文件
                fs.unlinkSync(newPath);
            }
        }
        fs.rmdirSync(dir)//如果文件夹是空的，就将自己删除掉
    }


}