/**
 * 项目业务类
 */
import {BaseStore} from "../store/BaseStore";
import {SettingStore} from "../store/SettingStore";
import {ProjectConfig} from "../domain/ProjectConfig";
const fsUtil = require('fs-utils');

export class ProjectService {

    private settingStore:SettingStore;

    constructor() {
        this.settingStore = new SettingStore();
    }

    /**
     * 读取项目目录结构
     */
    readProjectStructure() {
        const projectConfig:ProjectConfig = this.settingStore.getProjectConfigFilePath()
        if( !fsUtil.isEmptyFile(projectConfig.packageJson)){
            throw new Error('package.json文件不存在,请检查文件!');
        }

        //读取文件目录
    }
}