<template>
  <look-dulplicate-checking
    :data="data"
    searchRepeatedUrl="http://192.168.230.186:7076"
    isShowCustomSource
    isShowBtnsInHadDealMission
    :customSource="customSource"
    :customNames="['taskType']"
    @createTasks="createTasks"
    @merging-click="mergingClick"
    @subscription-click="subscriptionClick"
    @insertion-click="insertionClick"
    @name-click="nameClick"
    @checking-name-click="checkingNameClick"
    @detail-click="detailClick"
    @relation-click="relationClick"
    @relation-row-click="relationRowClick"
    @onCancelBtnClick="handleCancelBtnClick"
    @on-cancel-row-btn-click="onCancelRowBtnClick">
  </look-dulplicate-checking>
</template>

<script>
export default {
  data() {
    return {
      allCheckingResultList: [],
      customSource: {
        label: '自定义来源',
        checkboxs: [
          {
            key: '工作落实',
            value: 'gzls',
            checked: true,
            style: {
              color: '#f00',
              backgroundColor: '#fee5e5',
            },
          },
          {
            key: '重点项目',
            value: 'zdxm',
            checked: false,
            style: {
              color: '#fe8432',
              backgroundColor: '#fff5e6',
            },
          },
        ],
      },
      data: [
        // 重点项目测试数据
        // { taskId: '1', name: '三亚市西水中调项目一期', tenantId: '4602000038', checked: false, },
        {
          taskId: '1',
          name: '三亚市第一艘海洋休闲渔船',
          checked: false,
          tenantId: '4602000038',
          status: '已关联',
          checkResultListLength: 0,
          isShowViewBtn: 0,
          relations: [
            {
              name: 'globe forest from earlier connected hangglobe forest from earlier connected hangglobe forest from earlier connected hangglobe forest from earlier connected hangglobe forest from earlier connected hang',
              id: 1
            },
            {
              name: '新需求',
              id: 2
            },
          ]
        },
        {
          taskId: '2',
          name: '事项工作内容',
          checked: false,
          tenantId: '4602000038',
          status: '已插入',
          checkResultListLength: 0,
          relation:
            '《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》',
        },
        {
          taskId: '3',
          name: '琼海',
          checked: false,
          tenantId: '4602000038',
          checkResultListLength: 0,
          status: '已创建', // 已处理任务的状态
          relation:
            '《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》', // 已处理任务的关联任务的名字
        },
        {
          name: '0131全是重大任务',
          taskId: '1',
          taskType: '101',
          tenantId: '20221129',
          checked: false,
          status: '',
        },
        {
          taskId: '4',
          name: 'chenshiyan',
          checked: false,
          tenantId: '4602000039',
          status: '',
          checkResultListLength: 0,
        },
      ],
    };
  },
  created() {},
  computed: {},
  methods: {
    onCancelRowBtnClick(relation, task) {
      console.log('relation', relation);
      console.log('task', task);
    },
    relationRowClick(relation, task) {
      console.log('relation', relation);
      console.log('task', task);
    },
    relationClick(task) {
      console.log('relation', task);
    },
    createTasks(task) {
      console.log('task', task);
    },
    checkingNameClick(row) {
      console.log('查重结果详情', row);
    },
    handleCancelBtnClick(item) {
      this.data.forEach((task, index) => {
        if (task.taskId === item.taskId) {
          this.data[index].status = '';
        }
      });
      console.log('取消', item);
    },
    handleDiyBtnClick(row) {
      console.log('自定义按钮', row);
    },
    detailClick(row) {
      console.log('详情', row);
    },
    insertionClick(row) {
      console.log('插入', row);
    },
    subscriptionClick(row, instance) {
      console.log('关注', row, instance);
    },
    mergingClick(row,row2) {
      console.log('归并', row);
      console.log('归并2', row2);
    },
    nameClick(row) {
      console.log('标题', row);
    },
  },
};
</script>

