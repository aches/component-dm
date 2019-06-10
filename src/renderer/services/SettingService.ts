/**
 *设置类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/6/27 17:10
 */
import {SettingStore} from "../store/SettingStore";
import "../util/HardwareMonitor";


const {dialog} = require('electron').remote;
export class SettingService {

    private settingStore: SettingStore;

    constructor(){
        this.settingStore = new SettingStore();
    }

    getProjectPath(): string {
        return this.settingStore.getProjectPath();
    }

    /**
     * 弹出选择路径窗口
     * @returns {string}
     */
    showWindowDialog(): string {
        const projectPaths = dialog.showOpenDialog({properties: ['openDirectory']});
        return projectPaths && projectPaths.length > 0 ? projectPaths[0] : '';
    }

    /**
     * 弹出选择文件窗口
     * @returns {string}
     */
    showOpenFile(): string {
        const projectPaths = dialog.showOpenDialog({properties: ['openFile']});
        return projectPaths && projectPaths.length > 0 ? projectPaths[0] : '';
    }


    /**
     * 保存项目路径
     * @param {string} project
     */
    saveProjectPath(projectPath: string): void{
        this.settingStore.saveProjectPath(projectPath);
    }

    checkProjectPath(): boolean {
        this.settingStore.getProjectConfigFilePath();

        return false
    }

    saveOutPutPath(output: string): void {
        this.settingStore.saveOutPutPath(output);
    }


    getOutputPath(): string{
        return this.settingStore.getOutputPath();
    }

    /**
     * Chrome路径
     * @param {string} project
     */
    saveChromePath(projectPath: string): void {
        this.settingStore.saveChromePath(projectPath);
    }

    getChromePath(): string{
        return this.settingStore.getChromePath();
    }

    /**
     * TestUrl路径
     * @param {string} project
     */
    saveTestUrlPath(projectPath: string): void {
        this.settingStore.saveTestURLPath(projectPath);
    }

    getTestUrlPath(): string{
        return this.settingStore.getTestURLPath();
    }

    /**
     * 环境监测方法
     * 1.监测项目文件是否存在
     * 2.实时检测进度
     */
    envcheck() {
        //TODO 待实现
    }

    exportJson(projectList:any) {

        const options = {
            title: '保存json数据',
            filters: [
                { name: 'Json', extensions: ['json'] }
            ]
        }
        dialog.showSaveDialog(options, function (filename) {
            const fs = require('fs');
            fs.writeFileSync(filename, JSON.stringify(projectList));
        })
    }

}
