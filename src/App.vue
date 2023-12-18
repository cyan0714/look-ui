<template>
  <div class="app">
    <!-- 弹窗模式需要给高度 -->
    <!-- <el-dialog
      class="dulplicate-checking-popup"
      title="批量导入结果"
      width="80%"
      top="5vh"
      :visible="true"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <div class="dulplicate-checking-content">
        <look-dulplicate-checking
          :data="data"
          @merging-click="mergingClick"
          @subscription-click="subscriptionClick"
          @insertion-click="insertionClick" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary"> 创建任务 </el-button>
      </div>
    </el-dialog> -->
    <look-dulplicate-checking
      :data="data"
      searchRepeatedUrl="http://192.168.230.186:7076"
      @createTasks="createTasks"
      @merging-click="mergingClick"
      @subscription-click="subscriptionClick"
      @insertion-click="insertionClick"
      @name-click="nameClick"
      @checking-name-click="checkingNameClick"
      @detail-click="detailClick"
      @relation-click="relationClick"
      @onCancelBtnClick="handleCancelBtnClick"
      >
        <!-- <template v-slot:operating-btns="slotProps">
          <el-button size="small" @click="handleDiyBtnClick(slotProps)">自定义按钮</el-button>
        </template> -->
    </look-dulplicate-checking>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allCheckingResultList: [],
      data: [
        {
          taskId: '1',
          name: '三亚市第一艘海洋休闲渔船',
          checked: false,
          tenantId: '4602000038',
          status: '',
          checkResultListLength: 0,
        },
        {
          taskId: '2',
          name: '事项工作内容',
          checked: false,
          tenantId: '4602000038',
          status: '已插入',
          checkResultListLength: 0,
          relation:
            '《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》', 
        },
        {
          taskId: '3',
          name: '琼海',
          checked: false,
          tenantId: '4602000038',
          checkResultListLength: 0,
          status: '', // 已处理任务的状态
          relation:
            '《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》', // 已处理任务的关联任务的名字
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
      })
      console.log('取消', item)
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
    mergingClick(row) {
      console.log('归并', row);
    },
    nameClick(row) {
      console.log('标题', row);
    }
  },
};
</script>
<style lang="scss" scope>
.app {
  height: 100%;
}
.dulplicate-checking-popup {
  ::v-deep .el-dialog__header {
    padding: 10px !important;
    background-color: #506eda;

    .el-dialog__title {
      color: #fff;
    }
  }

  .el-dialog__headerbtn {
    top: 15px;
    .el-dialog__close {
      color: #fff;
    }
  }
}
::v-deep .el-dialog__body {
  padding: 0;
}

::v-deep .el-dialog__footer {
  padding: 10px 20px;
  border-top: 1px solid #ddd;
}

.dulplicate-checking-content {
  height: 700px;
  overflow: auto;
  padding: 20px;
}
</style>
