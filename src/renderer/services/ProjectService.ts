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

        await this.readFolder(projectConfig.widgetFolder);
        //读取文件目录
        //学科目录
    }


    async iteraFolder(folderPath: string){
        const categoryArry = await FilesUtil.readdir(folderPath) as Array<string>;
        if(this.isWidget(categoryArry)) {
            const widget = this.convertWidget(folderPath,'','');
            return;
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
                this.convertWidget(categoryArry[i], folderPath,'','');
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
        //path.join(widgetBasePath, widgetName, 'meta.json')
        const metaObj = fsUtil.readJSONSync(metaPath)
        console.log(metaObj);
        const widget    = new Widget();
        widget.alias    = widgetName;
        widget.author   = metaObj.author;
        widget.title    = metaObj.title;
        widget.path     = path.join(widgetBasePath, widgetName);
        widget.no       = no;
        widget.category = category;

    }
}