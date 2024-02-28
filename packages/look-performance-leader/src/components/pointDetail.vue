<template>
  <div id="pointDetail">
    <div :class="`point-detail-info point-detail-info-${this.themeType}`">
      <div class="name-area">
        <div class="name">{{ detail.name }}情况</div>
        <div class="count">
          <span
            class="count-item"
            v-for="(item, index) in detail.level2Indexs"
            :style="{ color: item.color }"
            :key="index">
            <span>{{ item.count }}</span>
            <span>
              {{ index === detail.level2Indexs.length - 1 ? '' : ' /' }}
            </span>
          </span>
        </div>
      </div>
      <div class="score-area">
        <div class="name">{{ detail.name }}得分</div>
        <div class="score">{{ detail.score }}</div>
      </div>
      <div class="score-process">
        <div class="name">得分过程：</div>
        <div class="process">{{ detail.process }}</div>
      </div>
      <div class="detail-area">
        <div class="statement">
          <div class="statement-item" v-for="(item, index) in detail.level2Indexs" :key="index">
            <span class="square-icon" :style="{ backgroundColor: item.color }"></span>
            <span> {{ item.name }} </span>
          </div>
          <div class="attention-text">{{ detail.attentionText }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pointDetail',
  data() {
    return {
      detail: {
        name: '反馈质量',
        score: 40,
        process: '40 + (0 * 1) - (0 * 0.5) - (0 * 2) = 40',
        level2Indexs: [
          {
            name: '反馈质量为“优秀”的事项数',
            count: 0,
            color: this.getRamdonColor(),
          },
          {
            name: '反馈质量为“一般”的事项数',
            count: 0,
            color: this.getRamdonColor(),
          },
          {
            name: '反馈质量为“差”的事项数',
            count: 0,
            color: this.getRamdonColor(),
          },
        ],
        attentionText: '注：得分过程中的权重系数为：优秀（1）、一般（0.5）、差（2）',
      },
    };
  },
  methods: {
    getRamdonColor() {
      // 随机返回 hex 的颜色值，但不包括#ffffff;
      return (
        '#' +
        Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padEnd(6, '0')
      );
    },
  },

  props: {
    themeType: {
      type: String,
      default: 'unit',
    },
    curOrg: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped src="../css/components/pointDetail.scss"></style>
