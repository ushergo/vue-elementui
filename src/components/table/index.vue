<template>
  <div class="compTable" :class="className">
    <el-table
      highlight="true"
      :data="tableData"
      border
      :default-sort="{prop: 'date', order: 'descending'}"
      :style="{width: defaWidth}"
      size="mini"
      :row-style="{fontSize: '14px', color: '#333333'}"
      header-row-class-name="header_row_class_name"
      :header-cell-style="{backgroundColor: '#f2f2f2',color: '#333'}"
      :min-width="tableAttr.minWidth || null"
      v-loading="loading">
      <el-table-column
        v-if="tableAttr.noIndex"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column v-if="tableAttr.noSelection" type="selection" width="30"></el-table-column>
      <el-table-column
        v-for="item in tableHeader"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :minWidth="item.minWidth|| ''"
        :sortable="item.sort || false"
        showOverflowTooltip
        :align="item.align || 'left'"
        v-if="item.hidden !== 'hidden'"
      >
        <template slot-scope="scope">
          <Cell
            v-if="item.render"
            :scope="scope"
            :text="scope.row[item.prop]"
            :render="item.render"
          ></Cell>
          <span v-else-if="item.status">
            <el-tag
              v-if="item.status.tag"
              :type="scope.row[item.prop] ? 'success' : 'danger'"
              close-transition>{{renderNum(scope, item)}}</el-tag>
            <span v-else>{{renderNum(scope, item)}}</span>
          </span>
          <span v-else-if="item.statusMul">
            <el-tag
              v-if="item.statusMul.tag"
              :type="item.statusMul.source[scope.row[item.prop]].class || 'info'"
              close-transition>{{statusMul(scope, item)}}</el-tag>
            <span :class="item.statusMul.source[scope.row[item.prop]].class || 'info'" v-else>
              {{statusMul(scope, item)}}
            </span>
          </span>
          <span
            v-else
            :class="item.link ? 'td_active_editor': ''"
          >
            <span class="table_link_label" @click="handTDClick(scope.row, item.link)">
              {{scope.row[item.prop]? scope.row[item.prop]: '-'}}
            </span>
            <span class="fzr" v-if="item.hover">
              {{scope.row.manager ? '负责人' : null}}
            </span>
            <span v-if="item.hover" class="item_hover_cls">
              <!--<span @click="handTDsetClick(scope.row)" v-if="scope.row.manager">-->
              <!--{{item.hover.label[0]}}-->
              <!--</span>-->
              <span @click="handTDsetClick(scope.row)">
                {{!scope.row.manager ? item.hover.label[0] : item.hover.label[1]}}
              </span>
            </span>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableAttr.other || tableAttr.render"
        :fixed="tableAttr.fixed || false"
        label="操作"
        align="center"
        :width="tableAttr.operateColumnWidth || 140">
        <template slot-scope="scope">
          <Cell
            v-if="tableAttr.render"
            :scope="scope"
            :text="scope.row"
            :render="tableAttr.render"
          ></Cell>
          <el-button
            v-else
            v-for="(list, index) in tableAttr.other"
            @click="handleClick(scope.row, list.type, scope.$index)"
            :key="index"
            :style="{color: list.color|| ''}"
            type="text" size="small">{{list.name}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Cell from './expand'

  /**
   * 表格组件
   */
  export default {
    name: 'sc-table',
    components: {
      Cell,
    },
    data() {
      return {}
    },
    props: {
      /**  class名称 */
      className: String,
      /** loading */
      loading: {
        type: Boolean,
        default: false,
      },
      /** 表格配置属性 */
      tableAttr: {
        /** 表格宽度 */
        width: {
          type: [Number, String],
          default: '100%'
        },
        /** 是否带有序号 */
        noIndex: {
          type: Boolean,
          default: false
        },
        /** 其他操作 */
        other: {
          type: Array,
          default: null, // [{name: '查看'}]
        },
        size: {
          type: String,
          default() {
            return 'mini'
          }
        },
        row_style: {
          type: Object,
          default() {
            return {
              fontSize: '14px',
              color: '#333333'
            }
          }
        },
        operateColumnWidth: {
          type: Number
        },
        minWidth: {
          type: Number,
          default: 1000
        }
      },
      /** 表格数据 */
      tableData: {
        type: Array,
        default: function () {
          return [{
            date: '2016-05-02',
            name: '当然感染',
            address: '上海市普陀区金沙江路 1518 弄',
            sex: '男',
          }]
        }
      },
      /** 表头 */
      tableHeader: {
        type: Array,
        default: function () {
          return [
            /** prop:字段名 label：名称    width： 列跨度 sort： 是否排序 */
            {prop: 'date', label: '日期', width: 120, sort: true},
          ]
        }
      },
    },
    computed: {
      defaWidth: function () {
        const {width} = this.tableAttr;
        return isNaN(width) ? width : width + 'px'
      }
    },
    methods: {
      renderNum(scope, item) {
        console.warn('即将禁用该方法，请使用自定义render方法， 参照 mock/ge/personnel.js');
        return scope.row[item.prop] !== null ? scope.row[item.prop] ? item.status.on : item.status.off : '-'
      },
      statusMul(scope, item) {
        console.warn('即将禁用该方法，请使用自定义render方法， 参照 mock/ge/personnel.js');
        return item.statusMul.source[scope.row[item.prop]].label || '-'
      },
      handleClick(row, type, index) {
        this.$emit('tableOtherClick', row, type, index)
      },
      handTDClick(row, type) {
        if (type) this.$emit('handTDClick', row)
      },
      handTDsetClick(row) {
        this.$emit('handTDsetClick', row)
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../assets/styles/var";

  .header_row_class_name {
    font-size: 14px;
    color: $font_title_color;
  }

  .td_active_editor {
    display: inline-block;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    &:hover {
      .table_link_label {
        text-decoration: underline;
        cursor: pointer;
        color: $bg_main_color;
      }
      .item_hover_cls {
        display: inline-block;
      }
    }
  }

  .fzr {
    color: $bg_main_color;
    display: inline-block;
    margin-left: 12px;
  }

  .item_hover_cls {
    color: $bg_main_color;
    display: none;
    cursor: pointer;
    float: right;
  }

  .table_name_indent {
    padding-left: 16px;
  }
</style>
