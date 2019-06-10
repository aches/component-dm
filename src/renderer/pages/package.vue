<template>
  <div style="height: 100%;"  v-loading="loading" element-loading-text="拼命加载中">


    <el-card class="box-card" :body-style="{height:'calc(100% - 95px)',overflow:'auto'}" style="height: 100%" >
      <div slot="header" class="clearfix" >
        <el-button   size="small" type="primary"  @click="doPackage()">打包</el-button>

        <el-button   size="small" type="primary"  @click="createWidget()">新建微件</el-button>
        <el-button style="float: right; " type="primary" @click="exportJson()" size="small">导出全部数据</el-button>

    <!--   <el-select v-model="selectNo" multiple  placeholder="请选择期号">
          <el-option
                  v-for="item in allNums"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>

        <el-select v-model="selectSubject" multiple  placeholder="请选择学科">
          <el-option
                  v-for="item in subjects"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
-->


      </div>
      <div style="height: 100%">
        <el-table
                ref="multipleTable"
                height="100%"
                :data="projectList"
                tooltip-effect="dark"
                :summary-method="getSummaries"
                show-summary
                style="width: 100%"
                :default-sort = "{prop: 'no', order: 'descending'}"
                @selection-change="handleSelectionChange">
          <el-table-column
                  type="selection"
                  width="55">
          </el-table-column>
          <el-table-column
                  prop="no"
                  :filters="allNums"
                  :filter-method="filterHandler"
                  label="期号"
                  sortable
                  width="120">
            <!--<template slot-scope="scope">{{ scope.row.no }}</template>-->
          </el-table-column>
          <el-table-column
                  prop="category"
                  sortable
                  label="学科"
                  width="120"
                  filter-multiple
                  :filters="[{ value: 'math',text: '数学'}, {value: 'geography',text: '地理'}, {value: 'physics',text: '物理'}, {value: 'chemistry',text: '化学'}, {value: 'biology',text: '生物'}]"
                  :filter-method="filterHandler"
                 >
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
    <!--<el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="80%"
            style="height:80%"
            :before-close="handleClose">-->
    <div style="position: absolute;z-index: 2;left: 0;top: 0;welidth: 100%;height: 100%;padding: 20px; box-sizing: border-box;"
         v-show="dialogVisible">
      <el-card class="box-card" style="height:100%" :body-style="{ height: '85%' }" v-show="isShow1">
        <div slot="header" class="clearfix">
          <span>微件打包</span>
          <el-button style="float: right; " @click="canclePackage" size="mini">取 消</el-button>
          <el-button style="float: right; margin-right: 30px;" type="primary" :loading="isPacking" @click="confirmPackage" size="mini">开 始</el-button>
        </div>
        <div   class="text item" style="height:100%">
          <el-row style="height:100%">
            <el-col :span="6" class="" style="height:100%">
              <div class="title-nav-wrap"  style="height:100%;overflow-y: auto">
                  <div v-for="widget in multipleSelection" class="title">{{widget.title}}
                    <i v-if="widget.status == 'success' " class="el-icon-success"></i>
                    <i v-if="widget.status == 'error' " class="el-icon-error"></i>
                    <i v-if="widget.status == 'loading' " class="el-icon-loading"></i>
                  </div>
                  <!--<div class="title">乙烷的旋转异构体 <i class="el-icon-error"></i></div>
                  <div class="title">乙烷的旋转异构体 <i class="el-icon-loading"></i></div>-->



              </div>
            </el-col>
            <!--终端-->
            <el-col :span="18" class="content-wrap" style="height: 100%;">
              <div id="termDiv" style="position: relative;bottom: 0;right: 0;z-index: 99;height: 100%"> </div>
            </el-col>
          </el-row>


        </div>
      </el-card>

        <div v-show="isShow2" style="background-color: white;box-shadow: 0 0 2px 0 #666666;border-radius: 10px; padding: 10px; position: relative; left: calc(100% - 395px);top: calc(50% - 382px)">
        <!--<span>新建微件</span>-->
        <el-button @click="cancelForm()" style="position: absolute; right: 20px;bottom: 35px">关闭</el-button>
        <widgetTemplate ref="formData">
        </widgetTemplate>
        <!--<el-button type="primary" @click="onSubmit()" style="margin-left: 40%">立即创建</el-button>-->


      </div>

      <!--  <div style="height: 20%;">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="isPacking" @click="confirmPackage">确 定</el-button>
      </div>-->
    </div>
    <!--</el-dialog>-->

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  const {dialog} = require('electron').remote;
  import {SettingService} from "../services/SettingService";
  import {ProjectService} from "../services/ProjectService";
  import 'xterm/dist/xterm.css';
  import { Terminal } from 'xterm';
  import { fit } from 'xterm/lib/addons/fit/fit';
  import widgetTemplate from "../components/widgetTemplate";
  import {CommandUtil} from "../util/CommandUtil";

  export default Vue.extend ({
      components: {
          widgetTemplate,
      },
      name: 'setting',
      data() {
        return {
          isShow1: false,
          isShow2: false,
          route: this.$route.path.replace('/',''),
          settingServices:new SettingService(),
            projectServices:new ProjectService(),
            projectPath: '',
            selectedOptions:[],
            loading:true,
            isPacking:false,
            projectList: [],
            multipleSelection:[],
            dialogVisible: false,
            processContent:'',
            term:null,

            selectSubject:[],
            selectNo:[],
            allNums:[],

            filterSubject:['math'],
            subjects: [{
                value: 'math',
                text: '数学'
            }, {
                value: 'geography',
                text: '地理'
            }, {
                value: 'physics',
                text: '物理'
            }, {
                value: 'chemistry',
                text: '化学'
            }, {
                value: 'biology',
                text: '生物'
            }]

        }
      },
      async mounted(){

          //this.term.write('Hello from \n\raaa ')

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
              for(let i = 0 ;i < this.projectServices.nums.length;i++) {
                  this.allNums.push({
                      text:this.projectServices.nums[i],
                      value:this.projectServices.nums[i]
                  })
              }
              console.log(this.projectServices.nums);

          } catch (e) {
              this.$message({ type: 'warning', message: e.message});
          }
          this.loading = false;

          //console.log(3333)



      },
      methods:{
          cancelForm() {
              this.isShow2 = false;
              this.isShow1 = false;
          },
          newWidget() {

          },
          exportJson() {
            console.log(this.projectList)

            this.settingServices.exportJson(this.projectList)
          },
          doPackage() {
              if(this.multipleSelection.length == 0) {
                  this.$message({
                      message: '请至少选择一个微件',
                      type: 'warning'
                  });
                  return;
              }
            this.dialogVisible = true;
              this.isShow2 = false;
              this.isShow1 = true;
              setTimeout(() =>{
                  if(this.term){
                      return;
                  }
                  const options = {
                      cols : 120
                  };

                  this.term = new Terminal(options);
                  console.log(this.term);
                  this.term.open(document.getElementById('termDiv'));
                  //this.term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
                  fit(this.term);
              }, 300)
          },
          createWidget() {
              this.dialogVisible = true;
              this.isShow1 = false;
              this.isShow2 = true;
          },
          confirmPackage(){
            this.isPacking = true;
            this.projectServices.doPackage(this.multipleSelection, this.term);
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
          },
          filterHandler(value, row, column) {

              const property = column['property'];
              return row[property] === value;
              //return row.category == value;
          },
          numFilterChange(sort ) {
            console.log(sort);
          },
          canclePackage() {
              this.dialogVisible = false;
              //this.isPacking = false;
          },
          getSummaries(param) {
              const { columns, data } = param;
              const sums = [];
              columns.forEach((column, index) => {
                  if (index === 0) {
                      sums[index] = '';
                      return;
                  }
                  if (index === 1) {
                      sums[index] = '统计';
                      return;
                  }
                  if (index === 2) {
                      sums[index] = '习悦：' + this.projectServices.xyCounts;
                  }
                  if (index === 3) {
                      sums[index] = '识微：' + this.projectServices.swCounts;
                  }
                  if (index === 4) {
                      sums[index] = '共计：' +this.projectServices.project.length;
                      return;
                  }

              });

              return sums;
          }
      },
      watch:{
          selectNo: function(val){

          },
          selectSubject: function(val){

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
