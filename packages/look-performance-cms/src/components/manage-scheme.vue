<template>
  <div class="manage-scheme manage-cms">
    <header class="header-container">
      <div class="name">绩效考核指标管理</div>
    </header>
    <section class="section-container">
      <el-form :inline="true" ref="form" :model="form" class="form-inline">
        <el-form-item label="方案名称" prop="name">
          <el-input v-model="form.schemeName" placeholder="请输入"></el-input>
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
      <div class="operation-btns">
        <el-button
          class="lookui-btn"
          type="primary"
          size="medium"
          icon="el-icon-plus"
          @click="handleAdd"
          >新增</el-button
        >
      </div>
      <el-table v-loading="loadingScheme" :data="tableData" :max-height="maxHeight" style="width: 100%" class="lookui-table">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="schemeName" label="考核方案名称" align="center"></el-table-column>
        <el-table-column prop="id" label="方案ID" align="center"></el-table-column>
        <el-table-column prop="fullScore" label="满分分值" align="center"></el-table-column>
        <el-table-column prop="schemeIndexList" label="所选考核指标及权重" align="center">
          <template slot-scope="scope">
            <span>{{ getIndexAndRatioStr(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="schemeContent" label="考核方案描述" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleRemove(scope.row)"
              >删除</el-button
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
          :total="total"
          background>
        </el-pagination>
      </div>

      <!-- 方案管理新增、修改弹窗 -->
      <el-dialog
        :title="`${currentOperation}考核方案`"
        class="lookui-dialog scheme-dialog"
        width="60%"
        top="50px"
        destroy-on-close
        append-to-body
        :visible.sync="dialogVisible">
        <el-form ref="formAdd" :rules="rules" :model="formAdd" label-width="100px">
          <el-form-item label="方案名称" prop="schemeName">
            <el-input v-model="formAdd.schemeName"></el-input>
          </el-form-item>
          <el-form-item label="方案ID" prop="id">
            <el-input v-model="formAdd.id" placeholder="系统自动生成" disabled></el-input>
          </el-form-item>
          <div class="full-score-ratio">
            <el-form-item label="满分分值" prop="fullScore">
              <el-input :value="computeFullScore" disabled placeholder="自动生成"></el-input>分
            </el-form-item>
            <el-form-item label="是否启用权重" prop="isOpenRatio">
              <el-radio-group v-model="formAdd.isOpenRatio" class="scheme-radio-group-type">
                <el-radio class="lookui-radio" :label="0">否</el-radio>
                <el-radio class="lookui-radio" :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <el-form-item label="方案描述" prop="schemeContent">
            <el-input type="textarea" v-model="formAdd.schemeContent"></el-input>
          </el-form-item>
          <el-form-item label="考核指标选择" prop="schemeIndexList" label-width="120px">
            <div class="operation-btns" style="display: flex; justify-content: space-between">
              <span style="display: flex; align-items: center">
                <i
                  class="el-icon-warning"
                  style="color: #ffcc00; font-size: 22px; margin-right: 4px"></i>
                <span>如缺少所需考核指标，请在考核指标配置中进行新增。</span>
              </span>
              <el-button
                class="lookui-btn"
                type="primary"
                size="medium"
                icon="el-icon-plus"
                @click="handleIndexAdd"
                >新增</el-button
              >
            </div>
            <el-table
              :data="formAdd.schemeIndexList"
              height="200"
              style="width: 100%"
              class="lookui-table">
              <el-table-column prop="indexName" label="考核指标名称" width="200" align="center">
                <template slot-scope="scope">
                  <el-input
                    style="width: 88%"
                    v-if="scope.row.editable"
                    v-model="scope.row.indexName"
                    @focus="handleFocus(scope)"></el-input>
                  <span v-else>{{ scope.row.indexName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="fullScore" label="满分分值" align="center"></el-table-column>
              <el-table-column prop="ratio" label="权重" width="130" align="center">
                <template slot-scope="scope">
                  <div v-if="formAdd.isOpenRatio == 1">
                    <el-input
                      style="width: 88%"
                      v-if="scope.row.editable"
                      autocomplete="off"
                      v-model.number="scope.row.ratio">
                      <template slot="append">%</template></el-input
                    >
                    <span v-else>{{ scope.row.ratio }}%</span>
                  </div>
                  <span v-else>-</span>
                </template>
              </el-table-column>
              <el-table-column prop="ratioScore" label="权重分" align="center">
                <template slot-scope="scope">
                  <span v-if="formAdd.isOpenRatio == 1">{{
                    (scope.row.ratio * scope.row.fullScore) / 100 || 0
                  }}</span>
                  <span v-else>-</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="120">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    :icon="`${scope.row.editable ? 'el-icon-check' : 'el-icon-edit'}`"
                    @click="handleIndexUpdate(scope)"
                    >{{ scope.row.editable ? '保存' : '编辑' }}</el-button
                  >
                  <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    @click="handleRemoveIndex(scope)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleConfirmAdd">提交</el-button>
          <el-button @click="handleCancelAdd">关闭</el-button>
        </span>
      </el-dialog>
    </section>

    <!-- 指标列表弹窗 -->
    <el-dialog
      :title="`考核指标`"
      class="lookui-dialog index-scheme-dialog"
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
        @selection-change="handleSelectionChange"
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
  </div>
</template>

<script>
import { add, detail, getList, remove } from '../api/manage-scheme';
import { getList as getIndexList } from '../api/manage-indicator';
export default {
  name: 'manage-scheme',
  components: {},
  data() {
    return {
      loadingScheme: true,
      currentEditIndex: 0,
      selectionList: [],
      formIndex: {
        name: '',
      },
      dialogIndex: false,
      indexTotal: 0,
      tableIndexData: [],
      currentOperation: '新增',
      dialogVisible: false,
      dialogIndex2Level: false,
      rules: {
        schemeName: [{ required: true, message: '请输入方案名称', trigger: 'blur' }],
        schemeContent: [{ required: true, message: '请输入方案描述', trigger: 'blur' }],
        schemeIndexList: [{ required: true, message: '请添加考核指标', trigger: 'blur' }],
      },
      formAdd: {
        name: '',
        type: 1,
        minScore: 0,
        schemeIndexList: [],
      },
      total: 0,
      queryParams: {
        app: {
          name: '',
        },
        current: 1,
        pageSize: 10,
      },
      form: {
        name: '',
      },
      tableData: [],
      queryIndexParams: {
        app: {
          name: '',
        },
        current: 1,
        pageSize: 10,
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
  computed: {
    computeFullScore() {
      // 未开启权重的情况下，满分就是满分分值总和；开启权重后，满分为权重分的总和
      let fullScore = 0;
      this.formAdd.schemeIndexList?.forEach(item => {
        if (this.formAdd.isOpenRatio === 1) {
          fullScore += item.ratio === '-' ? 100 : (item.ratio * item.fullScore) / 100;
        } else {
          fullScore += item.fullScore;
        }
      });
      return fullScore;
    },
  },
  created() {},
  mounted() {
    this._getList();
    this._getIndexList();
  },
  methods: {
    handleRemoveIndex({ row, $index }) {
      this.formAdd.schemeIndexList.splice($index, 1);
    },
    handleCloseIndex() {
      this.dialogIndex = false;
    },
    handleChooseIndex() {
      if (this.selectionList.length === 0) {
        this.$message.error('请选择指标');
        return;
      }
      if (this.selectionList.length > 1) {
        this.$message.error('只能选择一个指标');
        return;
      }
      this.dialogIndex = false;
      this.formAdd.schemeIndexList[this.currentEditIndex].indexName = this.selectionList[0].name;
      this.formAdd.schemeIndexList[this.currentEditIndex].fullScore =
        this.selectionList[0].maxScore;
      this.formAdd.schemeIndexList[this.currentEditIndex].indexId = this.selectionList[0].id;
    },
    handleSelectionChange(selection) {
      this.selectionList = selection;
    },
    handleIndexAdd() {
      this.formAdd.schemeIndexList.push({
        indexName: '',
        fullScore: '-',
        ratio: 0,
        ratioScore: 0,
        editable: true,
      });
    },
    handleFocus(row) {
      this.currentEditIndex = row.$index;
      this.dialogIndex = true;
    },
    handleIndexQuery() {
      this.queryIndexParams = {
        app: this.formIndex,
        current: 1,
        pageSize: 10,
      };
      this._getIndexList();
    },
    resetFormIndex() {
      this.$refs.formIndex.resetFields();
      this.handleIndexQuery();
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
    getIndexAndRatioStr(row) {
      let str = '';
      row.schemeIndexList.forEach(item => {
        str += `${item.indexName}（${item.ratio}）、`;
      });
      return str.slice(0, str.length - 1);
    },
    // 获取方案列表
    _getList() {
      this.loadingScheme = true;
      getList(this.baseUrl, this.token, this.queryParams).then(res => {
        this.loadingScheme = false;
        this.tableData = res.data.data.records;
        this.total = res.data.data.total;
      });
    },
    // 新增方案
    handleAdd() {
      this.currentOperation = '新增';
      this.dialogVisible = true;
      this.formAdd = {
        name: '',
        isOpenRatio: 0,
        schemeIndexList: [],
      };
    },
    // 修改某个方案
    handleUpdate(row) {
      this.currentOperation = '修改';
      this.dialogVisible = true;
      detail(this.baseUrl, this.token, row.id).then(res => {
        this.formAdd = res.data.data;
        this.formAdd.schemeIndexList.forEach(item => (item.editable = false));
      });
    },
    // 确认新增或修改方案
    handleConfirmAdd() {
      this.$refs.formAdd.validate(valid => {
        if (valid) {
          this.formAdd.fullScore = this.computeFullScore;
          add(this.baseUrl, this.token, this.formAdd).then(res => {
            if (res.data.code === '000000') {
              this.$message.success(`${this.currentOperation}成功`);
            } else {
              this.$message.error(res.data.mesg);
            }
            this.dialogVisible = false;
            this._getList();
          });
        } else {
          return false;
        }
      });
    },
    // 删除某条方案
    handleRemove(row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          remove(this.baseUrl, this.token, row.id).then(res => {
            if (res.data.code === '000000') {
              this.$message.success('删除成功');
            } else {
              this.$message.error(res.data.mesg);
            }
            this.queryParams.current = 1;
            this._getList();
          });
        })
        .catch(() => {});
    },
    // 搜索方案
    handleQuery() {
      this.queryParams = {
        app: this.form,
        current: 1,
        pageSize: 10,
      };
      this._getList();
    },
    // 新增方案指标
    handleIndexUpdate({ row, $index }) {
      let item = JSON.parse(JSON.stringify(row));
      item.editable = !row.editable;
      this.$set(this.formAdd.schemeIndexList, $index, item);
    },
    // 取消新增方案
    handleCancelAdd() {
      this.dialogVisible = false;
    },
    // 方案列表当前页变化
    handleCurrentChange(current) {
      this.queryParams.current = current;
      this._getList();
    },
    // 方案列表 pageSize 变化
    handleSizeChange(pageSize) {
      this.queryParams.pageSize = pageSize;
      this.queryParams.current = 1;
      this._getList();
    },
    // 重置方案表单搜索条件
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.handleQuery();
    },
    getIndexNameStr(row) {
      let str = '';
      row.indexLevel2List.forEach(item => {
        str += item.name + '、';
      });
      return str.slice(0, str.length - 1);
    },
  },
};
</script>

<style lang="scss" src="../css/common.scss"></style>
<style lang="scss">
.full-score-ratio {
  display: flex;
  > div {
    .el-form-item__content {
      display: flex;
      margin-right: 50px;
      .el-input {
        margin-right: 8px;
      }
    }
  }
}
.scheme-dialog {
  .el-table__cell {
    padding: 0 !important;
  }
  .cell {
    padding: 8px 0;
  }
  .el-dialog__body {
    padding-bottom: 0;
  }
}
.scheme-dialog {
  .el-form-item__content {
    .el-input {
      margin-left: 8px;
      margin-right: 8px;
    }
    .scheme-radio-group-type {
      margin-left: 6px;
      .el-radio {
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
</style>
