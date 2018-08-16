import {SettingStore} from "../store/SettingStore";

/**
 *
 * 3D 业务类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/8/16 18:42
 */

export class D3Service {

    private settingStore: SettingStore;

    constructor(){
        this.settingStore = new SettingStore();
    }

    /**
     * playcanvas构造方法
     */
    playcanvsStructure(file: any) {

        /*var extract = require('extract-zip')
        extract(file.raw.path, {dir: this.settingStore.getOutputPath()}, function (err) {
            console.log(err);
        })*/
       /* const extract = onezip.extract(file.raw.path, this.settingStore.getOutputPath());

        extract.on('file', (name) => {
            console.log(name);
        });

        extract.on('start', (percent) => {
            console.log('extracting started');
        });

        extract.on('progress', (percent) => {
            console.log(percent + '%');
        });

        const decompress = require('decompress');*/
        const decompress = require('decompress');
        decompress(file.raw.path, this.settingStore.getOutputPath()).then(files => {
            console.log('done!');
        });
    }

}