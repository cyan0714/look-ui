<template>
  <div class="mission-item">
    <div class="left">
      <div class="txt-wrap">
        <div class="title">
          <span @click.stop="handleMissionDetail">
            {{ item.name }}
          </span>
        </div>
        <div v-if="item.isShowViewBtn == undefined || item.isShowViewBtn == 1" class="txt-btn" @click.stop="handleViewDetail">查看详情<i class="el-icon-arrow-right"></i></div>
      </div>
      <div class="result">
        <div class="result-left">
          <div :class="['rl-txt', hasList ? '' : 'dissimilar']">查重结果</div>
          <div class="rl-count" v-if="hasList">匹配任务数 · {{ item.checkResultListLength }} 条</div>
          <div class="rl-count dissimilar" v-else>暂无相似任务</div>
        </div>
        <!-- <div class="result-list" v-if="hasList">
          <div v-for="(iten, indey) in item.checkResultList" :key="indey" class="result-item">
            <span>{{ iten.name }} · </span>
            <span class="count">{{ iten.count }} </span>条
          </div>
        </div> -->
      </div>
      <div class="result-detail" v-if="isDealMission">
        <div class="rd-title">处理结果</div>
        <template v-if="item.status === '已关联'">
          <div class="rd-content">
            <div v-for="(relation, index) in item.relations" class="relation-relevance-item" :key="index">
              <a class="double-row-ellip" @click.stop="handleRelationRowClick(relation)">{{ relation.name }}</a>
              <span class="text-btn" @click.stop="handleRowCancel(relation)">取消关联</span>
            </div>
          </div>
        </template>
        <template v-else>
          <a class="double-row-ellip" @click.stop="handleRelationClick">{{ item.relation }}</a>
        </template>
      </div>
      <div class="btn-area" v-if="isDealMission">
        <el-button class="lookui-btn" size="small" type="primary" @click.native="handleCancel">取消{{item.status.slice(1)}}</el-button>
      </div>
      <img v-if="isDealMission" :src="mapStatus(item.status)" alt="" class="status" width="56"/>
    </div>
    <el-checkbox
      v-if="!isDealMission"
      class="right lookui-checkbox"
      @change="handleCheckedChange"
      @click.native="e => e.stopPropagation()"
      v-model="item.checked"></el-checkbox>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: {
    // 是否是已处理任务
    isDealMission: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => {},
    },
  },
  inject: ['onCancelBtnClick', 'onViewDetailsClick', 'onNameClick', 'onRelationClick', 'onRelationRowClick', 'onCancelRowBtnClick'],
  computed: {
    hasList() {
      return this.item.checkResultListLength > 0;
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleRowCancel(relation) {
      this.onCancelRowBtnClick(relation, this.item)
    },
    handleRelationRowClick(relation) {
      this.onRelationRowClick(relation, this.item)
    },
    handleRelationClick() {
      this.onRelationClick(this.item)
    },
    handleMissionDetail() {
      this.onNameClick(this.item)
    },
    handleCancel(e) {
      e.stopPropagation();
      this.onCancelBtnClick(this.item)
    },
    handleViewDetail() {
      this.onViewDetailsClick(this.item)
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
        case '已创建':
          return require(`../imgs/icon_10.png`);
        case '已插入':
          return require(`../imgs/icon_11.png`);
        case '已关联':
          return require(`../imgs/icon_12.png`);
      }
    },
    handleCheckedChange(val) {
      this.$emit('checkChange', val);
    },
  },
};
</script>

<style scoped lang="scss">
.mission-item {
  .left {
    flex: 1;
    margin-right: 10px;
    .title {
      flex: 1;
      font-size: 16px;
      display: -webkit-box;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .status {
      position: absolute;
      right: 0;
      top: 0;
    }
    .txt-wrap {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 8px;
      .txt-btn {
        width: 6em;
        text-align: right;
        color: #999;
        font-size: 14px;
      }
    }
  }

  .result {
    display: flex;
    font-size: 14px;
    .result-left {
      display: flex;
      flex-shrink: 0;
      .rl-txt {
        padding: 4px 6px;
        background: linear-gradient(90deg, #e4e8f9 0%, #f1f5fb 100%);
        color: #506eda;
        border-radius: 6px;
        &.dissimilar {
          background: linear-gradient(90deg, #fee5e4 0%, #f2faf1 100%);
          color: #ff4d4f;
        }
      }
      .rl-count {
        padding: 4px 6px;
        border-radius: 14px 6px 6px 0px;
        color: #fff;
        background: linear-gradient(90deg, #506eda 0%, #8493e9 100%);
        &.dissimilar {
          background: linear-gradient(90deg, #ff5053 0%, #fb8783 100%);
        }
      }
    }
    .result-list {
      display: flex;
      flex-shrink: 0;
      .result-item {
        padding: 4px 8px;
        color: #000;
        background-color: #edf2fe;
        margin-left: 10px;
        border-radius: 4px;
        .count {
          color: #506eda;
        }
      }
    }
  }
  .result-detail {
    display: flex;
    flex-shrink: 0;
    margin-top: 10px;
    font-size: 14px;
    .rd-title {
      padding: 4px 6px;
      background: linear-gradient(90deg, #def3f0 0%, #f0faf8 100%);
      color: #2eb190;
      border-radius: 6px;
      flex-shrink: 0;
      align-self: start;
    }
    .rd-content {
      .relation-relevance-item {
        display: flex;
        align-items: center;
        .text-btn {
          margin-left: 20px;
          color: red;
        }
      }
    }
    a {
      text-decoration: underline;
      color: #506eda;
    }
  }
  .btn-area {
    display: flex;
    justify-content: end;
  }
}
</style>
