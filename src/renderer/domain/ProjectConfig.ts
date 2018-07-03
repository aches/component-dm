/**
 * 系统配置文件路径对象
 */
const path = require('path');

export class ProjectConfig {

    //package.json文件路径
    private packageJson;

    //README.md文件路径
    private readMe;

    private tsConfig;
    //html模板路径
    private indexTemplate;

    //框架源码目录
    private srcFolder;

    //微件目录
    private widgetFolder;

    //公共静态资源目录
    private publicStaticFolder;


    constructor(basePath: string) {
        path.join(basePath)
        //basePath +

    }

}