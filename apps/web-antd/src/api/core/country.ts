import type { UserApi } from './index';

import type { DeleteParams, DetailParams, Pagination } from '#/api/parameter';

import { requestClient } from '#/api/request';

export namespace CountriesApi {
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

  /** 国家详情 */
  GET_COUNTRY_DETAIL = '/api/Countries/GetCountry',

  /** 获取国家列表 */
  GET_COUNTRY_LIST = '/api/Countries/CountryList',

  /** 国家下拉选 */
  GET_SELECT_LIST = '/api/Countries/CountrySelection',
  /** 国家添加/修改 */
  POST_COUNTRY = '/api/Countries/AddModifyCountry',
}

/**
 * @description: 国家下拉选
 * @param params
 * @returns
 */
export function GetSelectCountryList(params?: Pagination) {
  return requestClient.post<CountriesApi.GetSeleteListResult[]>(
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
  return requestClient.post<CountriesApi.GetCountryListResult[]>(
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
  return requestClient.post<CountriesApi.GetCountryListResult>(
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
  params: Omit<CountriesApi.GetSeleteListResult, 'AddTime'>,
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
