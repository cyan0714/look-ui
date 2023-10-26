<template>
  <div class="checking-result-item">
    <div class="content">
      <div class="title">{{ item.name }}</div>
      <div class="tags-wrap">
        <div v-for="(tag, tagIndex) in item.feature && item.feature.split(',')" :key="tagIndex" class="tag-item">
          {{ tag }}
        </div>
      </div>
      <div class="source-and-request">
        <div class="title">来源及要求:</div>
        <div class="text-area">{{ item.requirement }}</div>
      </div>
      <div class="other-info">
        <div class="left">
          <div class="leader-unit">
            <span class="key">牵头单位:</span>
            <div class="value">
              <span
                v-for="(leaderUnit, leaderUnitIndex) in qtOrgs"
                :key="leaderUnitIndex"
                class="leader-unit-item"
                >{{ leaderUnit }}{{ leaderUnitIndex === qtOrgs.length - 1 ? '' : '，' }}</span>
            </div>
          </div>
          <div class="supervise-unit">
            <span class="key">督办单位:</span>
            <div class="value">
              <span
                v-for="(superviseUnit, superviseUnitIndex) in createdOrg"
                :key="superviseUnitIndex"
                class="supervise-unit-item"
                >{{ superviseUnit }}{{ superviseUnitIndex === createdOrg.length - 1 ? '' : '，' }}</span
              >
            </div>
          </div>
        </div>
        <div class="right">
          <span class="key">下达时间:</span>
          <div class="value">{{ item.beginTime }}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="left" v-if="isShowSource">
        <span class="key">推荐依据:</span>
        <div class="value">
          <span
            v-for="(recommandTag, recommandTagIndex) in recommandTags"
            :key="recommandTagIndex"
            class="recommand-tag-item"
            >{{ recommandTag }}</span
          >
        </div>
      </div>
      <div class="right" v-if="isShowBtns">
        <el-button size="small" class="lookui-btn" type="primary" @click="handleInsert">插入任务</el-button>
        <el-button size="small" @click="handleSubscribe">关注</el-button>
        <el-button size="small" @click="handleMerge">归并</el-button>
      </div>
    </div>
    <img :src="mapStatus(item.status)" alt="" class="status" />
  </div>
</template>

<script>
export default {
  components: {
    // missionResolve,
  },
  data() {
    return {
      chooseFirstId: '',
      curId: '',
    };
  },
  props: {
    isShowBtns: {
      type: Boolean,
      default: true
    },
    isShowSource: {
      type: Boolean,
      default: true
    },
    item: {
      type: Object,
      default: () => {},
    },
    recommandTags: {
      type: Array,
      default: () => ([]),
    }
  },
  computed: {
    qtOrgs() {
      return this.item.qtOrgs?.split(",");
    },
    createdOrg() {
      return this.item.createdOrg?.split(",");
    },
  },
  created() {},
  mounted() {},
  methods: {
    closeMissionResolve(val) {
    },
    handleSubscribe() {
      this.$emit('subscription-click', this.item);
    },
    handleMerge() {
      this.$emit('merging-click', this.item);
    },
    handleInsert() {
      this.$emit('insertion-click', this.item);
    },
    mapStatus(status) {
      switch (status) {
        case '督办中':
          return require(`../imgs/icon_5.png`);
        case '未办理':
          return require(`../imgs/icon_6.png`);
        case '已办结':
          return require(`../imgs/icon_7.png`);
        case '已关注':
          return require(`../imgs/icon_8.png`);
        case '已归并':
          return require(`../imgs/icon_9.png`);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.checking-result-item {
  position: relative;
  box-shadow: 0 3px 6px rgba(140, 149, 159, 0.15);
  margin-bottom: 14px;
  border-radius: 8px;
  .status {
    position: absolute;
    right: 0;
    top: 0;
  }
  .content {
    padding: 20px 20px 0;
    background-color: #fff;
    border-radius: 8px 8px 0 0;
    .title {
      display: -webkit-box;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  div.title {
    font-size: 18px;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
    padding-right: 50px;
  }

  div.tags-wrap {
    display: flex;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 10px;
    margin-top: 10px;
    font-size: 15px;
    div.tag-item {
      padding: 4px 8px;
      color: #000;
      background-color: #edf2fe;
      border-radius: 4px;
    }
  }

  .key {
    font-size: 15px;
    color: #999;
    font-weight: normal;
  }
  .value {
    display: flex;
    align-items: center;
    font-size: 15px;
    margin-left: 10px;
  }
  div.source-and-request {
    margin-top: 20px;
    font-size: 15px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e5e5e5;
    div.title {
      font-size: 15px;
      color: #999;
      margin-bottom: 10px;
      font-weight: normal;
      text-decoration: none;
    }
  }

  div.other-info {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    div.left {
      display: flex;
      div.leader-unit {
        display: flex;
        align-items: center;
        .key {
          flex-shrink: 0;
        }
        .value {
          display: inline-block;
          max-width: 280px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      div.supervise-unit {
        display: flex;
        align-items: center;
        margin-left: 50px;
        .key {
          flex-shrink: 0;
        }
        .value {
          display: inline-block;
          max-width: 280px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    div.right {
      display: flex;
      align-items: center;
    }
  }

  div.footer {
    display: flex;
    justify-content: space-between;
    background-color: #edf2fe;
    padding: 12px 20px;
    border-radius: 0 0 8px 8px;
    div.left {
      display: flex;
      align-items: center;
      div.value {
        display: flex;
        column-gap: 10px;
        span.recommand-tag-item {
          padding: 4px 8px;
          color: #3a75f3;
          background-color: #d8e4fd;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
