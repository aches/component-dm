<template>
  <div style="height: 100%;"  >
    <el-card class="box-card" :body-style="{height:'calc(100% - 95px)',overflow:'auto'}" style="height: 100%" >
      <div slot="header" class="clearfix" >
        <el-button type="primary"  :loading="loading"  @click="doPackage()">集成</el-button>


      </div>
      <div>

      </div>


      <el-upload
              class="upload-demo"
              drag
              :on-change="handleChange"
              :auto-upload="false"
              style="text-align: center"
              action="#"
             >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">请上传从playcanvas下载的zip包</div>
      </el-upload>

    </el-card>



  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {ProjectService} from "../services/ProjectService";
  import {CommandUtil} from "../util/CommandUtil";
  import {D3Service} from "../services/D3Services";

  export default Vue.extend ({
      name: 'playcanvas',
      data() {
        return {
          route: this.$route.path.replace('/',''),
            d3Services:new D3Service(),
            file:Object ,
            loading:false,
            isPacking:false



        }
      },
      async mounted(){
          window['$vue'] = this;



          //console.log(3333)



      },
      methods:{
          handleChange(file, fileList) {
            this.file = file;
            console.log(file)
          },
          doPackage() {
              this.loading = true;
             // this.file
              //const outpath = this.settingServices.getOutputPath();
              this.d3Services.playcanvsStructure(this.file);

              setTimeout(() => {
                  this.loading = false;
                  this.$message({ type: 'success', message: `集成成功`});
              },2000);

          },
      },
      watch:{
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
