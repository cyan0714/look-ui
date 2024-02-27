import request from '/utils/request';

// 获取方案列表
export const getList = function (baseUrl, data) {
  return request({
    url: `${baseUrl}/api/performance/scheme/page?current=${data.current}&pageSize=${data.pageSize}`,
    method: 'post',
    data: {
      ...data.app
    }
  });
};

// 新增方案
export const add = function (baseUrl, data) {
  return request({
    url: `${baseUrl}/api/performance/scheme/add`,
    method: 'post',
    data
  });
};

// 方案详情
export const detail = function (baseUrl, id) {
  return request({
    url: `${baseUrl}/api/performance/scheme/get/${id}`,
    method: 'get',
  });
};

// 删除方案
export const remove = function (baseUrl, id) {
  return request({
    url: `${baseUrl}/api/performance/scheme/delete/${id}`,
    method: 'delete',
  });
};