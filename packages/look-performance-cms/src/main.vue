<template>
  <div class="main">
    <div class="main-nav">
      <h4>绩效考核组件管理</h4>
      <div class="nav-container">
        <div
          v-for="(nav, index) in navs"
          :key="nav.id"
          :class="['nav-item', currentNavIndex === index ? 'nav-item-active' : '']"
          @click="toggleNav(nav, index)">
          {{ nav.name }}
        </div>
      </div>
    </div>
    <div class="main-content">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import ManageAdjustment from './components/manage-adjustment.vue';
import ManageApplication from './components/manage-application.vue';
import ManageIndicator from './components/manage-indicator.vue';
import ManageScheme from './components/manage-scheme.vue';

export default {
  name: 'look-performance-cms',
  components: {
    ManageAdjustment,
    ManageApplication,
    ManageIndicator,
    ManageScheme,
  },
  data() {
    return {
      currentComponent: 'ManageApplication',
      currentNavIndex: 0,
      navs: [
        {
          name: '考核应用管理',
          id: 'ManageApplication',
        },
        {
          name: '考核方案管理',
          id: 'ManageScheme',
        },
        {
          name: '考核指标配置管理',
          id: 'ManageIndicator',
        },
        {
          name: '考核结果干预',
          id: 'ManageAdjustment',
        },
      ],
    };
  },
  props: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    toggleNav(nav, index) {
      this.currentComponent = nav.id;
      this.currentNavIndex = index;
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  display: flex;
  background-color: #f0f2f5;
  height: 100%;
  .main-nav {
    width: 300px;
    background-color: #fff;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    margin-right: 10px;
    h4 {
      margin: 10px 10px 0;
      padding-left: 20px;
      font-size: 18px;
    }
    .nav-container {
      padding: 10px;
      .nav-item {
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
        &.nav-item-active {
          background-color: #edf6ff;
          color: #3083ff;
        }
      }
    }
  }
  .main-content {
    width: calc(100% - 310px);
    background-color: #fff;
  }
}
</style>
