<template>
    <div style="height: 100%; ">
        <el-form style="height: 100%; width: 100%" :model="settingForm">
            <el-container style="height: 100%;">
                <el-container>
                    <el-header style="height:40px;margin-top:50px ">
                        <el-select multiple  v-model="testDevices" placeholder="请选择">
                            <el-option
                                    v-for="(item,index) in devices"
                                    :key="'device'+index"
                                    :label="item.name"
                                    :value="index">
                                <span style="float: left">{{ item.name }}</span>
                                <div style="float: right;margin-left:35px;width: 35px">
                                    <span style="color: #8492a6; font-size: 13px">{{ item.viewport.width }}</span>
                                </div>
                                <div style="float: right;margin-left:35px;width: 35px">
                                    <span style="color: #8492a6; font-size: 13px">{{ item.viewport.height }}</span>
                                </div>

                            </el-option>
                        </el-select>
                    </el-header>
                    <el-footer style=" height: 200px;margin-top:40px">
                        <el-form-item label="测试URL" style="margin-top: 50px">
                            <el-input style="width: 350px;" v-model="settingForm.testURL"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="saveSetting">开始</el-button>
                        </el-form-item>
                    </el-footer>
                </el-container>

                <el-aside npmwidth="200px" style="margin-top: 50px">
                    <el-form-item label-width="60px">
                        <p><el-radio label="测试微件" v-model="radio" name="type" ></el-radio></p>
                        <p><el-radio label="测试3D" v-model="radio" name="type" ></el-radio></p>
                        <p><el-radio label="测试1"  v-model="radio" name="type" ></el-radio></p>
                    </el-form-item>

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

              const aaa = new TestCore(this.settingForm.testURL, selectDevices, this.radio);

          },

      }
  });
</script>

<style scoped>

</style>
