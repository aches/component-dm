import {ProjectConfig} from "../domain/ProjectConfig";

/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/7/6 8:42
 */
const fs = require('fs');
const fsUtil = require('fs-utils');
export class FilesUtil {

    static readdir(path: string): Promise<Object>{
        return new Promise<Object>(( resolve, reject) => {
            fs.readdir(path , function(err, files) {
                if (err) {
                    reject(err);
                }
                // files是一个数组
                // 每个元素是此目录下的文件或文件夹的名称
                resolve(files);
            });
        } );
    }

    static syncExistFolder(path: string): Promise<boolean> {
        return new Promise<boolean>((resolve,reject) => {
            if( !fsUtil.isEmptyFile(path)){
                resolve(false);
            } else {
                resolve(true);
            }

        });


    }





}