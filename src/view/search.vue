<template>
    <div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="活动区域">
          <el-select v-model="params.supervisionOrgId" placeholder="请选择监管单位" clearable>
            <el-option label="" v-for="item in supervision_unit_list" :label="item.name"  :value="item.id" :key="item.id">{{item.name}}</el-option>
          </el-select>
          <el-select v-model="params.supervisionCategoryId" placeholder="请选择监管类别" clearable>
            <el-option label="" v-for="item in supervision_category_list" :label="item.name"  :value="item.id" :key="item.id">{{item.name}}</el-option>
          </el-select>
          <el-select v-model="params.auditedTargetId" placeholder="请选择被审计对象" clearable>
            <el-option label="" v-for="item in audited_object_list" :label="item.name"  :value="item.id"  :key="item.id">{{item.name}}</el-option>
          </el-select>
          <el-select v-model="params.questionCategoryId" placeholder="请选择问题分类" clearable>
            <el-option label="" v-for="item in question_category_list" :label="item.name"  :value="item.id" :key="item.id">{{item.name}}</el-option>
          </el-select>
          <el-select v-model="params.status" placeholder="项目状态" clearable>
            <el-option label="" v-for="item in statuses" :label="item.label"  :value="item.value" :key="item.value"></el-option>
          </el-select>
          <el-input v-model="params.name" style="width:180px;" placeholder="请输入项目名称"></el-input>
          <button  type="button" class="el-button el-button--primary el-button--medium"
                   @click="loadData">
            <span>查询</span>
          </button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>

    import  {mapState,mapActions} from 'vuex';
    export default {
      name: "search",
      data(){
        return {
          loading:false,
          statuses: [
            {value: null, label: '全部'},
            {value: 0, label: '正在审计'},
            {value: 1, label: '正在整改'},
            {value: 2, label: '整改超时'},
            {value: 3, label: '整改结束'}
          ],
        }
      },
      computed: {
        ...mapState({
          supervision_unit_list: state => state.AuditProjectList.supervision_unit_list,
          supervision_category_list: state => state.AuditProjectList.supervision_category_list,
          audited_object_list: state => state.AuditProjectList.audited_object_list,
          question_category_list: state => state.AuditProjectList.question_category_list,
          // 参数列表
          params: state => state.AuditProjectList.params,
          // supervisionOrgId:state => state.AuditProjectList.params.supervisionOrgId,
          // supervisionCategoryId: state => state.AuditProjectList.params.supervisionCategoryId,
          // status: state => state.AuditProjectList.params.status,// 项目状态
          // auditedOrgId: state => state.AuditProjectList.params.auditedOrgId,
          // auditedTargetId: state => state.AuditProjectList.params.auditedTargetId,//被审计对象
          // questionCategoryId: state => state.AuditProjectList.params.questionCategoryId,//问题分类
          // year: state => state.AuditProjectList.params.year,// 审计年度
          // name: state => state.AuditProjectList.params.name,// 项目名称
          // sort: state => state.AuditProjectList.params.sort,
        })
      }, methods: {
        ...mapActions([
          'GetSupervisionUnitList',
          'GetSupervisionCategoryList',
          'GetAuditedObjectList',
          'GetQuestionCategoryList',
          'loadData'
        ])
      }, mounted() {
        this.GetSupervisionUnitList();
        this.GetSupervisionCategoryList();
        this.GetAuditedObjectList();
        this.GetQuestionCategoryList();
      }

    }
</script>

<style scoped>

</style>
