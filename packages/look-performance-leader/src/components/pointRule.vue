<template>
  <div id="pointRule">
    <div
      v-if="curOrg.orgName"
      :class="`point-rule-title point-rule-title-${themeType}`"
      slot="title"
    >
      <div class="title-icon"></div>
      <div class="title-content">{{ curOrg.orgName }}</div>
    </div>
    <div class="org-table-list" v-if="curOrg.orgName">
      <!-- 绩效总得分表格 -->
      <div class="org-point-table">
        <el-table
          class="lookui-table org-point-table"
          :data="orgPointData"
          header-cell-class-name="org-point-header-cell"
          header-row-class-name="org-point-header-row"
          cell-class-name="org-point-common-cell"
        >
          <el-table-column
            prop="totalPoint"
            label="绩效总得分"
            align="center"
            :resizable="false"
            class-name="total-point-cell"
          />
          <el-table-column
            v-for="(item, index) in statSituationList"
            :key="index"
            :label="`${item.name}得分`"
            align="center"
            :resizable="false"
          >
            <template>
              <div @click="openPointDetail(item)">{{ item.point }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 事项总数表格 -->
      <div class="org-task-table">
        <el-table
          class="lookui-table task-count-table"
          :data="taskCountData"
          header-cell-class-name="task-count-header-cell"
          header-row-class-name="task-count-header-row"
          cell-class-name="task-count-common-cell"
        >
          <el-table-column
            prop="totalCount"
            label="事项总数"
            align="center"
            :resizable="false"
            class-name="total-count-cell"
          />
          <el-table-column
            prop="overTimeCount"
            label="逾期扣分次数"
            align="center"
            :resizable="false"
            class-name="overTime-count-cell"
          />
          <el-table-column
            prop="qualityStat"
            label="反馈质量情况"
            align="center"
            :resizable="false"
            class-name="quality-stat-cell"
          >
            <template slot-scope="scope">
              <div class="quality-stat-list">
                <div class="quality-stat-excellent">
                  {{ scope.row.qualityExcellent }}
                </div>
                /
                <div class="quality-stat-well">
                  {{ scope.row.qualityExcellent }}
                </div>
                /
                <div class="quality-stat-noramal">
                  {{ scope.row.qualityExcellent }}
                </div>
                /
                <div class="quality-stat-poor">
                  {{ scope.row.qualityExcellent }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="pushSlowCount"
            label="推进缓慢次数"
            align="center"
            :resizable="false"
          />
          <el-table-column
            prop="usualCount"
            label="日常加减分次数"
            align="center"
            :resizable="false"
          />
        </el-table>
      </div>
    </div>
    <div class="rule-header">
      <div class="icon-left">
        <div :class="`icon-hr icon-hr-${themeType}`"></div>
        <div :class="`icon-square icon-square-${themeType}`"></div>
      </div>
      <div :class="`title-content title-content-${themeType}`">
        绩效考核评分规则
      </div>
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
        <el-tab-pane
          v-for="(item, index) of statSituationList"
          :key="index"
          :name="`${index}`"
        >
          <div slot="label" :class="`list-title list-title-${themeType}`">
            <div :class="`list-title-img list-title-img-${themeType}`">
              <img
                class="normal"
                src="../imgs/icon_point_rule_normal.png"
                alt=""
              />
              <img
                class="unusual"
                v-if="themeType == 'leader'"
                src="../imgs/icon_point_rule_leader.png"
                alt=""
              />
              <img
                class="unusual"
                v-if="themeType == 'unit'"
                src="../imgs/icon_point_rule_unit.png"
                alt=""
              />
            </div>
            <div class="list-title-type">{{ item.name }}</div>
            <div class="list-title-point">{{ item.point }}分</div>
          </div>
          <div class="tab-item-content">
            <div
              v-for="(rule, ind) in item.rules"
              :key="ind"
              :class="`rule-${themeType}`"
            >
              <div class="rule-icon"></div>
              <div class="rule-content">{{ rule }}</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 具体分值记录弹窗 -->
    <el-dialog
      class="point-detail-dialog"
      v-if="pointDetailShow"
      :visible.sync="pointDetailShow"
      width="90%"
      top="10vh"
      center
      append-to-body
    >
      <pointDetail
        :themeType="themeType"
        :statSituationList="statSituationList"
        :curOrg="curOrg"
      />
    </el-dialog>
  </div>
</template>

<script>
import pointDetail from './pointDetail.vue'

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
    statSituationList: {
      type: Array,
      default: () => [],
    },
    curOrg: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      typeIndex: '',
      orgPointData: [
        {
          timelinessPoint: 40, // 反馈时效得分
          qualityPoint: 40, // 反馈质量得分
          pushPoint: 20, // 推进情况得分
          taskCountPoint: 10, // 任务数量得分
          usualPoint: 10, // 日常加减分得分
          totalPoint: 120, // 绩效得分（总分）
        },
      ], // 绩效总得分表格
      taskCountData: [
        {
          totalCount: 10, // 事项总数
          overTimeCount: 0, // 逾期扣分次数
          qualityExcellent: 0, // 反馈质量-优秀情况
          qualityWell: 0, // 反馈质量-优秀情况
          qualityNormal: 0, // 反馈质量-优秀情况
          qualityPoor: 0, // 反馈质量-优秀情况
          pushSlowCount: 0, // 推进缓慢次数
          usualCount: 0, // 日常加减分次数
        },
      ], // 事项总数表格
      pointDetailShow: false,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /*
     * @Description: 组件初始化
     */
    init() {
      this.typeIndex = this.curIndex
    },
    /*
     * @Description: 打开具体得分详情弹窗
     */
    openPointDetail(type) {
      console.log(type)
      if (type.name != '任务数量') {
        this.pointDetailShow = true
      }
    },
  },
}
</script>

<style lang="scss" scoped src="../css/components/pointRule.scss"></style>
<style>
.point-detail-dialog .el-dialog__body{
  padding-top: 0;
}
</style>
