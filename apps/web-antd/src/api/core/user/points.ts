import type { DetailParams, OrdinaryApi, Pagination, ServiceApi } from '#/api';

import { requestClient } from '#/api/request';

export namespace PointsApi {
  /** 积分申请列表返回参数 */
  export interface PointsDetailResult
    extends ServiceApi.GetCustomerApplyListResult {
    /** 积分产品名称 */
    ScoreProductTitle: string;
  }

  /** 积分详情返回参数 */
  export interface PointsDetailDetailResult extends PointsDetailResult {
    /** 积分产Id */
    ScoreProductId: number;
    /** 积分数量 */
    Score: number;
    /** 收货人 */
    Consignee: string;
    /** 国内省市区 */
    AreaText: string;
    /** 详细地址 */
    Address: string;
    /** 备注 */
    Remark: string;
  }
}

enum Api {
  /** 积分兑换详情 */
  GET_POINTS__DETAIL = '/api/ScoreRecord/ScoreApplicationDetails',
  /** 积分申请列表 */
  GET_POINTS_LIST = '/api/ScoreRecord/ScoreApplicationList',
  /** 兑换审核 */
  POST_POINTS_CHECK = '/api/ScoreRecord/ScoreExchangeReview',
}

/**
 * @description 积分申请列表
 * @param params
 * @returns
 */
export function getPointsList(
  params: Omit<OrdinaryApi.GetUserListParams, 'IsPlus' | 'Keywords'> &
    Pagination,
) {
  return requestClient.post<PointsApi.PointsDetailResult[]>(
    Api.GET_POINTS_LIST,
    params,
  );
}

/**
 * @description 积分兑换详情
 * @param params
 * @returns
 */
export function getPointsDetail(params: DetailParams) {
  return requestClient.post<PointsApi.PointsDetailDetailResult>(
    Api.GET_POINTS__DETAIL,
    params,
  );
}

/**
 * @description 兑换审核
 * @param params
 * @returns
 */
export function postPointsCheck(params: PointsApi.PointsDetailResult) {
  return requestClient.post(Api.POST_POINTS_CHECK, params);
}
