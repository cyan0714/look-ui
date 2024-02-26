import request from '/utils/request';

// 获取指标列表
export const getList = function (baseUrl, data) {
  return request({
    url: `${baseUrl}/api/performance/index/page?current=${data.current}&pageSize=${data.pageSize}`,
    method: 'post',
    data: {
      ...data.app
    }
  });
};

// 新增指标
export const add = function (baseUrl, data) {
  return request({
    url: `${baseUrl}/api/performance/index/add`,
    method: 'post',
    data
  });
};

// 指标详情
export const detail = function (baseUrl, id) {
  return request({
    url: `${baseUrl}/api/performance/index/get/${id}`,
    method: 'get',
  });
};

// 删除指标
export const remove = function (baseUrl, id) {
  return request({
    url: `${baseUrl}/api/performance/index/delete/${id}`,
    method: 'delete',
  });
};