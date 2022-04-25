import request from './request';

export function createUserApi(data) {
  return request({
    url: 'user/create',
    method: 'post',
    data,
  });
}
export function getUserApi(data) {
  console.log('data :>> ', data);
  return request({
    url: 'user/get',
    method: 'post',
    data,
  });
}
