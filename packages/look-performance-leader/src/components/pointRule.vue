<template>
  <div id="pointRule">
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
            <div class="list-title-type">{{ item.title }}</div>
            <div class="list-title-point">{{ item.point }}分</div>
          </div>
          <div class="tab-item-content">
            <div v-for="(rule, ind) in item.rules" :key="ind" :class="`rule-${themeType}`">
              <div class="rule-icon"></div>
              <div class="rule-content">{{ rule }}</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pointRule',
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
  },
  data() {
    return {
      typeIndex: '',
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
  },
}
</script>

<style lang="scss" scoped src="../css/components/pointRule.scss"></style>
