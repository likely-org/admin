import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { message } from 'antd';
import { get } from '@wont/utils';
import Cookies from 'js-cookie';
import { history } from 'umi';

interface RequestOptions {
  showLoading: boolean;
  showOkMsg: boolean;
  showFailMsg: boolean;
}

export default function request(
  axiosConfig: AxiosRequestConfig, requestOptions: Partial<RequestOptions> = {},
) {
  console.log('process.env :>> ', process.env);
  const timeout = Number(process.env.TIMEOUT);
  const baseURL = process.env.BASE_URL;
  // TODO token实时获取，封装axios
  const token = Cookies.get('likely_token');
  console.log('token :>> ', token);

  const {
    // showLoading = true,
    showOkMsg = true,
    showFailMsg = true,
  } = requestOptions;

  const service = axios.create({
    baseURL,
    timeout,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // 发送请求前对请求数据进行处理
  service.defaults.transformRequest = [
    function (data) {
      const result = qs.stringify(data);
      return result;
    },
  ];

  // 请求拦截器
  service.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
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
        showFailMsg && message.error(msg || '数据异常');
        return Promise.reject(res.data);
      }
      showOkMsg && message.success(msg || '操作成功');
      return Promise.resolve(res.data);
    },
    (err) => {
      console.dir(err);
      const { message: errMsg = '服务器异常' } = get(err, 'response.data', {});
      const { status } = get(err, 'response', {});
      showFailMsg && message.error(errMsg);
      if (status === 401) {
        history.push('/account');
      }
      return Promise.reject(err);
    },
  );
  return service(axiosConfig);
}
