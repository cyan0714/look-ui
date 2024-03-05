import request from '/utils/request';

// 获取方案列表
export const getList = function (baseUrl, token, data) {
  return request({
    url: `${baseUrl}/api/performance/scheme/page?current=${data.current}&pageSize=${data.pageSize}`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...data.app
    }
  });
};

// 新增方案
export const add = function (baseUrl, token, data) {
  return request({
    url: `${baseUrl}/api/performance/scheme/add`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data
  });
};

// 方案详情
export const detail = function (baseUrl, token, id) {
  return request({
    url: `${baseUrl}/api/performance/scheme/get/${id}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 删除方案
export const remove = function (baseUrl, token, id) {
  return request({
    url: `${baseUrl}/api/performance/scheme/delete/${id}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};