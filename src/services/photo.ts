import request from './request';

const getUrl = (str: string, prefix = 'photo') => `${prefix}/${str}`;

export function getPhotoApi() {
  return request({
    url: getUrl('get'),
    method: 'get',
  });
}
