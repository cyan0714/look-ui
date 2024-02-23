import request from '/utils/request';

// 获取应用列表
export const getList = function (baseUrl, data) {
  return request({
    url: `${baseUrl}/api/performance/app/page?current=${data.current}&pageSize=${data.pageSize}`,
    method: 'post',
    data: {
      ...data.app
    }
  });
};

// 新增应用
export const add = function (baseUrl, data) {
  return request({
    url: `${baseUrl}/api/performance/app/add`,
    method: 'post',
    data
  });
};

// 应用详情
export const detail = function (baseUrl, id) {
  return request({
    url: `${baseUrl}/api/performance/app/get/${id}`,
    method: 'get',
  });
};

// 删除应用
export const remove = function (baseUrl, id) {
  return request({
    url: `${baseUrl}/api/performance/app/delete/${id}`,
    method: 'delete',
  });
};

// 获取租户列表
export const getTenantList = function (baseUrl, data) {
  return request({
    url: `${baseUrl}/api/performance/app-tenant-scheme/page?current=${data.current}&pageSize=${data.pageSize}`,
    method: 'post',
    data: {
      ...data.appTenantScheme
    }
  });
};

// 新增租户
export const addTenant = function (baseUrl, data) {
  return request({
    url: `${baseUrl}/api/performance/app-tenant-scheme/add`,
    method: 'post',
    data
  });
};

// 租户详情
export const detailTenant = function (baseUrl, id) {
  return request({
    url: `${baseUrl}/api/performance/app-tenant-scheme/get/${id}`,
    method: 'get',
  });
};

// 删除租户
export const removeTenant = function (baseUrl, id) {
  return request({
    url: `${baseUrl}/api/performance/app-tenant-scheme/delete/${id}`,
    method: 'delete',
  });
};