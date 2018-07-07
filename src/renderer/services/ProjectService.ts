/**
 * 项目业务类
 */
import {SettingStore} from "../store/SettingStore";
import {ProjectConfig} from "../domain/ProjectConfig";
import {FilesUtil} from "../util/FileUtil";
import {Widget} from "../domain/Widget";
const path = require("path");
const fsUtil = require("fs-utils");

export class ProjectService{


    private settingStore:SettingStore;

    private project = new Array<object>();

    constructor() {
        this.settingStore = new SettingStore();
    }

    /**
     * 读取项目目录结构
     */
    async readProjectStructure() {


        const projectConfig:ProjectConfig = this.settingStore.getProjectConfigFilePath()
        const isExist = await FilesUtil.syncExistFolder(projectConfig.packageJson)
        console.log(isExist)
        if(!isExist){
            throw new Error('package.json文件不存在,请检查文件!');
        }

        //await this.readFolder(projectConfig.widgetFolder);
        //console.log(projectConfig.widgetFolder);
        await this.iteraFolder(projectConfig.widgetFolder);
        //console.log(this.project);
        //读取文件目录
        //学科目录
    }


    async iteraFolder(folderPath: string){
        const categoryArry = await FilesUtil.readdir(folderPath) as Array<string>;
        //读取微件信息
        if(this.isWidget(categoryArry)) {
            const widget = this.convertWidget(folderPath,'','');
            this.project.push(widget);
            //console.log(widget);
            return;
        }

        //循环迭代微件文件夹
        for(let i = 0; i < categoryArry.length; i++) {
            const childPath = path.join(folderPath, categoryArry[i]);
            if(!fsUtil.isDir(childPath)){
                continue;
            }
            //console.info('childPath', childPath);
            await this.iteraFolder(childPath )
        }


    }

    async readFolder(folderPath: string){
        const categoryArry = await FilesUtil.readdir(folderPath) as Array<string>;

        for (let i = 0; i < categoryArry.length; i++) {
            //学科全路径
            const categoryFolder = path.join(folderPath, categoryArry[i]);
            console.log(categoryFolder);

            //学科下对应期号
            const numArray = await FilesUtil.readdir(categoryFolder) as Array<string>;
            //console.log(numArray);
            //是否是微件
            if(this.isWidget(numArray)) {
                //this.convertWidget(categoryArry[i], folderPath,'','');
                continue;
            }
            this.readFolder(path.join(folderPath,))
        }
        console.log(categoryArry);
    }

    isWidget(path:Array<string>) {
        //if(path.indexOf('meta.json') > -1 || path.indexOf('meta.json') > -1 )
        return path.indexOf('meta.json') > -1 || path.indexOf('main.ts') > -1 || path.indexOf('main.vue') > -1;
    }

    /**
     * 转换为微件对象
     */
    convertWidget(widgetPath: string,no: string, category: string) {
        //fsUtil
        const metaPath = path.join(widgetPath, 'meta.json');
        if(!FilesUtil.syncExistFolder(metaPath)) {
            return null;
        }

        const widgetPathArray = widgetPath.split(path.sep);
        //path.join(widgetBasePath, widgetName, 'meta.json')
        const metaObj = fsUtil.readJSONSync(metaPath)
        console.log(metaObj);
        const widget    = new Widget();
        widget.alias    = widgetPathArray[widgetPathArray.length-1];
        //"D:", "project", "huohua_component", "widget", "biology", "r12_jytbqs"
        console.log(widgetPathArray)
        console.log(widgetPathArray.indexOf('widget'));
        widget.author   = metaObj.author;
        widget.title    = metaObj.title;
        widget.path     = widgetPath;
        /*if((widgetPathArray.length - 1 ) > widgetPathArray.indexOf('widget') + 2) {

        }*/
        widget.no       = widgetPathArray[widgetPathArray.length-2];
        widget.category = widgetPathArray[widgetPathArray.length-3];
        return widget;

    }
}