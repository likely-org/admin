import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
import { get } from '@wont/utils';
import Cookies from 'js-cookie';
import { history } from 'umi';

const timeout = process.env.TIMEOUT;
const baseURL = process.env.BASE_URL;
console.log('process.env :>> ', process.env);

// TODO token实时获取，封装axios
const token = Cookies.get('likely_token');
console.log('token :>> ', token);

// create an axios instance
const service = axios.create({
  baseURL, // api的base_url
  timeout,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
    // 'Content-Type': 'application/json',
  },
});
// 发送请求前对请求数据进行处理
service.defaults.transformRequest = [
  function (data) {
    /**
     *axios 默认请求 context-type application/json
      * 后台需要 @request body 进行处理
      * 这里统一使用 qs  格式化数据
    */
    return qs.stringify(data);
    // return data
  },
];

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // config.withCredentials = true
    // config.headers['Authorization'] = 'Admin-Token'
    // do something before request is sent
    return config;
  },
  (error) => {
    // do something with request error
    return Promise.reject(error);
  },
);
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    console.log(res, 'res');
    if (res.headers['content-type'] === 'video/mp4') {
      // debugger
      return res;
    }
    const {
      message: msg,
    } = res.data;
    if (!res.data.success) {
      message.error(msg || '数据异常');
      return Promise.reject(res.data);
    }
    message.success(msg || '操作成功');
    return Promise.resolve(res.data);
  },
  (err) => {
    console.dir(err);
    const { message: errMsg = '服务器异常' } = get(err, 'response.data', {});
    const { status } = get(err, 'response', {});
    message.error(errMsg);
    if (status === 401) {
      history.push('/account');
    }
    return Promise.reject(err);
  },
);
export default service;
