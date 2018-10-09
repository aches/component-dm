<template>
  <div style="height: 100%;">
      <el-form style="height: 100%; width: 50%" :model="settingForm">
          <el-container style="height: 100%;">
              <el-container>
                  <el-header style="height: 30px">
                      <label style="margin-left: 310px;">Width</label>
                      <label style="margin-left: 50px">Height</label>
                  </el-header>

                  <el-main>
                      <el-form-item v-for="item in devices" :label="item.name" style="margin: 0 auto" label-width="250px" prop="checkbox" >
                          <el-checkbox :label="item.name" name="type" v-model="settingForm.checkbox">
                              <el-input style="width: 100px;" v-model="item.viewport.width"></el-input>
                              <el-input style="width: 100px;" v-model="item.viewport.height" ></el-input>
                          </el-checkbox>
                      </el-form-item>
                  </el-main>
                  <el-footer style=" height: 200px;">
                      <el-form-item label="测试URL" style="margin-top: 50px">
                        <el-input style="width: 350px;" v-model="settingForm.testURL"></el-input>
                      </el-form-item>

                      <el-form-item>
                          <el-button type="primary" @click="saveSetting">开始</el-button>
                      </el-form-item>

                  </el-footer>
              </el-container>

              <el-aside width="200px">
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
        }
      },
      mounted(){
          this.settingForm.testURL = this.settingServices.getTestUrlPath();
          console.log('2222222222', this.settingForm.testURL);

          this.devices = Devices.devices;
      },
      methods:{
          saveSetting(){

              this.settingServices.saveTestUrlPath(this.settingForm.testURL);

              for (let i = 0; i < this.devices.length; i++) {
                  for (let k = 0; k < this.settingForm.checkbox.length; k++) {
                      if (this.devices[i].name === this.settingForm.checkbox[k]) {
                          this.devicesList[k] = this.devices[i];
                      }
                  }
              }

              // console.log('this.checkboxArray', this.devicesList, this.settingForm.testURL);

              const aaa = new TestCore(this.settingForm.testURL, this.devicesList, this.radio);

          },

      }
  });
</script>

<style scoped>

</style>
