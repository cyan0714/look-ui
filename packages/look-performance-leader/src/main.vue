<template>
  <div id="performanceLeader">
    <div class="stat">
      <div class="stat-title">绩效考核情况统计</div>
      <div class="stat-situation">
        <el-select
          class="lookui-select stat-select"
          v-model="statSelect"
          placeholder="请选择"
          popper-class="lookui-select-dropdown"
        >
          <el-option
            v-for="item in statOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div class="stat-details">
          <div
            class="stat-details-item"
            v-for="(item, index) in statSituationList"
            :key="index"
          >
            <div class="details-item-img">
              <img src="./imgs/icon_stat_situation.png" alt="" />
            </div>
            <div class="details-item-title">{{ item.title }}</div>
            <div class="details-item-point">{{ item.point }}分</div>
          </div>
        </div>
      </div>
      <div class="stat-table-group">
        <div class="group-item">
          <div class="table-rank">
            <div class="group-item-title">
              <div class="title-icon"></div>
              <span>各单位反馈优秀质量次数排名</span>
            </div>
            <div class="group-item-content" ref="rankTable">
              <el-table
                v-if="rankHeight"
                class="lookui-table rank-table"
                :data="rankData"
                stripe
                border
                header-cell-class-name="rank-header-cell"
                header-row-class-name="rank-header-row"
                :max-height="rankHeight"
              >
                <el-table-column
                  prop="rank"
                  label="排名"
                  width="60"
                  align="center"
                />
                <el-table-column
                  prop="orgName"
                  label="单位名称"
                  align="center"
                />
                <el-table-column
                  prop="excellentCount"
                  label="反馈质量优秀次数"
                  width="90"
                  align="center"
                />
                <el-table-column
                  prop="diffcultyH"
                  label="事项难度系数1.1完成数"
                  width="110"
                  align="center"
                />
                <el-table-column
                  prop="diffcultyL"
                  label="事项难度系数0.9完成数"
                  width="110"
                  align="center"
                />
              </el-table>
            </div>
          </div>
          <div class="table-echarts">
            <div class="group-item-title">
              <div class="title-icon"></div>
              <span>各单位绩效考核分数占比</span>
            </div>
            <div class="group-item-content">
              
            </div>
          </div>
        </div>
        <div class="group-item">
          <div class="table-stat"></div>
        </div>
      </div>
    </div>
    <div class="list"></div>
  </div>
</template>

<script>
export default {
  name: 'look-performance-leader',
  data() {
    return {
      statSelect: 1, // 下拉框选值
      statOptions: [
        {
          value: 1,
          label: '按月统计',
        },
        {
          value: 2,
          label: '按季统计',
        },
        {
          value: 3,
          label: '按年统计',
        },
      ],
      statSituationList: [
        { title: '反馈时效', point: 30 },
        { title: '反馈质量', point: 40 },
        { title: '推进情况', point: 30 },
        { title: '任务数量加分项', point: 25 },
        { title: '日常加减分项', point: 15 },
      ],
      rankData: [
        {
          rank: 1,
          orgName: '旅游和文化广电体育局',
          excellentCount: 10,
          diffcultyH: 8,
          diffcultyL: 2,
        },
        {
          rank: 2,
          orgName: '教育厅',
          excellentCount: 9,
          diffcultyH: 6,
          diffcultyL: 3,
        },
        {
          rank: 3,
          orgName: 'aaaa',
          excellentCount: 8,
          diffcultyH: 6,
          diffcultyL: 2,
        },
        {
          rank: 4,
          orgName: 'bbbbb',
          excellentCount: 6,
          diffcultyH: 4,
          diffcultyL: 2,
        },
      ],
      rankHeight: 0, // 各单位反馈优秀质量次数排名表格最大高度
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /*
     * @Description: 初始化方法
     */
    init() {
      this.getRankTableHeight()
    },
    /*
     * @Description: 计算各单位反馈优秀质量次数排名表格最大高度
     */
    getRankTableHeight() {
      this.rankHeight = this.$refs.rankTable.offsetHeight;
    },
  },
}
</script>

<style lang="scss" scoped src="./css/performanceLeader.scss"></style>
