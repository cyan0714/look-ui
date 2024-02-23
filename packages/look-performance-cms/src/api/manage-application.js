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

export const getTenantList = function (baseUrl, data) {
  return request({
    url: `${baseUrl}/api/performance/app-tenant-scheme/page?current=${data.current}&pageSize=${data.pageSize}`,
    method: 'post',
    data: {
      ...data.appTenantScheme
    }
  });
};

export const addTenant = function (baseUrl, data) {
  return request({
    url: `${baseUrl}/api/performance/app-tenant-scheme/add`,
    method: 'post',
    data
  });
};

export const detailTenant = function (baseUrl, id) {
  return request({
    url: `${baseUrl}/api/performance/app-tenant-scheme/get/${id}`,
    method: 'get',
  });
};

export const removeTenant = function (baseUrl, id) {
  return request({
    url: `${baseUrl}/api/performance/app-tenant-scheme/delete/${id}`,
    method: 'delete',
  });
};