<template>
  <div>
    <div class="sj-superviseUnit">
      <Search></Search>
    </div>

    <comp-table
      :tableData="tableData"
      :tableHeader="tableHeader"
      :tableAttr="tableAttr"
      :loading="loading"
      @tableOtherClick="tableOtherClick">
    </comp-table>
    <br/>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="pageSizes"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>

    <!--编辑弹窗-->
    <DialogEditForm>
    </DialogEditForm>

  </div>
</template>

<script>

  import CompTable from '../components/table';
  import CompPagination from '../components/pagination';
  import {Msg} from '../tools/message';
  import {mapState, mapMutations, mapActions} from 'vuex';
  import Search from './search'
  import DialogEditForm from './dialogEditForm'


  export default {
    name: 'index',
    data() {
      return {
        pageSizes: [15, 30, 45, 60],
        loading: false,
        dialogVisible: false, // 是否显示提示
        dialogFormVisible: false, // 是否显示新增弹窗
        tableAttr: {
          border: true,
          operateColumnWidth: 150,
          other: [
            // {name: '删除', type: 'del', color: 'red'},
            // {name: '编辑表单项', type: 'editItem'}
            {name: '查看', type: 'show',color:'#000'},
            {name: '编辑', type: 'edit',color:'blue'},
          ],
        },
        tableHeader: [
          {label: 'ID', prop: 'id', width: 80, align: 'center'},
          {label: '项目名称', prop: 'name', width: 150, align: 'center'},
          {label: '监管单位', prop: 'supervisionOrg', width: 200, align: 'center'},
          {label: '监管类别', prop: 'supervisionCategory', width: 150, align: 'center'},
          {label: '被审计对象', prop: 'auditedTarget', width: 150, align: 'center'},
          {label: '被审计单位', prop: 'auditedOrg', width: 150, align: 'center'},
          {label: '审计年度', prop: 'year', width: 100, align: 'center'},
          {label: '问题分类', prop: 'questionCategory', width: 120, align: 'center'},
          {
            label: '项目状态',
            prop: 'status',
            width: 120,
            align: 'center',
            render(row, record) {
              console.log(record.record.row)
              let ele = null
              switch (record.record.row.status) {
                case 0:
                  ele =  <p> 正在审计</p>
                  break;
                case 1:
                  console.log(record.record.row.status)
                  ele =  <span> 正在整改</span>
                  break;
                case 2:
                  ele = <p style = 'color: red;'> 整改超时</p>
                  break;
                case 3:
                  ele = <p> 整改结束</p>
                  break;
                default:
                  ele = <p style = 'color: red;'> 获取失败！</p>
                  break;
              }
              return ele
            }
          },
        ],
        formInfo: {
          data: {},
          type: 'add'
        },
        rules: {
          name: [
            {required: true, message: '请输入监管单位', trigger: 'blur'},
          ]
        },
        formLabelWidth: '120px'
      }
    },
    computed: {
      ...mapState({
        pagination: state => state.AuditProjectList.pagination,
        totalCount: state => state.AuditProjectList.total,
        tableData: state => state.AuditProjectList.data,
        form: state => state.AuditProjectList.form
      })

    },
    mounted() {
      this.loadData();
    },
    methods: {
      ...mapMutations([
        'sj_pagination_setCurrentPage',
        'sj_pagination_setPageSize',
        'setCurrentData',
        'setdataCount',
        'sj_params_setSupervisionOrgId',
        'sj_params_setSupervisionCategoryId',
        'sj_params_setAuditedOrgId',
        'sj_params_setAuditedTargetId',
        'sj_params_setYear',
        'sj_params_setQuestionCategoryId',
        'sj_params_setStatusd',
        'sj_params_setName',
        'sj_params_setSort',
      ]),
      ...mapActions([
        'loadData',
        'loadForm',
        'resetFom'
      ]),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName === 'form') { // 添加监管单位
              this.addSuperviseUnit();
            } else if (formName === 'editForm') { // 编辑问题类别
              this.editSuperviseUnit();
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      tableOtherClick(row, type) {
        switch (type) {
          case 'edit':
            //重置表单
            this.resetFom();
            //获取编辑数据
            this.form.id =row.id;
            //显示弹窗
            this.$store.state.AuditProjectList.dialogEditFormVisible = true
            this.loadForm(this.form);
            break;
          default :
            Msg.error('请重新操作')
        }
      },
      handleSizeChange: function (val) {
        // console.log("分页：" + val)
        this.sj_pagination_setPageSize(val)
        // 获取数据
        this.loadData();
      },
      /** 改变页码 */
      handleCurrentChange: function (val) {
        this.sj_pagination_setCurrentPage(val)
        // 获取数据
        this.loadData();
      },
      handleClose() {
        this.dialogEditFormVisible = false;
        this.$refs['compForm'].resetForm('form');
      },
      closeAndRefresh() {
        this.handleClose();
        this.loadData();
      }
    },
    components: {
      CompTable,//分页表格
      CompPagination,//分页控件
      Search,// 查询控件
      DialogEditForm //编辑弹窗控件
    }
  }
</script>

<style scoped>

</style>
