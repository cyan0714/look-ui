<template>
  <div class="manage-application">
    <header class="header-container">
      <div class="name">绩效考核应用管理</div>
    </header>
    <section class="section-container">
      <el-form :inline="true" ref="form" :model="form" class="form-inline">
        <el-form-item label="应用名称" prop="appName">
          <el-input v-model="form.appName" placeholder="请输入"></el-input>
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
        <el-button class="lookui-btn" type="primary" size="medium" icon="el-icon-plus" @click="handleAdd"
          >新增</el-button
        >
      </div>
      <el-table :data="tableData" height="630" style="width: 100%" class="lookui-table">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="appName" label="应用名称" align="center"></el-table-column>
        <el-table-column prop="appId" label="应用APPID" align="center"></el-table-column>
        <el-table-column prop="appKeySecret" label="密钥" align="center"></el-table-column>
        <el-table-column prop="url" label="跳转地址" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-setting"
              @click="handleTenant(scope.row)"
              >租户管理</el-button
            >
            <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
              >修改</el-button
            >
            <el-button size="mini" type="text" icon="el-icon-delete" @click="handleRemove(scope.row)">删除</el-button>
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
      <el-dialog
        :title="`${currentOperation}应用`"
        width="40%"
        destroy-on-close
        append-to-body
        :visible.sync="dialogVisible">
        <el-form ref="formAdd" :rules="rules" :model="formAdd" label-width="100px">
          <el-form-item label="应用名称" prop="appName">
            <el-input v-model="formAdd.appName"></el-input>
          </el-form-item>
          <el-form-item label="应用APPID" prop="appId">
            <el-input v-model="formAdd.appId"></el-input>
          </el-form-item>
          <el-form-item label="密钥" prop="appKeySecret">
            <el-input v-model="formAdd.appKeySecret"></el-input>
          </el-form-item>
          <el-form-item label="跳转地址" prop="url">
            <el-input v-model="formAdd.url"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleConfirmAdd">确定</el-button>
          <el-button @click="handleCancelAdd">取消</el-button>
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
const baseUrl = 'http://192.168.10.28:7078';
import { add, detail, getList, remove } from '../api/manage-application';
export default {
  name: 'manage-application',
  components: {},
  data() {
    return {
      rules: {
        appName: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
        appId: [{ required: true, message: '请输入应用APPID', trigger: 'blur' }],
        appKeySecret: [{ required: true, message: '请输入密钥', trigger: 'blur' }],
        url: [{ required: true, message: '请输入跳转地址', trigger: 'blur' }],
      },
      formAdd: {
        appName: '',
        appId: '',
        appKeySecret: '',
        url: '',
      },
      dialogVisible: false,
      total: 0,
      queryParams: {
        app: {
          appName: '',
        },
        current: 1,
        pageSize: 10,
      },
      form: {
        appName: '',
      },
      currentOperation: '新增',
      tableData: [],
    };
  },
  computed: {},
  created() {},
  mounted() {
    this._getList();
  },
  methods: {
    handleRemove(row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          remove(baseUrl, row.id).then(res => {
            if (res.data.code === '000000') {
              this.$message.success('删除成功');
            } else {
              this.$message.error(res.data.mesg);
            }
            this.queryParams.current = 1;
            this._getList();
          });
        })
        .catch(() => {
        });
    },
    handleAdd() {
      this.currentOperation = '新增';
      this.dialogVisible = true;
      this.formAdd = {
        appName: '',
        appId: '',
        appKeySecret: '',
        url: '',
      };
    },
    handleCancelAdd() {
      this.dialogVisible = false;
    },
    handleConfirmAdd() {
      this.$refs.formAdd.validate(valid => {
        if (valid) {
          add(baseUrl, this.formAdd).then(res => {
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
    handleUpdate(row) {
      this.currentOperation = '修改';
      this.dialogVisible = true;
      detail(baseUrl, row.id).then(res => {
        this.formAdd = res.data.data;
      });
    },
    handleTenant() {},
    _getList() {
      getList(baseUrl, this.queryParams).then(res => {
        this.tableData = res.data.data.records;
        this.total = res.data.data.total;
      });
    },
    handleQuery() {
      this.queryParams = {
        app: this.form,
        current: 1,
        pageSize: 10,
      }
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.handleQuery();
    },
  },
};
</script>

<style scoped lang="scss">
.manage-application {
  width: 100%;
  .header-container {
    padding: 14px;
    background-color: #fff;
    border-bottom: 1px solid #e6ebfb;
    .name {
      padding-left: 10px;
      font-size: 18px;
      font-weight: 600;
      border-left: 3px solid #5479ff;
    }
  }
}
section.section-container {
  padding: 20px;
  background-color: #fff;
  .form-inline {
    border-bottom: 1px dashed #e6ebfb;
    margin-bottom: 14px;
  }
  .operation-btns {
    margin-bottom: 14px;
  }
  ::v-deep .el-table th {
    background-color: #e6ebfb !important;
    color: #000;
  }
}
.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>

