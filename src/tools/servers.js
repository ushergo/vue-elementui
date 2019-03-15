import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress' // progress bar
import {store} from '../store'
import {Msg} from './message';

NProgress.configure({showSpinner: false}); // NProgress Configuration

/**
 * 请求类
 */
export class BaseApi {
  servers;

  /**
   * 初始化servers
   */
  constructor(hot) {
    this.servers = axios.create({
      baseURL: hot,
      headers: {
        'App-Version': '0.1.0',
      },
      timeout: 10000,
      withCredentials: true
    });
    this.servers.interceptors.request.use(function (config) {
      return config
    }, function (error) {
      return Promise.reject(error || '网络繁忙，请稍候再试！');
    });
    this.servers.interceptors.response.use(function (response) {
      NProgress.done();
      response.data.message && Msg.success(response.data.message || '操作成功');
      return response
    }, function (error) {
      NProgress.done();
      let msg = '';
      if (error.response) {
        switch (error.response.status) {
          case 400:
            msg = error.response.data.message;
            break;
          case 500:
            msg = error.response.data.message;
            break;
          default:
            msg = '网络繁忙，请稍候再试！'
        }
      } else {
        msg = '网络繁忙，请稍候再试！'
      }
      Msg.error(msg);
      return Promise.reject(error.response || '网络繁忙，请稍候再试！');
    })
  }

  /**
   * fetch
   * @param method
   * @param url
   * @param body
   * @param fileList
   * @param fileKey
   * @returns {Promise<any>}
   */
  connection(method = 'GET', url, body, fileList, fileKey = 'files') {

    this.getStatusToken();
    if (typeof body !== 'object') body = {};
    method = method.toLocaleLowerCase();
    if (fileList && (fileList instanceof Array)) {
      let headers = {'Content-Type': 'multipart/form-data'};
      const param = new window.FormData();
      for (const key in body) {
        if ({}.hasOwnProperty.call(body, key)) param.append(key, body[key]);
      }
      fileList.forEach(file => param.append(fileKey, file));
      return Promise.resolve(this.servers[method](url, param, {headers}))
    }
    if (method === 'get') {
      url = url + (url.indexOf('?') > 0 ? '&' : '?' + qs.stringify(body));
      body = {}
    }
    if (method === 'post') NProgress.start();
    return Promise.resolve(this.servers[method](url, body))
  }

  /**
   * 设置token
   * @param isLogin
   * @param token
   */
  setToken({isLogin, token}) {
    if (isLogin) {
      this.servers.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  /**
   * 获取登录状态，token值
   * @returns {{isLogin: string, token: string}}
   */
  getStatusToken() {
    const {isLogin, token} = store.getters;
    this.setToken({isLogin, token})
  }
}

export const sjServer = new BaseApi(process.env.BASE_SJ_API); // 审计项目管理
export const xmServer = new BaseApi(process.env.BASE_XM_API); // 项目执行管理
export const oaServer = new BaseApi(process.env.BASE_OA_API); // 协同工作系统
export const zzServer = new BaseApi(process.env.BASE_ZZ_API); // 贫困生
export const geServer = new BaseApi(process.env.BASE_GE_API); // 通用基础设置
export const cfServer = new BaseApi(process.env.BASE_CF_API); // 自定义表单
export const mhServer = new BaseApi(process.env.BASE_MH_API); // 门户网站后台
