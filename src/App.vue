<template>
  <div class="app">
      <div class="menu-container" style="">
        <el-menu
          router
          default-active="1"
          class="el-menu-vertical-demo" >
          <el-menu-item index="/look-dulplicate-checking">
            <i class="el-icon-menu"></i>
            <span slot="title">查重组件</span>
          </el-menu-item>
          <el-menu-item index="/look-performance-cms">
            <i class="el-icon-menu"></i>
            <span slot="title">绩效考核-后台</span>
          </el-menu-item>
          <el-menu-item index="/look-performance-leader">
            <i class="el-icon-document"></i>
            <span slot="title">绩效考核-领导端</span>
          </el-menu-item>
          <el-menu-item index="/look-performance-unit">
            <i class="el-icon-setting"></i>
            <span slot="title">绩效考核-责任端</span>
          </el-menu-item>
        </el-menu>
      </div>

      <router-view class="content-container"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  created() {},
  computed: {},
};
</script>
<style lang="scss" scope>
.app {
  display: flex;
  height: 100%;
  background-color: #f0f2f5;
  .menu-container {
    width: 200px;
    flex-shrink: 0;
    margin-right: 10px;
    .el-menu {
      height: 100%;
    }
  }
  .content-container {
    width: calc(100% - 210px);
  }
}
</style>
