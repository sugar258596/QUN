import type { UserApi } from './index';

import type { DeleteParams, DetailParams, Pagination } from '#/api/parameter';

import { requestClient } from '#/api/request';

export namespace SystemApi {
  /** 获取信息请求参数 */
  export interface GetMessageListParams {
    /** 发送类型：0-全体 1-个人,不筛选则传-1 */
    Type: number;
    /** 关键字 */
    Keywords: string;
  }
  /** 信息列表响应参数 */
  export interface GetMessageListResult {
    /** 消息ID */
    Id: number;
    /** 消息标题 */
    Title: string;
    /** 消息内容 */
    Content: string;
    /** 英文消息标题 */
    EnglishTitle: string;
    /** 英文消息内容 */
    EnglishContent: string;
    /** 俄语消息标题 */
    RussianTitle: string;
    /** 俄语消息内容 */
    RussianContent: string;
    /** id 组 */
    MemberIds: string;
    /**  推送类型 */
    Type: number | string;
  }

  /** 国家下拉选返回值 */
  export interface GetSeleteListResult {
    /** id */
    Id: number;
    /** 国家名称 */
    CountryName: string;
  }

  /** 国家列表返回参数 */
  export interface GetCountryListResult extends GetSeleteListResult {
    /** 国家类型 */
    Type: string;
    /** 添加时间 */
    AddTime: string;
  }
}

enum Api {
  /** 国家删除 */
  DELETE_COUNTRY = '/api/Countries/DelCountries',
  /** 删除消息 */
  DELETE_MESSAGE = '/api/User/DelPlatformMessage',
  /** 国家详情 */
  GET_COUNTRY_DETAIL = '/api/Countries/GetCountry',
  /** 获取国家列表 */
  GET_COUNTRY_LIST = '/api/Countries/CountryList',

  /** 消息详情 */
  GET_MESSAGE_DETAIL = '/api/User/PlatformMessageDetails',
  /** 消息列表 */
  GET_MESSAGE_LIST = '/api/User/PlatformMessageList',
  /** 国家下拉选 */
  GET_SELECT_LIST = '/api/Countries/CountrySelection',
  /** 国家添加/修改 */
  POST_COUNTRY = '/api/Countries/AddModifyCountry',
  /** 发布消息 */
  PUBLISH_MESSAGE = '/api/User/AddPlatformMessage',
}

/**
 * @description 消息列表
 * @param params
 * @returns
 */
export function getMessageList(params: SystemApi.GetMessageListParams) {
  return requestClient.post<SystemApi.GetMessageListResult[]>(
    Api.GET_MESSAGE_LIST,
    params,
  );
}

/**
 * @description 发布消息
 * @param params
 * @returns
 */
export function publishMessage(params: SystemApi.GetMessageListResult) {
  return requestClient.post(Api.PUBLISH_MESSAGE, params);
}

/**
 * @description 消息详情
 * @param params
 * @returns
 */
export function getMessageDetail(params: DetailParams) {
  return requestClient.post<SystemApi.GetMessageListResult>(
    Api.GET_MESSAGE_DETAIL,
    params,
  );
}

/**
 * @description 删除消息
 * @param params
 * @returns
 */
export function deleteMessage(params: DeleteParams) {
  return requestClient.post(Api.DELETE_MESSAGE, params);
}

/**
 * @description: 国家下拉选
 * @param params
 * @returns
 */
export function GetSelectCountryList(params?: Pagination) {
  return requestClient.post<SystemApi.GetSeleteListResult[]>(
    Api.GET_SELECT_LIST,
    params,
  );
}

/**
 * @description: 获取国家列表
 * @param params
 * @returns
 */
export function GetCountryList(
  params?: Omit<UserApi.GetUserListParams, 'IsPlus' | 'Sex'>,
) {
  return requestClient.post<SystemApi.GetCountryListResult[]>(
    Api.GET_COUNTRY_LIST,
    params,
  );
}

/**
 * @description: 国家详情
 * @param params
 * @returns
 */
export function GetCountryDetail(params: DetailParams) {
  return requestClient.post<SystemApi.GetCountryListResult>(
    Api.GET_COUNTRY_DETAIL,
    params,
  );
}

/**
 * @description: 国家添加/修改
 * @param params
 * @returns
 */
export function PostCountry(
  params: Omit<SystemApi.GetSeleteListResult, 'AddTime'>,
) {
  return requestClient.post(Api.POST_COUNTRY, params);
}

/**
 * @description: 国家删除
 * @param params
 * @returns
 */
export function DeleteCountry(params: DeleteParams) {
  return requestClient.post(Api.DELETE_COUNTRY, params);
}
