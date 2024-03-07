<template>
  <look-dulplicate-checking
    :data="data"
    searchRepeatedUrl="http://192.168.230.186:7076"
    isShowCustomSource
    isShowBtnsInHadDealMission
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
import { data } from './constants/test';
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
      data,
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

