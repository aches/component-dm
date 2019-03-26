import {SettingService} from "./SettingService";

const path = require('path');
const template = require('art-template');
const fs = require('fs');
export class WidgetTemplateServices {
    //获取系统中的项目路径
    private projectPath = new SettingService().getProjectPath();
    constructor(form: any) {
        let mainVueHtml: any;
        let mainTs: any;
        let metaJson: any;
        let viewModelHtml: any;
        let viewHandlerHtml: any;
        let team: string;
        let subject: string;
        let time: string;
        let widgetName: string;
        let widgetPath: string;
        const data = this.constructorObject(form);
        //生成模板代码
        if (data.layout === '全局布局') {
            mainVueHtml = this.generateCode(data, 'fullScreens_layout');
            viewModelHtml = this.generateCode(data, 'ViewModel');
        } else if(data.layout === '左右布局') {
            mainVueHtml = this.generateCode(data, 'leftAndRight_layout');
            viewModelHtml = this.generateCode(data, 'ViewModel');
        } else {
            mainVueHtml = this.generateCode(data, 'exercise_layout');
            viewModelHtml = this.generateCode(data, 'exerciseViewModel');
        }
        mainTs = this.generateCode(data, 'main');
        metaJson = this.generateCode(data, 'meta');
        viewHandlerHtml = this.generateCode(data, 'services/TemplateViewHandler' );
        team = data.team === 'xiyue' ? 'widget/' : 'widget_sw/';
        subject = data.subject + '/';
        time = 'r' + data.time + '/';
        widgetName = data.pinyinName + '/';
        widgetPath = this.projectPath + '/' + team + subject + time + widgetName;
        //创建没有的文件夹路径
        if (!fs.existsSync(this.projectPath+'/'+ team + subject + 'r' + data.time)) {
            fs.mkdirSync(this.projectPath+'/'+ team + subject + 'r' + data.time);
        };
        if (!fs.existsSync(this.projectPath + '/' + team + subject + time + data.pinyinName)) {
            fs.mkdirSync(this.projectPath + '/' + team + subject + time + data.pinyinName);
        }
        if(widgetPath + 'services') {
            fs.mkdirSync(widgetPath + 'services');
        }
        if (!fs.existsSync( widgetPath + 'sub_static')) {
            fs.mkdirSync(widgetPath + 'sub_static');
        };
        //插入模板代码
        this.insertCode(widgetPath + 'main.vue', mainVueHtml);
        this.insertCode(widgetPath + 'viewModel.ts', viewModelHtml);
        this.insertCode(widgetPath + 'main.ts', mainTs);
        this.insertCode(widgetPath + 'meta.json', metaJson);
        this.insertCode(widgetPath + 'services/TemplateViewHandler.ts', viewHandlerHtml);

    }

    /**
     * 生成代码
     * @param data
     */
    generateCode(data: any,TemplateName: string) {
        const templatePath  = path.resolve('./src/tpl/widget/' + TemplateName + '.tpl')
        const html = template(templatePath ,{form: data});
        return html;
    }

    //插入代码
    insertCode(filePath, code) {
        console.log(code)
        fs.writeFileSync(filePath, code, 'utf-8');
    }

    //创建插入模板的对象
    constructorObject(form: any) {
        const obj = {
            name:'',                // 微件名
            pinyinName: '',         //项目名
            time:'',                //期号
            subject: '',            //学科
            team: '',               //开发团队
            layout: '',             //布局
            reset: true,            //重置按钮
            resetMobile: true,
            adaptationMobile: true, //适配手机
            animationDelayTime: 0,  //控制面板延迟动画
            expand: true,           //展开按钮
            controlPanel:  true,    //控制面板
            forcedLandscape: true,  //是否强制横屏
            encryption: true,       //是否加密
            developerName: '',
        };
        obj.name = form.name;
        obj.developerName = form.developerName
        obj.pinyinName = form.pinyinName;
        obj.time = form.time;
        obj.subject = form.subject;
        obj.team = form.team;
        obj.layout = form.layout;
        obj.reset = form.reset === '需要'? true : false;
        obj.resetMobile = form.resetMobile === '需要'? true : false;
        obj.adaptationMobile = form.adaptationMobile === '适配' ? true : false;
        obj.animationDelayTime = form.animationDelayTime;
        obj.expand = form.expand === '显示' ? true : false;
        obj.controlPanel = form.controlPanel === '显示' ? false : true;
        obj.forcedLandscape = form.forcedLandscape === '是' ? true : false;
        obj.encryption = form.encryption === '是' ? true : false;
        return obj;
    }
}