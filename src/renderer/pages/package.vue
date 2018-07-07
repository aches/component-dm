<template>
  <div style="height: 100%;"  v-loading="loading" element-loading-text="拼命加载中">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--<span>微件列表</span>-->
        <!--<el-cascader
                :options="options"
                v-model="selectedOptions"
                @change="handleChange">
        </el-cascader>-->
       <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div>
        <el-table
                ref="multipleTable"
                :data="projectList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
          <el-table-column
                  type="selection"
                  width="55">
          </el-table-column>
          <el-table-column
                  label="期号"
                  width="120">
            <template slot-scope="scope">{{ scope.row.no }}</template>
          </el-table-column>
          <el-table-column
                  prop="category"
                  label="学科"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="title"
                  label="标题"
                 >
          </el-table-column>
          <el-table-column
                  prop="author"
                  label="作者"
                  show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
      <!--
        <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>-->
    </el-card>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {SettingServices} from "../services/SettingServices";
  import {ProjectService} from "../services/ProjectService";

  export default Vue.extend ({
      name: 'setting',
      data() {
        return {
          route: this.$route.path.replace('/',''),
          settingServices:new SettingServices(),
            projectServices:new ProjectService(),
            projectPath: '',
            selectedOptions:[],
            loading:true,
            projectList: []

        }
      },
      async mounted(){
          window['$vue'] = this;
          this.projectPath = this.settingServices.getProjectPath();

          if( !this.projectPath ) {
              console.log(this.$router);
              this.$message({ type: 'warning', message: `请先到配置管理中选择项目路径！`});
              this.$router.push('/setting-page');
              return;
          }

          try {
              console.time('readProject');
              await this.projectServices.readProjectStructure();
              console.timeEnd('readProject');
              console.log(this.projectServices.project);
              this.projectList = this.projectServices.project;
          } catch (e) {
              this.$message({ type: 'warning', message: e.message});
          }
          setTimeout(() =>{
              this.loading = false;
          },2000)

          //console.log(3333)



      },
      methods:{
          handleSelectionChange() {

          },
          saveSetting(){
              this.$alert('确认选择项目路径?', '提示', {
                  confirmButtonText: '确定',
                  type: 'warning',
                  callback: action => {
                      if(action === 'confirm'){
                           this.settingServices.saveProjectPath(this.settingForm.path);
                           this.$message({ type: 'success', message: `保存成功`});
                      }
                  }
              });
          },
          handleChange(value) {
              console.log(value);
          }
      }
  });
</script>

<style scoped>

</style>
