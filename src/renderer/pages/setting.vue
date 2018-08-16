<template>
  <div style="height: 100%;">
    <el-form  label-width="80px" :model="settingForm"  >
      <el-form-item label="项目路径" >
        <el-input v-model="settingForm.path" style="width: 350px;"></el-input>
        <el-button  @click="settingForm.path = settingServices.showWindowDialog()">选择路径</el-button>
      </el-form-item>
      <el-form-item label="打包路径" >
        <el-input v-model="settingForm.output" style="width: 350px;"></el-input>
        <el-button  @click="settingForm.output = settingServices.showWindowDialog()">选择路径</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSetting">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {SettingService} from "../services/SettingService";

  export default Vue.extend ({
      name: 'setting',
      data() {
        return {
          route: this.$route.path.replace('/',''),
          settingServices:new SettingService(),
          settingForm: {
              path:'',
              output:''
          }
        }
      },
      mounted(){
          //this.$electron.remote.getCurrentWebContents().openDevTools();
          this.settingForm.path = this.settingServices.getProjectPath();
          this.settingForm.output = this.settingServices.getOutputPath();
      },
      methods:{
          saveSetting(){
              this.$electron.remote.getCurrentWebContents().openDevTools();
              this.$alert('确认选择项目路径?', '提示', {
                  confirmButtonText: '确定',
                  type: 'warning',
                  callback: action => {
                      if(action === 'confirm'){
                           this.settingServices.saveProjectPath(this.settingForm.path);
                           this.settingServices.saveOutPutPath(this.settingForm.output);
                           this.$message({ type: 'success', message: `保存成功`});
                      }
                  }
              });
          }
      }
  });
</script>

<style scoped>

</style>
