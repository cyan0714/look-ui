import request from '/utils/request';

export const getList = function (baseUrl, data) {
  return request({
    url: `${baseUrl}/api/performance/app/page?current=${data.current}&pageSize=${data.pageSize}`,
    method: 'post',
    data: {
      ...data.app
    }
  });
};

export const add = function (baseUrl, data) {
  return request({
    url: `${baseUrl}/api/performance/app/add`,
    method: 'post',
    data
  });
};

export const detail = function (baseUrl, id) {
  return request({
    url: `${baseUrl}/api/performance/app/get/${id}`,
    method: 'get',
  });
};

export const remove = function (baseUrl, id) {
  return request({
    url: `${baseUrl}/api/performance/app/delete/${id}`,
    method: 'delete',
  });
};