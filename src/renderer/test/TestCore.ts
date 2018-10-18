import {SettingService} from '../services/SettingService';
import {TestScriptsTwo} from "./testCall/TestScriptsTwo";
import {TestScriptsOne} from "./testCall/TestScriptsOne";
import {TestScriptsThree} from "./testCall/TestScriptsThree";

const puppeteer = require('puppeteer-core');

export class TestCore {

    //测试url
    url: string;
    //模拟多个设备
    deviceList: Array<Object>;

    testCall: any;

    settingServices = new SettingService();

    constructor(url: any, deviceList: any, testCall: any) {

        this.url = url;
        this.deviceList = deviceList;
        this.testCall = testCall;

        console.log('执行了',  testCall);

        this.sortPage();
    }

    // 页面排序
    sortPage() {
        // 初始位置
        const position = {
            x: 0,
            y: 0
        };

        for (let i = 0; i < this.deviceList.length; i++) {

            console.log('1', position.x, (this.deviceList[i] as any).viewport.width, screen.width);
            // 超出屏幕宽度 另起一行
            if ((position.x + (this.deviceList[i] as any).viewport.width) > screen.width) {
                position.x = 0;
                position.y = (this.deviceList[i] as any).viewport.height;
            }
            console.log('2', position.x, (this.deviceList[i] as any).viewport.width, screen.width);

            this.runTest(this.deviceList[i], position);

            position.x += (this.deviceList[i] as any).viewport.width;
        }
    }

    async runTest(device: any, position: any) {
        const page = await this.initBrowserPage(device, position);

        setTimeout(async () =>{
            console.log('page', page)
            this.test(page);
            this.consoleEvent(page);
        }, 3000);

    }
    
    async initBrowserPage(device: any, position: any) {
        const browser = await (puppeteer.launch({
            // 若是手动下载的chromium需要指定chromium地址, 默认引用地址为 /项目目录/node_modules/puppeteer/.local-chromium/
            executablePath: this.settingServices.getChromePath(),
            //设置超时时间
            timeout: 15000,
            //如果是访问https页面 此属性会忽略https错误
            ignoreHTTPSErrors: true,
            // 打开开发者工具, 当此值为true时, headless总为false
            devtools: false,
            // 关闭headless模式, 不会打开浏览器
            headless: false,
            defaultViewport: device.viewport,
            args: [
                `--disable-web-security`,
                `--no-throttle`,
                `--app=${this.url}`,
                '--disable-infobars',
                `--window-size=${device.viewport.width },${device.viewport.height }`,
                /*   `--content-shell-host-window-size=${device.viewport.width},${device.viewport.height}`, */
                `--window-position=${position.x},${position.y}`,
            ]
        }));

        const pages = await browser.pages();

        await pages[0]._client.send('Emulation.clearDeviceMetricsOverride');

        console.log('pages[0]', pages[0]);
        return pages[0];
    }

    // 选择脚本
    test(page) {
        let test;
        switch (this.testCall) {
            case '测试微件':
                test = new TestScriptsOne(page);
                break;
            case '测试3D':
                test = new TestScriptsTwo(page);
                break;
            case '测试1':
                test = new TestScriptsThree(page);
                break;
        }

    }

    consoleEvent(page) {
        page.on('console', msg => {
            for (let i = 0; i < msg.args().length; ++i)
                console.log('执行', `${i}: ${msg.args()[i]}`);    // 译者注：这句话的效果是打印到你的代码的控制台
        });
        // page.evaluate(() => console.log('hello', 5, {foo: 'bar'})); // 这个代码表示在页面实例中执行了console.log。如果没有监听console事件，这里的输出不会出现在你的控制台
    }
}