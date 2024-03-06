<template>
  <div class="manage-adjustment manage-cms">
    <header class="header-container">
      <div class="name">绩效考核指标管理</div>
    </header>
    <section class="section-container">
      <el-form :inline="true" ref="form" :model="form" class="form-inline">
        <el-form-item label="应用" prop="appId">
          <el-select v-model="form.appId" placeholder="请选择">
            <el-option
              v-for="item in optionsApplication"
              :key="item.appId"
              :label="item.appName"
              :value="item.appId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="租户" prop="tenantId">
          <el-select v-model="form.tenantId" placeholder="请选择">
            <el-option
              v-for="item in optionsTenant"
              :key="item.schemeId"
              :label="item.schemeName"
              :value="item.schemeId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位名称" prop="orgName">
          <el-input v-model="form.orgName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="lookui-btn"
            type="primary"
            size="medium"
            icon="el-icon-search"
            @click="handleQuery"
            >查询</el-button
          >
          <el-button
            class="lookui-btn"
            @click="resetForm('form')"
            size="medium"
            icon="el-icon-refresh-left"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        v-loading="loadingIntervention"
        :data="tableDataIntervention"
        :max-height="maxHeight"
        style="width: 100%"
        class="lookui-table">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="orgName" label="单位名称" align="center" :resizable="false" />
        <el-table-column prop="FKSX" label="反馈时效得分" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.FKSX }}</span>
            <span
              v-if="row.FKSX != row.FKSXIntervention"
              @click="showInterventionRecord(row, row.FKSXId)"
              >/<span class="color-blue">{{ row.FKSXIntervention }}</span></span
            >
          </template>
        </el-table-column>
        <el-table-column prop="FKZL" label="反馈质量得分" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.FKZL }}</span>
            <span
              v-if="row.FKZL != row.FKZLIntervention"
              @click="showInterventionRecord(row, row.FKZLId)"
              >/<span class="color-blue">{{ row.FKZLIntervention }}</span></span
            >
          </template>
        </el-table-column>
        <el-table-column prop="TJQK" label="推进情况得分" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.TJQK }}</span>
            <span v-if="row.TJQK != row.TJQKIntervention"
              >/<span class="color-blue">{{ row.TJQKIntervention }}</span></span
            >
          </template>
        </el-table-column>
        <el-table-column prop="RWSLJFX" label="任务数量得分" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.RWSLJFX }}</span>
            <span v-if="row.RWSLJFX != row.RWSLJFXIntervention"
              >/<span class="color-blue">{{ row.RWSLJFXIntervention }}</span></span
            >
          </template>
        </el-table-column>
        <el-table-column prop="RCJJFX" label="日常加减分得分" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.RCJJFX }}</span>
            <span v-if="row.RCJJFX != row.RCJJFXIntervention"
              >/<span class="color-blue">{{ row.RCJJFXIntervention }}</span></span
            >
          </template>
        </el-table-column>
        <el-table-column prop="allScore" label="总得分" align="center" />
        <el-table-column prop="allInterveneScore" label="干预后得分" align="center">
          <template slot-scope="{ row }">
            <span class="color-blue" @click="showInterventionRecord(row)">{{
              row.allInterveneScore
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleIntervention(scope.row)"
              >干预</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          class="lookui-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryParams.current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="queryParams.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalIntervention"
          background>
        </el-pagination>
      </div>
    </section>

    <el-dialog
      title="考核结果干预"
      width="50%"
      destroy-on-close
      append-to-body
      class="lookui-dialog"
      :visible.sync="dialogIntervention">
      <el-form ref="formIntervention" label-width="100px" :model="formIntervention">
        <el-form-item label="单位名称" prop="orgName">
          <el-input v-model="formIntervention.orgName" disabled></el-input>
        </el-form-item>
        <el-form-item label="考核指标" prop="indexName">
          <el-input
            v-model="formIntervention.indexName"
            placeholder="请选择"
            @focus="handleFocusIndexInput()"></el-input>
        </el-form-item>
        <el-form-item label="干预原因" prop="reason">
          <el-input v-model="formIntervention.reason" placeholder="请输入干预原因"></el-input>
        </el-form-item>
        <el-form-item label="类别属性" prop="scoreType">
          <el-radio-group v-model="formIntervention.scoreType">
            <el-radio class="lookui-radio" :label="1">加分</el-radio>
            <el-radio class="lookui-radio" :label="2">减分</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="加/减分数" prop="scoreChange">
          <i class="el-icon-plus" v-if="formIntervention.scoreType == 1"></i>
          <i class="el-icon-minus" v-else></i>
          <el-input-number
            v-model="formIntervention.scoreChange"
            controls-position="right"
            @change="handleScoreChange"
            :min="1"
            :max="100"
            style="margin: 0 10px"></el-input-number
          >分
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogIntervention = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmIntervention">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 指标列表弹窗 -->
    <el-dialog
      :title="`考核指标`"
      class="lookui-dialog"
      width="60%"
      top="50px"
      destroy-on-close
      append-to-body
      :visible.sync="dialogIndex">
      <el-form ref="formIndex" :model="formIndex" label-width="100px">
        <el-form-item label="指标名称" prop="name">
          <el-input style="width: 250px" v-model="formIndex.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="lookui-btn"
            type="primary"
            size="medium"
            icon="el-icon-search"
            @click="handleIndexQuery"
            >查询</el-button
          >
          <el-button
            class="lookui-btn"
            @click="resetFormIndex('formIndex')"
            size="medium"
            icon="el-icon-refresh-left"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        @selection-change="handleSelectionIndexChange"
        :data="tableIndexData"
        height="430"
        style="width: 100%"
        class="lookui-table">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="指标名称" align="center"></el-table-column>
        <el-table-column prop="type" label="指标类型" align="center"></el-table-column>
        <el-table-column
          prop="assessmentCriterion"
          label="考核标准"
          align="center"></el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          class="lookui-pagination"
          @size-change="handleIndexSizeChange"
          @current-change="handleIndexCurrentChange"
          :current-page="queryIndexParams.current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="queryIndexParams.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="indexTotal"
          background>
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleChooseIndex">确认</el-button>
        <el-button @click="handleCloseIndex">取消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="干预记录"
      width="40%"
      destroy-on-close
      append-to-body
      class="lookui-dialog intervention-record-dialog"
      :visible.sync="dialogRecord">
      <el-timeline v-if="interventionRecords.length > 0">
        <el-timeline-item
          v-for="(record, index) in interventionRecords"
          :key="index"
          :timestamp="record.updatedTime">
          <div>
            {{ record.createdName }}干预了考核指标：<span style="color: #4444fd">{{
              record.indexName
            }}</span
            >的分数，{{ record.scoreChange == 1 ? '加' : '减' }}
            <span style="color: #506eda">{{ record.scoreChange }}</span> 分
          </div>
          <div>干预原因: {{ record.reason }}。</div>
        </el-timeline-item>
      </el-timeline>
      <div v-else style="display: flex; justify-content: center;"><look-empty/></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRecord = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, addIntervene, getInterveneList } from '../api/manage-adjustment';
import { getList as getAppicationList } from '../api/manage-application';
import { getTenantList } from '../api/manage-application';
import { getList as getIndexList } from '../api/manage-indicator';
export default {
  components: {},
  data() {
    return {
      interventionRecords: [],
      dialogRecord: false,
      indexTotal: 0,
      tableIndexData: [],
      selectionIndexList: [],
      formIndex: {
        name: '',
      },
      dialogIndex: false,
      formIntervention: {
        orgId: '',
        scoreType: 1,
        reason: '',
      },
      dialogIntervention: false,
      optionsTenant: [],
      optionsApplication: [],
      tableDataIntervention: [],
      totalIntervention: 0,
      loadingIntervention: true,
      queryParams: {
        data: {
          appId: '', // 应用id
          tenantId: '', // 租户id
          orgName: '', // 单位名称
        },
        current: 1,
        pageSize: 10,
      },
      queryParamsApplication: {
        app: {},
        current: 1,
        pageSize: -1,
      },
      queryParamsTenant: {
        appTenantScheme: {},
        current: 1,
        pageSize: -1,
      },
      form: {
        tenantId: '',
        appId: '',
        orgName: '',
      },
      queryIndexParams: {
        app: {
          name: '',
        },
        current: 1,
        pageSize: 10,
      },
      queryParamsInterventionRecord: {
        orgId: '',
        indexId: '',
      },
    };
  },
  props: {
    token: {
      type: String,
      default: '',
    },
    baseUrl: {
      type: String,
      default: '',
    },
    maxHeight: {
      type: String,
      default: '630',
    },
  },
  computed: {},
  created() {},
  watch: {
    'form.appId': function (newV, oldV) {
      if (newV !== '') {
        this.queryParamsTenant.appTenantScheme = { appId: newV };
        getTenantList(this.baseUrl, this.token, this.queryParamsTenant).then(res => {
          this.optionsTenant = res.data.data.records;
        });
      }
    },
  },
  mounted() {
    this._getList();
    this._getIndexList();
  },
  methods: {
    showInterventionRecord(row, indexId) {
      this.dialogRecord = true;
      this.queryParamsInterventionRecord.orgId = row.orgId;
      this.queryParamsInterventionRecord.indexId = indexId ? indexId : '';

      getInterveneList(this.baseUrl, this.token, this.queryParamsInterventionRecord).then(res => {
        this.interventionRecords = res.data.data;
      });
    },
    handleIntervention(row) {
      // 重置表单
      this.formIntervention = {
        orgId: '',
        scoreType: 1,
        reason: '',
      };
      this.dialogIntervention = true;
      this.formIntervention.orgName = row.orgName;
      this.formIntervention.orgId = row.orgId;
    },
    handleFocusIndexInput() {
      this.dialogIndex = true;
    },
    handleCloseIndex() {
      this.dialogIndex = false;
    },
    handleChooseIndex() {
      if (this.selectionIndexList.length === 0) {
        this.$message.error('请选择指标');
        return;
      }
      if (this.selectionIndexList.length > 1) {
        this.$message.error('只能选择一个指标');
        return;
      }
      this.formIntervention.indexId = this.selectionIndexList[0].id;
      this.formIntervention.indexName = this.selectionIndexList[0].name;
      this.dialogIndex = false;
    },
    handleIndexCurrentChange(current) {
      this.queryIndexParams.current = current;
      this._getList();
    },
    handleIndexSizeChange(pageSize) {
      this.queryIndexParams.pageSize = pageSize;
      this.queryIndexParams.current = 1;
      this._getIndexList();
    },
    _getIndexList() {
      getIndexList(this.baseUrl, this.token, this.queryIndexParams).then(res => {
        this.tableIndexData = res.data.data.records;
        this.indexTotal = res.data.data.total;
      });
    },
    handleSelectionIndexChange(selection) {
      this.selectionIndexList = selection;
    },
    handleIndexQuery() {
      this.queryIndexParams = {
        app: this.formIndex,
        current: 1,
        pageSize: 10,
      };
      this._getIndexList();
    },
    handleScoreChange() {},
    handleConfirmIntervention() {
      addIntervene(this.baseUrl, this.token, this.formIntervention).then(res => {
        if (res.data.code === '000000') {
          this.$message.success('干预成功');
          this.dialogIntervention = false;
          this._getList();
        }
      });
    },
    isShowInterventionScore(row) {
      return row.allInterveneScore !== null && row.allInterveneScore !== undefined;
    },
    handleQuery() {
      this.queryParams = {
        data: this.form,
        current: 1,
        pageSize: 10,
      };
      this._getList();
    },
    handleCurrentChange(current) {
      this.queryParams.current = current;
      this._getList();
    },
    handleSizeChange(pageSize) {
      this.queryParams.pageSize = pageSize;
      this.queryParams.current = 1;
      this._getList();
    },
    _getList() {
      this.loadingIntervention = true;
      getAppicationList(this.baseUrl, this.token, this.queryParamsApplication).then(res => {
        this.optionsApplication = res.data.data.records;
      });
      getTenantList(this.baseUrl, this.token, this.queryParamsTenant).then(res => {
        this.optionsTenant = res.data.data.records;
      });
      getList(this.baseUrl, this.token, this.queryParams).then(res => {
        this.loadingIntervention = false;
        this.tableDataIntervention = res.data.data.records;
        this.totalIntervention = res.data.data.total;

        function addFieldToItem(item, fieldKey, fieldValue) {
          return item.indexCategoryScoreList.find(iten => iten.indexCategory === fieldKey)?.[
            fieldValue
          ];
        }
        this.tableDataIntervention.forEach(item => {
          item.FKSX = addFieldToItem(item, 'FKSX', 'score');
          item.FKSXIntervention = addFieldToItem(item, 'FKSX', 'interveneScore');
          item.FKSXId = addFieldToItem(item, 'FKSX', 'indexId');

          item.FKZL = addFieldToItem(item, 'FKZL', 'score');
          item.FKZLIntervention = addFieldToItem(item, 'FKZL', 'interveneScore');
          item.FKZLId = addFieldToItem(item, 'FKZL', 'indexId');

          item.TJQK = addFieldToItem(item, 'TJQK', 'score');
          item.TJQKIntervention = addFieldToItem(item, 'TJQK', 'interveneScore');
          item.TJQKId = addFieldToItem(item, 'TJQK', 'indexId');

          item.RWSLJFX = addFieldToItem(item, 'RWSLJFX', 'score');
          item.RWSLJFXIntervention = addFieldToItem(item, 'RWSLJFX', 'interveneScore');
          item.RWSLJFXId = addFieldToItem(item, 'RWSLJFX', 'indexId');

          item.RCJJFX = addFieldToItem(item, 'RCJJFX', 'score');
          item.RCJJFXIntervention = addFieldToItem(item, 'RCJJFX', 'interveneScore');
          item.RCJJFXId = addFieldToItem(item, 'RCJJFX', 'indexId');
        });
      });
    },
  },
};
</script>

<style lang="scss" src="../css/common.scss"></style>
<style scoped lang="scss">
.manage-adjustment {
  .lookui-table {
    ::v-deep .color-blue {
      color: #4444fd;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
<style lang="scss">
.intervention-record-dialog {
  .el-timeline-item__tail {
    border-left: 2px solid #506eda;
  }
  .el-timeline-item__node {
    background-color: #506eda;
  }
}
</style>
