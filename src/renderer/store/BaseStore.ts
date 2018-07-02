import {Log} from "../util/Log";

/**
 *数据存储类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/6/28 9:37
 */

export class BaseStore {


    private getData(key: string) {
        return localStorage.getItem(key);
    }

    /**
     * 查询数据并转换为对象
     * @param {string} key
     * @returns {any}
     */
    public getDataObj(key: string): any{
        const data = this.getData(key);
        let result;
        try {
            result = JSON.parse(data);
        }catch (e) {
            Log.e('数据转换异常');
            result = data;
        }finally {
            return result;
        }
    }

    public getDataStr(key: string): string {
        return  this.getData(key).toString();
    }

    public getDataNumber(key: string): number {
        return  Number.parseInt(this.getData(key));
    }

    /**
     *保存数据
     * @param {string} key
     * @param val
     */
    public saveData(key: string, val: any) {
        if(typeof val != "string" && typeof val != "number" ){
            localStorage.setItem(key,JSON.stringify(val)) ;
        }else{
            localStorage.setItem(key, val.toString()) ;
        }

    }

}