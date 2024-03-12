<template>
  <div id="pointRule">
    <div v-if="curOrg.orgName" :class="`point-rule-title point-rule-title-${themeType}`">
      <div class="title-icon"></div>
      <div class="title-content">{{ curOrg.orgName }}</div>
    </div>
    <div class="org-table-list" v-if="curOrg.orgName">
      <!-- 绩效总得分表格 -->
      <div class="org-point-table">
        <el-table
          class="lookui-table org-point-table"
          v-loading="loadingPoint"
          :data="orgPointData"
          header-cell-class-name="org-point-header-cell"
          header-row-class-name="org-point-header-row"
          cell-class-name="org-point-common-cell">
          <el-table-column
            prop="allScore"
            label="绩效总得分"
            align="center"
            :resizable="false"
            class-name="total-point-cell" />
          <el-table-column
            v-for="(item, index) in statSituationList"
            :key="index"
            :label="`${item.indexName}`"
            :prop="`${item.indexName}`"
            align="center"
            :resizable="false">
            <template>
              <div @click="openPointDetail(item)" style="cursor: pointer;">{{ item.score }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 事项总数表格 -->
      <div class="org-task-table">
        <el-table
          class="lookui-table task-count-table"
          v-loading="loadingCount"
          :data="taskCountData"
          header-cell-class-name="task-count-header-cell"
          header-row-class-name="task-count-header-row"
          cell-class-name="task-count-common-cell">
          <el-table-column
            prop="allItemCount"
            label="事项总数"
            align="center"
            :resizable="false"
            class-name="total-count-cell" />
          <el-table-column
            v-for="(item, index) in statSituationList2"
            :key="index"
            :label="`${item.indexName}`"
            :prop="`${item.indexName}`"
            align="center"
            :resizable="false">
            <template>
              <div>{{ item?.count.join('/') }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="rule-header">
      <div class="icon-left">
        <div :class="`icon-hr icon-hr-${themeType}`"></div>
        <div :class="`icon-square icon-square-${themeType}`"></div>
      </div>
      <div :class="`title-content title-content-${themeType}`">绩效考核评分规则</div>
      <div class="icon-right">
        <div :class="`icon-square icon-square-${themeType}`"></div>
        <div :class="`icon-hr icon-hr-${themeType}`"></div>
      </div>
    </div>
    <div class="rule-description">
      根据评分规则，按月、季、年阶段实时统计得分情况，仅统计督查事项超过5个的单位，避免极端分数出现。备注∶总得分=按时反馈得分+反馈质量得分+推进情况得分+任务数量加分项+日常加减分项。
    </div>
    <div class="rule-list" v-if="statSituationList.length">
      <el-tabs v-model="typeIndex" :class="`el-tabs-${themeType}`">
        <el-tab-pane v-for="(item, index) of statSituationList" :key="index" :name="`${index}`">
          <div
            slot="label"
            @click="handleTabClick(item)"
            :class="`list-title list-title-${themeType}`">
            <div :class="`list-title-img list-title-img-${themeType}`">
              <img class="normal" src="../imgs/icon_point_rule_normal.png" alt="" />
              <img
                class="unusual"
                v-if="themeType == 'leader'"
                src="../imgs/icon_point_rule_leader.png"
                alt="" />
              <img
                class="unusual"
                v-if="themeType == 'unit'"
                src="../imgs/icon_point_rule_unit.png"
                alt="" />
            </div>
            <div class="list-title-type">{{ item.indexName }}</div>
            <div class="list-title-point">{{ item.indexOriginalScore }}分</div>
          </div>
          <div class="tab-item-content">
            <div v-if="!loadingRule" :class="`rule-${themeType}`">
              <div class="rule-icon"></div>
              <div class="rule-content">{{ scoringRules }}</div>
            </div>
            <div v-else v-loading="loadingRule"></div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 具体分值记录弹窗 -->
    <el-dialog
      class="lookui-dialog point-detail-dialog"
      v-if="pointDetailShow"
      :visible.sync="pointDetailShow"
      :title="curOrg.orgName"
      width="70%"
      top="10vh"
      append-to-body>
      <pointDetail :themeType="themeType" :statSituationList="statSituationList" :token="token" :baseUrl="baseUrl" :currentIndexItem="currentIndexItem" :curOrg="curOrg" />
    </el-dialog>
  </div>
</template>

<script>
import pointDetail from './pointDetail.vue';
import { getIndexDetail, getOrgScoreDetail } from '../api/main';
export default {
  name: 'pointRule',
  components: {
    pointDetail,
  },
  props: {
    themeType: {
      type: String,
      default: 'unit',
    },
    curIndex: {
      type: String,
      default: '0',
    },
    curIndexId: {
      type: String,
      default: '',
    },
    statSituationList: {
      type: Array,
      default: () => [],
    },
    curOrg: {
      type: Object,
      default: () => {},
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
  data() {
    return {
      currentIndexItem: {},
      loadingPoint: true,
      loadingCount: true,
      statSituationList2: [
        {
          indexName: '一',
          count: ['-']
        },
        {
          indexName: '二',
          count: ['-']
        },
        {
          indexName: '三',
          count: ['-']
        },
        {
          indexName: '四',
          count: ['-']
        },
      ],
      loadingRule: true,
      typeIndex: '',
      scoringRules: '',
      orgPointData: [
        {
          allScore: 120, // 绩效得分（总分）
        },
      ], // 绩效总得分表格
      taskCountData: [
        {
          allItemCount: 10, // 事项总数
        },
      ], // 事项总数表格
      pointDetailShow: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    handleTabClick(tab) {
      this.loadingRule = true;
      this._getIndexDetail(tab.indexId);
    },
    _getIndexDetail(id) {
      getIndexDetail({ baseUrl: this.baseUrl, token: this.token, id }).then(res => {
        this.scoringRules = res.data.data.scoringRules;
        this.loadingRule = false;
      });
    },
    _getOrgScoreDetail() {
      getOrgScoreDetail({ baseUrl: this.baseUrl, token: this.token, orgId: this.curOrg.orgId }).then(res => {
        const result = res.data.data;

        // 绩效得分详情
        this.statSituationList.forEach((item, index) => {
          result.indexCategoryScoreList.forEach(iten => {
            if (item.indexName === iten.indexName) {
              let tempItem = JSON.parse(JSON.stringify(item));
              tempItem.score = iten.score;
              this.$set(this.statSituationList, index, tempItem);
            }
          });
        });
        this.orgPointData[0].allScore = result.allScore;
        this.loadingPoint = false;

        // 事项数量详情
        this.statSituationList2 = result.performanceCountVOList;
        this.taskCountData[0].allItemCount = result.allItemCount;
        this.loadingCount = false;
      });
    },
    init() {
      this.loadingRule = true;
      this.typeIndex = this.curIndex;
      this._getIndexDetail(this.curIndexId);
      if (Object.keys(this.curOrg).length > 0) {
        this._getOrgScoreDetail();
      }
    },
    openPointDetail(item) {
      if (item.indexCategory === "RWSLJFX") {
        return
      }
      this.currentIndexItem = item;
      this.pointDetailShow = true;
    },
  },
};
</script>

<style lang="scss" scoped src="../css/components/pointRule.scss"></style>
<style>
.point-detail-dialog .el-dialog__body {
  padding-top: 0;
}
</style>
