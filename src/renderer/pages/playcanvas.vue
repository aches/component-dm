<template>
  <div style="height: 100%;"  >
    <el-card class="box-card" :body-style="{height:'calc(100% - 95px)',overflow:'auto'}" style="height: 100%" >
      <div slot="header" class="clearfix" >
       <!-- <el-button type="primary"     @click="startup()">启动</el-button>-->
       <!-- <el-button type="primary"  :loading="loading"  @click="doPackage()">集成</el-button>-->

      </div>
      <div>

      </div>
      <div class="left">
        <el-upload
                class="upload-demo"
                drag
                :on-change="handleChange"
                :auto-upload="false"
                style="text-align: center"
                action="#"
        >
          <i class="el-icon-upload"></i>
          <!--<div class="el-upload__text">请先点击<em>启动按钮</em>后</div>-->
          <div class="el-upload__text">将文件(从CMS下载的zip包)拖到此处，或<em>点击上传</em></div>
          <!--<div class="el-upload__text"  >然后点击<em>集成按钮</em></div>-->
          <div class="el-upload__tip" slot="tip">点击右侧链接，进行测试（如果遇到弹窗提示，请允许使用网络）</div>

        </el-upload>
      </div>
      <div class="right">

        <div v-for="item in projectList">
          <p>
            <span class="itemName"  @click="toChrome(item.url)">{{item.name}}</span>
            <i @click="deleteItem(item.name)" class="el-icon-delete" style="float: right;margin-right: 200px;"></i>
          </p>
        </div>

      </div>


    </el-card>



  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {ProjectService} from "../services/ProjectService";
  import {CommandUtil} from "../util/CommandUtil";
  import {D3Service} from "../services/D3Services";
  import {TestService} from "../services/TestService";
  var exec = require('child_process').exec;

  export default Vue.extend ({
      name: 'playcanvas',
      data() {
        return {
          route: this.$route.path.replace('/',''),
            d3Services:new D3Service(),
            testServices:new TestService(),
            file:Object ,
            loading:false,
            isPacking:false,
            projectList: []



        }
      },
      async mounted(){
          window['$vue'] = this;
          this.initProject();
          this.startup();
      },
      methods:{
          deleteItem(name) {
              this.testServices.removeDir(this.testServices.sysPath + name);
              this.testServices.reload();


          },
          startup() {
              this.testServices.initServer();
              this.$message({ type: 'success', message: `服务已启动`});
          },
          initProject() {
              const proListStr = localStorage.getItem('projectList');
              if(proListStr) {
                  console.log('data------')
                  this.projectList = JSON.parse(proListStr) ;
              }
          },
          toChrome(url) {
              var cp  = require('child_process')
              cp.exec(`start chrome ${url}`, function(err) {
                  if (err) { //process error
                      console.log('error', err);
                      this.$message({ type: 'error', message: `请检查系统是否安装chrome浏览器`});
                  } else {
                      console.log('success');
                  }
              });


              console.log('url', url);
              /*var open = require("open");
              open('https://sindresorhus.com', {app: ['chrome']});*/

              /*exec(`open chrome` , function(err) {
                  if (err) { //process error
                      console.log('error', err);
                  }
              });*/
          },
          handleChange(file, fileList) {
            this.file = file;
            console.log(file)
              this.doPackage();
          },
          doPackage() {
              console.log(this.file);

              if(typeof  this.file === 'function') {
                  this.$message({ type: 'error', message: `请选择文件 `});
                  return;
              }

              this.loading = true;
             // this.file
              //const outpath = this.settingServices.getOutputPath();

              try {
                  this.testServices.startup(this.file);
                  setTimeout(() => {
                      this.loading = false;
                      this.$message({ type: 'success', message: `集成成功`});
                      this.initProject();
                  },2000);
              } catch (e) {
                  this.$message({ type: 'error', message: `集成失败`});
              }




          },
      },
      watch:{
      }
  });
</script>

<style scoped>
  .el-icon-delete:hover {
    cursor: pointer;
  }
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

  .itemName {
    color: #409eff;
  }

  .itemName:hover {
    color: #a0cfff;
    cursor: pointer;
    text-decoration: underline;
  }

  .left {
    border-right: 1px solid #b4bccc;
    width: 50%;
    height: 100%;
    display: inline-block;
  }
  .right {
    width: 45%;
    height: 100%;
    float: right;
    display: inline-block;
  }

</style>
