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
        style="width: 100%"
        @sort-change="sortChange"
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
          prop="timelinessPoint"
          label="反馈时效得分"
          align="center"
          :resizable="false"
        />
        <el-table-column
          prop="qualityPoint"
          label="反馈质量得分"
          align="center"
          :resizable="false"
        />
        <el-table-column
          prop="pushPoint"
          label="推进情况得分"
          align="center"
          :resizable="false"
        />
        <el-table-column
          prop="taskCountPoint"
          label="任务数量得分"
          align="center"
          :resizable="false"
        />
        <el-table-column
          prop="usualPoint"
          label="日常加减分得分"
          align="center"
          :resizable="false"
        />
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
  </div>
</template>

<script>
export default {
  name: 'pointRankListDetail',
  props: {
    themeType: {
      type: String,
      default: 'unit',
    },
  },
  data() {
    return {
      searchContent: '',
      pointRankHeight: 0, // 表格高度
      tableData: [
        {
          rank: 1,
          orgName: '旅游和文化广电体育局',
          timelinessPoint: 40, // 反馈时效得分
          qualityPoint: 40, // 反馈质量得分
          pushPoint: 20, // 推进情况得分
          taskCountPoint: 10, // 任务数量得分
          usualPoint: 10, // 日常加减分得分
          totalPoint: 120, // 绩效得分（总分）
        },
        {
          rank: 2,
          orgName: '教育厅',
          timelinessPoint: 40, // 反馈时效得分
          qualityPoint: 30, // 反馈质量得分
          pushPoint: 10, // 推进情况得分
          taskCountPoint: 10, // 任务数量得分
          usualPoint: 10, // 日常加减分得分
          totalPoint: 100, // 绩效得分（总分）
        },
        {
          rank: 3,
          orgName: 'aaaa',
          timelinessPoint: 30, // 反馈时效得分
          qualityPoint: 30, // 反馈质量得分
          pushPoint: 10, // 推进情况得分
          taskCountPoint: 10, // 任务数量得分
          usualPoint: 10, // 日常加减分得分
          totalPoint: 90, // 绩效得分（总分）
        },
        {
          rank: 4,
          orgName: 'bbbbb',
          timelinessPoint: 30, // 反馈时效得分
          qualityPoint: 20, // 反馈质量得分
          pushPoint: 10, // 推进情况得分
          taskCountPoint: 10, // 任务数量得分
          usualPoint: 10, // 日常加减分得分
          totalPoint: 80, // 绩效得分（总分）
        },
        {
          rank: 5,
          orgName: 'cccc',
          timelinessPoint: 20, // 反馈时效得分
          qualityPoint: 20, // 反馈质量得分
          pushPoint: 10, // 推进情况得分
          taskCountPoint: 10, // 任务数量得分
          usualPoint: 10, // 日常加减分得分
          totalPoint: 70, // 绩效得分（总分）
        },
        {
          rank: 6,
          orgName: 'ddd',
          timelinessPoint: 20, // 反馈时效得分
          qualityPoint: 10, // 反馈质量得分
          pushPoint: 10, // 推进情况得分
          taskCountPoint: 10, // 任务数量得分
          usualPoint: 10, // 日常加减分得分
          totalPoint: 60, // 绩效得分（总分）
        },
        {
          rank: 7,
          orgName: 'eee',
          timelinessPoint: 10, // 反馈时效得分
          qualityPoint: 10, // 反馈质量得分
          pushPoint: 10, // 推进情况得分
          taskCountPoint: 10, // 任务数量得分
          usualPoint: 10, // 日常加减分得分
          totalPoint: 50, // 绩效得分（总分）
        },
        {
          rank: 8,
          orgName: 'fff',
          timelinessPoint: 20, // 反馈时效得分
          qualityPoint: 10, // 反馈质量得分
          pushPoint: 10, // 推进情况得分
          taskCountPoint: 10, // 任务数量得分
          usualPoint: 0, // 日常加减分得分
          totalPoint: 50, // 绩效得分（总分）
        },
        {
          rank: 9,
          orgName: 'ggg',
          timelinessPoint: 10, // 反馈时效得分
          qualityPoint: 10, // 反馈质量得分
          pushPoint: 10, // 推进情况得分
          taskCountPoint: 10, // 任务数量得分
          usualPoint: 0, // 日常加减分得分
          totalPoint: 40, // 绩效得分（总分）
        },
        {
          rank: 10,
          orgName: 'hhh',
          timelinessPoint: 10, // 反馈时效得分
          qualityPoint: 10, // 反馈质量得分
          pushPoint: 10, // 推进情况得分
          taskCountPoint: 0, // 任务数量得分
          usualPoint: 0, // 日常加减分得分
          totalPoint: 30, // 绩效得分（总分）
        },
      ],
      currentPage: 1,
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
  },
}
</script>

<style lang="scss" scoped src="../css/components/pointRankListDetail.scss"></style>
