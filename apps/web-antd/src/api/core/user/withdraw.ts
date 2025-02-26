import type { DetailParams, OrdinaryApi, Pagination, ServiceApi } from '#/api';

import { requestClient } from '#/api/request';

export namespace WithdrawApi {
  /** 获取提现列表请求参数 */
  export interface WithdrawListResult
    extends Omit<OrdinaryApi.GetUserListParams, 'IsPlus'>,
      Pagination {
    /** 类型 */
    Type: number;
  }

  /** 提现列表返回参数 */
  export interface WithdrawDetailResult
    extends ServiceApi.GetCustomerApplyListResult {
    /** 手机号 */
    PhoneNumber: number;
    /** 提现订单号 */
    OrderNo: string;
    /** 真实姓名 */
    RealName: string;
    /** 提现金额 */
    Amount: number;
    /** 用户类型  */
    UserType: string;
  }

  /** 获取提现详情返回参数 */
  export interface WithdrawDetail extends WithdrawDetailResult {
    /** 开户行 */
    CardName: number;
    /** 银行卡卡号 */
    BankCardNumber: string;
    /** 收款码 */
    CollectionCode: string;
    /** 用户类型 */
    IsAgency: number;
  }
}

enum Api {
  /** 获取提现详情 */
  GET_WITHDRAW_DETAIL = '/api/Withdrawal/WithdrawalDetails',
  /** 获取提现列表 */
  GET_WITHDRAW_LIST = '/api/Withdrawal/WithdrawalList',
  /** 提现审核 */
  POST_WITHDRAW_CHECK = '/api/Withdrawal/WithdrawalAudit',
}

/**
 * @description 获取提现列表
 * @param params
 * @returns
 */
export function getWithdrawList(params: WithdrawApi.WithdrawListResult) {
  return requestClient.post<ServiceApi.GetCustomerApplyListResult[]>(
    Api.GET_WITHDRAW_LIST,
    params,
  );
}

/**
 * @description 获取提现详情
 * @param params
 * @returns
 */
export function getWithdrawDetail(params: DetailParams) {
  return requestClient.post<WithdrawApi.WithdrawDetail>(
    Api.GET_WITHDRAW_DETAIL,
    params,
  );
}

/**
 * @description 提现审核
 * @param params
 * @returns
 */
export function postWithdrawCheck(params: WithdrawApi.WithdrawDetailResult) {
  return requestClient.post<OrdinaryApi.GetUserDetailResult>(
    Api.POST_WITHDRAW_CHECK,
    params,
  );
}
