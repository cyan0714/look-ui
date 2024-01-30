import request from './request';
import Qs from 'qs';

export const searchRepeated = function (url, data, ticket) {
  return request({
    url: `${url}/searchRepeated/batchSearch`,
    headers: { 'Accesstoken': ticket },
    method: 'post',
    data
  });
};

export const searchAttachment = function (url, data, ticket) {
  return request({
    url: `${url}/api/archive/search/attachment`,
    headers: { 'Accesstoken': ticket },
    method: 'post',
    data
  });
};

export const searchPersonal = function (url, data, ticket) {
  return request({
    url: `${url}/api/archive/search/personal`,
    headers: { 'Accesstoken': ticket },
    method: 'post',
    data
  });
};

export const searchUnit = function (url, data, ticket) {
  return request({
    url: `${url}/api/archive/search/unit`,
    headers: { 'Accesstoken': ticket },
    method: 'post',
    data
  });
};