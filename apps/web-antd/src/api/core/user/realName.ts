import type { AuditParams, DetailParams, OrdinaryApi, Pagination } from '#/api';

import { requestClient } from '#/api/request';

export namespace RealNameApi {
  /** 实名制列表返回参数 */
  export interface RealNameListResult extends OrdinaryApi.GetUserDetailResult {
    /** 姓名 */
    Name: string;
    /** 身份证号 */
    IDnumber: string;
    /** 国家码 */
    CountryCode: number;
    /** 审核备注 */
    ReviewComments: string;
    /** 申请时间 */
    AddTime: string;
    /** 审核时间 */
    UpdateTime: string;
    /** 证明图片 */
    AdditionalInfo: string[];
  }
}

enum Api {
  /** 获取实名详情 */
  GET_REAL_NAME_DETAIL = '/api/RealName/RealNameDetails',
  /** 获取实名制列表 */
  GET_REAL_NAME_LIST = '/api/RealName/CustomerServiceList',
  /** 实名制审核 */
  POST_REAL_NAME_CHECK = '/api/RealName/IdentityVerificationIs',
}

/**
 * @description 获取实名认证列表
 * @param params
 * @returns
 */
export function getRealNameList(
  params: Omit<OrdinaryApi.GetUserListParams, 'IsPlus'> & Pagination,
) {
  return requestClient.post<RealNameApi.RealNameListResult[]>(
    Api.GET_REAL_NAME_LIST,
    params,
  );
}

/**
 * @description 获取实名认证详情
 * @param params
 * @returns
 */
export function getRealNameDetail(params: DetailParams) {
  return requestClient.post<RealNameApi.RealNameListResult>(
    Api.GET_REAL_NAME_DETAIL,
    params,
  );
}

/**
 * @description 实名认证审核
 * @param params
 * @returns
 */
export function postRealNameCheck(params: AuditParams) {
  return requestClient.post(Api.POST_REAL_NAME_CHECK, params);
}
