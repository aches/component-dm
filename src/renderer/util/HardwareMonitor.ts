/**
 * 硬件监测
 *@since 2.0
 *@author zhiguo
 *@Date 2018/7/21 9:38
 */

const si = require('systeminformation');
const _  = require('lodash');

export class HardwareMonitor {


    async loadHardwareInfo (): Promise<HardwareInfo> {
        const gpu = await si.graphics();
        const cpu = await si.cpu();
        const mem = await si.mem();

    /*    console.log(gpu);
        console.log(cpu);
        console.log(mem);*/


        let hdGpu;
        //获取独立显卡
        const discreteGpu = _.last(gpu.controllers , function(o) {
            if(o.vendor.toLowerCase().indexOf('intel') > -1) {
                hdGpu = o;
            }
            return o.vendor.toLowerCase().indexOf('intel') === -1;
        });


        const total = mem.total ? Number.parseInt((mem.total/1048576).toFixed(2)) : 0;
        const used  = mem.used  ? Number.parseInt((mem.used /1048576).toFixed(2)) : 0;
        const free  = mem.free  ? Number.parseInt((mem.free /1048576).toFixed(2)) : 0;


        //(bytes/1048576).toFixed(2)+' MB

        const hardwareInfo: HardwareInfo = {
            cores: cpu.cores,
            brand: cpu.brand,
            speed: cpu.speed,
            speedmax: cpu.speedmax,

            discreteGpu     : discreteGpu ? true : false,
            graphicsCount   : gpu.controllers.length,

            vram  : discreteGpu ? discreteGpu.vram   : hdGpu.vram,
            vmodel: discreteGpu ? discreteGpu.model  : hdGpu.model,
            vendor: discreteGpu ? discreteGpu.vendor : hdGpu.vendor,

            memTotal :total,
            memUsed  :used,
            memFree  :free
        };

        return hardwareInfo;

    }

}

/** 硬件信息 */
interface HardwareInfo {

    /** 显存 */
    vram:number;
    /* 显卡型号 */
    vmodel:string;
    /* 显卡厂商 */
    vendor:string;
    /** 独立gpu*/
    discreteGpu:boolean;
    /** 显卡数量*/
    graphicsCount:number;

    /** cpu线程数 */
    cores:number;
    /** cpu型号 */
    brand:string;
    /** 频率 */
    speed:number;
    /** 最大频率 */
    speedmax:number;

    /** 内存 单位mb */
    memTotal:number;
    memUsed:number;
    memFree:number;

}

