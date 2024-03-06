<template>
  <div class="manage-indicator manage-cms">
    <header class="header-container">
      <div class="name">绩效考核指标管理</div>
    </header>
    <section class="section-container">
      <el-form :inline="true" ref="form" :model="form" class="form-inline">
        <el-form-item label="指标名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
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
      <el-table v-loading="loadingIndicator" :data="tableData" height="630" style="width: 100%" class="lookui-table">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="name" label="指标名称" align="center"></el-table-column>
        <el-table-column prop="type" label="指标类型" align="center"></el-table-column>
        <el-table-column prop="indexLevel2List" label="二级指标" width="250" align="center">
          <template slot-scope="scope">
            <span>{{ getIndexNameStr(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="originalScore" label="初始分值" align="center"></el-table-column>
        <el-table-column prop="maxScore" label="最高分" align="center"></el-table-column>
        <el-table-column prop="minScore" label="最低分" align="center"></el-table-column>
        <el-table-column
          prop="assessmentCriterion"
          label="考核标准"
          align="center"></el-table-column>
        <el-table-column
          prop="scoringRules"
          label="计分规则"
          width="350"
          align="center"></el-table-column>
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

      <!-- 指标管理新增、修改弹窗 -->
      <el-dialog
        :title="`${currentOperation}考核指标`"
        class="lookui-dialog index-dialog"
        width="50%"
        top="50px"
        destroy-on-close
        append-to-body
        :visible.sync="dialogVisible">
        <el-form ref="formAdd" :rules="rules" :model="formAdd" label-width="100px">
          <el-form-item label="指标名称" prop="name">
            <el-input v-model="formAdd.name"></el-input>
          </el-form-item>
          <el-form-item label="唯一标识" prop="id">
            <el-input v-model="formAdd.id" placeholder="系统自动生成" disabled></el-input>
          </el-form-item>
          <el-form-item label="指标类型" prop="type">
            <el-radio-group v-model="formAdd.type">
              <el-radio class="lookui-radio" :label="1">硬指标</el-radio>
              <el-radio class="lookui-radio" :label="2">软指标</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="score-group">
            <el-form-item label="初始分值" prop="originalScore">
              <el-input v-model="formAdd.originalScore"></el-input>分
            </el-form-item>
            <el-form-item label="最高分值" prop="maxScore">
              <el-input v-model="formAdd.maxScore"></el-input>分
            </el-form-item>
            <el-form-item label="最低分值" prop="minScore">
              <el-input v-model="formAdd.minScore"></el-input>分
            </el-form-item>
          </div>
          <el-form-item label="考核标准" prop="assessmentCriterion">
            <el-select v-model="formAdd.assessmentCriterion" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计分规则" prop="scoringRules">
            <el-input type="textarea" v-model="formAdd.scoringRules"></el-input>
          </el-form-item>
          <el-form-item label="二级指标维护" prop="indexLevel2List" label-width="120px">
            <div class="operation-btns">
              <el-button
                class="lookui-btn"
                type="primary"
                size="medium"
                icon="el-icon-plus"
                @click="handleIndex2LevelAdd"
                >新增</el-button
              >
            </div>
            <el-table
              :data="formAdd.indexLevel2List"
              height="200"
              style="width: 100%"
              class="lookui-table">
              <el-table-column prop="name" label="二级指标名称" align="center"></el-table-column>
              <el-table-column prop="type" label="指标属性" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.type == 1">加分项</span>
                  <span v-else>减分项</span>
                </template>
              </el-table-column>
              <el-table-column prop="score" label="分值" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.score > 0 ? scope.row.score : `-${scope.row.score}` }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="120">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                    @click="handleLevel2Update(scope)"
                    >修改</el-button
                  >
                  <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    @click="handleLevel2Remove(scope)"
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

      <!-- 新增、修改二级考核指标弹窗 -->
      <el-dialog
        :title="`${currentLevel2Operation}二级考核指标`"
        class="lookui-dialog index-level2-dialog"
        width="40%"
        destroy-on-close
        append-to-body
        :visible.sync="dialogIndex2Level">
        <el-form
          ref="formLevel2Add"
          :rules="rulesLevel2"
          :model="formLevel2Add"
          label-width="130px">
          <el-form-item label="二级指标名称" prop="name">
            <el-input v-model="formLevel2Add.name"></el-input>
          </el-form-item>
          <el-form-item label="指标属性" prop="type">
            <el-radio-group v-model="formLevel2Add.type" class="index-level2-radio-group-type">
              <el-radio class="lookui-radio" :label="1">加分项</el-radio>
              <el-radio class="lookui-radio" :label="2">减分项</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="分值" prop="score">
            <i class="el-icon-plus" v-if="formLevel2Add.type == 1"></i>
            <i class="el-icon-minus" v-else></i>
            <el-input v-model.number="formLevel2Add.score" autocomplete="off"></el-input>分
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleConfirmLevel2Add">提交</el-button>
          <el-button @click="handleCancelLevel2Add">关闭</el-button>
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import { add, detail, getList, remove } from '../api/manage-indicator';
export default {
  name: 'manage-indicator',
  components: {},
  data() {
    return {
      loadingIndicator: true,
      currentLevel2RowIndex: 0,
      currentOperation: '新增',
      currentLevel2Operation: '新增',
      options: [
        {
          value: 'RCJJFX',
          label: '日常加减分项',
        },
        {
          value: 'FKSX',
          label: '反馈时效',
        },
        {
          value: 'FKZL',
          label: '反馈质量',
        },
        {
          value: 'TJQK',
          label: '推进情况',
        },
        {
          value: 'RWSLJFX',
          label: '任务数量加分项',
        },
      ],
      dialogVisible: false,
      dialogIndex2Level: false,
      rules: {
        name: [{ required: true, message: '请输入指标名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择', trigger: 'blur' }],
        originalScore: [{ required: true, message: '请输入初始分值', trigger: 'blur' }],
        maxScore: [{ required: true, message: '请输入最高分值', trigger: 'blur' }],
        assessmentCriterion: [{ required: true, message: '请选择考核标准', trigger: 'blur' }],
        scoringRules: [{ required: true, message: '请输入计分规则', trigger: 'blur' }],
        indexLevel2List: [{ required: true, message: '请添加二级指标', trigger: 'blur' }],
      },
      rulesLevel2: {
        name: [{ required: true, message: '请输入租户名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择', trigger: 'blur' }],
        score: [
          { required: true, message: '请输入分值', trigger: 'blur' },
          { type: 'number', message: '请输入数字', trigger: 'blur' },
        ],
      },
      formAdd: {
        name: '',
        type: 1,
        minScore: 0,
        indexLevel2List: [],
      },
      formLevel2Add: {
        name: '',
        tenantId: '',
        schemeName: '',
        schemeId: '',
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
  },
  computed: {},
  created() {},
  mounted() {
    this._getList();
  },
  methods: {
    // 获取指标列表
    _getList() {
      this.loadingIndicator = true;
      getList(this.baseUrl, this.token, this.queryParams).then(res => {
        this.loadingIndicator = false;
        this.tableData = res.data.data.records;
        this.total = res.data.data.total;
      });
    },
    // 新增指标
    handleAdd() {
      this.currentOperation = '新增';
      this.dialogVisible = true;
      this.formAdd = {
        name: '',
        type: 1,
        indexLevel2List: [],
      };
    },
    // 修改某个指标
    handleUpdate(row) {
      this.currentOperation = '修改';
      this.dialogVisible = true;
      detail(this.baseUrl, this.token, row.id).then(res => {
        this.formAdd = res.data.data;
      });
    },
    // 确认新增或修改指标
    handleConfirmAdd() {
      this.$refs.formAdd.validate(valid => {
        if (valid) {
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
    // 删除某条指标
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
    // 搜索指标
    handleQuery() {
      this.queryParams = {
        app: this.form,
        current: 1,
        pageSize: 10,
      };
      this._getList();
    },
    // 新增二级指标
    handleIndex2LevelAdd() {
      this.currentLevel2Operation = '新增';
      this.dialogIndex2Level = true;
      this.formLevel2Add = {
        type: 1,
      };
    },
    // 删除二级指标
    handleLevel2Remove({ row, $index }) {
      this.formAdd.indexLevel2List.splice($index, 1);
    },
    // 修改二级指标
    handleLevel2Update({ row, $index }) {
      this.currentLevel2RowIndex = $index;
      this.currentLevel2Operation = '修改';
      this.dialogIndex2Level = true;
      this.formLevel2Add = JSON.parse(JSON.stringify(row));
    },
    // 取消新增指标
    handleCancelAdd() {
      this.dialogVisible = false;
    },
    // 取消新增二级指标
    handleCancelLevel2Add() {
      this.dialogIndex2Level = false;
    },
    // 确认新增二级指标
    handleConfirmLevel2Add() {
      this.$refs.formLevel2Add.validate(valid => {
        if (valid) {
          if (this.currentLevel2Operation === '新增') {
            this.formAdd.indexLevel2List.push(this.formLevel2Add);
          } else {
            this.formAdd.indexLevel2List.splice(this.currentLevel2RowIndex, 1, this.formLevel2Add);
          }
          this.dialogIndex2Level = false;
        } else {
          return false;
        }
      });
    },
    // 指标列表当前页变化
    handleCurrentChange(current) {
      this.queryParams.current = current;
      this._getList();
    },
    // 指标列表 pageSize 变化
    handleSizeChange(pageSize) {
      this.queryParams.pageSize = pageSize;
      this.queryParams.current = 1;
      this._getList();
    },
    // 重置指标表单搜索条件
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
.score-group {
  display: flex;
  > div {
    .el-form-item__content {
      display: flex;
      .el-input {
        margin-right: 8px;
      }
    }
  }
}
.index-dialog {
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
.index-level2-dialog {
  .el-form-item__content {
    display: flex;
    align-items: center;
    .el-input {
      margin-left: 8px;
      margin-right: 8px;
    }
    .index-level2-radio-group-type {
      margin-left: 6px;
      .el-radio {
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
</style>
