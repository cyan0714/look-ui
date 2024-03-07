<template>
  <div id="performanceUnit" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="stat">
      <div class="stat-title">绩效考核情况统计</div>
      <div class="stat-situation">
        <el-select
          class="lookui-select stat-select"
          v-model="statSelect"
          placeholder="请选择"
          popper-class="stat-select-dropdown"
          @change="statChange">
          <el-option
            v-for="item in statOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="stat-details">
          <div class="stat-details-item" v-for="(item, index) in curStatSituation" :key="index">
            <div class="details-item-img" @click="openPointRule(item, index)">
              <img src="./imgs/icon_stat_situation_unit.png" alt="" />
            </div>
            <div class="details-item-title" @click="openPointRule(item, index)">
              {{ item.indexName }}
            </div>
            <div class="details-item-point" @click="openPointRule(item, index)">
              {{ item.indexOriginalScore }}分
            </div>
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
                :max-height="rankHeight">
                <el-table-column
                  type="index"
                  label="排名"
                  width="60"
                  align="center"
                  :resizable="false" />
                <el-table-column
                  prop="orgName"
                  label="单位名称"
                  align="center"
                  :resizable="false" />
                <el-table-column
                  prop="excellentQuantity"
                  label="反馈质量优秀次数"
                  width="90"
                  align="center"
                  :resizable="false" />
                <el-table-column
                  prop="finish11"
                  label="事项难度系数1.1完成数"
                  width="110"
                  align="center"
                  :resizable="false" />
                <el-table-column
                  prop="finish09"
                  label="事项难度系数0.9完成数"
                  width="110"
                  align="center"
                  :resizable="false" />
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
      <div class="point-rank-list">
        <div class="point-rank-list-title">绩效考核总分排行榜</div>
        <div class="point-rank-list-more" @click="openPointRankPop">
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
            height="850px"
            @cell-click="pointTableClick">
            <el-table-column type="index" label="排名" align="center" width="50" />
            <el-table-column prop="orgName" label="单位名称" align="center" :resizable="false" />
            <el-table-column
              prop="allScore"
              label="绩效总分"
              width="110"
              align="center"
              sortable
              sort-by="allScore"
              :resizable="false" />
          </el-table>
        </div>
      </div>
    </div>

    <!-- 绩效总分排行榜弹窗 -->
    <el-dialog
      :class="['lookui-dialog', 'point-rank-dialog', `point-rank-${themeType}`]"
      title="绩效考核总分排行榜"
      v-if="pointRankListShow"
      :visible.sync="pointRankListShow"
      top="5vh"
      width="90%"
      :before-close="closePointRankPop">
      <pointRankListDetail :themeType="themeType" :statSituationList="statSituationList" />
    </el-dialog>

    <!-- 绩效考核评分规则弹窗 -->
    <el-dialog
      class="point-rule-dialog"
      v-if="pointRuleShow"
      :visible.sync="pointRuleShow"
      width="80%"
      :top="curOrg.orgName ? '5vh' : '10vh'"
      center>
      <pointRule
        :themeType="themeType"
        :curIndex="pointRuleIndex"
        :curIndexId="curIndexId"
        :statSituationList="statSituationList"
        :curOrg="curOrg" />
    </el-dialog>
  </div>
</template>

<script>
import { baseUrl, token } from '@/constant-test';
import pointRankListDetail from '../../look-performance-leader/src/components/pointRankListDetail.vue';
import pointRule from '../../look-performance-leader/src/components/pointRule.vue';
import { pointDetails } from '../../look-performance-leader/src/common/staticData';
import {
  getSchemeIndexList,
  getIndexDetail,
  getOrgOverTimeReportList,
  getAllOrgScoreList,
  getScoreRatio,
  getOrgQualityPageList,
} from '../../look-performance-leader/src/api/main';

export default {
  name: 'look-performance-unit',
  components: {
    pointRankListDetail,
    pointRule,
  },
  data() {
    return {
      loading: true,
      themeType: 'unit', // 页面类型
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
      curStatSituation: [
        {
          name: '反馈时效',
          point: 30,
          rules: [
            '每逾期一次(-0.5分)',
            '逾期4个工作白(自动判定该事项为推进缓慢，取消逾期次数的扣分，只扣推进缓慢的分。)',
            '为每个事项进行判断，从30分里扣除，扣完为止。',
          ],
        },
        {
          name: '反馈质量',
          point: 40,
          rules: [
            '优秀(+1分)、好(不加分)、一般(-0.5分)、差(-2分)',
            '为每个事项进行判断，从40分里扣除，扣完为止。',
          ],
        },
        {
          name: '推进情况',
          point: 30,
          rules: [
            '难度系数1.1事项推进缓慢(-2分)',
            '难度系数0.9事项推进缓慢(-1分)',
            '一个事项不管多少个阶段，都只扣一次',
          ],
        },
        {
          name: '任务数量加分项',
          point: 25,
          rules: [
            '完成难度系数1.1事项加分:事项数量≥10件(+0.3分/件)、事项数量≥20件(+0.4分/1件)、事项数量≥30件(+0.5分/1件)',
            '完成难度系数0.9事项加分:事项数量≥10件(+0.15分/1件)、事项数量≥20件(+0.2分/1件)、事项数量≥30件(+0.3分/1件)',
            '年度总加分不超过25分',
          ],
        },
        {
          name: '日常加减分项',
          point: 15,
          rules: [
            '经与承办单位四级责任人进行实查面谈、研究确认后给予专项扣分',
            '实施督查问责预警，对经过“三察"后一段时间仍无明显进展的事项，启动督查问责预警并给予专项扣分',
            '亮牌加减分，通过“红黄绿”晾晒通报机制',
            '每个承办单位年度专项扣分不超过15分',
          ],
        }, // 绩效考核情况统计得分
      ],
      statSituationList: [],
      pointRuleIndex: 0, // 绩效考核评分规则弹窗默认下标
      rankData: [],
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
      barData: [], // 横向柱状图数据数组
      pointRankHeight: 0, // 绩效总分排行榜高度
      pointRankData: [], // 绩效总分排行榜数据数组
      pointRankListShow: false, // 是否展示绩效总分排行榜榜单弹窗
      pointRuleShow: false, // 是否显示绩效考核评分规则弹窗
      curOrg: {}, // 绩效考核总分当前选中单位
      curIndexId: '',
      params: {
        pageSize: 4,
        current: 1,
        data: {},
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async _getOrgQualityPageList() {
      try {
        const res = await getOrgQualityPageList({
          baseUrl,
          token,
          params: this.params,
        });
        this.rankData = res.data.data.records;
      } catch (error) {
        console.error(error);
      }
    },
    async _getScoreRatio() {
      try {
        const res = await getScoreRatio({ baseUrl, token, params: {} });
        res.data.data.forEach((item, index) => {
          this.pieData[index].value = item.ratio;
        });
        this.initPieEcharts();
      } catch (error) {
        console.error(error);
      }
    },
    // 获取各单位绩效总分排行榜数据
    async _getAllOrgScoreList() {
      try {
        const res = await getAllOrgScoreList({
          baseUrl,
          token,
          params: {},
        });
        this.pointRankData = res.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    // 各单位推进缓慢次数统计
    async _getOrgOverTimeReportList() {
      try {
        const res = await getOrgOverTimeReportList({
          baseUrl,
          token,
          params: {},
        });
        this.barData = res.data.data;
        this.initBarEcharts();
      } catch (error) {
        console.error(error);
      }
    },
    // 获取当前用户指标
    async _getSchemeIndexList() {
      try {
        const res = await getSchemeIndexList({ baseUrl, token });
        this.curStatSituation = res.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    async init() {
      await this._getSchemeIndexList();
      await this._getOrgOverTimeReportList();
      await this._getAllOrgScoreList();
      await this._getScoreRatio();
      await this._getOrgQualityPageList();
      this.loading = false;
      this.getRankTableHeight();
      this.getPointRankHeight();
    },
    /*
     * @Description: 计算各单位反馈优秀质量次数排名表格最大高度
     */
    getRankTableHeight() {
      this.rankHeight = this.$refs.rankTable.offsetHeight;
    },
    initPieEcharts() {
      let pieEchart = this.$echarts.init(this.$refs.pieEchart);
      pieEchart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: function (parms) {
            var str = `${parms.marker} ${parms.data.name}：${parms.data.value}`;
            return str;
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
      });
    },
    /*
     * @Description: 初始化横向柱状图
     */
    initBarEcharts() {
      let barEchart = this.$echarts.init(this.$refs.barEchart);
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
          data: this.barData.map(item => {
            return item.orgName;
          }),
        },
        series: [
          {
            name: '推进缓慢次数',
            type: 'bar',
            itemStyle: {
              color: '#CB1C1D',
            },
            label: {
              show: true,
              position: 'right',
            },
            data: this.barData.map(item => {
              return item.slowAdvanceNum;
            }),
          },
          {
            name: '逾期次数',
            type: 'bar',
            itemStyle: {
              color: '#FF9900',
            },
            label: {
              show: true,
              position: 'right',
            },
            data: this.barData.map(item => {
              return item.overNum;
            }),
          },
        ],
      });
    },
    /*
     * @Description: 初始化绩效总分排行榜
     */
    getPointRankHeight() {
      this.pointRankHeight = this.$refs.pointRankTable.offsetHeight;
      console.log(
        '🚀 ~ getPointRankHeight ~ this.$refs.pointRankTable.offsetHeight:',
        this.$refs.pointRankTable.offsetHeight
      );
    },
    /*
     * @Description: 考核情况统计下拉框切换情况
     */
    statChange(val) {
      console.log(val);
    },
    /*
     * @Description: 打开绩效总分排行榜榜单弹窗
     */
    openPointRankPop() {
      this.pointRankListShow = true;
    },
    /*
     * @Description: 关闭绩效总分排行榜榜单弹窗
     */
    closePointRankPop() {
      this.pointRankListShow = false;
    },
    /*
     * @Description: 打开绩效考核评分规则弹窗
     */
    openPointRule(item, index) {
      if (index === undefined) {
        index = 0;
      } else {
        this.curOrg = {};
        this.statSituationList = this.curStatSituation;
      }
      this.pointRuleIndex = `${index}`;
      this.curIndexId = item.indexId;
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

        // this.statSituationList = row.pointDetails;
        this.statSituationList = this.curStatSituation;

        setTimeout(() => {
          this.openPointRule(this.statSituationList[0]);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./css/performanceUnit.scss"></style>
<style lang="scss" scoped src="../../look-performance-leader/src/css/common.scss"></style>
@/constant-test
