/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/6/28 9:36
 */
import {BaseStore} from "./BaseStore";
import {ProjectConfig} from "../domain/ProjectConfig";

export class SettingStore extends BaseStore{

    // 项目路径
    projectPathKey:string = 'projectPath';
    // 打包路径
    outputPathKey:string = 'outputPath';
    // chrome路径
    chromePathKey:string = 'chromePath';
    // testUrl路径
    testURLPathKey:string = 'testURLPath';


    saveProjectPath(path: string): void {
        super.saveData(this.projectPathKey,path);
    }

    saveOutPutPath(output: string): void {
        super.saveData(this.outputPathKey,output);
    }

    saveChromePath(path: string): void {
        super.saveData(this.chromePathKey,path);
    }

    saveTestURLPath(path: string): void {
        super.saveData(this.testURLPathKey,path);
    }

    getProjectPath(): string {
        return super.getDataStr(this.projectPathKey);
    }

    getOutputPath(): string{
        return super.getDataStr(this.outputPathKey);
    }

    getChromePath(): string{
        return super.getDataStr(this.chromePathKey);
    }

    getTestURLPath(): string{
        return super.getDataStr(this.testURLPathKey);
    }

    /********** 获取素材项目文件路径 ********/
 
    getProjectConfigFilePath(): ProjectConfig {
        return  new ProjectConfig(this.getProjectPath());
    }

}