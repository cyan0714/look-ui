<template>
  <div class="manage-application manage-cms">
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
        <el-button
          class="lookui-btn"
          type="primary"
          size="medium"
          icon="el-icon-plus"
          @click="handleAdd"
          >新增</el-button
        >
      </div>
      <el-table v-loading="loadingApplication" :data="tableData" :max-height="maxHeight" style="width: 100%" class="lookui-table">
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

      <!-- 应用管理新增、修改应用弹窗 -->
      <el-dialog
        :title="`${currentOperation}应用`"
        class="lookui-dialog"
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
          <el-button type="primary" @click="handleConfirmAdd">提交</el-button>
          <el-button @click="handleCancelAdd">关闭</el-button>
        </span>
      </el-dialog>

      <!-- 租户管理弹窗 -->
      <el-dialog
        title="租户管理"
        width="70%"
        top="100px"
        class="lookui-dialog"
        destroy-on-close
        append-to-body
        :visible.sync="dialogTenantVisible">
        <el-form :inline="true" ref="formTenant" :model="formTenant" class="form-inline">
          <el-form-item label="租户名称" prop="tenantName">
            <el-input v-model="formTenant.tenantName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="lookui-btn"
              type="primary"
              size="medium"
              icon="el-icon-search"
              @click="handleTenantQuery"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
        <div class="operation-btns">
          <el-button
            class="lookui-btn"
            type="primary"
            size="medium"
            icon="el-icon-plus"
            @click="handleTenantAdd"
            >新增</el-button
          >
        </div>
        <el-table v-loading="loadingTenant" :data="tableTenantData" height="530" style="width: 100%" class="lookui-table">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="tenantName" label="租户名称" align="center"></el-table-column>
          <el-table-column prop="tenantId" label="租户ID" align="center"></el-table-column>
          <el-table-column prop="schemeName" label="方案名称" align="center"></el-table-column>
          <el-table-column prop="schemeId" label="方案ID" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleTenantUpdate(scope.row)"
                >修改</el-button
              >
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleTenantRemove(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            class="lookui-pagination"
            @size-change="handleTenantSizeChange"
            @current-change="handleTenantCurrentChange"
            :current-page="queryTenantParams.current"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="queryTenantParams.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalTenant"
            background>
          </el-pagination>
        </div>
      </el-dialog>

      <!-- 租户管理新增、修改应用弹窗 -->
      <el-dialog
        :title="`${currentTenantOperation}租户`"
        class="lookui-dialog"
        width="40%"
        destroy-on-close
        append-to-body
        :visible.sync="dialogTenantUpdateVisible">
        <el-form
          ref="formTenantAdd"
          :rules="rulesTenant"
          :model="formTenantAdd"
          label-width="100px">
          <el-form-item label="租户名称" prop="tenantName">
            <el-input v-model="formTenantAdd.tenantName"></el-input>
          </el-form-item>
          <el-form-item label="租户ID" prop="tenantId">
            <el-input v-model="formTenantAdd.tenantId"></el-input>
          </el-form-item>
          <el-form-item label="方案名称" prop="schemeName">
            <el-input v-model="formTenantAdd.schemeName"></el-input>
          </el-form-item>
          <el-form-item label="方案ID" prop="schemeId">
            <el-input v-model="formTenantAdd.schemeId"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleConfirmTenantAdd">提交</el-button>
          <el-button @click="handleCancelTenantAdd">关闭</el-button>
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import {
  add,
  detail,
  getList,
  remove,
  getTenantList,
  addTenant,
  detailTenant,
  removeTenant,
} from '../api/manage-application';
export default {
  name: 'manage-application',
  components: {},
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
  data() {
    return {
      currentAppId: '',
      loadingApplication: true,
      loadingTenant: true,
      dialogVisible: false,
      dialogTenantVisible: false,
      dialogTenantUpdateVisible: false,
      rules: {
        appName: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
        appId: [{ required: true, message: '请输入应用APPID', trigger: 'blur' }],
        appKeySecret: [{ required: true, message: '请输入密钥', trigger: 'blur' }],
        url: [{ required: true, message: '请输入跳转地址', trigger: 'blur' }],
      },
      rulesTenant: {
        tenantName: [{ required: true, message: '请输入租户名称', trigger: 'blur' }],
        tenantId: [{ required: true, message: '请输入租户ID', trigger: 'blur' }],
        schemeName: [{ required: true, message: '请输入方案名称', trigger: 'blur' }],
        schemeId: [{ required: true, message: '请输入方案ID', trigger: 'blur' }],
      },
      formAdd: {
        appName: '',
        appId: '',
        appKeySecret: '',
        url: '',
      },
      formTenantAdd: {
        tenantName: '',
        tenantId: '',
        schemeName: '',
        schemeId: '',
      },
      total: 0,
      totalTenant: 0,
      queryParams: {
        app: {
          appName: '',
        },
        current: 1,
        pageSize: 10,
      },
      queryTenantParams: {
        data: {
          tenantName: '',
          appId: '',
        },
        current: 1,
        pageSize: 10,
      },
      form: {
        appName: '',
      },
      formTenant: {
        tenantName: '',
      },
      currentOperation: '新增',
      currentTenantOperation: '新增',
      tableData: [],
      tableTenantData: [],
    };
  },
  computed: {},
  created() {},
  mounted() {
    this._getList();
  },
  methods: {
    // 获取应用列表
    _getList() {
      this.loadingApplication = true;
      getList(this.baseUrl, this.token, this.queryParams).then(res => {
        this.loadingApplication = false;
        this.tableData = res.data.data.records;
        this.total = res.data.data.total;
      });
    },
    // 删除某条应用
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
    // 新增应用
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
    // 确认新增应用
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
    // 搜索应用
    handleQuery() {
      this.queryParams = {
        app: this.form,
        current: 1,
        pageSize: 10,
      };
      this._getList();
    },
    handleCancelAdd() {
      this.dialogVisible = false;
    },
    handleCancelTenantAdd() {
      this.dialogTenantUpdateVisible = false;
    },
    // 租户管理
    handleTenant(row) {
      this.dialogTenantVisible = true;
      this.currentAppId = row.appId;
      this._getTenantList(this.currentAppId);
    },
    // 删除某个应用下的某个租户
    handleTenantRemove(row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          removeTenant(this.baseUrl, this.token, row.id).then(res => {
            if (res.data.code === '000000') {
              this.$message.success('删除成功');
            } else {
              this.$message.error(res.data.mesg);
            }
            this.queryTenantParams.current = 1;
            this._getTenantList(this.currentAppId);
          });
        })
        .catch(() => {});
    },
    // 修改某个应用下的某个租户
    handleTenantUpdate(row) {
      this.currentTenantOperation = '修改';
      this.dialogTenantUpdateVisible = true;
      detailTenant(this.baseUrl, this.token, row.id).then(res => {
        this.formTenantAdd = res.data.data;
      });
    },
    // 新增租户
    handleTenantAdd() {
      this.currentTenantOperation = '新增';
      this.dialogTenantUpdateVisible = true;
      this.formTenantAdd = {
        tenantName: '',
        tenantId: '',
        schemeName: '',
        schemeId: '',
      };
    },
    // 确认新增租户
    handleConfirmTenantAdd() {
      this.$refs.formTenantAdd.validate(valid => {
        if (valid) {
          this.formTenantAdd.appId = this.currentAppId;
          if (this.currentTenantOperation === '新增') {
            addTenant(this.baseUrl, this.token, this.formTenantAdd).then(res => {
              if (res.data.code === '000000') {
                this.$message.success('新增成功');
              } else {
                this.$message.error(res.data.mesg);
              }
              this.queryTenantParams.current = 1;
              this._getTenantList(this.currentAppId);
            });
          } else {
            addTenant(this.baseUrl, this.token, this.formTenantAdd).then(res => {
              if (res.data.code === '000000') {
                this.$message.success('修改成功');
              } else {
                this.$message.error(res.data.mesg);
              }
              this.queryTenantParams.current = 1;
              this._getTenantList(this.currentAppId);
            });
          }
          this.dialogTenantUpdateVisible = false;
        } else {
          return false;
        }
      });
    },
    // 修改某个应用
    handleUpdate(row) {
      this.currentOperation = '修改';
      this.dialogVisible = true;
      detail(this.baseUrl, this.token, row.id).then(res => {
        this.formAdd = res.data.data;
      });
    },
    // 获取租户列表
    _getTenantList(id) {
      this.loadingTenant = true;
      this.queryTenantParams.data.appId = id;
      getTenantList(this.baseUrl, this.token, this.queryTenantParams).then(res => {
        this.loadingTenant = false;
        this.tableTenantData = res.data.data.records;
        this.totalTenant = res.data.data.total;
      });
    },
    // 搜索租户
    handleTenantQuery() {
      this.queryTenantParams = {
        data: {
          tenantName: this.formTenant.tenantName,
          appId: this.currentAppId,
        },
        current: 1,
        pageSize: 10,
      };
      this._getTenantList(this.currentAppId);
    },
    // 应用列表当前页变化
    handleCurrentChange(current) {
      this.queryParams.current = current;
      this._getList();
    },
    // 应用列表 pageSize 变化
    handleSizeChange(pageSize) {
      this.queryParams.pageSize = pageSize;
      this.queryParams.current = 1;
      this._getList();
    },
    // 租户列表当前页变化
    handleTenantCurrentChange(current) {
      this.queryTenantParams.current = current;
      this._getTenantList(this.currentAppId);
    },
    // 租户列表 pageSize 变化
    handleTenantSizeChange(pageSize) {
      this.queryTenantParams.pageSize = pageSize;
      this.queryTenantParams.current = 1;
      this._getTenantList(this.currentAppId);
    },
    // 重置应用表单搜索条件
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.handleQuery();
    },
  },
};
</script>

<style lang="scss" src="../css/common.scss"></style>
