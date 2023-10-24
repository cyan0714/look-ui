<template>
  <div class="app">
    <look-dulplicate-checking
      :noDealMission="noDealMission"
      :hadDealMission="hadDealMission"
      :checkingResultList="checkingResultList"/>
  </div>
</template>

<script>
import { searchRepeated } from '../utils/api.js';
export default {
  data() {
    return {
      allCheckingResultList: [],
      // 未处理任务
      noDealMission: {
        // 存在相似任务列表
        similar: [
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
        // 不存在相似任务列表
        dissimilar: [
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
        ]
      },
      // 已处理任务
      hadDealMission: {
        similar: [
          {
            name:
              '春风验荡。历经百年沧桑的南非比勒陀利亚总统府，习近平主席同拉马福萨总统并肩而立，俯瞰欣欣向荣的城。',
            checked: false,
            checkResultListLength: 0,
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
            name:
              '春风验荡。历经百年沧桑的南非比勒陀利亚总统府，习近平主席同拉马福萨总统并肩而立，俯瞰欣欣向荣的城。',
            checked: false,
            checkResultListLength: 0,
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
        dissimilar: [
          {
            name:
              '春风验荡。历经百年沧桑的南非比勒陀利亚总统府，习近平主席同拉马福萨总统并肩而立，俯瞰欣欣向荣的城。',
            checked: false,
            status: 3,
            relation:
              '《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》',
          },
          {
            name:
              '春风验荡。历经百年沧桑的南非比勒陀利亚总统府，习近平主席同拉马福萨总统并肩而立，俯瞰欣欣向荣的城。',
            checked: false,
            status: 3,
            relation:
              '《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》',
          },
          {
            name:
              '春风验荡。历经百年沧桑的南非比勒陀利亚总统府，习近平主席同拉马福萨总统并肩而立，俯瞰欣欣向荣的城。',
            checked: false,
            status: 3,
            relation:
              '《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》',
          },
        ],
      },
      checkingResultList: [],
    };
  },
  created() {
  },
  computed: {
  },
  methods: {
  },
};
</script>
<style>
.app {
  height: 100%;
}
</style>
