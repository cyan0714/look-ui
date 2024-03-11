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
    <div class="point-detail-table">
      <pointDetailTable :tableData="tableData" :columns="columns">
        <!-- <template v-slot:name="slotProps">
          <span style="color: red">{{ slotProps.item.name }}hhh</span>
        </template>
        <template v-slot:date="slotProps">
          <span style="color: red">{{ slotProps.item.date }}hhh</span>
        </template> -->
      </pointDetailTable>
    </div>
  </div>
</template>

<script>
import pointDetailTable from './pointDetailTable.vue';
import { getOrgOriginalDataPageList } from '../api/main';
import { indexCategories } from '../../../look-performance-cms/src/constant';

export default {
  name: 'pointDetail',
  data() {
    return {
      columns:[
        {
          prop: 'name',
          label: '名称',
        },
        {
          prop: 'date',
          label: '日期',
        },
      ],
      tableData: [
        {
          name: '陈世晏',
          date: '2020-09-04',
        },
        {
          name: 'xxx',
          date: '09点04分',
        },
        {
          name: '陈世晏',
          date: '2020-09-04',
        },
        {
          name: 'xxx',
          date: '09点04分',
        },
        {
          name: '陈世晏',
          date: '2020-09-04',
        },
        {
          name: 'xxx',
          date: '09点04分',
        },
        {
          name: '陈世晏',
          date: '2020-09-04',
        },
        {
          name: 'xxx',
          date: '09点04分',
        },
        {
          name: '陈世晏',
          date: '2020-09-04',
        },
        {
          name: 'xxx',
          date: '09点04分',
        },
        {
          name: '陈世晏',
          date: '2020-09-04',
        },
        {
          name: 'xxx',
          date: '09点04分',
        },
      ],
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
  components: {
    pointDetailTable,
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const params = {
        current: 1,
        pageSize: 10,
        data: {
          // orgId: this.curOrg.orgId,
          orgId: '9029596',
          // indexCategory: indexCategories.find(item => item.label === this.currentIndexItem.indexName).value,
          indexCategory: 'FKSX',
        }
      }
      getOrgOriginalDataPageList({ baseUrl: this.baseUrl, token: this.token, params }).then(res => {
        console.log('列表', res);
      });
    },
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
      default: () => ({}),
    },
    token: {
      type: String,
      default: '',
    },
    baseUrl: {
      type: String,
      default: '',
    },
    currentIndexItem: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped src="../css/components/pointDetail.scss"></style>
