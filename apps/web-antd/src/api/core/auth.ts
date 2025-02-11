import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
    VerCode?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    AdminId: string;
    Token: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }

  /** 验证码接口参数 */
  export interface CaptchaParams {
    mobile: number;
    type: number;
    countryCode?: number;
  }
}

enum Api {
  /** 验证码 */
  Captcha = '/api/SMS/Send',
  /** 登录接口 */
  Login = '/api/Login/LoginByMobile',
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>(Api.Login, data);
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh', {
    withCredentials: true,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post('/auth/logout', {
    withCredentials: true,
  });
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/auth/codes');
}

/**
 * 获取验证码
 */
export async function getCaptchaApi(params: AuthApi.CaptchaParams) {
  return requestClient.get(Api.Captcha, { params });
}
