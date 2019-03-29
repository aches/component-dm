<template>
  <div style="height: 100%;"  >
    <el-form ref="form" :model="form" :rules = 'rules' label-width="165px">
      <el-form-item label="微件名称" prop="name">
        <el-input v-model="form_name" style="width: 300px;" placeholder="中文名/微件标题"></el-input>
        <el-input v-model="form_pinyinName" style="width: 300px;" placeholder="英文名/项目名"></el-input>
      </el-form-item>
      <el-form-item label="布局">
        <el-radio-group v-model="form.layout">
          <el-radio label="全局布局"></el-radio>
          <el-radio label="左右布局"></el-radio>
          <el-radio label="习题布局"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="期号" prop="time" placeholder="请输入期号">
        <el-input v-model="form.time" style="width: 120px"></el-input>
      </el-form-item>
      <el-form-item label="学科" prop="subject">
        <el-select v-model="form.subject" placeholder="请选择学科">
          <el-option label="数学" value="math"></el-option>
          <el-option label="地理" value="geography"></el-option>
          <el-option label="物理" value="physics"></el-option>
          <el-option label="化学" value="chemistry"></el-option>
          <el-option label="生物" value="biology"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="技术框架" prop="technology">
        <el-select v-model="form.technology" placeholder="请选择所使用的技术">
          <el-option label="无" value="null"></el-option>
          <el-option label="three.js" value="threejs"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="重置按钮">
        <el-radio-group v-model="form.reset">
          <el-radio label="需要"></el-radio>
          <el-radio label="不需要"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="移动端重置按钮">
        <el-radio-group v-model="form.resetMobile">
          <el-radio label="需要"></el-radio>
          <el-radio label="不需要"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="适配移动端">
        <el-radio-group v-model="form.adaptationMobile">
          <el-radio label="适配"></el-radio>
          <el-radio label="不适配"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="展开按钮">
        <el-radio-group v-model="form.expand">
          <el-radio label="显示"></el-radio>
          <el-radio label="不显示"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="移动端控制面板">
        <el-radio-group v-model="form.controlPanel">
          <el-radio label="显示"></el-radio>
          <el-radio label="不显示"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否强制横屏">
        <el-radio-group v-model="form.forcedLandscape">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否加密">
        <el-radio-group v-model="form.encryption">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="控制面板延迟出现时间" prop="animationDelayTime">
        <el-input v-model="form.animationDelayTime" style="width: 150px;" placeholder="请输入时间(毫秒)"></el-input>
      </el-form-item>

      <el-form-item label="所属团队" prop="team">
        <el-select v-model="form.team" placeholder="请选择开发团队">
          <el-option label="习悦" value="xiyue"></el-option>
          <el-option label="识微" value="shiwei"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="开发者姓名" prop="developerName">
        <el-input v-model="form.developerName" style="width: 300px;" placeholder="姓名"></el-input>
      </el-form-item>

      <el-button type="primary" @click="onSubmit('form')" style="margin-left: 40%">立即创建</el-button>
      <el-button @click="resetForm('form')">重置</el-button>

      <el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {SettingService} from "../services/SettingService";
  import {ProjectService} from "../services/ProjectService";
  import 'xterm/dist/xterm.css';
  import { Terminal } from 'xterm';
  import { fit } from 'xterm/lib/addons/fit/fit';
  import {CommandUtil} from "../util/CommandUtil";
  import {WidgetTemplateServices} from "../services/WidgetTemplateServices";
  const pinyin = require('pinyin');
  export default Vue.extend ({
      name: 'setting',
      data() {
        return {
          form: {
              name:'',
              pinyinName: '',
              developerName:'',
              time:'',
              subject: '',
              team: '',
              layout: '全局布局',
              reset: '需要',
              resetMobile: '需要',
              adaptationMobile:'适配',
              animationDelayTime: null,
              expand:'显示',
              controlPanel: '显示',
              forcedLandscape:'是',
              encryption:'是',
              technology: '',

          },
          rules: {
              name: [
                  { required: true, message: '请输入微件名称', trigger: 'change' },
              ],
              developerName: [
                  {required: true, message: '请输入开发者姓名', trigger: 'change'}
              ],
              pinyinName: [
                  { required: true, message: '请输入活动名称', trigger: 'change' },
              ],
              time: [
                  { required: true, message: '请输入期号', trigger: 'change' },
                  { required: true, type: 'string', message: '请输入数字', trigger: 'change', pattern: /^\d+$/ },
              ],
              subject: [
                  { required: true, message: '请选择学科', trigger: 'blur', trigger: 'change' },
              ],
              animationDelayTime: [
                  { required: true, message: '请输入延迟时间', trigger: 'change' },
                  { required: true, type: 'string', message: '请输入数字', trigger: 'change', pattern: /^\d+$/ },
              ],
              team: [
                  { required: true, message: '请选择开发团队', trigger: 'blur', trigger: 'change' },
              ],
              technology: [
                  {required: true, message: '请选择所使用的技术', trigger: 'blur', trigger: 'change'}
              ]
          },
          form_name: '',
          form_pinyinName: '',
          route: this.$route.path.replace('/',''),
          settingServices:new SettingService(),
            projectServices:new ProjectService(),
            projectPath: '',
            selectedOptions:[],
            loading: true,
            isPacking: false,
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

          setPinYin() {

          },
          onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('创建成功');
                        new WidgetTemplateServices(this.form);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
          },
          resetForm(formName) {
              this.$refs[formName].resetFields();
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

          },
          form_name: function(value: string) {
              this.form_pinyinName = pinyin(value, {
                  style: pinyin.STYLE_FIRST_LETTER
              }).join('');
              this.form.name = value;
          },
          form_pinyinName: function (value: string) {
              this.form.pinyinName = value;
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
