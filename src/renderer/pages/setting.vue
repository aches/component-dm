<template>
  <div style="height: 100%;">
    <el-form  label-width="80px" :model="settingForm"  >
      <el-form-item label="项目路径" >
        <el-input v-model="settingForm.path" style="width: 350px;"></el-input>
        <el-button type="primary" @click="settingForm.path = settingServices.setProjectPath()">选择路径</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {SettingServices} from "../services/SettingServices";

  export default Vue.extend ({
      name: 'setting',
      data() {
        return {
          route: this.$route.path.replace('/',''),
          settingServices:new SettingServices(),
          settingForm: {
              path:''
          }
        }
      },
      mounted(){
          this.settingForm.path = this.settingServices.getProjectPath();
      }
  });
</script>

<style scoped>

</style>
