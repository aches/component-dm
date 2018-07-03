/**
 * 项目业务类
 */
import {BaseStore} from "../store/BaseStore";
import {SettingStore} from "../store/SettingStore";
const fsUtil = require('fs-utils');

export class ProjectService extends BaseStore{

    private settingStore:SettingStore;

    constructor() {
        this.settingStore = new SettingStore();
    }

    /**
     * 读取项目目录结构
     */
    readProjectStructure() {
        const projectPath = this.settingStore.getProjectPath();
        if( fsUtil.isEmptyDir())

    }
}