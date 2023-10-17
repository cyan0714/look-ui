<template>
  <div class="app">
    <look-dulplicate-checking
      :loadingCheckResultList="loadingCheckResultList"
      :noDealSimilarList="noDealSimilarList"
      :noDealDissimilarList="noDealDissimilarList"
      :hadDealSimilarList="hadDealSimilarList"
      :hadDealDissimilarList="hadDealDissimilarList"
      :checkingResultList="checkingResultList"
      @mission-click="handleMissionClick"
      @toggle-source="toggleSource"
      @detail-click="handleDetailClick"
      @subscription-click="handleSubscribe"
      @merging-click="handleMerge"
      @insertion-click="handleInsert"
      @onClickNoDealSimilar="onClickNoDealSimilar" />
  </div>
</template>

<script>
import { searchRepeated } from '../utils/api.js';
export default {
  data() {
    return {
      loadingCheckResultList: false,
      allCheckingResultList: [],
      // 未处理任务-存在相似任务列表
      noDealSimilarList: [
        {
          taskId: '1',
          name: '三亚市第一艘海洋休闲渔船',
          checked: false,
          tenantId: '4602000038',
          checkResultListLength: 0,
        },
        {
          taskId: '2',
          name: '事项工作内容',
          checked: false,
          tenantId: '4602000038',
          checkResultListLength: 0,
        },
      ],
      // 未处理任务-不存在相似任务列表
      noDealDissimilarList: [
        {
          taskId: '1',
          name: '三亚市第一艘海洋休闲渔船',
          checked: false,
          tenantId: '4602000038',
          checkResultListLength: 0,
        },
        {
          taskId: '2',
          name: '事项工作内容',
          checked: false,
          tenantId: '4602000038',
          checkResultListLength: 0,
        },
      ],
      // 已处理任务-存在相似任务列表
      hadDealSimilarList: [
        {
          title:
            '春风验荡。历经百年沧桑的南非比勒陀利亚总统府，习近平主席同拉马福萨总统并肩而立，俯瞰欣欣向荣的城。',
          checked: false,
          matchingResultCount: 8,
          checkResultList: [
            { name: '省政府督查', count: 3 },
            { name: '省委督查', count: 3 },
            { name: '深改办(自贸办)', count: 2 },
          ],
          status: 3,
          relation:
            '《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》',
        },
        {
          title:
            '春风验荡。历经百年沧桑的南非比勒陀利亚总统府，习近平主席同拉马福萨总统并肩而立，俯瞰欣欣向荣的城。',
          checked: false,
          matchingResultCount: 8,
          checkResultList: [
            { name: '省政府督查', count: 3 },
            { name: '省委督查', count: 3 },
            { name: '深改办(自贸办)', count: 2 },
          ],
          status: 3,
          relation:
            '《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》',
        },
      ],
      // 已处理任务-不存在相似任务列表
      hadDealDissimilarList: [
        {
          title:
            '春风验荡。历经百年沧桑的南非比勒陀利亚总统府，习近平主席同拉马福萨总统并肩而立，俯瞰欣欣向荣的城。',
          checked: false,
          status: 3,
          relation:
            '《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》',
        },
        {
          title:
            '春风验荡。历经百年沧桑的南非比勒陀利亚总统府，习近平主席同拉马福萨总统并肩而立，俯瞰欣欣向荣的城。',
          checked: false,
          status: 3,
          relation:
            '《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》',
        },
        {
          title:
            '春风验荡。历经百年沧桑的南非比勒陀利亚总统府，习近平主席同拉马福萨总统并肩而立，俯瞰欣欣向荣的城。',
          checked: false,
          status: 3,
          relation:
            '《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》',
        },
      ],
      checkingResultList: [],
    };
  },
  created() {
    searchRepeated(this.paramsData).then(res => {
      this.allCheckingResultList = res.data.data;
      this.allCheckingResultList.forEach(item => {
        this.noDealSimilarList.forEach(iten => {
          if (item.keyId == iten.taskId) {
            iten.checkResultListLength = item.size;
          }
        });
      });
      this.getCurrMissionCheckingResultList(0);
    });
  },
  computed: {
    paramsData() {
      return {
        from: 0,
        jsonStr: JSON.stringify(this.noDealSimilarList),
        keyId: 'taskId',
        modelIndex: 'common_task',
        modelType: 'task',
        names: 'name',
        size: 10000,
      }
    }
  },
  methods: {
    fetchCheckingResultList(index) {
      this.loadingCheckResultList = true
      searchRepeated(this.paramsData).then(res => {
        this.allCheckingResultList = res.data.data;
        this.getCurrMissionCheckingResultList(index)
      })
    },
    handleDetailClick() {

    },
    onClickNoDealSimilar(index) {
      this.fetchCheckingResultList(index)
    },
    getCurrMissionCheckingResultList(index) {
      const currentMissionKeyId = this.noDealSimilarList[index].taskId;
      const resObj = this.allCheckingResultList.find(item => item.keyId == currentMissionKeyId) || {};
      this.checkingResultList = resObj.hitRes || [];
      this.loadingCheckResultList = false;
    },
    handleMissionClick(row) {
      console.log('row', row);
    },
    toggleSource(val, index) {
      this.paramsData.names = val.toString()
      this.fetchCheckingResultList(index)
    },
    // 关注
    handleSubscribe(row) {
      console.log('row', row);
    },
    // 归并
    handleMerge(row) {
      console.log('row', row);
    },
    // 插入
    handleInsert(row) {
      console.log('row', row);
    },
  },
};
</script>
<style>
.app {
  height: 100%;
}
</style>
