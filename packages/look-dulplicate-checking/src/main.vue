<template>
  <div class="look-dulplicate-checking">
    <div class="left-container">
      <header class="left-container-header">
        <div class="intro">
          本次共导入<span class="all-count">{{
            noDealMission.similar.length + noDealMission.dissimilar.length
          }}</span
          >条任务, 其中存在相似任务共<span class="similar-count">{{
            noDealMission.similar.length
          }}</span
          >条, 无相似任务共<span class="dissimilar-count">{{
            noDealMission.dissimilar.length
          }}</span
          >条。
        </div>
        <div class="checkboxs" v-if="isShowSource">
          <span>查重点:</span>
          <el-checkbox-group v-model="checkedTags" @change="handleCheckedTagsChange">
            <el-checkbox class="lookui-checkbox" v-for="tag in tags" :label="tag" :key="tag">{{
              tag
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </header>
      <section class="left-container-section">
        <div class="mission-tag-wrap">
          <div
            :class="['mission-tag', currentMissionType === 0 ? 'mission-tag-actived' : '']"
            @click="toggleTag(0)">
            <span>未处理任务</span>
            <span>（{{ noDealMission.similar.length + noDealMission.dissimilar.length }}）</span>
          </div>
          <div
            :class="['mission-tag', currentMissionType === 1 ? 'mission-tag-actived' : '']"
            @click="toggleTag(1)">
            <span>已处理任务</span>
            <span>（{{ hadDealMission.similar.length + hadDealMission.dissimilar.length }}）</span>
          </div>
        </div>

        <div class="collapse-container no-deal-mission" v-show="currentMissionType === 0">
          <el-collapse v-model="activeNoDealName">
            <!-- 未处理任务-存在相似任务 -->
            <el-collapse-item name="noDealSimilar">
              <template slot="title">
                <mission-header
                  :type="SIMILAR"
                  :count="noDealMission.similar.length"
                  :checkAll="checkAllNoDealOfSimilar"
                  @toggleCheckAll="handleCheckAllNoDealOfSimilar" />
              </template>
              <section class="collapse-content">
                <mission-item
                  v-for="(item, index) in noDealMission.similar"
                  :item="item"
                  :key="index"
                  :class="[
                    'mission-item',
                    currentNoDealSimilarIndex === index ? 'mission-item-actived' : '',
                  ]"
                  @click.native="handleNoDealSimilarClick(index)"
                  @checkChange="handleNoDealSimilarCheckedChange" />
              </section>
            </el-collapse-item>
            <!-- 未处理任务-无相似任务 -->
            <el-collapse-item name="noDealDissimilar">
              <template slot="title">
                <mission-header
                  :type="DISSIMILAR"
                  :count="noDealMission.dissimilar.length"
                  :checkAll="checkAllNoDealOfDissimilar"
                  @toggleCheckAll="handleCheckAllNoDealOfDissimilar">
                </mission-header>
              </template>
              <section class="collapse-content">
                <mission-item
                  v-for="(item, index) in noDealMission.dissimilar"
                  :item="item"
                  :key="index"
                  :class="[
                    'mission-item',
                    currentNoDealDissimilarIndex === index ? 'mission-item-actived' : '',
                  ]"
                  @click.native="handleNoDealDissimilarClick(index)"
                  @checkChange="handleNoDealDissimilarCheckedChange" />
              </section>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="bottom-bar" v-show="currentMissionType === 0">
          <div class="bb-left">
            <el-checkbox
              class="lookui-checkbox"
              v-model="checkedAllNoDeal"
              @change="handleCheckAllNoDeal"
              >全选未处理任务</el-checkbox
            >
            <span>已选 {{ hadCheckNoDealCount }} 条任务</span>
          </div>
          <div class="bb-right" @click="createTasks">批量创建任务</div>
        </div>

        <div class="collapse-container had-deal-mission" v-show="currentMissionType === 1">
          <el-collapse v-model="activeDealNames">
            <!-- 已处理任务-存在相似任务 -->
            <el-collapse-item name="dealSimilar">
              <template slot="title">
                <mission-header
                  isDealMission
                  :type="SIMILAR"
                  :count="hadDealMission.similar.length" />
              </template>
              <section class="collapse-content">
                <mission-item
                  v-for="(item, index) in hadDealMission.similar"
                  :item="item"
                  :key="index"
                  :class="[
                    'mission-item',
                    currentDealSimilarIndex === index ? 'mission-item-actived' : '',
                  ]"
                  @click.native="handleDealSimilarClick(index)"
                  isDealMission />
              </section>
            </el-collapse-item>
            <!-- 已处理任务-无相似任务 -->
            <el-collapse-item name="dealDissimilar">
              <template slot="title">
                <mission-header
                  isDealMission
                  :type="DISSIMILAR"
                  :count="hadDealMission.dissimilar.length" />
              </template>
              <section class="collapse-content">
                <mission-item
                  v-for="(item, index) in hadDealMission.dissimilar"
                  :item="item"
                  :key="index"
                  :class="[
                    'mission-item',
                    currentDealDissimilarIndex === index ? 'mission-item-actived' : '',
                  ]"
                  @click.native="handleDealDissimilarClick(index)"
                  isDealMission />
              </section>
            </el-collapse-item>
          </el-collapse>
        </div>
      </section>
    </div>
    <div class="right-container">
      <header class="right-contiainer-header">
        <img :src="require(`./imgs/icon_4.png`)" alt="" />
        <span class="txt">查重结果: </span>
        <span class="count"> {{ checkingResultList.length }}</span>
      </header>
      <section class="right-container-block" v-loading="loadingCheckResultList">
        <section class="right-container-section" v-if="checkingResultList.length > 0">
          <virtual-list
            style="height: 100%; overflow-y: auto"
            class="rcs-list"
            data-key="taskId"
            :data-sources="checkingResultList"
            :data-component="CheckingResultItem">
            <template #item="{ indey, item }">
              <checking-result-item
                :source="item"
                :recommandTags="checkedTags"
                :isShowBtns="currentMissionType == 0"
                :key="indey"
                @subscription-click="handleSubscribe"
                @merging-click="handleMerge"
                @insertion-click="handleInsert">
                <template v-slot:operation-btns="slotProps">
                  <slot name="operating-btns" :source="slotProps.source"></slot>
                </template>
              </checking-result-item>
            </template>
          </virtual-list>
          <!-- <checking-result-item
            v-for="(item, index) in checkingResultList"
            :item="item"
            :recommandTags="checkedTags"
            :isShowBtns="currentMissionType == 0"
            :key="index"
            @subscription-click="handleSubscribe"
            @merging-click="handleMerge"
            @insertion-click="handleInsert" /> -->
        </section>
        <section class="right-container-empty" v-else>
          <look-empty />
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import { searchRepeated } from '../../../utils/api.js';
import MissionHeader from './components/mission-header';
import MissionItem from './components/mission-item';
import CheckingResultItem from './components/checking-result-item';
import { SIMILAR, DISSIMILAR } from './constants';
import VirtualList from 'vue-virtual-scroll-list';
export default {
  name: 'look-dulplicate-checking',
  components: {
    MissionHeader,
    MissionItem,
    CheckingResultItem,
    VirtualList,
  },
  provide() {
    return {
      onCancelBtnClick: this.handleCancelBtnClick,
      onViewDetailsClick: this.goDetail,
      onCheckingNameClick: this.onCheckingNameClick,
      onRelationClick: this.onRelationClick,
      onNameClick: this.onNameClick,
      isShowSource: () => this.isShowSource,
      isShowBtnsFn: () => this.currentMissionType == 0,
      recommandTags: () => this.checkedTags,
    };
  },
  data() {
    return {
      currentInstance: {},
      loadingCheckResultList: false,
      CheckingResultItem,
      SIMILAR,
      DISSIMILAR,
      activeDealNames: ['dealSimilar', 'dealDissimilar'],
      activeNoDealName: ['noDealSimilar', 'noDealDissimilar'],

      shouldSendRequest: true,

      checkedAllNoDeal: false, //未处理任务是否全选
      currentNoDealSimilarIndex: 0, //未处理任务-存在相似任务-当前选中任务下标
      currentNoDealDissimilarIndex: -1, //未处理任务-无相似任务-当前选中任务下标
      checkAllNoDealOfDissimilar: false, //未处理任务-无相似任务-是否全选
      checkAllNoDealOfSimilar: false, //未处理任务-存在相似任务-是否全选

      currentDealSimilarIndex: 0, //已处理任务-存在相似任务-当前选中任务下标
      currentDealDissimilarIndex: -1, //已处理任务-无相似任务-当前选中任务下标
      currentMissionType: 0, //当前选中任务类型(已处理1, 未处理0)
      missionCount: {
        noDealCount: 5,
        hadDealCount: 2,
      },
      checkedTags: ['任务标题'],
      tags: ['任务标题', '任务标签', '事项来源及依据'],
      allCheckingResultList: [],
      checkingResultList: [],
      noDealMission: {
        similar: [], // 存在相似任务列表
        dissimilar: [], // 无相似任务列表
      },
      hadDealMission: {
        similar: [], // 存在相似任务列表
        dissimilar: [], // 无相似任务列表
      },
    };
  },
  watch: {
    //未处理任务-存在相似任务-是否全选
    checkAllNoDealOfSimilar(val) {
      //未处理任务是否全选
      this.checkedAllNoDeal = val && this.checkAllNoDealOfDissimilar;
    },
    //未处理任务-无相似任务-是否全选
    checkAllNoDealOfDissimilar(val) {
      //未处理任务是否全选
      this.checkedAllNoDeal = val && this.checkAllNoDealOfSimilar;
    },
    //未处理任务是否全选
    checkedAllNoDeal(val) {
      this.checkAllNoDealOfSimilar = this.noDealMission.similar.every(item => item.checked);
      this.checkAllNoDealOfDissimilar = this.noDealMission.dissimilar.every(item => item.checked);
    },
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    searchRepeatedUrl: {
      type: String,
      default: () => {
        return 'http://59.212.30.45:6068'
      }
    },
    isShowSource: {
      type: Boolean,
      default: true,
    },
    paramsData: {
      type: Object,
      default: () => {
        return {
          from: 0,
          jsonStr: [],
          keyId: 'taskId',
          modelIndex: 'common_task',
          modelType: 'task',
          names: 'name,tenantId',
          size: 10000,
        };
      },
    },
  },
  computed: {
    hadCheckNoDealCount() {
      return (
        this.noDealMission.similar.filter(item => item.checked).length +
        this.noDealMission.dissimilar.filter(item => item.checked).length
      );
    },
  },
  activated() {},
  created() {
    this.shouldSendRequest = false
    this.fetchCheckingResultList(0);
  },
  mounted() {
    this.data.forEach((item, index) => {
      // 监听 data 中每个对象的 status 属性
      this.$watch(
        () => this.data[index].status,
        (newStatus, oldStatus) => {
          if (this.shouldSendRequest) {
            this.fetchCheckingResultList(0);
          }
        }
      );
    });
  },
  methods: {
    onRelationClick(task) {
      this.$emit('relation-click', task);
    },
    onCheckingNameClick(checkingTask) {
      this.$emit('checking-name-click', checkingTask);
    },
    onNameClick(task) {
      this.$emit('name-click', task)
    },
    handleCancelBtnClick(task) {
      this.$emit('onCancelBtnClick', task);
    },
    fetchCheckingResultList(index) {
      this.loadingCheckResultList = true;
      this.paramsData.jsonStr = JSON.stringify(this.data);

      searchRepeated(this.searchRepeatedUrl, this.paramsData).then(
        ({
          data: {
            data: { similarity, notSimilarity },
          },
        }) => {
          // 所有查重结果列表数据
          this.allCheckingResultList = similarity;

          const keyIds = similarity.map(item => item.keyId);
          console.log("🚀 ~ file: main.vue:367 ~ fetchCheckingResultList ~ keyIds:", keyIds)
          // 未处理的相似任务
          this.noDealMission.similar = this.data.filter(item => {
            return keyIds.includes(item.taskId) 
          });

          this.noDealMission.dissimilar = notSimilarity;
          this.hadDealMission.similar = this.noDealMission.similar.filter(item => item.status);
          this.noDealMission.similar = this.noDealMission.similar.filter(item => !item.status);

          similarity.forEach(item => {
            // 未处理任务(存在相似任务)中每个任务的查重结果数
            this.noDealMission.similar.forEach(iten => {
              if (item.keyId == iten.taskId) {
                iten.checkResultListLength = item.size;
                console.log('length', iten.checkResultListLength);
              }
            });
            // 已处理任务(存在相似任务)中每个任务的查重结果数
            this.hadDealMission.similar.forEach(iten => {
              if (item.keyId == iten.taskId) {
                iten.checkResultListLength = item.size;
              }
            });
          });
          console.log('noDealMission.similar', this.noDealMission.similar);
          console.log('hadDealMission.similar', this.hadDealMission.similar);
          this.getCurrMissionCheckingResultList(index);
        }
      );
    },
    // 获取当前任务的查重结果列表
    getCurrMissionCheckingResultList(index, isSimilar = true) {
      this.loadingCheckResultList = true;
      setTimeout(() => {
        if (isSimilar) {
          const currentMissionKeyId =
          this.currentMissionType === 0
          ? this.noDealMission.similar[index]?.taskId
          : this.hadDealMission.similar[index]?.taskId;
          const resObj =
          this.allCheckingResultList.find(item => item.keyId == currentMissionKeyId) || {};
          this.checkingResultList = resObj.hitRes || [];
          this.loadingCheckResultList = false;
        } else {
          this.checkingResultList = [];
          this.loadingCheckResultList = false;
        }
        this.shouldSendRequest = true
      }, 600);
    },
    // 查看详情
    goDetail(task) {
      this.$emit('detail-click', task);
    },
    // 批量创建任务
    createTasks() {
      const checkedSimilarMissions = this.noDealMission.similar.filter(item => item.checked);
      const checkedDissimilarMissions = this.noDealMission.dissimilar.filter(item => item.checked);
      this.$emit('createTasks', [...checkedSimilarMissions, ...checkedDissimilarMissions]);
    },
    getCurrentInstance() {
      if (this.currentMissionType == 0) {
        this.currentInstance = this.noDealMission.similar[this.currentNoDealSimilarIndex]
      } else if(this.currentMissionType == 1) {
        this.currentInstance = this.hadDealMission.similar[this.currentDealSimilarIndex]
      }
    },
    // 关注
    handleSubscribe(row) {
      this.getCurrentInstance()
      this.$emit('subscription-click', row, this.currentInstance);
    },
    // 归并
    handleMerge(row) {
      this.getCurrentInstance()
      this.$emit('merging-click', row, this.currentInstance);
    },
    // 插入
    handleInsert(row) {
      this.getCurrentInstance()
      this.$emit('insertion-click', row, this.currentInstance);
    },
    // 切换来源
    handleCheckedTagsChange(val) {
      // 将存在相似任务和无相似任务的全选状态设置为false
      this.checkAllNoDealOfSimilar = false;
      this.checkAllNoDealOfDissimilar = false;
      this.checkedAllNoDeal = false;

      // 将this.noDealMission.similar中的每个对象的checked属性设置为false
      this.noDealMission.similar.forEach(item => (item.checked = false));
      this.noDealMission.dissimilar.forEach(item => (item.checked = false));

      const field = {
        任务标题: 'name',
        任务标签: 'feature',
        事项来源及依据: 'requirement',
      };
      const sources = [];
      val.forEach(item => {
        sources.push(field[item]);
      });
      sources.push('tenantId'); // 固定
      this.paramsData.names = sources.toString();
      this.checkingResultList = [];
      // 使用 setTimeout 防止 checkbox 渲染缓慢
      setTimeout(() => {
        this.fetchCheckingResultList(this.currentNoDealSimilarIndex);
      }, 0);
    },
    // 全选未处理任务
    handleCheckAllNoDeal(val) {
      this.noDealMission.similar.forEach(item => (item.checked = val));
      this.noDealMission.dissimilar.forEach(item => (item.checked = val));
    },
    // 全选(未处理任务-无相似任务)
    handleCheckAllNoDealOfDissimilar(val) {
      this.checkAllNoDealOfDissimilar = val;
      this.noDealMission.dissimilar.forEach(item => (item.checked = val));
    },
    // 全选(未处理任务-存在相似任务)
    handleCheckAllNoDealOfSimilar(val) {
      this.checkAllNoDealOfSimilar = val;
      this.noDealMission.similar.forEach(item => (item.checked = val));
    },
    // 点击 checkbox (未处理任务-无相似任务)
    handleNoDealDissimilarCheckedChange(val) {
      this.checkAllNoDealOfDissimilar = this.noDealMission.dissimilar.every(item => item.checked);
      if (!val) {
        this.checkedAllNoDeal = false;
      }
    },
    // 点击 checkbox (未处理任务-存在相似任务)
    handleNoDealSimilarCheckedChange(val) {
      this.checkAllNoDealOfSimilar = this.noDealMission.similar.every(item => item.checked);
      if (!val) {
        this.checkedAllNoDeal = false;
      }
    },
    // 点击 item (未处理任务-无相似任务)
    handleNoDealDissimilarClick(index) {
      this.currentNoDealDissimilarIndex = index;
      this.currentNoDealSimilarIndex = -1;
      this.checkingResultList = [];
      this.$emit('onClickNoDealDissimilar', index);
    },
    // 点击 item (未处理任务-存在相似任务)
    handleNoDealSimilarClick(index) {
      this.currentNoDealSimilarIndex = index;
      this.currentNoDealDissimilarIndex = -1;
      this.getCurrMissionCheckingResultList(index);
      this.$emit('onClickNoDealSimilar', index);
    },

    // 点击 item (已处理任务-无相似任务)
    handleDealDissimilarClick(index) {
      this.currentDealDissimilarIndex = index;
      this.currentDealSimilarIndex = -1;
      this.checkingResultList = [];
      this.$emit('onClickDealDissimilar', index);
    },
    // 点击 item (已处理任务-存在相似任务)
    handleDealSimilarClick(index) {
      this.currentDealSimilarIndex = index;
      this.currentDealDissimilarIndex = -1;
      this.getCurrMissionCheckingResultList(index);
      this.$emit('onClickDealSimilar', index);
    },

    toggleTag(index) {
      this.currentMissionType = index;
      if (index === 0) {
        // 获取某个未处理任务的查重列表
        this.getCurrMissionCheckingResultList(
          this.currentNoDealSimilarIndex === -1
            ? this.currentNoDealDissimilarIndex
            : this.currentNoDealSimilarIndex,
          this.currentNoDealSimilarIndex !== -1
        );
      } else if (index === 1) {
        // 获取某个已处理任务的查重列表
        this.getCurrMissionCheckingResultList(
          this.currentDealSimilarIndex === -1
            ? this.currentDealDissimilarIndex
            : this.currentDealSimilarIndex,
          this.currentDealSimilarIndex !== -1
        );
      }
    },
  },
};
</script>

<style scoped lang="scss">
.look-dulplicate-checking {
  display: flex;
  background-color: #f6f6f6;
  height: 100%;
  .left-container {
    width: 40%;
    height: 100%;
    border-right: 1px solid #e4e4f3;
    .left-container-header {
      background-color: #fff;
      padding: 12px;
      padding-bottom: 24px;
      .intro {
        margin-bottom: 20px;
        span {
          font-weight: bold;
          margin: 0 4px;
        }
      }
      .all-count {
        color: #506eda;
      }
      .similar-count {
        color: #506eda;
      }
      .dissimilar-count {
        color: #ff4d4f;
      }
      .checkboxs {
        display: flex;
        align-items: center;
        > span {
          color: #999;
          margin-right: 10px;
        }
      }
    }
    .left-container-section {
      position: relative;
      border-top: 1px solid #eee;
      padding: 10px 12px;
      height: calc(100% - 98px);
      box-sizing: border-box;
      .mission-tag-wrap {
        display: flex;
        .mission-tag {
          border: 1px solid #506eda;
          padding: 8px 12px;
          background-color: #fff;
          color: #506eda;
          cursor: pointer;
          position: relative;
          &-actived {
            background-color: #506eda;
            color: #fff;
            border-radius: 6px;
            z-index: 1;
          }
        }
        > div {
          &:nth-child(1):not(.mission-tag-actived) {
            border-radius: 6px 0 0 6px;
            margin-right: -4px;
          }
          &:nth-child(2):not(.mission-tag-actived) {
            border-radius: 0 6px 6px 0;
            margin-left: -4px;
            padding-left: 16px;
          }
        }
      }
      .collapse-container {
        box-shadow: 0 3px 6px rgba(140, 149, 159, 0.15);
        background-color: #fff;
        border-radius: 8px;
        height: calc(100% - 67px);
        overflow: auto;
        margin-top: 10px;
        &.no-deal-mission {
          ::v-deep .txt-wrap {
            padding-right: 0;
          }
        }
        &.had-deal-mission {
          ::v-deep .txt-wrap {
            padding-right: 50px;
          }
        }
        ::v-deep .el-collapse-item__header {
          border-radius: 12px;
        }
        ::v-deep .el-collapse-item__content {
          padding-bottom: 10px;
        }
      }
      .collapse-content {
        /* height: 300px; */
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0 10px;
        &::-webkit-scrollbar-track-piece {
          background-color: transparent;
        }
        &::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          background-color: transparent;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 5px;
          background-color: #888;
        }
        .mission-item {
          position: relative;
          padding: 14px 12px;
          display: flex;
          align-items: center;
          border: 2px solid transparent;
          cursor: pointer;
        }

        .mission-item-actived {
          position: relative;
          border: 2px solid #506eda;
          border-radius: 8px;
          &::after {
            content: '';
            position: absolute;
            right: -20px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-left: 8px solid #506eda;
          }
        }
      }
      .bottom-bar {
        position: absolute;
        bottom: 10px;
        left: 12px;
        width: calc(100% - 24px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.65);
        border-radius: 20px;
        color: #fff;
        overflow: hidden;
        font-size: 15px;
        .bb-left {
          flex: 1;
          display: flex;
          justify-content: space-between;
          padding: 8px 16px;
          color: #fff;
          .el-checkbox {
            color: #fff;
          }
          .lookui-checkbox {
            ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
              color: #fff;
            }
          }
        }
        .bb-right {
          background: linear-gradient(to right, #5670db, #7f90e8);
          padding: 8px 16px;
          cursor: pointer;
        }
      }
    }
  }
  .right-container {
    width: 60%;
    padding: 14px;
    header.right-contiainer-header {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: bold;

      span.txt {
        margin: 0 8px;
      }

      span.count {
        color: #506eda;
      }
    }
    section.right-container-block {
      height: calc(100% - 52px);
      section.right-container-section {
        height: 100%;
        overflow-y: auto;
        margin-top: 10px;
        .rcs-list {
          &::-webkit-scrollbar-track-piece {
            background-color: transparent;
          }
          &::-webkit-scrollbar {
            width: 10px;
            height: 10px;
            background-color: transparent;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background-color: #cfcbcb;
          }
        }
      }
      section.right-container-empty {
        display: flex;
        justify-content: center;
        height: calc(100% - 52px);
        align-items: center;
      }
    }
  }
}
</style>
