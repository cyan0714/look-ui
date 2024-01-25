import request from './request';
import Qs from 'qs';

export const searchRepeated = function (url, data) {
  return request({
    url: `${url}/searchRepeated/batchSearch`,
    method: 'post',
    data
  });
};

export const searchAttachment = function (url, data) {
  return request({
    url: `${url}/api/archive/search/attachment`,
    method: 'post',
    data
  });
};

export const searchPersonal = function (url, data) {
  return request({
    url: `${url}/api/archive/search/personal`,
    method: 'post',
    data
  });
};

export const searchUnit = function (url, data) {
  return request({
    url: `${url}/api/archive/search/unit`,
    method: 'post',
    data
  });
};