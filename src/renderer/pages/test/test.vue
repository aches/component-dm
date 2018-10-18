<template>
    <div style="height: 100%; ">
        <el-form style="height: 100%; width: 100%" :model="settingForm">
            <el-container style="height: 100%;">
                <el-container>

                    <el-form  label-width="80px">
                        <el-form-item label="选择设备">
                            <el-select style="width: 350px;"  multiple  v-model="testDevices" placeholder="请选择">
                                <el-option
                                        v-for="(item,index) in devices"
                                        :key="'device'+index"
                                        :label="item.name"
                                        :value="index">
                                    <span style="float: left">{{ item.name }}</span>
                                    <div style="float: right;margin-left:35px;width: 75px">
                                        <span style="color: #8492a6; font-size: 13px;">{{ item.viewport.width }}x{{ item.viewport.height }}</span>
                                    </div>
                                    <!-- <div style="float: right;margin-left:35px;width: 35px">
                                         <span style="color: #8492a6; font-size: 13px"></span>
                                     </div>-->

                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="测试URL" style="margin-top: 50px">
                            <el-input style="width: 350px;" v-model="settingForm.testURL"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="saveSetting">开始</el-button>
                        </el-form-item>
                    </el-form>
                 <!--   <el-footer style=" height: 200px;margin-top:40px">

                    </el-footer>-->
                </el-container>

                <el-aside  >
                    <el-form  label-width="80px">
                        <el-form-item  >
                            <p><el-radio label="3D微件旋转脚本"  v-model="radio" name="type" ></el-radio></p>
                            <!--<p><el-radio label="3D微件测试脚本1" v-model="radio1" name="type" ></el-radio></p>
                            <p><el-radio label="3D微件测试脚本2" v-model="radio2" name="type" ></el-radio></p>
                            <p><el-radio label="3D微件测试脚本3" v-model="radio3" name="type" ></el-radio></p>
                            <p><el-radio label="3D微件测试脚本4" v-model="radio4" name="type" ></el-radio></p>
                            <p><el-radio label="3D微件测试脚本5" v-model="radio5" name="type" ></el-radio></p>-->
                        </el-form-item>
                    </el-form>
                </el-aside>
            </el-container>
        </el-form>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {SettingService} from "../../services/SettingService";
  import {Devices} from "./Devices.ts";
  import {TestCore} from "../../test/TestCore";

  export default Vue.extend ({
      name: 'setting',
      data() {
        return {
            devices: [],
            radio: '测试3D',
            radio1: '测试3D',
            radio2: '测试3D',
            radio3: '测试3D',
            radio4: '测试3D',
            radio5: '测试3D',
            settingServices:new SettingService(),
            settingForm: {
                checkbox: [],
                testURL: '',
            },

            devicesList: [],
            testDevices: []
        }
      },
      mounted(){
          this.settingForm.testURL = this.settingServices.getTestUrlPath();
          console.log('2222222222', this.settingForm.testURL);

          this.devices = Devices.devices;
      },
      methods:{
          saveSetting(){

              const _ = require('lodash');
              //var selectDevices = _.find(Devices.devices , (o,i) => { return !this.testDevices.indexOf(i); });
              var selectDevices = _.pullAt(_.assign([], Devices.devices ), this.testDevices);
              console.log('selectDevices', selectDevices);



//              console.log('this.checkboxArray', this.devicesList, this.settingForm.testURL, this.radio);
              console.log('测试url：' + this.settingForm.testURL);
              new TestCore(this.settingForm.testURL, selectDevices, this.radio);

          },

      }
  });
</script>

<style scoped>

</style>
