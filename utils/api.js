import request from './request';
import Qs from 'qs';

export const searchRepeated = function (url, data) {
  return request({
    url: `${url}/searchRepeated/batchSearch`,
    method: 'post',
    data
  });
};
