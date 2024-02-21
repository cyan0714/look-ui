<template>
  <div class="manage-application">
    <header class="header-container">
      <div class="name">绩效考核应用管理</div>
    </header>
    <section class="section-container">
      <el-form :inline="true" :model="form" class="form-inline">
        <el-form-item label="应用名称">
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
        <el-button class="lookui-btn" type="primary" size="medium" icon="el-icon-plus"
          >新增</el-button
        >
      </div>
      <el-table :data="tableData" style="width: 100%" class="lookui-table">
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
            <el-button size="mini" type="text" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          class="lookui-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background>
        </el-pagination>
      </div>
    </section>
  </div>
</template>

<script>
const baseUrl = 'http://192.168.10.28:7078';
import { add, getList } from '../api/manage-application';
export default {
  name: 'manage-application',
  components: {},
  data() {
    return {
      pageSize: 10,
      total: 0,
      currentPage: 1,
      form: {},
      tableData: [],
    };
  },
  computed: {},
  created() {},
  mounted() {
    this._getList();
  },
  methods: {
    handleUpdate() {},
    handleTenant() {},
    _getList() {
      getList(baseUrl, { app: {}, current: 1, pageSize: 10 }).then(res => {
        this.tableData = res.data.data.records;
        this.total = res.data.data.total;
        console.log('res', res);
      });
      const params = {
        appName: 'test',
        appId: 'testId',
        appKeySecret: 'xxxx',
        url: 'http://www.baidu.com',
      }
      add(params).then(res => {
        console.log('add', res);
      })
    },
    handleQuery() {},
    handleCurrentChange() {},
    handleSizeChange() {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
