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

// 各单位总得分统计(分页)
export const getAllOrgScorePageList = function ({ baseUrl, token, params }) {
  return request({
    url: `${baseUrl}/api/performance/getAllOrgScorePageList?current=${params.current}&pageSize=${params.pageSize}`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: params.data,
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

// 根据机构id获取详情
export const getOrgScoreDetail = function (baseUrl, token, orgId) {
  return request({
    url: `${baseUrl}/api/performance/getOrgScoreDetail`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      orgId
    }
  });
};