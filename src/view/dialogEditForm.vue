<template>
  <el-dialog title="编辑审计项目" :visible.sync="$store.state.AuditProjectList.dialogEditFormVisible" @close="close" append-to-body>
    <el-form :model="form">
      <el-form-item label="项目名称：" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="被审计单位：" :label-width="formLabelWidth">
        <el-select v-model="form.auditedOrgId" placeholder="请选择被审计对象" clearable>
          <el-option label="" v-for="item in audited_object_list" :label="item.name" :value="item.id" :key="item.id">
            {{item.name}}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="监管单位：" :label-width="formLabelWidth">
        <el-select v-model="form.supervisionOrgId" placeholder="请选择监管单位" clearable>
          <el-option label="" v-for="item in supervision_unit_list" :label="item.name" :value="item.id" :key="item.id">
            {{item.name}}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="监管类别：" :label-width="formLabelWidth">
        <el-select v-model="form.supervisionCategoryId" placeholder="请选择监管类别" clearable>
          <el-option label="" v-for="item in supervision_category_list" :label="item.name" :value="item.id"
                     :key="item.id">{{item.name}}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="被审计对象：" :label-width="formLabelWidth">
        <el-select v-model="form.auditedTargetId" placeholder="请选择被审计对象" clearable>
          <el-option label="" v-for="item in audited_object_list" :label="item.name" :value="item.id" :key="item.id">
            {{item.name}}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审计年度：" :label-width="formLabelWidth">
        <el-select v-model="form.year" placeholder="请选择活动区域">
          <el-option v-for="(item,index) in TheseYears" :value="item == null ? '全部': item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="问题分类：" :label-width="formLabelWidth">
        <el-select v-model="form.questionCategoryId" placeholder="请选择问题分类" clearable>
          <el-option label="" v-for="item in question_category_list" :label="item.name" :value="item.id" :key="item.id">
            {{item.name}}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审计时间：" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.auditedAt"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="上传附件：" :label-width="formLabelWidth">

        <!--<el-upload-->
          <!--id="upload-demo"-->
          <!--action=""-->
          <!--ref="refsUpload"-->
          <!--:http-request="uploadFile"-->
          <!--class="upload-demo"-->
          <!--:show-file-list="false"-->
          <!--:limit="1">-->
          <!--<el-button size="small" type="primary" class="uoload_file">点击上传</el-button>-->
        <!--</el-upload>-->

        <el-upload
          class="upload-demo"
          action=""
          ref="refsUpload"
          :http-request="uploadFile"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="15"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">温馨提示：每个附件大小不超过5M，单个项目不超过15个，类别支持 .docx、.xlsx、.pptx、.pdf、.txt、.jpg、 .jpeg</div>
        </el-upload>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="close">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {getTheseYears} from '../tools/utils'

  export default {
    name: "edit",
    props:['dialogEditFormVisible'],
    data() {
      return {
        formLabelWidth: '120px',
        TheseYears: null,
      }
    },
    computed: {
      ...mapState({
        form: state => state.AuditProjectList.form,
        supervision_unit_list: state => state.AuditProjectList.supervision_unit_list,
        supervision_category_list: state => state.AuditProjectList.supervision_category_list,
        audited_object_list: state => state.AuditProjectList.audited_object_list,
        question_category_list: state => state.AuditProjectList.question_category_list,
      }),
      fileList(){
        return this.projectFilesToFileList(this.form.projectFiles);
      }
    },
    methods: {
      ...mapActions([
        'GetSupervisionUnitList',
        'GetSupervisionCategoryList',
        'GetAuditedObjectList',
        'GetQuestionCategoryList',
        'Update'
      ]),
      close() {
        console.log('---------------------close-----------------------')
        this.$store.state.AuditProjectList.dialogEditFormVisible = false;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      projectFilesToFileList(projectFiles)
      {
        var fileList = []
        for (let i =0; i<projectFiles.length;i++)
        {
          fileList[i]={id:'',name:'',url:'',type:''};
          fileList[i].id=projectFiles[i].id;
          fileList[i].name=projectFiles[i].name;
          fileList[i].url=projectFiles[i].path;
          fileList[i].type=projectFiles[i].type;
        }
        return fileList;
      },
      fileListToProjectFiles(fileList)
      {
        var projectFiles = []
        for (let i =0; i<fileList.length;i++)
        {
          projectFiles[i]={id:'',name:'',path:'',type:''};
          projectFiles[i].id=fileList[i].id;
          projectFiles[i].name=fileList[i].name;
          projectFiles[i].url=fileList[i].path;
          projectFiles[i].type=fileList[i].type;
        }
        return projectFiles;
      },
      // 文件上传
      uploadFile(item) {
        console.log('item:')
        console.log(item)
        this.form.files=item.file;
        this.Update();//更新
      },

    },
    beforeMount() {
      //获取年度
      this.TheseYears = getTheseYears();
    },
    mounted() {
      //获取下拉菜单
      this.GetSupervisionUnitList();
      this.GetSupervisionCategoryList();
      this.GetAuditedObjectList();
      this.GetQuestionCategoryList();
    }
  }
</script>

<style scoped>
  .el-input, .el-select {
    width: 400px;
  }
</style>
