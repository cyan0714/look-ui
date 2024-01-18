<template>
  <div class="look-associated-attachment">
    <div class="top-container">
      <div class="left-container">
        <div
          v-for="(item, index) in list"
          :key="index"
          :class="['list-item', currentIndex === index ? 'list-item-actived' : '']"
          @click="handleClick(index)">
          <div :class="['li-type', item.type === 0 ? 'receive' : 'send']">
            {{ item.type === 0 ? '收文' : '发文' }}
          </div>
          <div class="li-title">{{ item.title }}</div>
        </div>
      </div>
      <div class="right-container">
        <el-table
          ref="multipleTable"
          class="lookui-table"
          :data="tableData"
          tooltip-effect="dark"
          height="100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="name" label="文件名"> </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottom-container">
      <div class="btn-area">
        <el-button type="info" plain>上一步</el-button>
        <el-button class="lookui-btn" type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'look-associated-attachment',
  components: {},
  data() {
    return {
      multipleSelection: [],
      tableData: [
        {
          name: '呈批单.pdf',
        },
        {
          name: '来文正文.doc',
        },
        {
          name: '来文附件.pdf',
        },
        {
          name: '呈批单.pdf',
        },
        {
          name: '来文正文.doc',
        },
        {
          name: '来文附件.pdf',
        },
      ],
      currentIndex: 0,
      range: [
        {
          name: '个人',
          id: 1,
        },
        {
          name: '部门',
          id: 2,
        },
        {
          name: '单位',
          id: 3,
        },
      ],
      keywords: '',
      selectedList: [
        {
          title: '关于印发《海南省人民政府办公厅关于印发海南省人民政府2021年立法计划的通知》的通知',
        },
        {
          title:
            '关于印发《海南省人民政府办公厅关于印发海南省人民政府2021年立法计划的通知》的通知南省人民政府办公厅关于印发海南省人民政府2021年立法计划的通知》的通知南省人民政府办公厅关于印发海南省人民政府2021年立法计划的通知》的通知',
        },
      ],
      list: [
        {
          type: 0, // 0收文，1发文
          title: '关于印发《海南省人民政府办公厅关于印发海南省人民政府2021年立法计划的通知》的通知',
          unit: '海南省人民政府办公厅',
          time: '2021-01-01 12:14',
          status: 0, // 0已关联 1未关联
        },
        {
          type: 1, // 0收文，1发文
          title: '关于印发《海南省人民政府办公厅关于印发海南省人民政府2021年立法计划的通知》的通知',
          unit: '海南省人民政府办公厅',
          time: '2021-01-01 12:14',
          status: 1, // 0已关联 1未关联
        },
        {
          type: 0, // 0收文，1发文
          title: '关于印发《海南省人民政府办公厅关于印发海南省人民政府2021年立法计划的通知》的通知',
          unit: '海南省人民政府办公厅',
          time: '2021-01-01 12:14',
          status: 0, // 0已关联 1未关联
        },
        {
          type: 1, // 0收文，1发文
          title: '关于印发《海南省人民政府办公厅关于印发海南省人民政府2021年立法计划的通知》的通知',
          unit: '海南省人民政府办公厅',
          time: '2021-01-01 12:14',
          status: 1, // 0已关联 1未关联
        },
        {
          type: 0, // 0收文，1发文
          title: '关于印发《海南省人民政府办公厅关于印发海南省人民政府2021年立法计划的通知》的通知',
          unit: '海南省人民政府办公厅',
          time: '2021-01-01 12:14',
          status: 0, // 0已关联 1未关联
        },
        {
          type: 1, // 0收文，1发文
          title: '关于印发《海南省人民政府办公厅关于印发海南省人民政府2021年立法计划的通知》的通知',
          unit: '海南省人民政府办公厅',
          time: '2021-01-01 12:14',
          status: 1, // 0已关联 1未关联
        },
        {
          type: 0, // 0收文，1发文
          title: '关于印发《海南省人民政府办公厅关于印发海南省人民政府2021年立法计划的通知》的通知',
          unit: '海南省人民政府办公厅',
          time: '2021-01-01 12:14',
          status: 0, // 0已关联 1未关联
        },
        {
          type: 1, // 0收文，1发文
          title: '关于印发《海南省人民政府办公厅关于印发海南省人民政府2021年立法计划的通知》的通知',
          unit: '海南省人民政府办公厅',
          time: '2021-01-01 12:14',
          status: 1, // 0已关联 1未关联
        },
      ],
    };
  },
  props: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(index) {
      this.currentIndex = index;
    },
    handleQuery() {
      // if (this.keywords.trim() === '') {
      //   this.toggleTag(this.currentMissionType)
      //   return
      // }
      // this.checkingResultList = this.checkingResultList.filter(item => item.name.includes(this.keywords.trim()))
    },
  },
};
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.look-associated-attachment {
  height: 100%;
  .top-container {
    display: flex;
    height: 100%;
    padding: 20px;
    .left-container {
      width: 30%;
      height: 100%;
      overflow: auto;
      background-color: #fff;
      border: 1px solid #d9d9d9;
      &::-webkit-scrollbar-track-piece {
        background-color: transparent;
      }
      &::-webkit-scrollbar {
        width: 6px;
        height: 10px;
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: #d7d7d7;
      }
      .list-item {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        border-bottom: 1px solid #d9d9d9;
        padding: 10px;
        cursor: pointer;
        &.list-item-actived {
          background-color: #f5f7fa;
          .li-title {
            color: #506eda;
          }
        }
        &:last-child {
          border-bottom: none;
        }
        .li-type {
          font-size: 15px;
          margin-right: 10px;
          padding: 2px 8px 4px;
          border-radius: 4px;
          flex-shrink: 0;
          &.receive {
            color: #1da595;
            background-color: #b3f0b3;
          }
          &.send {
            color: #506eda;
            background-color: #c8d9fe;
          }
        }
        .li-title {
          font-size: 16px;
          color: #000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .right-container {
      width: 70%;
      height: 100%;
      padding: 14px 12px;
      background-color: #fff;
      border: 1px solid #d9d9d9;
      ::v-deep .el-table {
        ::-webkit-scrollbar-track-piece {
          background-color: transparent;
        }
        ::-webkit-scrollbar {
          width: 6px;
          height: 10px;
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 5px;
          background-color: #d7d7d7;
        }
      }
    }
  }
  .bottom-container {
    .btn-area {
      padding: 20px 12px;
      display: flex;
      justify-content: center;
      .el-button {
        padding: 10px 20px;
        border-radius: 0;
      }
    }
  }
}
</style>
