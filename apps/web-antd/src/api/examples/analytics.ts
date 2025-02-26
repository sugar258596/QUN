import type { Pagination } from '#/api';

import { requestClient } from '#/api/request';

export namespace AnalyticsApi {
  /** 顶部统计返回参数 */
  export interface GetTopStatisticdResult {
    /** 总收入 */
    TotalRevenue: number;
    /** 昨日收入 */
    YesterdayIncome: number;
    /** 订单统计 */
    OrderStatistics: number;
    /** 昨日订单 */
    YesterdayOrder: number;
    /** 用户统计 */
    UserStatistics: number;
    /** 昨日新增用户 */
    YesterdayNewUser: number;
    /** 代理统计 */
    AgentStatistics: number;
    /** 昨日新增代理 */
    YesterdayNewAgent: number;
  }

  /** 物流状态数量返回参数 */
  export interface GetLogisticsStatusResult {
    /** 无主包裹  */
    UnownedPackage: number;
    /** 待入库  */
    WaitingWarehousing: number;
    /** 已入库  */
    HasWarehousing: number;
    /** 已出库  */
    HasIssue: number;
    /** 已清关  */
    ClearedCustoms: number;
    /** 国外入库  */
    ForeignStorage: number;
    /** 国外转运  */
    ForeignTranshipment: number;
    /** 已完成  */
    Completed: number;
  }
}

enum Api {
  /** 获取物流状态数量 */
  GET_LOGISTICS_STATUS = '/api/Home/LogisticsStateNumber',

  /** 获取顶部统计 */
  GET_TOP_STATISTICD = '/api/Home/TopStatistics',
}

/**
 * @description 获取顶部统计
 * @param params
 * @returns
 */
export function getTopStatisticd(params?: Pagination) {
  return requestClient.post<AnalyticsApi.GetTopStatisticdResult>(
    Api.GET_TOP_STATISTICD,
    params,
  );
}

/**
 * @description 获取物流状态数量
 * @param params
 * @returns
 */
export function getLogisticsStatus(params?: Pagination) {
  return requestClient.post<AnalyticsApi.GetLogisticsStatusResult>(
    Api.GET_LOGISTICS_STATUS,
    params,
  );
}
