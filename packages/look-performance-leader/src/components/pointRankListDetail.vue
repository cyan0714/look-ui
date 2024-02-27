<template>
  <div id="pointRankListDetail">
    <div class="search-area">
      <div class="common-area">
        <el-input
          placeholder="请输入关键词"
          v-model="searchContent"
          :class="themeClass"
          prefix-icon="el-icon-search"
        >
          <el-button slot="append" type="primary">搜索</el-button>
        </el-input>
      </div>
      <div class="unit-area" v-if="themeType == 'unit'">
        <el-button class="input-btn">导入</el-button>
        <el-button class="input-index-btn">录入软指标</el-button>
      </div>
    </div>
    <div class="main-content" ref="pointRankTable">
      <el-table
        v-if="pointRankHeight"
        class="lookui-table point-rank-table"
        :data="tableData"
        :height="pointRankHeight"
        :max-height="pointRankHeight"
        :header-cell-class-name="`${themeClass}-header-cell`"
        :header-row-class-name="`${themeClass}-header-row`"
        cell-class-name="common-cell"
        border
        stripe
        style="width: 100%"
        @sort-change="sortChange"
        @cell-click="pointTableClick"
      >
        <el-table-column
          prop="rank"
          label="排名"
          width="60"
          align="center"
          :resizable="false"
        />
        <el-table-column
          prop="orgName"
          label="单位名称"
          align="center"
          width="500"
          :resizable="false"
        />
        <el-table-column
          v-for="(item, index) in tableData[0].pointDetails"
          :key="index"
          :label="`${item.name}得分`"
          align="center"
          :resizable="false"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.pointDetails[index].point }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalPoint"
          label="绩效得分"
          align="center"
          sortable="custom"
          :resizable="false"
        />
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        :class="`${themeClass}-pagination`"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        background
      />
    </div>

    <!-- 绩效考核评分规则弹窗 -->
    <el-dialog
      class="rank-point-rule-dialog"
      v-if="pointRuleShow"
      :visible.sync="pointRuleShow"
      width="80%"
      :top="curOrg.orgName ? '5vh' : '10vh'"
      center
      append-to-body
    >
      <pointRule
        :themeType="themeType"
        :statSituationList="statSituationList"
        :curOrg="curOrg"
      />
    </el-dialog>
  </div>
</template>

<script>
import pointRule from './pointRule.vue'
import { pointDetails } from '../common/staticData'

export default {
  name: 'pointRankListDetail',
  props: {
    themeType: {
      type: String,
      default: 'unit',
    },
    statSituationList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    pointRule,
  },
  data() {
    return {
      searchContent: '',
      pointRankHeight: 0, // 表格高度
      tableData: [
        {
          rank: 1,
          orgName: '旅游和文化广电体育局',
          totalPoint: 120, // 绩效得分（总分）
          pointDetails,
        },
        {
          rank: 2,
          orgName: '教育厅',
          pointDetails,
          totalPoint: 100, // 绩效得分（总分）
        },
        {
          rank: 3,
          orgName: 'aaaa',
          pointDetails,
          totalPoint: 90, // 绩效得分（总分）
        },
        {
          rank: 4,
          orgName: 'bbbbb',
          pointDetails,
          totalPoint: 80, // 绩效得分（总分）
        },
        {
          rank: 5,
          orgName: 'cccc',
          pointDetails,
          totalPoint: 70, // 绩效得分（总分）
        },
        {
          rank: 6,
          orgName: 'ddd',
          pointDetails,
          totalPoint: 60, // 绩效得分（总分）
        },
        {
          rank: 7,
          orgName: 'eee',
          pointDetails,
          totalPoint: 50, // 绩效得分（总分）
        },
        {
          rank: 8,
          orgName: 'fff',
          pointDetails,
          totalPoint: 50, // 绩效得分（总分）
        },
        {
          rank: 9,
          orgName: 'ggg',
          pointDetails,
          totalPoint: 40, // 绩效得分（总分）
        },
        {
          rank: 10,
          orgName: 'hhh',
          pointDetails,
          totalPoint: 30, // 绩效得分（总分）
        },
      ],
      currentPage: 1,
      pointRuleShow: false, // 是否显示绩效考核评分规则弹窗
      curOrg: {}, // 绩效考核总分当前选中单位
    }
  },
  computed: {
    themeClass() {
      return this.themeType == 'unit' ? 'theme-unit' : 'theme-leader'
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    /*
     * @Description: 组件初始化
     */
    init() {
      this.initPointRankHeight()
    },
    /*
     * @Description: 初始化表格最大高度
     */
    initPointRankHeight() {
      setTimeout(() => {
        this.pointRankHeight = this.$refs.pointRankTable.offsetHeight
      })
    },
    /*
     * @Description: 当修改每页数量时触发事件
     * @param: val 每页数量
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    /*
     * @Description: 当页数变动时触发事件
     * @param: val 当前页
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    /*
     * @Description: 排序条件
     * @param: column 列
     * @param: prop 参数
     * @param: order 正反
     */
    sortChange(column, prop, order) {
      console.log(column, prop, order)
    },
    /*
     * @Description: 打开绩效考核评分规则弹窗
     */
    openPointRule(index) {
      if (index === undefined) {
        index = 0
      } else {
        this.curOrg = {}
      }
      this.pointRuleIndex = `${index}`
      this.pointRuleShow = true
    },
    /*
     * @Description: 单元格点击方法
     * @param: row 行数据
     * @param: column 列对象
     * @param: cell 单元格document对象
     * @param: event 事件对象
     */
    pointTableClick(row, column, cell, event) {
      if (column?.property == 'orgName') {
        // 点击单位时   才能进一步触发事件
        this.curOrg = row
        this.statSituationList = row.pointDetails
        setTimeout(() => {
          this.openPointRule()
        })
      }
    },
  },
}
</script>

<style
  lang="scss"
  scoped
  src="../css/components/pointRankListDetail.scss"
></style>
<style>
.rank-point-rule-dialog .el-dialog__body{
  padding-top: 0;
}
</style>
