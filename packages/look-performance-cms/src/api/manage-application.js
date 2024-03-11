import request from '/utils/request';

// 获取应用列表
export const getList = function (baseUrl, token, data) {
  return request({
    url: `${baseUrl}/api/performance/app/page?current=${data.current}&pageSize=${data.pageSize}`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...data.app
    }
  });
};

// 新增应用
export const add = function (baseUrl, token, data) {
  return request({
    url: `${baseUrl}/api/performance/app/add`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data
  });
};

// 应用详情
export const detail = function (baseUrl, token, id) {
  return request({
    url: `${baseUrl}/api/performance/app/get/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'get',
  });
};

// 删除应用
export const remove = function (baseUrl, token, id) {
  return request({
    url: `${baseUrl}/api/performance/app/delete/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'delete',
  });
};

// 获取租户列表
export const getTenantList = function (baseUrl, token, data) {
  return request({
    url: `${baseUrl}/api/performance/app-tenant-scheme/page?current=${data.current}&pageSize=${data.pageSize}`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...data.data
    }
  });
};

// 新增租户
export const addTenant = function (baseUrl, token, data) {
  return request({
    url: `${baseUrl}/api/performance/app-tenant-scheme/add`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data
  });
};

// 租户详情
export const detailTenant = function (baseUrl, token, id) {
  return request({
    url: `${baseUrl}/api/performance/app-tenant-scheme/get/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'get',
  });
};

// 删除租户
export const removeTenant = function (baseUrl, token, id) {
  return request({
    url: `${baseUrl}/api/performance/app-tenant-scheme/delete/${id}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};