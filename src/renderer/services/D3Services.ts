import {SettingStore} from "../store/SettingStore";
const path = require('path');
const fs = require('fs');
const template = require('art-template');
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
    async playcanvsStructure(file: any) {


        const decompress = require('decompress');
        //1.解压playcanvas包到输出目录
        const files = await decompress(file.raw.path, this.settingStore.getOutputPath());
        console.log('解压zip包');

        console.log(this.settingStore.getOutputPath() );
        //2.获取场景id数组
        const scenceIds = this.getScenceId(files);
        console.log('读取场景ID');

        //3.读取默认场景ID
        const indexHtmlPath = path.join(this.settingStore.getOutputPath() , 'index.html');
        const defaultScenceId = this.readDefaultScenceId(indexHtmlPath, scenceIds);
        console.log(`默认场景ID:${defaultScenceId}`);

        //4.解压playcanvas.zip 到输出目录
        const sdkPath  = path.resolve('./static/playcanvas.zip')
        const sdkFiles = await decompress(sdkPath, this.settingStore.getOutputPath());
        console.log('解压覆盖control.js');


        //5.构造对象
        const obj = this.constructObject(scenceIds, defaultScenceId);
        console.log(obj);
        //5.生成模板代码
        const templateHtml = this.generateCode(obj);
        console.log("生成模板代码")
        console.log(templateHtml);

        //6.插入html中
        this.insertCode(indexHtmlPath, templateHtml);
    }

    /**
     * 获取场景id
     * @param files
     */
    getScenceId(files:any) {
        const scenceIdArray = [];
        for(let i in files) {
            const path = files[i].path;
            if(path.indexOf('/') > -1 || path.toLowerCase().endsWith('.json') == false) {
                continue;
            }
            //console.log(path);
            const scenceId =  path.substring(0,path.toLowerCase().indexOf('.json'));
            //场景id均为数字
            if(Number.isNaN(Number.parseInt(scenceId))){
                continue;
            }

            scenceIdArray.push(scenceId);
        }
        return scenceIdArray;

    }

    /**
     * 构造对象
     */
    constructObject(scenceIds: any, defaultScenceId: any) {
        const obj = {
            scenceArray : [],
            defaultScenceId : ''
        };
        obj.defaultScenceId = defaultScenceId;

        if( scenceIds.length != 2 ) {
            return obj;
        }

        obj.scenceArray.push({
            title: '球棍模型',
            id:defaultScenceId,
            active: true
        });

        for(let i in scenceIds) {
            if(scenceIds[i] == defaultScenceId) {
                continue;
            }
            obj.scenceArray.push({
                title: '比例模型',
                id:scenceIds[i],
                active: false
            });
        }


        return obj;
    }



    /**
     * 读取默认场景ID
     * @param filePath
     * @param scenceIds
     */
    readDefaultScenceId(filePath, scenceIds) {
        const data = fs.readFileSync(filePath);
        for(let i of scenceIds) {
            if(data.toString().indexOf(i) > -1){
                return i;
            }
        }
    }

    /**
     * 插入代码
     * @param filePath
     * @param code
     */
    insertCode(filePath, code) {
        console.log(code)
        const data = fs.readFileSync(filePath);
        const content = data.toString().split('</body>').join(code + '</body>');
        console.log(content)
        fs.writeFileSync(filePath, content, 'utf-8');
    }



    /**
     * 生成代码
     * @param data
     */
    generateCode(data) {
        const sdkPath  = path.resolve('./src/tpl/playcanvas.tpl')

        const html = template(sdkPath ,data);
        console.log(html);
        return html;
    }

}