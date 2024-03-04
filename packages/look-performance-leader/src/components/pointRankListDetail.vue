<template>
  <div id="pointRankListDetail">
    <div class="search-area">
      <div class="common-area">
        <el-input
          placeholder="请输入关键词"
          v-model="searchContent"
          :class="themeClass"
          prefix-icon="el-icon-search">
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
        v-loading="loading"
        :header-cell-class-name="`${themeClass}-header-cell`"
        :header-row-class-name="`${themeClass}-header-row`"
        cell-class-name="common-cell"
        border
        stripe
        style="width: 100%;height: 100%;"
        @sort-change="sortChange"
        @cell-click="pointTableClick">
        <el-table-column type="index" label="排名" width="60" align="center" :resizable="false" />
        <el-table-column
          prop="orgName"
          label="单位名称"
          align="center"
          width="500"
          :resizable="false" />
        <el-table-column
          prop="FKSX"
          label="反馈时效"
          align="center"
          sortable="custom"
          :resizable="false" />
        <el-table-column
          prop="FKZL"
          label="反馈质量"
          align="center"
          sortable="custom"
          :resizable="false" />
        <el-table-column
          prop="TJQK"
          label="推进情况"
          align="center"
          sortable="custom"
          :resizable="false" />
        <el-table-column
          prop="RWSLJFX"
          label="任务数量加分项"
          align="center"
          sortable="custom"
          :resizable="false" />
        <el-table-column
          prop="RCJJFX"
          label="日常加减分项"
          align="center"
          sortable="custom"
          :resizable="false" />
        <el-table-column
          prop="allScore"
          label="绩效得分"
          align="center"
          sortable="custom"
          :resizable="false" />
      </el-table>
      <div class="footer" v-if="tableData.length >= queryParams.pageSize">
        <el-pagination
          :class="`${themeClass}-pagination lookui-pagination`"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background />
      </div>
    </div>

    <!-- 绩效考核评分规则弹窗 -->
    <el-dialog
      class="rank-point-rule-dialog"
      v-if="pointRuleShow"
      :visible.sync="pointRuleShow"
      width="80%"
      :top="curOrg.orgName ? '5vh' : '10vh'"
      center
      append-to-body>
      <pointRule :themeType="themeType" :statSituationList="statSituationList" :curOrg="curOrg" />
    </el-dialog>
  </div>
</template>

<script>
import pointRule from './pointRule.vue';
import { pointDetails } from '../common/staticData';
import { getAllOrgScorePageList } from '../api/main';
import { baseUrl, token } from '@/constant-test';

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
      loading: true,
      total: 0,
      searchContent: '',
      pointRankHeight: 630, // 表格高度
      tableData: [],
      currentPage: 1,
      pointRuleShow: false, // 是否显示绩效考核评分规则弹窗
      curOrg: {}, // 绩效考核总分当前选中单位
      queryParams: {
        pageSize: 10,
        current: 1,
        data: {},
      },
    };
  },
  computed: {
    themeClass() {
      return this.themeType == 'unit' ? 'theme-unit' : 'theme-leader';
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    _getAllOrgScorePageList() {
      getAllOrgScorePageList({ baseUrl, token, params: this.queryParams }).then(res => {
        this.loading = false;
        this.tableData = res.data.data.records;
        this.total = res.data.data.total;
        this.tableData.forEach(item => {
          item.FKSX = item.indexCategoryScoreList.find(
            iten => iten.indexCategory === 'FKSX'
          )?.score;
          item.FKZL = item.indexCategoryScoreList.find(
            iten => iten.indexCategory === 'FKZL'
          )?.score;
          item.TJQK = item.indexCategoryScoreList.find(
            iten => iten.indexCategory === 'TJQK'
          )?.score;
          item.RWSLJFX = item.indexCategoryScoreList.find(
            iten => iten.indexCategory === 'RWSLJFX'
          )?.score;
          item.RCJJFX = item.indexCategoryScoreList.find(
            iten => iten.indexCategory === 'RCJJFX'
          )?.score;
        });
      });
    },
    /*
     * @Description: 组件初始化
     */
    init() {
      console.log('xxxx');
      this._getAllOrgScorePageList();
      this.initPointRankHeight();
    },
    /*
     * @Description: 初始化表格最大高度
     */
    // initPointRankHeight() {
    //   setTimeout(() => {
    //     this.pointRankHeight = this.$refs.pointRankTable.offsetHeight
    //   })
    // },
    handleSizeChange(pageSize) {
      this.queryParams.pageSize = pageSize;
      this.queryParams.current = 1;
      this._getAllOrgScorePageList();
    },
    handleCurrentChange(current) {
      this.queryParams.current = current;
      this._getAllOrgScorePageList();
    },
    /*
     * @Description: 排序条件
     * @param: column 列
     * @param: prop 参数
     * @param: order 正反
     */
    sortChange(column, prop, order) {
      console.log(column, prop, order);
    },
    /*
     * @Description: 打开绩效考核评分规则弹窗
     */
    openPointRule(index) {
      if (index === undefined) {
        index = 0;
      } else {
        this.curOrg = {};
      }
      this.pointRuleIndex = `${index}`;
      this.pointRuleShow = true;
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
        this.curOrg = row;
        this.statSituationList = row.pointDetails;
        setTimeout(() => {
          this.openPointRule();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped src="../css/components/pointRankListDetail.scss"></style>
<style>
.rank-point-rule-dialog .el-dialog__body {
  padding-top: 0;
}
</style>
