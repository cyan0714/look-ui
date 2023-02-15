<template>
  <div class="cycle-list">
    <i class="left-arrow el-icon-arrow-left" @click="handleScrollLeft"></i>
    <div class="scroll-container">
      <div class="scroll-wrapper" ref="scrollWrapperRef">
        <div class="scroll-item" v-for="(item, index) in cycleList" :key="index" @click="handleCycleItemClick(item, index)"
          :class="{ active: currentIndex === index }">
          <span>{{ item.name }}</span>
          <span>{{ item.endTime }}</span>
        </div>
      </div>
    </div>
    <i class="right-arrow el-icon-arrow-right" @click="handleScrollRight"></i>
    <div class="show-all-container">
      <span class="show-all" @click="handleShowAllItems" ref="showAllRef">
        查看全部
      </span>
      <div class="sa-items" v-show="isShowAllItems" ref="saItemsRef">
        <h4 style="font-weight: 400; margin: 20px 30px; font-size: 16px">汇报阶段</h4>
        <div class="sa-item-container">
          <div v-for="(item, index) in cycleList" :key="index" class="sa-item" @click="handleAllCycleItemClick(item, index)">
            <span>{{ item.name }}</span>
            <span>{{ item.endTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      isShowAllItems: false,
      cycleList: [
        {
          name: '第一阶段',
          endTime: '2023-01-06 23:59'
        },
        {
          name: '第二阶段',
          endTime: '2023-01-06 23:59'
        },
        {
          name: '第三阶段',
          endTime: '2023-01-06 23:59'
        },
        {
          name: '第四阶段',
          endTime: '2023-01-06 23:59'
        },
        {
          name: '第五阶段',
          endTime: '2023-01-06 23:59'
        },
        {
          name: '第六阶段',
          endTime: '2023-01-06 23:59'
        },
        {
          name: '第七阶段',
          endTime: '2023-01-06 23:59'
        },
        {
          name: '第八阶段',
          endTime: '2023-01-06 23:59'
        },
      ],
    }
  },
  computed: {
    maxPage() {
      return Math.ceil(this.cycleList.length / 5)
    },
  },
  mounted() {
    document.body.addEventListener('click', this.handleBodyClick);
  },
  methods: {
    handleBodyClick(ev) {
      if (!ev.composedPath().includes(this.$refs.saItemsRef) && !ev.composedPath().includes(this.$refs.showAllRef)) {
        this.isShowAllItems = false;
      }
    },
    handleAllCycleItemClick(item, index) {
      this.isShowAllItems = false;
    },
    handleCycleItemClick(item, index) {
      this.currentIndex = index
    },
    handleShowAllItems() {
      this.isShowAllItems = !this.isShowAllItems
    },
    handleScrollLeft() {
      if (this.currentPage === 1) return;
      console.log('hhh');
      // console.log(JSON.parse(JSON.stringify('hhhh')))
      this.$refs.scrollWrapperRef.style.left = Number.parseInt(this.$refs.scrollWrapperRef.style.left) + this.ONEGROUPWIDTH + 'px'
      this.currentPage--
    },
    handleScrollRight() {
      if (this.currentPage === this.maxPage) return
      this.$refs.scrollWrapperRef.style.left = "-" + this.currentPage * this.ONEGROUPWIDTH + 'px'
      this.currentPage++;
    },
  }
}
</script>

<style scoped lang="scss">
.cycle-list {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  border: 1px solid #dcdfe6;

  .left-arrow,
  .right-arrow,
  .show-all {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 100%;
    cursor: pointer;
    z-index: 2;
    text-align: center;
    color: $--color-primary;
  }

  .left-arrow {
    border-right: 1px solid #dcdfe6;
    font-size: 24px;
  }

  .right-arrow {
    font-size: 24px;
  }

  .right-arrow,
  .show-all {
    border-left: 1px solid #dcdfe6;
  }

  .show-all-container {
    position: relative;
    width: 40px;
    height: 100%;

    .sa-items {
      position: absolute;
      top: 69px;
      right: 0;
      width: 1120px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
      border: 1px solid #dcdfe6;
      z-index: 2;
      padding-bottom: 20px;

      .sa-item-container {
        display: flex;
        width: 100%;
        flex-wrap: wrap;

        .sa-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 160px;
          margin: 0 30px;
          border: 1px solid #dcdfe6;
          border-radius: 30px;
          margin-bottom: 20px;
          cursor: pointer;

          &:hover {
            color: $--color-primary;
            border-color: $--color-primary;
          }
        }
      }
    }
  }

  .scroll-container {
    overflow: auto;
    flex: 1;
    margin-top: 20px;

    .scroll-item {
      &.active {
        color: $--color-primary;
        border-bottom: 2px solid $--color-primary;
      }

      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      align-items: center;
      width: 130px;
      margin: 0 30px;
      padding-bottom: 8px;
      cursor: pointer;
    }
  }

  .scroll-wrapper {
    display: flex;
    position: relative;
    top: 0;
    left: 0;
    transition: all 1s;
  }
}
</style>