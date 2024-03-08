import request from '/utils/request';

// 获取当前用户指标
export const getSchemeIndexList = function ({baseUrl, token, params}) {
  return request({
    url: `${baseUrl}/api/performance/scheme-index/getSchemeIndexList`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 各单位推进缓慢次数统计
export const getOrgOverTimeReportList = function ({ baseUrl, token, params }) {
  return request({
    url: `${baseUrl}/api/performance/getOrgOverTimeReportList`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: params,
  });
};

// 各单位总得分统计
export const getAllOrgScoreList = function ({ baseUrl, token, params }) {
  return request({
    url: `${baseUrl}/api/performance/getAllOrgScoreList`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: params,
  });
};

// 根据指标id获取详情
export const getIndexDetail = function (baseUrl, token, id) {
  return request({
    url: `${baseUrl}/api/performance/index/get/${id}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 获取单位集合
export const getOrgList = function (baseUrl, token, id) {
  return request({
    url: `${baseUrl}/api/performance/getOrgList`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 各单位绩效考核分数占比
export const getScoreRatio = function (baseUrl, token, data) {
  return request({
    url: `${baseUrl}/api/performance/getScoreRatio`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data
  });
};

// 各单位反馈质量优秀次数排名
export const getOrgQualityPageList = function ({ baseUrl, token, params }) {
  return request({
    url: `${baseUrl}/api/performance/getOrgQualityPageList?current=${params.current}&pageSize=${params.pageSize}`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: params.data
  });
};


