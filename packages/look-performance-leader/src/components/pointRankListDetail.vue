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
      <div :class="`${themeClass}-area`">
        <el-button class="input-btn">导入</el-button>
        <el-button class="input-index-btn" @click="enterSoftIndex">录入软指标</el-button>
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
        style="width: 100%; height: 100%"
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
      <pointRule :token="token"
        :baseUrl="baseUrl" :curIndexId="curIndexId" :curIndex="pointRuleIndex" :themeType="themeType" :statSituationList="statSituationList" :curOrg="curOrg" />
    </el-dialog>

    <!-- 录入软指标弹窗 -->
    <el-dialog
      title="录入软指标"
      class="lookui-dialog index-level2-dialog"
      v-if="enteringSoftIndexShow"
      :visible.sync="enteringSoftIndexShow"
      top="5vh"
      width="50%"
      append-to-body>
      <el-form ref="addSoftIndexParams" :model="addSoftIndexParams" label-width="130px">
        <el-form-item label="考核指标" prop="indexId">
          <el-select v-model="addSoftIndexParams.indexId" placeholder="请选择考核指标">
            <el-option
              v-for="item in softIndexList"
              :key="item.id"
              :label="item.name"
              :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="考核内容" prop="content">
          <el-input v-model="addSoftIndexParams.content"></el-input>
        </el-form-item>
        <el-form-item label="考核单位" prop="orgId">
          <el-select v-model="addSoftIndexParams.orgId" placeholder="请选择考核单位">
            <el-option
              v-for="item in orgList"
              :key="item.orgId"
              :label="item.orgName"
              :value="item.orgId" />
          </el-select>
        </el-form-item>
        <el-form-item label="类别属性" prop="type">
          <el-radio-group
            v-model="addSoftIndexParams.scoreType"
            class="index-level2-radio-group-type">
            <el-radio class="lookui-radio" :label="1">加分</el-radio>
            <el-radio class="lookui-radio" :label="2">减分</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="得分时间" prop="scoreTime">
          <el-date-picker
            v-model="addSoftIndexParams.scoreTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择得分时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="加减分数" prop="scoreChange">
          <i class="el-icon-plus" v-if="addSoftIndexParams.scoreType == 1"></i>
          <i class="el-icon-minus" v-else></i>
          <el-input-number
            class="score-input"
            v-model="addSoftIndexParams.scoreChange"
            controls-position="right"
            :min="1"
            :max="100"></el-input-number
          >分
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfirmAdd">提交</el-button>
        <el-button @click="handleCancelAdd">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pointRule from './pointRule.vue';
import { addSoftIndex, getAllOrgScorePageList, getIndexList, getOrgList } from '../api/main';
import { successCode } from '../../../look-performance-cms/src/constant';

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
    token: {
      type: String,
      default: '',
    },
    baseUrl: {
      type: String,
      default: '',
    },
  },
  components: {
    pointRule,
  },
  data() {
    return {
      pointRuleIndex: 0,
      orgList: [],
      softIndexList: [],
      enteringSoftIndexShow: false,
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
      addSoftIndexParams: {
        orgId: '',
        scoreType: 1, // 1: 加分 2: 减分
        scoreChange: 5, // 加减分值
        indexId: '', // 考核指标id
        content: '', // 考核内容
        scoreTime: '', // 得分时间
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
    // 确认录入软指标
    handleConfirmAdd() {
      this.$refs.addSoftIndexParams.validate(valid => {
        if (valid) {
          addSoftIndex({ baseUrl: this.baseUrl, token: this.token, data: this.addSoftIndexParams }).then(res => {
            if (res.data.code == successCode) {
              this.$message.success('录入成功');
              this.enteringSoftIndexShow = false;
              this._getAllOrgScorePageList();
            }
          });
        }
      });
    },
    // 点击录入软指标按钮
    enterSoftIndex() {
      this.enteringSoftIndexShow = true;
      const data = {
        current: 1,
        pageSize: -1,
        app: {
          type: 2, // 1: 硬指标 2: 软指标
        },
      };
      getIndexList({ baseUrl: this.baseUrl, token: this.token, data }).then(res => {
        this.softIndexList = res.data.data.records;
      });
      getOrgList({ baseUrl: this.baseUrl, token: this.token }).then(res => {
        this.orgList = res.data.data;
      });
    },

    _getAllOrgScorePageList() {
      getAllOrgScorePageList({ baseUrl: this.baseUrl, token: this.token, params: this.queryParams }).then(res => {
        this.loading = false;
        this.tableData = res.data.data.records;
        this.total = res.data.data.total;
        this.tableData.forEach(item => {
          // 反馈时效
          item.FKSX = item.indexCategoryScoreList.find(
            iten => iten.indexCategory === 'FKSX'
          )?.score;
          // 反馈质量
          item.FKZL = item.indexCategoryScoreList.find(
            iten => iten.indexCategory === 'FKZL'
          )?.score;
          // 推进情况
          item.TJQK = item.indexCategoryScoreList.find(
            iten => iten.indexCategory === 'TJQK'
          )?.score;
          // 任务数量加分项
          item.RWSLJFX = item.indexCategoryScoreList.find(
            iten => iten.indexCategory === 'RWSLJFX'
          )?.score;
          // 日常加减分项
          item.RCJJFX = item.indexCategoryScoreList.find(
            iten => iten.indexCategory === 'RCJJFX'
          )?.score;
        });
      });
    },
    init() {
      this._getAllOrgScorePageList();
    },
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
    openPointRule(item, index) {
      if (index === undefined) {
        index = 0;
      } else {
        this.curOrg = {};
      }
      this.pointRuleIndex = `${index}`;
      this.curIndexId = item.indexId;
      this.pointRuleShow = true;
    },
    pointTableClick(row, column, cell, event) {
      if (column?.property == 'orgName') {
        // 点击单位时   才能进一步触发事件
        this.curOrg = row;
        setTimeout(() => {
          this.openPointRule(this.statSituationList[0]);
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
