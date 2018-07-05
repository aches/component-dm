/**
 * 系统配置文件路径对象
 */
const path = require('path');

export class ProjectConfig {

    //package.json文件路径
<<<<<<< HEAD
    packageJson;

    //README.md文件路径
    readMe;

    tsConfig;
    //html模板路径
    indexTemplate;

    //框架源码目录
    srcFolder;

    //微件目录
    widgetFolder;

    //公共静态资源目录
    publicStaticFolder;


    constructor(basePath: string) {


        this.packageJson    = path.join(basePath, '/package.json');
        this.readMe         = path.join(basePath, '/README.md');
        this.tsConfig       = path.join(basePath, '/tsconfig.json');
        this.indexTemplate  = path.join(basePath, '/index.html');
        this.srcFolder      = path.join(basePath, '/src');
        this.widgetFolder           = path.join(basePath, '/widget');
        this.publicStaticFolder     = path.join(basePath, '/static');
=======
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
>>>>>>> 08e00a4c7a24a0d17546e3d5bbc1abca902ea71d
        //basePath +

    }

}