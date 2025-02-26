import type { DetailParams, Pagination } from '#/api';

import { requestClient } from '#/api/request';

export namespace OrdinaryApi {
  /** 获取普通用户请求参数 */
  export interface GetUserListParams {
    /** 开始时间 */
    StartTime: string;
    /** 结束时间 */
    EndTime: string;
    /** 关键字 */
    Keywords: string;
    /** 性别  0男 1女 */
    Sex: number;
    /**  是否Plus 1-是 0-否，此条件不筛选则传-1 */
    IsPlus: number;
  }
  /** 用户基础信息 */
  export interface GetUserDetailResult {
    /** ID */
    Id: number;
    /** 头像 */
    Avatar: string;
    /** 用户ID */
    MemberId: number;
    /** 昵称 */
    NickName: string;
    UserNick: string;
    /** 是否会员 0-否 1-是 */
    IsPlus: number;
    /** 是否实名 0-否 1-是 */
    IsRealName: number;
    /** 性别  0男 1女 */
    Sex: number;
    /** 手机号 */
    Mobile: string;
    /** 邮箱 */
    Email: string;
    /** 状态 0-正常 1-冻结  */
    Status: number;
  }

  /** 普通用户列表响应参数 */
  export interface GetUserListResult extends GetUserDetailResult {
    /** 客户码 */
    UserCode: string;
    /** 余额 */
    Wallet: number;
    /** 剩余积分 */
    Score: number;
  }

  /** 获取用户流水列表请求参数 */
  export interface GetUserFlowListParams extends Pagination {
    /** 开始时间 */
    StartTime: string;
    /** 结束时间 */
    EndTime: string;
    /** 订单号 */
    Keywords: string;
    /** 用户ID */
    Id: number;
    /** 状态 0-正常 1-不正常 */
    Status: number;
  }
  /** 用户流水列表响应参数 */
  export interface GetUserFlowListResult {
    /** 流水ID */
    Id: number;
    /** 用户ID */
    UserId: number;
    /** 用户昵称 */
    UserNick: string;
    /** 用户头像 */
    Avatar: string;
    /** 账号类型 */
    WalletType: number;
    /** 标题枚举 */
    TitleType: number;
    /** 订单号 */
    OrderNo: string;
    /** 来源类型 */
    SourceType: number;
    /** 改变后的金额(余额才添加) */
    After: number;
    /** 添加时间 */
    AddTime: string;
    /** 状态 0-正常 1-冻结 99-删除 */
    WalletStatus: number;
  }
  /** 用户流水详情响应参数 */
  export interface GetUserFlowDetailResult extends GetUserFlowListResult {
    /** 用户id */
    MemberId: number;
    /** 记录来源 */
    SourceUserId: number;
    /** 变化 */
    Change: number;
    /** 改变前的金额(余额才添加) */
    Before: number;
    /** 标识 */
    Note: string;
    /** 备注 */
    Remark: string;
  }
}

enum Api {
  /** 获取用户流水详情 */
  GET_USER_FLOW_DETAIL = '/api/User/UserWalletLogDetails',
  /** 获取用户流水列表 */
  GET_USER_FLOW_LIST = '/api/User/UserWalletLogList',

  /** 获取普通用户列表 */
  GET_USER_LIST = '/api/User/UserList',
}

/**
 * @description 获取普通用户列表
 * @param params
 * @returns
 */
export function getUserList(
  params: OrdinaryApi.GetUserListParams & Pagination,
) {
  return requestClient.post<OrdinaryApi.GetUserListResult[]>(
    Api.GET_USER_LIST,
    params,
  );
}

/**
 * @description 获取用户流水列表
 * @param params
 * @returns
 */
export function getUserFlowList(params: OrdinaryApi.GetUserFlowListParams) {
  return requestClient.post<OrdinaryApi.GetUserFlowListResult[]>(
    Api.GET_USER_FLOW_LIST,
    params,
  );
}

/**
 * @description 获取用户流水详情
 * @param params
 * @returns
 */
export function getUserFlowDetail(params: DetailParams) {
  return requestClient.post<OrdinaryApi.GetUserFlowDetailResult>(
    Api.GET_USER_FLOW_DETAIL,
    params,
  );
}
