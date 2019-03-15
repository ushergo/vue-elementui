import  SjApi from '../api'

export default {
  state: {
    //分页参数
    params:{
      page: 1,
      pageSize: 15,
      supervisionOrgId:'', //监管单位
      supervisionCategoryId:'' ,// 监管类别
      status:'', // 项目状态
      auditedOrgId:'', //被审计对象
      auditedTargetId:'' ,//被审计对象
      questionCategoryId:'', //问题分类
      year:'', // 审计年度
      name:'',// 项目名称
      sort:'',
    },
    pagination: {
      currentPage: 1,
      pageSize: 15
    },
    total: 0,
    data: [],
    //查询参数
    supervision_unit_list:[],//监管单位数据
    supervision_category_list:[],//监管类别数据
    audited_object_list:[],//被审计对象数据
    question_category_list:[],//问题分类数据
    //表单
    form: {
      id:'',
      name: '',
      supervisionOrgId: '',
      supervisionCategoryId: '',
      auditedTargetId: '',
      year: '',
      questionCategoryId: '',
      auditedOrgId: '',
      status: '',
      auditedAt: '',
      content: '',
      projectFiles:[],
      deleteProjectFileIds: '',
      isDeleted:'',
      resultFiles:[],
      deleteResultFileIds:'',
      projectNumber:'',
      files:[],//上传的文件
    },
    dialogEditFormVisible:false// 是否显示编辑弹窗
  },
  /** 计算属性 */
  getters: {
    // dialogEditFormVisible
  },
  /** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation */
  mutations: {
    //设置属性
    sj_pagination_setCurrentPage(state, page) {
      state.pagination.currentPage = page;
    },
    sj_pagination_setPageSize(state, pageSize) {
      state.pagination.pageSize = pageSize;
    },
    setCurrentData(state, data){
       state.data = data;
    },
    setdataCount(state, total){
      state.total = total;
    },
    sj_params_setSupervisionOrgId(state, supervisionOrgId){
      state.params.supervisionOrgId = supervisionOrgId;
    },
    sj_params_setSupervisionCategoryId(state, supervisionCategoryId){//
      state.params.supervisionCategoryId = supervisionCategoryId;
    },
    sj_params_setAuditedOrgId(state, auditedOrgId){//
      state.params.auditedOrgId = auditedOrgId;
    },
    sj_params_setAuditedTargetId(state, auditedTargetId){//
      state.params.auditedTargetId = auditedTargetId;
    },
    sj_params_setYear(state, year){//
      state.params.year = year;
    },
    sj_params_setQuestionCategoryId(state, questionCategoryId){//
      state.params.questionCategoryId = questionCategoryId;
    },
    sj_params_setStatusd(state, status){//
      state.params.status = status;
    },
    sj_params_setName(state, name){//
      state.params.name = name;
    },
    sj_params_setSort(state, sort){//
      state.params.sort = sort;
    },
    //获取下拉菜单-----------
    //获取监管单位数据
    sj_get_supervision_unit_list(state,supervision_unit_list){//
      state.supervision_unit_list = supervision_unit_list;
      console.log(supervision_unit_list)
    },
    //监管类别数据
    sj_get_supervision_category_list(state,supervision_category_list){//
      state.supervision_category_list = supervision_category_list;
    },
    //被审计对象数据
    sj_get_audited_object_list(state,audited_object_list){//
      state.audited_object_list = audited_object_list;
    },
    //问题分类数据
    sj_get_question_category_list(state,question_category_list){//
      state.question_category_list = question_category_list;
    },
    resetFom(state,data){
      state.form.id = '';
      state.form.auditedAt= '';
      state.form.auditedOrgId= '';
      state.form.auditedTargetId= '';
      state.form.content= '';
      state.form.name= '';
      state.form.projectFiles= [];
      state.form.questionCategoryId= '';
      state.form.resultFiles=[];
      state.form.status= '';
      state.form.supervisionCategoryId= '';
      state.form.supervisionOrgId= '';
      state.form.year='';
      state.form.deleteProjectFileIds='';
      state.form.deleteResultFileIds=''
      state.form.files = [];
    },
    loadForm(state,data){
      state.form.id = data.id;
      state.form.auditedAt= data.auditedAt;
      state.form.auditedOrgId= data.auditedOrgId;
      state.form.auditedTargetId= data.auditedTargetId;
      state.form.content= data.content;
      state.form.name= data.name;
      state.form.projectFiles= data.projectFiles;
      state.form.questionCategoryId= data.questionCategoryId;
      state.form.resultFiles= data.resultFiles;
      state.form.status= data.status;
      state.form.supervisionCategoryId= data.supervisionCategoryId;
      state.form.supervisionOrgId= data.supervisionOrgId;
      state.form.year= data.year;
    }
  },
  /*操作方法，在mutations之前执行*/
  actions:{
    // ------------------获取分页数据--------------------
    // 加载表格内容 和 筛选数据
    loadData ({state, commit}) {
      state.params.pageSize=state.pagination.pageSize;
      state.params.page=state.pagination.currentPage;
      SjApi.SJ0201A01(state.params).then(res => {
        commit('setCurrentData', res.data.data)
        commit('setdataCount', res.data.totalCount)
      })
    }
    //获取监管单位数据
    ,GetSupervisionUnitList ({state, commit}) {
      SjApi.SJ0401A01({page:1,pageSize:99999999}).then(res => {
        // console.log(res.data)
        commit('sj_get_supervision_unit_list', res.data.data)
      })
    },
    //监管类别数据
    GetSupervisionCategoryList ({state, commit}) {
      SjApi.SJ0501A01({page: 1, pageSize: 99999999}).then(res => {
        commit('sj_get_supervision_category_list', res.data.data)
      })
    },
    //被审计对象数据
    GetAuditedObjectList ({state, commit}) {
      SjApi.SJ0601A01({page: 1, pageSize: 99999999}).then(res => {
        commit('sj_get_audited_object_list', res.data.data)
      })
    },
    //问题分类数据
    GetQuestionCategoryList ({state, commit}) {
      SjApi.SJ0701A01({page: 1, pageSize: 99999999}).then(res => {
        commit('sj_get_question_category_list', res.data.data)
      })
    },
    // ------------------获取编辑数据--------------------
    resetFom({state, commit}){
      commit('resetFom',null)
    },
    // 加载表格内容 和 筛选数据
    loadForm ({state, commit}) {
      console.log('获取编辑数据===========')
      SjApi.SJ0201A05(state.form).then(res => {
        let data = res.data.data;
        console.log(data)
        commit('loadForm',data)
      })
    },
    // --------------------编辑更新--------------------
    Update({state, commit}){
      console.log('编辑更新数据===========')
      console.log(state.form)
      let par={
        id:state.form.id,
        name:state.form.name,
        auditedAt:state.form.auditedAt,
        auditedOrgId:state.form.auditedOrgId,
        auditedTargetId:state.form.auditedTargetId,
        content:state.form.content,
        projectFiles:state.form.projectFiles,
        questionCategoryId:state.form.questionCategoryId,
        resultFiles:state.form.resultFiles,
        status:state.form.status,
        supervisionCategoryId:state.form.supervisionCategoryId,

        supervisionOrgId: state.form.supervisionOrgId,
        year:state.form.year,
        files:state.form.files
      };
      SjApi.SJ0201A03(par).then(res => {
        let data = res.data.data;
        console.log(data)
        commit('loadForm',data)
      })
    }
  }
}
