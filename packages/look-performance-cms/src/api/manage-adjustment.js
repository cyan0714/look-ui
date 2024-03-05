import request from '/utils/request';

// 获取干预列表
export const getList = function (baseUrl, token, params) {
  return request({
    url: `${baseUrl}/api/performance/getAllOrgResultPageList?current=${params.current}&pageSize=${params.pageSize}`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...params.data
    }
  });
};

// 添加干预
export const addIntervene = function (baseUrl, token, data) {
  return request({
    url: `${baseUrl}/api/result/intervene/add`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data
  });
};

// 干预记录
export const getInterveneList = function (baseUrl, token, data) {
  return request({
    url: `${baseUrl}/api/result/intervene/getList?orgId=${data.orgId}&indexId=${data.indexId}`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};