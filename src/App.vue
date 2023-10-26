<template>
  <div class="app">
    <look-dulplicate-checking
      :data="data"
      @merging-click="mergingClick"
      @subscription-click="subscriptionClick"
      @insertion-click="insertionClick"/>
  </div>
</template>

<script>
import { searchRepeated } from '../utils/api.js';
export default {
  data() {
    return {
      allCheckingResultList: [],
      data: [
        {
          taskId: '1',
          name: '三亚市第一艘海洋休闲渔船海洋休闲渔船',
          checked: false,
          tenantId: '4602000038',
          checkResultListLength: 0,
          status: '已关注',
          relation: '《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》', // 已处理任务的关联任务的名字
        },
        {
          taskId: '2',
          name: '事项工作内容',
          checked: false,
          tenantId: '4602000038',
          checkResultListLength: 0,
        },
        {
          taskId: '3',
          name: '琼海',
          checked: false,
          tenantId: '4602000038',
          checkResultListLength: 0,
          status: '已关注', // 已处理任务的状态
          relation: '《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》', // 已处理任务的关联任务的名字
        },
      ],
    };
  },
  created() {
  },
  computed: {
  },
  methods: {
    insertionClick(row) {
      console.log('插入', row)
    },
    subscriptionClick(row) {
      console.log('关注', row)
    },
    mergingClick(row) {
      console.log(row,'hh')
    },

  },
};
</script>
<style>
.app {
  height: 100%;
}
</style>
