import request from './request';
import Qs from 'qs';

export const searchRepeated = function (url, data) {
  return request({
    url: `${url}/searchRepeated/batchSearch`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    data: Qs.stringify(data),
  });
};

// http://192.168.10.28:7076
