const indexCategories = [
  {
    value: 'RCJJFX',
    label: '日常加减分项',
  },
  {
    value: 'FKSX',
    label: '反馈时效',
  },
  {
    value: 'FKZL',
    label: '反馈质量',
  },
  {
    value: 'TJQK',
    label: '推进情况',
  },
  {
    value: 'RWSLJFX',
    label: '任务数量加分项',
  },
];

const columnObj = {
  FKSX: [
    {
      prop: 'taskItemName',
      label: '事项名称',
    },
    {
      prop: 'cycleNum',
      label: '汇报阶段',
    },
    {
      prop: 'endTime',
      label: '要求反馈时间',
    },
    {
      prop: 'overReportCreatedTime',
      label: '实际反馈时间',
    },
    {
      prop: 'leaderName',
      label: '分管领导',
    },
    {
      prop: 'codeName',
      label: '状态',
    },
  ],
  FKZL: [
    {
      prop: 'taskItemName',
      label: '事项名称',
    },
    {
      prop: 'cycleNum',
      label: '汇报阶段',
    },
    {
      prop: 'codeName',
      label: '反馈质量',
    },
  ],
  TJQK: [
    {
      prop: 'taskItemName',
      label: '事项名称',
    },
    {
      prop: 'cycleNum',
      label: '汇报阶段',
    },
    {
      prop: 'codeName',
      label: '推进情况',
    }
  ],
  RCJJFX: [
    {
      prop: 'orgName',
      label: '单位名称',
    },
    {
      prop: 'scoreChange',
      label: '加减分',
    },
    {
      prop: 'content',
      label: '考核内容',
    },
    {
      prop: 'scoreTime',
      label: '加减分时间',
    },
  ]
}
const successCode = '000000';

export {
  indexCategories,
  successCode,
  columnObj
}