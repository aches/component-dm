<template>
  <div style="height: 100%;"  v-loading="loading" element-loading-text="拼命加载中">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary"  @click="doPackage()">打包</el-button>
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


    <!--打包弹窗-->
    <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="80%"
            height="80%"
            :before-close="handleClose">
      <el-card class="box-card">
        <div   class="text item">
          <el-row>
            <el-col :span="6" class="">
              <div class="title-nav-wrap">
                  <div v-for="widget in multipleSelection" class="title">{{widget.title}}
                    <i v-if="widget.status == 'success' " class="el-icon-success"></i>
                    <i v-if="widget.status == 'error' " class="el-icon-error"></i>
                    <i v-if="widget.status == 'loading' " class="el-icon-loading"></i>
                  </div>
                  <!--<div class="title">乙烷的旋转异构体 <i class="el-icon-error"></i></div>
                  <div class="title">乙烷的旋转异构体 <i class="el-icon-loading"></i></div>-->



              </div>
            </el-col>
            <el-col :span="16" class="content-wrap"><pre>{{processContent}}</pre></el-col>
          </el-row>
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="isPacking" @click="confirmPackage">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {SettingServices} from "../services/SettingServices";
  import {ProjectService} from "../services/ProjectService";
  import {CommandUtil} from "../util/CommandUtil";

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
            isPacking:false,
            projectList: [],
            multipleSelection:[],
            dialogVisible: false,
            processContent:''

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
              this.projectList = this.projectServices.project;
          } catch (e) {
              this.$message({ type: 'warning', message: e.message});
          }
          this.loading = false;

          //console.log(3333)



      },
      methods:{
          doPackage() {
              /*this.$alert('确认选择项目路径?', '提示', {
                  confirmButtonText: '确定',
                  type: 'warning',
                  callback: action => {
                      if(action === 'confirm'){
                          this.settingServices.saveProjectPath(this.settingForm.path);
                          this.$message({ type: 'success', message: `保存成功`});
                      }
                  }
              });*/

            this.dialogVisible = true;


            //CommandUtil.execPackageCmd(this.settingServices.getProjectPath());
          },
          confirmPackage(){
            this.isPacking = true;
            this.projectServices.doPackage(this.multipleSelection);
          },
          handleSelectionChange(val) {
                  val.status = 'wait';
                  this.multipleSelection = val;
          },
          handleClose(done) {
              this.$confirm('确认关闭？')
                  .then(_ => {
                      this.isPacking = false;
                      this.processContent = '';
                      done();
                  })
                  .catch(_ => {});
          }
      }
  });
</script>

<style scoped>
  .title-nav-wrap {
    border-right: 2px solid #e4e7ed;
  }
  .title-nav-wrap .title{
    margin-bottom: 20px;
  }
  .title-nav-wrap i {
    margin-top: 7px;
    margin-right: 14px;
    float: right;

  }
  .content-wrap {
    padding-left: 15px;
  }

</style>
