<template>
  <div class="look-associated-attachment">
    <div class="top-container">
      <div class="left-container">
        <div
          v-for="(item, index) in data"
          :key="index"
          :class="['list-item', currentIndex === index ? 'list-item-actived' : '']"
          @click="handleClick(index)"
        >
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
          <el-table-column prop="srcfilename" label="文件名"> </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottom-container">
      <div class="btn-area">
        <el-button 
          type="info" 
          plain
          @click="onPrevious"
        >
          上一步
        </el-button>
        <el-button 
          class="lookui-btn" 
          type="primary"
          :disabled="isConfirm"
          @click="onConfirm"
        >
        确定
      </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {searchAttachment} from '../../../utils/api'
export default {
  name: 'look-associated-attachment',
  components: {},
  data() {
    return {
      multipleSelection: [],
      tableData: [],
      currentIndex: 0
    };
  },
  props: { 
    data: {
      type: Array,
      default: () => [],
    },
    url: String
  },
  computed: {
    isConfirm() {
      return this.multipleSelection.length === 0
    }
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        if(Array.isArray(oldVal) && oldVal.length === 0 && newVal.length) {
          this.searchAttachment();
        }
        if(Array.isArray(newVal) && newVal.length === 0) {
          this.tableData = []
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {

  },
  mounted() {},
  methods: {
    async searchAttachment() {
      const {procInstId} = this.data[this.currentIndex]
      const formData = {
        cpdPdf: '1',
        procInstId,
        type: 'fwOrsw',
        wjid: ''
      }
      const res = await searchAttachment(this.url, formData)
      const {code, data} = res.data
      if(code === 0) {
        this.tableData = data.data
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(index) {
      this.currentIndex = index;
      this.searchAttachment();
    },
    onPrevious() {
      this.$emit('previous', this.multipleSelection)
    },  
    onConfirm() {
      this.$emit('confirm', this.multipleSelection)
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
