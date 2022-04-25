import request from './request';

const getUrl = (str: string, prefix = '') => `${prefix}/${str}`;

export function getImgCaptchaApi() {
  return request({
    url: getUrl('captcha/getImgCaptcha'),
    method: 'get',
  });
}
export function getEmailCaptchaApi(data) {
  return request({
    url: getUrl('email/captcha'),
    method: 'post',
    data,
  });
}
