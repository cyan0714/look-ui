<template>
  <div class="look-associated-document">
    <div class="left-container">
      <div class="header">
        <div class="range-area">
          <span class="txt">范围:</span>
          <div class="btn-item-wrap">
            <div
              v-for="(item, index) in range"
              :class="['btn-item', currentIndex === index ? 'btn-item-actived' : '']"
              :key="index"
              @click="handleClick(index)">
              {{ item }}
            </div>
          </div>
        </div>
        <div class="search-area">
          <el-input
            class="lookui-input"
            v-model="keywords"
            placeholder="请输入公文标题"
            clearable
          />
          <el-button class="lookui-btn" type="primary" @click="handleQuery">查询</el-button>
        </div>
      </div>
      <div 
        v-loading="loading"
        class="list-area"
      >
        <div 
          class="list-area__content"
          v-if="list.length"
        >
          <div 
            v-for="(item, index) in list" 
            :key="index"
            class="la-item"
          >
            <div class="li-top">
            <div class="lt-left">
              <div :class="['ll-type', item.type === 0 ? 'receive' : 'send']">
                {{ item.type === 0 ? '收文' : '发文' }}
              </div>
              <div class="ll-title">{{ item.title }}</div>
            </div>
            <div class="lt-right">
              <div
                  v-if="isSelected(item.url)"
                  class="lr-status" 
                >
                <i class="el-icon-check"></i>
                <span>已关联</span>
              </div>
              <div 
                v-else
                class="lr-status-button"
                @click="addAssociation(item)"
              >
              添加关联
            </div>
            </div>
            </div>
            <div class="li-bottom">
            <div class="lb-unit">来文单位：{{ item.unit }}</div>
            <div class="lb-time">收文时间：{{ item.time }}</div>
            </div>
          </div>
        </div>  
        <section 
          v-else
          class="list-area--empty"
        >
          <look-empty />
        </section>
      </div>
      <div class="pagination-area">
        <el-pagination
          class="lookui-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage"
          background>
        </el-pagination>
      </div>
    </div>
    <div class="right-container">
      <div class="list-area">
        <div class="list-area-item" v-for="(item, index) in selectedList" :key="index">
          <p>{{ item.title }}</p>
          <i 
            class="el-icon-close close-btn"
            @click="deleteAssociation(item)"
          >
          </i>
        </div>
      </div>
      <div class="btn-area">
        <el-button 
          type="info" 
          plain
          @click="clearAssociation"
          >
          清空
        </el-button>
        <el-button 
        class="lookui-btn" 
        type="primary"
        @click="nextStep"
        >
        确定
      </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  searchUnit,
  searchPersonal
} from '../../../utils/api'
export default {
  name: 'look-associated-document',
  components: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalPage: 0,
      currentIndex: 0,
      selectedList: this.selectedData,
      range: ['个人', '部门', '单位'],
      keywords: '',
      list: [],
      loading: false,
      selectedDataMap: new Map()
    };
  },
  props: {
    url: String,
    ticket: String,
    selectedData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    
  },
  created() {
    this.selectedData.forEach(item => {
      this.selectedDataMap.set(item.url, item)
    })
    this.getData()
  },
  mounted() {},
  methods: {
    async getData() {
      try{
        this.loading = true
        const {
          url,
          currentPage: page, 
          pageSize,
          keywords: title
        } = this
        let res = {}
        const formData =  {
          flowTypeSearch: 'fwOrsw',
          page,
          pageSize,
          title,
          typeSearch: this.currentIndex !== 0 ? 'chuShiZhaoWen' : void 0
        }
        if(this.currentIndex !== 2) {
          res = await searchPersonal(url, formData, this.ticket)
        }else {
          res = await searchUnit(url, formData, this.ticket)
        }
        const {code, data} = res.data
        if(code === 0) {
          const {
            total, 
            data: list
          } = data
          this.totalPage = total
          this.list = list.map(item => {
            const {
              title,
              showTime: time,
              sfwflag: type,
              lwdw: unit,
              status = 1,
              ...others
            } = item
            return {
              title,
              time,
              type,
              unit,
              status,
              ...others
            }
          })
        }
      } finally {
        this.loading = false
      }
    },
    async handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      await this.getData()
      this.$emit('sizeChange', val, this.list)
    },
    async handleCurrentChange(val) {
      this.currentPage = val
      await this.getData()
      this.$emit('currentChange', val, this.list)
    },
    async handleClick(index) {
      this.currentIndex = index;
      await this.getData()
      this.$emit('tab-click', {
        value: index,
        name: this.range[index]
      }, this.list)
    },
    async handleQuery() {
      await this.getData()
      this.$emit('search', this.keywords, this.list)
    },
    isSelected(key) {
      return this.selectedDataMap.has(key)
    },
    addAssociation(item) {
      this.selectedDataMap.set(item.url, item)
      this.selectedList.push(item)
      this.$emit('update:selectedData', this.selectedList)
      this.$emit('add', item, this.selectedList)
    },
    deleteAssociation(params) {

      if(this.selectedDataMap.has(params.url)) {
        this.selectedDataMap.delete(params.url)
      }

      this.selectedList = this.selectedList.filter(item => item.url !== params.url)
      this.$emit('update:selectedData', this.selectedList)
      this.$emit('delete', params, this.selectedList)
    },
    clearAssociation() {
      this.selectedList.forEach(item => {
        this.selectedDataMap.delete(item.url)
      })
      this.selectedList = []
      this.$emit('update:selectedData', this.selectedList)
      this.$emit('clear', this.selectedList)
    },
    nextStep() {
      this.$emit('next', this.selectedList)
    }
  },
};
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.look-associated-document {
  display: flex;
  height: 100%;
  .left-container {
    width: 70%;
    height: 100%;
    background-color: #fff;
    padding: 12px;
    .header {
      display: flex;
      justify-content: space-between;
      .range-area {
        display: flex;
        align-items: center;
        .btn-item-wrap {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          border: 1px solid #d9d9d9;
          border-left: none;
          margin-left: 10px;
          border-radius: 2px;
          .btn-item {
            padding: 4px 16px 6px;
            cursor: pointer;
            border-left: 1px solid #d9d9d9;
            &.btn-item-actived {
              background-color: #506eda;
              color: #fff;
            }
          }
        }
      }

      .search-area {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        .lookui-input {
          width: 250px;
          ::v-deep .el-input__inner {
            height: 34px;
          }
          ::v-deep .el-input__icon {
            line-height: 34px;
          }
        }
        .lookui-btn {
          padding: 9px 18px;
          border-radius: 0;
        }
      }
    }
    .list-area {
      height: calc(100% - 86px);
      margin-top: 20px;
      .la-item {
        padding: 14px 20px;
        border: 1px solid #ebf4fd;
        margin-bottom: 10px;
        .li-top {
          display: flex;
          justify-content: space-between;
          .lt-left {
            display: flex;
            align-items: flex-start;
            .ll-type {
              height: 24px;
              line-height: 24px;
              flex-shrink: 0;
              font-size: 15px;
              margin-right: 10px;
              padding: 0 8px;
              border-radius: 2px;
              &.receive {
                color: #1da595;
                background-color: #b3f0b3;
              }
              &.send {
                color: #506eda;
                background-color: #c8d9fe;
              }
            }
            .ll-title {
              font-size: 16px;
              color: #000;
              font-weight: bold;
              line-height: 24px;
            }
          }
          .lt-right {
            min-width: 88px;
            height: 24px;
            line-height: 24px;
            flex-shrink: 0;
            display: flex;
            .lr-status {
              display: flex;
              align-items: center;
              font-size: 15px;
              color: #1da595;
              i {
                margin-right: 5px;
              }
            }
            .lr-status-button {
              padding: 0 12px;
              border-radius: 2px;
              background-color: #d9f0f0;
              color: #1da595;
              cursor: pointer;
            }
          }
        }
        .li-bottom {
          display: flex;
          margin-top: 14px;
          font-size: 15px;
          color: #666;
          .lb-unit {
          }
          .lb-time {
            margin-left: 50px;
          }
        }
      }
      &__content,
      &--empty {
        height: 100%;
      }
      &__content {
        overflow: auto;
      }
      &--empty {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .pagination-area {
      display: flex;
      justify-content: flex-end;
    }
  }
  .right-container {
    width: 30%;
    height: 100%;
    padding: 20px 12px 0;
    background-color: #eeeeee;
    .list-area {
      height: calc(100% - 76px);
      .list-area-item {
        position: relative;
        padding: 10px 40px 10px 10px;
        margin-bottom: 10px;
        border: 2px solid #09f;
        border-radius: 4px;
        font-size: 15px;
        color: #000;
        background-color: #ebf3fe;
        p {
          margin: 0;
          display: -webkit-box;
          word-break: break-all;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        i.close-btn {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          line-height: 20px;
          height: 24px;
          text-align: center;
          border-bottom-left-radius: 50%;
          font-size: 14px;
          background-color: #09f;
          color: #fff;
          cursor: pointer;
        }
      }
    }
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
