import request from '/utils/request';

// 获取指标列表
export const getList = function (baseUrl, token, data) {
  return request({
    url: `${baseUrl}/api/performance/index/page?current=${data.current}&pageSize=${data.pageSize}`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...data.app
    }
  });
};

// 新增指标
export const add = function (baseUrl, token, data) {
  return request({
    url: `${baseUrl}/api/performance/index/add`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data
  });
};

// 指标详情
export const detail = function (baseUrl, token, id) {
  return request({
    url: `${baseUrl}/api/performance/index/get/${id}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 删除指标
export const remove = function (baseUrl, token, id) {
  return request({
    url: `${baseUrl}/api/performance/index/delete/${id}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};