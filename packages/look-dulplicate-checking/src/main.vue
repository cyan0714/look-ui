<template>
  <div class="look-dulplicate-checking">
    <div class="left-container">
      <header class="left-container-header">
        <div class="text">
          本次共导入<span class="all-count">{{ importCount.allCount }}</span
          >条任务, 其中存在相似任务共<span class="similar-count">{{
            importCount.similarCount
          }}</span
          >条, 无相似任务共<span class="dissimilar-count">{{ importCount.disSimilarCount }}</span
          >条。
        </div>
        <div class="tags-wrap">
          <span>来源及要求:</span>
          <el-checkbox-group v-model="checkedTags" @change="handlecheckedTagsChange">
            <el-checkbox class="lookui-checkbox" v-for="tag in tags" :label="tag" :key="tag">{{
              tag
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </header>
      <section class="left-container-section">
        <div class="mission-tag-wrap">
          <div
            :class="['mission-tag', currentMissionIndex === 0 ? 'mission-tag-actived' : '']"
            @click="toggleTag(0)">
            <span>未处理任务</span>
            <span>（{{ missionCount.noDealCount }}）</span>
          </div>
          <div
            :class="['mission-tag', currentMissionIndex === 1 ? 'mission-tag-actived' : '']"
            @click="toggleTag(1)">
            <span>已处理任务</span>
            <span>（{{ missionCount.hadDealCount }}）</span>
          </div>
        </div>

        <!-- 未处理任务-存在相似任务 -->
        <div class="no-deal-box">
          <header class="no-deal-box-header">
            <div>
              <img :src="require(`./imgs/icon_2.png`)" alt="" />
              <span class="txt">存在相似任务:</span>
              <span class="count">3</span>
            </div>
            <el-checkbox
              class="lookui-checkbox"
              v-model="checkAllNoDealOfSimilar"
              @change="handleCheckAllNoDealOfSimilar"
              >全选</el-checkbox
            >
          </header>
          <section class="no-deal-box-section">
            <div
              v-for="(item, index) in noDealSimilarList"
              :class="[
                'no-deal-item',
                currentNoDealSimilarIndex === index ? 'no-deal-item-actived' : '',
              ]"
              :key="index"
              @click="handleNoDealSimilarClick(index)">
              <div class="left">
                <div class="title">{{ item.title }}</div>
                <div class="txt-btn">查看详情<i class="el-icon-arrow-right"></i></div>
                <div class="result">
                  <div class="result-left">
                    <div class="rl-txt">查重结果</div>
                    <div class="rl-count">匹配任务数 · {{ item.matchingResultCount }} 条</div>
                  </div>
                  <div class="result-list">
                    <div
                      v-for="(iten, indey) in item.checkResultList"
                      :key="indey"
                      class="result-item">
                      <span>{{ iten.name }} · </span>
                      <span class="count">{{ iten.count }} </span>条
                    </div>
                  </div>
                </div>
              </div>
              <el-checkbox
                class="right lookui-checkbox"
                @change="handleNoDealSimilarCheckedChange"
                @click.native="e => e.stopPropagation()"
                v-model="item.checked"></el-checkbox>
            </div>
          </section>
        </div>

        <!-- 未处理任务-不存在相似任务 -->
        <div class="no-deal-box">
          <header class="no-deal-box-header">
            <div>
              <img :src="require(`./imgs/icon_3.png`)" alt="" />
              <span class="txt">不存在相似任务:</span>
              <span class="count dissmilar">3</span>
            </div>
            <el-checkbox
              class="lookui-checkbox"
              v-model="checkAllNoDealOfDissimilar"
              @change="handleCheckAllNoDealOfDissimilar"
              >全选</el-checkbox
            >
          </header>
          <section class="no-deal-box-section">
            <div
              v-for="(item, index) in noDealDissimilarList"
              :class="[
                'no-deal-item',
                currentNoDealDissimilarIndex === index ? 'no-deal-item-actived' : '',
              ]"
              :key="index"
              @click="handleNoDealDissimilarClick(index)">
              <div class="left">
                <div class="title">{{ item.title }}</div>
                <div class="txt-btn">查看详情<i class="el-icon-arrow-right"></i></div>
                <div class="result">
                  <div class="result-left">
                    <div class="rl-txt dissimilar">查重结果</div>
                    <div class="rl-count dissimilar">暂无相似任务</div>
                  </div>
                </div>
              </div>
              <el-checkbox
                class="right lookui-checkbox"
                @change="handleNoDealDissimilarCheckedChange"
                @click.native="e => e.stopPropagation()"
                v-model="item.checked"></el-checkbox>
            </div>
          </section>
        </div>

        <div class="bottom-bar">
          <div class="bb-left">
            <el-checkbox class="lookui-checkbox" v-model="checkedAll">全选</el-checkbox>
            <span>已选 {{ hadCheckCount }} 条任务</span>
          </div>
          <div class="bb-right">批量创建任务</div>
        </div>
      </section>
    </div>
    <div class="right-container"></div>
  </div>
</template>

<script>
export default {
  name: 'look-dulplicate-checking',
  components: {},
  data() {
    return {
      checkedAll: false,
      currentNoDealDissimilarIndex: -1,
      currentNoDealSimilarIndex: 0,
      checkAllNoDealOfDissimilar: false,
      checkAllNoDealOfSimilar: false,
      currentMissionIndex: 0,
      missionCount: {
        noDealCount: 5,
        hadDealCount: 2,
      },
      missionTypes: [
        {
          name: '未处理任务',
          count: 5,
        },
        {
          name: '已处理任务',
          count: 2,
        },
      ],
      importCount: {
        allCount: 8,
        similarCount: 4,
        disSimilarCount: 4,
      },
      checkedTags: ['任务标题'],
      tags: ['任务标题', '任务标签', '事项来源及依据'],

      noDealSimilarList: [
        {
          title:
            '春风验荡。历经百年沧桑的南非比勒陀利亚总统府，习近平主席同拉马福萨总统并肩而立，俯瞰欣欣向荣的城。',
          checked: false,
          matchingResultCount: 8,
          checkResultList: [
            {
              name: '省政府督查',
              count: 3,
            },
            {
              name: '省委督查',
              count: 3,
            },
            {
              name: '深改办(自贸办)',
              count: 2,
            },
          ],
        },
        {
          title:
            '春风验荡。历经百年沧桑的南非比勒陀利亚总统府，习近平主席同拉马福萨总统并肩而立，俯瞰欣欣向荣的城。',
          checked: false,
          matchingResultCount: 8,
          checkResultList: [
            {
              name: '省政府督查',
              count: 3,
            },
            {
              name: '省委督查',
              count: 3,
            },
            {
              name: '深改办(自贸办)',
              count: 2,
            },
          ],
        },
        {
          title:
            '春风验荡。历经百年沧桑的南非比勒陀利亚总统府，习近平主席同拉马福萨总统并肩而立，俯瞰欣欣向荣的城。',
          checked: false,
          matchingResultCount: 8,
          checkResultList: [
            {
              name: '省政府督查',
              count: 3,
            },
            {
              name: '省委督查',
              count: 3,
            },
            {
              name: '深改办(自贸办)',
              count: 2,
            },
          ],
        },
      ],
      noDealDissimilarList: [
        {
          title:
            '春风验荡。历经百年沧桑的南非比勒陀利亚总统府，习近平主席同拉马福萨总统并肩而立，俯瞰欣欣向荣的城。',
          checked: false,
        },
        {
          title:
            '春风验荡。历经百年沧桑的南非比勒陀利亚总统府，习近平主席同拉马福萨总统并肩而立，俯瞰欣欣向荣的城。',
          checked: false,
        },
        {
          title:
            '春风验荡。历经百年沧桑的南非比勒陀利亚总统府，习近平主席同拉马福萨总统并肩而立，俯瞰欣欣向荣的城。',
          checked: false,
        },
      ],
    };
  },
  watch: {
    checkedAll(val) {
      if (val) {
        this.checkAllNoDealOfSimilar = true;
        this.checkAllNoDealOfDissimilar = true;
      } else {
        this.checkAllNoDealOfSimilar = false;
        this.checkAllNoDealOfDissimilar = false;
      }
    },
  },
  props: {},
  computed: {
    hadCheckCount() {
      return (
        this.noDealSimilarList.filter(item => item.checked).length +
        this.noDealDissimilarList.filter(item => item.checked).length
      );
    },
  },
  created() {},
  mounted() {},
  methods: {
    handleCheckAllNoDealOfDissimilar(val) {
      if (val) {
        this.noDealDissimilarList.forEach(item => {
          item.checked = true;
        });
      } else {
        this.noDealDissimilarList.forEach(item => {
          item.checked = false;
        });
      }
    },
    handleCheckAllNoDealOfSimilar(val) {
      if (val) {
        this.noDealSimilarList.forEach(item => {
          item.checked = true;
        });
      } else {
        this.noDealSimilarList.forEach(item => {
          item.checked = false;
        });
      }
    },
    handleNoDealDissimilarCheckedChange() {
      this.checkAllNoDealOfDissimilar = this.noDealDissimilarList.every(item => item.checked);
    },
    handleNoDealSimilarCheckedChange() {
      this.checkAllNoDealOfSimilar = this.noDealSimilarList.every(item => item.checked);
    },
    handleNoDealDissimilarClick(index) {
      this.currentNoDealDissimilarIndex = index;
      this.currentNoDealSimilarIndex = -1;
    },
    handleNoDealSimilarClick(index) {
      this.currentNoDealSimilarIndex = index;
      this.currentNoDealDissimilarIndex = -1;
    },
    toggleTag(index) {
      this.currentMissionIndex = index;
    },
    handlecheckedTagsChange() {},
  },
};
</script>

<style scoped lang="scss">
@import '../../../style/variable.scss';

.look-dulplicate-checking {
  display: flex;
  background-color: #f6f6f6;
  height: 100%;
  .left-container {
    flex: 4;
    .left-container-header {
      padding: 12px;
      .text {
        margin-bottom: 10px;
        span {
          font-weight: bold;
          margin: 0 4px;
        }
      }
      .all-count {
        color: $--themeColor;
      }
      .similar-count {
        color: $--themeColor;
      }
      .dissimilar-count {
        color: $--red-900;
      }
      .tags-wrap {
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
      margin-top: 10px;
      border-top: 1px solid #eee;
      padding: 12px;
      .mission-tag-wrap {
        display: flex;
        .mission-tag {
          border: 1px solid $--themeColor;
          padding: 8px 12px;
          background-color: #fff;
          color: $--themeColor;
          cursor: pointer;
          position: relative;
          &-actived {
            background-color: $--themeColor;
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
      .no-deal-box {
        box-shadow: 0 3px 6px rgba(140, 149, 159, 0.15);
        background-color: #fff;
        border-radius: 8px;
        padding: 14px 0;
        margin-top: 14px;
        .no-deal-box-header {
          display: flex;
          justify-content: space-between;
          padding: 0 15px;
          > div {
            display: flex;
            align-items: center;
            img {
              width: 18px;
            }
            .txt {
              font-weight: bold;
              color: #000;
              margin: 0 8px;
              font-size: 18px;
            }
            .count {
              color: $--themeColor;
              font-weight: bold;
              font-size: 18px;
              &.dissmilar {
                color: $--red-900;
              }
            }
          }
        }
        .no-deal-box-section {
          margin-top: 14px;
          height: 300px;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0 10px;
          &::-webkit-scrollbar-track-piece {
            background-color: transparent;
          }
          &::-webkit-scrollbar {
            width: 4px;
            height: 4px;
            background-color: transparent;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background-color: #888;
          }
          .no-deal-item {
            padding: 14px 12px;
            display: flex;
            align-items: center;
            border: 2px solid transparent;
            cursor: pointer;
            .left {
              margin-right: 10px;
            }
            .txt-btn {
              text-align: right;
              color: #999;
              font-size: 15px;
              margin-bottom: 14px;
            }
            .result {
              display: flex;
              font-size: 15px;
              .result-left {
                display: flex;
                .rl-txt {
                  padding: 4px 6px;
                  background: linear-gradient(90deg, #e4e8f9 0%, #f1f5fb 100%);
                  color: $--themeColor;
                  border-radius: 6px;
                  &.dissimilar {
                    background: linear-gradient(90deg, #fee5e4 0%, #f2faf1 100%);
                    color: $--red-900;
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
                .result-item {
                  padding: 4px 8px;
                  color: #000;
                  background-color: #edf2fe;
                  margin-left: 10px;
                  border-radius: 4px;
                  .count {
                    color: $--themeColor;
                  }
                }
              }
            }
          }

          .no-deal-item-actived {
            position: relative;
            border: 2px solid $--themeColor;
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
              border-left: 8px solid $--themeColor;
            }
          }
        }
      }
      .bottom-bar {
        position: absolute;
        bottom: -10px;
        left: 12px;
        width: calc(100% - 24px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* margin-top: 6px; */
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
    flex: 6;
  }
}
</style>
