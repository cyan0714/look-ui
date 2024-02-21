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
                cell-class-name="common-cell"
                :max-height="rankHeight"
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
                  :resizable="false"
                />
                <el-table-column
                  prop="excellentCount"
                  label="反馈质量优秀次数"
                  width="90"
                  align="center"
                  :resizable="false"
                />
                <el-table-column
                  prop="diffcultyH"
                  label="事项难度系数1.1完成数"
                  width="110"
                  align="center"
                  :resizable="false"
                />
                <el-table-column
                  prop="diffcultyL"
                  label="事项难度系数0.9完成数"
                  width="110"
                  align="center"
                  :resizable="false"
                />
              </el-table>
            </div>
          </div>
          <div class="table-pie">
            <div class="group-item-title">
              <div class="title-icon"></div>
              <span>各单位绩效考核分数占比</span>
            </div>
            <div class="group-item-content" ref="pieEchart"></div>
          </div>
        </div>
        <div class="group-item">
          <div class="table-stat">
            <div class="group-item-title">
              <div class="title-icon"></div>
              <span>各单位推进缓慢次数统计</span>
            </div>
            <div class="group-item-content" ref="barEchart"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="rb-list">
        <div class="rb-list-title">绩效考核情况统计</div>
        <div class="rb-list-content">
          <div class="red-list">
            <div class="list-name">红榜</div>
            <div class="list-table" ref="redTable">
              <el-table
                v-if="redTableHeight"
                class="lookui-table red-table"
                :data="redTableData"
                stripe
                border
                header-cell-class-name="red-header-cell"
                header-row-class-name="red-header-row"
                cell-class-name="common-cell"
                :max-height="redTableHeight"
              >
                <el-table-column
                  label="排名"
                  width="60"
                  align="center"
                  :resizable="false"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.rank <= 3">
                      <img
                        class="icon-medal"
                        :src="require(`./imgs/icon_medal${scope.row.rank}.svg`)"
                        alt=""
                      />
                    </span>
                    <span v-else>{{ scope.row.rank }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="orgName"
                  label="单位名称"
                  align="center"
                  :resizable="false"
                />
                <el-table-column
                  prop="point"
                  label="绩效得分"
                  width="100"
                  align="center"
                  :resizable="false"
                />
              </el-table>
            </div>
          </div>
          <div class="black-list">
            <div class="list-name">黑榜</div>
            <div class="list-table" ref="blackTable">
              <el-table
                v-if="blackTableHeight"
                class="lookui-table black-table"
                :data="blackTableData"
                stripe
                border
                header-cell-class-name="black-header-cell"
                header-row-class-name="black-header-row"
                cell-class-name="common-cell"
                :max-height="blackTableHeight"
              >
                <el-table-column
                  label="排名"
                  width="60"
                  align="center"
                  :resizable="false"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.rank <= 3">
                      <img
                        class="icon-medal"
                        :src="require(`./imgs/icon_medal${scope.row.rank}.svg`)"
                        alt=""
                      />
                    </span>
                    <span v-else>{{ scope.row.rank }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="orgName"
                  label="单位名称"
                  align="center"
                  :resizable="false"
                />
                <el-table-column
                  prop="point"
                  label="绩效得分"
                  width="100"
                  align="center"
                  :resizable="false"
                />
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="point-rank-list">
        <div class="point-rank-list-title">绩效考核总分排行榜</div>
        <div class="point-rank-list-more">
          查看更多
          <i class="el-icon-d-arrow-right" />
        </div>
        <div class="point-rank-list-content" ref="pointRankTable">
          <el-table
            v-if="pointRankHeight"
            class="lookui-table point-rank-table"
            :data="pointRankData"
            stripe
            border
            header-cell-class-name="point-rank-header-cell"
            header-row-class-name="point-rank-header-row"
            cell-class-name="common-cell"
            :max-height="pointRankHeight"
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
              :resizable="false"
            />
            <el-table-column
              prop="point"
              label="绩效总分"
              width="110"
              align="center"
              sortable
              sort-by="point"
              :resizable="false"
            />
          </el-table>
        </div>
      </div>
    </div>
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
      pieData: [
        {
          value: 10,
          name: '绩效考核分数120分以上',
        },
        {
          value: 23,
          name: '绩效考核分数100分到120分',
        },
        {
          value: 27,
          name: '绩效考核分数80分到100分',
        },
        {
          value: 30,
          name: '绩效考核分数60分到80分',
        },
        {
          value: 10,
          name: '绩效考核分数60以下',
        },
      ], // 环形图数据数组
      barData: {
        orgName: [
          '市委组织部',
          '市工业和信息化局',
          '市委宣传部',
          '市科学和技术局',
          '市财政局',
          '市民政局',
          '市公安局',
          '市教育局',
          '市委统战部',
          '市委政法委',
          '市信访局',
          '市发展和改革委员会',
        ],
        slowCount: [15, 12, 9, 9, 9, 7, 7, 5, 3, 2, 2, 1],
        overTimeCount: [10, 10, 7, 7, 1, 5, 3, 3, 4, 2, 1, 1],
      }, // 横向柱状图数据数组
      redTableHeight: 0, // 红榜高度
      blackTableHeight: 0, // 黑榜高度
      redTableData: [
        {
          rank: 1,
          orgName: '旅游和文化广电体育局',
          point: 118.5,
        },
        {
          rank: 2,
          orgName: '教育厅',
          point: 117.5,
        },
        {
          rank: 3,
          orgName: '发展和改革委员会',
          point: 100,
        },
      ],
      blackTableData: [
        {
          rank: 1,
          orgName: '旅游和文化广电体育局',
          point: 50,
        },
        {
          rank: 2,
          orgName: '教育厅',
          point: 56.5,
        },
        {
          rank: 3,
          orgName: '发展和改革委员会',
          point: 58,
        },
      ],
      pointRankHeight: 0, // 绩效总分排行榜高度
      pointRankData: [
        {
          rank: 1,
          orgName: '旅游和文化广电体育局',
          point: 120,
        },
        {
          rank: 2,
          orgName: '教育厅',
          point: 110,
        },
        {
          rank: 3,
          orgName: 'aaaa',
          point: 100,
        },
        {
          rank: 4,
          orgName: 'bbbbb',
          point: 90,
        },
        {
          rank: 5,
          orgName: 'cccc',
          point: 80,
        },
        {
          rank: 6,
          orgName: 'ddd',
          point: 70,
        },
        {
          rank: 7,
          orgName: 'eee',
          point: 60,
        },
        {
          rank: 8,
          orgName: 'fff',
          point: 60,
        },
        {
          rank: 9,
          orgName: 'ggg',
          point: 50,
        },
        {
          rank: 10,
          orgName: 'hhh',
          point: 40,
        },
        {
          rank: 11,
          orgName: 'iii',
          point: 30,
        },
      ], // 绩效总分排行榜数据数组
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
      this.initPieEcharts()
      this.initBarEcharts()
      this.getRedTableHeight()
      this.getBlackTableHeight()
      this.getPointRankHeight()
    },
    /*
     * @Description: 计算各单位反馈优秀质量次数排名表格最大高度
     */
    getRankTableHeight() {
      this.rankHeight = this.$refs.rankTable.offsetHeight
    },
    /*
     * @Description: 初始化环形图
     */
    initPieEcharts() {
      let pieEchart = this.$echarts.init(this.$refs.pieEchart)
      pieEchart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: function (parms) {
            var str = `${parms.marker} ${parms.data.name}：${parms.data.value}`
            return str
          },
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: '65%',
          align: 'left',
          top: 'middle',
          height: 250,
        },
        series: [
          {
            left: '-8%',
            type: 'pie',
            center: ['40%', '50%'],
            radius: ['45%', '65%'],
            label: {
              show: true,
              position: 'outside',
              formatter: '{d}%',
            },
            labelLine: {
              show: true,
              showAbove: true,
            },
            data: this.pieData,
          },
        ],
      })
    },
    /*
     * @Description: 初始化横向柱状图
     */
    initBarEcharts() {
      let barEchart = this.$echarts.init(this.$refs.barEchart)
      barEchart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          type: 'plain',
          orient: 'horizontal',
          left: 'center',
          bottom: '2%',
        },
        grid: {
          top: '5%',
          left: '3%',
          right: '10%',
          bottom: '10%',
          containLabel: true,
        },
        dataZoom: [
          {
            show: false,
            type: 'inside',
            yAxisIndex: 0,
            filterMode: 'empty',
            startValue: 0,
            endValue: 12,
            showDetail: false,
            zoomLock: true,
            zoomOnMouseWheel: false,
            moveOnMouseMove: true,
            moveOnMouseWheel: true,
            orient: 'vertical',
          },
          {
            show: this.barData.length > 12,
            type: 'slider',
            yAxisIndex: 0,
            width: 0,
            filterMode: 'empty',
            right: '3%',
            startValue: 0,
            endValue: 12,
            showDetail: false,
            backgroundColor: '#FF9900',
            moveHandleStyle: {
              color: '#CB1C1D',
              borderWidth: 0,
            },
            emphasis: {
              moveHandleStyle: '#ff0023',
            },
            handleSize: 0,
            moveHandleSize: 12,
            zoomLock: true,
            zoomOnMouseWheel: false,
            moveOnMouseMove: true,
            moveOnMouseWheel: true,
            orient: 'vertical',
            throttle: 1,
          },
        ],
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: 'category',
          inverse: true,
          data: this.barData.orgName,
        },
        series: [
          {
            name: '推进缓慢次数',
            type: 'bar',
            itemStyle: {
              color: '#CB1C1D',
            },
            data: this.barData.slowCount,
          },
          {
            name: '逾期次数',
            type: 'bar',
            itemStyle: {
              color: '#FF9900',
            },
            data: this.barData.overTimeCount,
          },
        ],
      })
    },
    /*
     * @Description: 初始化红榜
     */
    getRedTableHeight() {
      this.redTableHeight = this.$refs.redTable.offsetHeight
    },
    /*
     * @Description: 初始化黑榜
     */
    getBlackTableHeight() {
      this.blackTableHeight = this.$refs.blackTable.offsetHeight
    },
    /*
     * @Description: 初始化绩效总分排行榜
     */
    getPointRankHeight() {
      this.pointRankHeight = this.$refs.pointRankTable.offsetHeight
    },
  },
}
</script>

<style lang="scss" scoped src="./css/performanceLeader.scss"></style>
