/**
 *设置类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/6/27 17:10
 */

const {dialog} = require('electron').remote;
export class SettingServices {

    constructor(){

    }

    getProjectPath(): string {
        return '';
    }

    setProjectPath(): string {
        const projectPaths = dialog.showOpenDialog({properties: ['openDirectory']});
        console.log(projectPaths)
        return projectPaths.length > 0 ? projectPaths[0] : '';
    }

}
