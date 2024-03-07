const data = [
  {
    taskId: '7834639929024',
    tempPri: 1,
    name: '中企修建的河内轻轨2号线穿城而过，缓解沿线交通拥堵，成为城市新地标',
    checked: false,
    tenantId: '20221129',
    endTime: '2024-12-31',
    qtOrgs: '省教育厅',
    tags: ['坚持全面深化改革，建设勇于创新、充满活力的自由贸易港：/打造国内一流的营商环境'],
    status: '',
    itemSource: ['学习贯彻总书记讲话'],
    itemSourceId: ['5239615897408'],
    itemSourceRequestList: [
      {
        id: '',
        itemSource: '学习贯彻总书记讲话',
        itemSourceId: '5239615897408',
        itemSourceContent: '学习贯彻总书记讲话学习贯彻总书记讲话',
      },
    ],
    feature: '6047283709824',
    requirement: '学习贯彻总书记讲话',
    taskType: '101',
    checkResultListLength: 0,
    source: '',
  },
  {
    taskId: '7834639930560',
    tempPri: 2,
    name: '税务部门持续推进税收征管数字化升级和智能化改造，不断完善精确执法',
    checked: false,
    tenantId: '20221129',
    endTime: '2024-12-31',
    qtOrgs: '省教育厅',
    tags: ['坚持全面深化改革，建设勇于创新、充满活力的自由贸易港：/打造国内一流的营商环境'],
    status: '',
    itemSource: ['学习贯彻总书记讲话'],
    itemSourceId: ['5239615897408'],
    itemSourceRequestList: [
      {
        id: '',
        itemSource: '学习贯彻总书记讲话',
        itemSourceId: '5239615897408',
        itemSourceContent: '学习贯彻总书记讲话学习贯彻总书记讲话',
      },
    ],
    feature: '6047283709824',
    requirement: '学习贯彻总书记讲话',
    taskType: '101',
    checkResultListLength: 0,
    source: '',
  },
  {
    taskId: '7834639931968',
    tempPri: 3,
    name: '中国连续多年是越南最大贸易伙伴双边贸易额为2349.2亿美元',
    checked: false,
    tenantId: '20221129',
    endTime: '2024-12-31',
    qtOrgs: '省教育厅',
    tags: ['坚持全面深化改革，建设勇于创新、充满活力的自由贸易港：/打造国内一流的营商环境'],
    status: '',
    itemSource: ['学习贯彻总书记讲话'],
    itemSourceId: ['5239615897408'],
    itemSourceRequestList: [
      {
        id: '',
        itemSource: '学习贯彻总书记讲话',
        itemSourceId: '5239615897408',
        itemSourceContent: '学习贯彻总书记讲话学习贯彻总书记讲话',
      },
    ],
    feature: '6047283709824',
    requirement: '学习贯彻总书记讲话',
    taskType: '101',
    checkResultListLength: 0,
    source: '',
  },
];

const data2 = [
  // 重点项目测试数据
  // { taskId: '1', name: '三亚市西水中调项目一期', tenantId: '4602000038', checked: false, },
  {
    taskId: '1',
    name: '三亚市第一艘海洋休闲渔船',
    checked: false,
    tenantId: '4602000038',
    status: '已关联',
    checkResultListLength: 0,
    isShowViewBtn: false,
    relations: [
      {
        name: 'globe forest from earlier connected hangglobe forest from earlier connected hangglobe forest from earlier connected hangglobe forest from earlier connected hangglobe forest from earlier connected hang',
        id: 1
      },
      {
        name: '新需求',
        id: 2
      },
    ]
  },
  {
    taskId: '2',
    name: '事项工作内容',
    checked: false,
    tenantId: '4602000038',
    status: '已插入',
    checkResultListLength: 0,
    relation:
      '《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》',
  },
  {
    taskId: '3',
    name: '琼海',
    checked: false,
    tenantId: '4602000038',
    checkResultListLength: 0,
    status: '已创建', // 已处理任务的状态
    relation:
      '《习近平主席出席金砖国家领导人第十五次会晤并对南非进行国事访问。立足南非和金砖，放眼非洲和世 界。》', // 已处理任务的关联任务的名字
  },
  {
    name: '0131全是重大任务',
    taskId: '1',
    taskType: '101',
    tenantId: '20221129',
    checked: false,
    status: '',
  },
  {
    taskId: '4',
    name: 'chenshiyan',
    checked: false,
    tenantId: '4602000039',
    status: '',
  },
]

export {
  data,
  data2
}