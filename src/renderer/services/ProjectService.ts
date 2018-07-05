/**
 * 项目业务类
 */
import {BaseStore} from "../store/BaseStore";
import {SettingStore} from "../store/SettingStore";
<<<<<<< HEAD
import {ProjectConfig} from "../domain/ProjectConfig";
const fsUtil = require('fs-utils');

export class ProjectService {
=======
const fsUtil = require('fs-utils');

export class ProjectService extends BaseStore{
>>>>>>> 08e00a4c7a24a0d17546e3d5bbc1abca902ea71d

    private settingStore:SettingStore;

    constructor() {
        this.settingStore = new SettingStore();
    }

    /**
     * 读取项目目录结构
     */
    readProjectStructure() {
<<<<<<< HEAD
        const projectConfig:ProjectConfig = this.settingStore.getProjectConfigFilePath()
        if( !fsUtil.isEmptyFile(projectConfig.packageJson)){
            throw new Error('package.json文件不存在,请检查文件!');
        }

        //读取文件目录
=======
        const projectPath = this.settingStore.getProjectPath();
        if( fsUtil.isEmptyDir())

>>>>>>> 08e00a4c7a24a0d17546e3d5bbc1abca902ea71d
    }
}