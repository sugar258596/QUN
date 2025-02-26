import type {
  AuditParams,
  DeleteParams,
  DetailParams,
  OrdinaryApi,
  Pagination,
  SystemApi,
} from '#/api';

import { requestClient } from '#/api/request';

export namespace ServiceApi {
  /** 客服列表返回值 */
  export interface GetCustomerListResult
    extends OrdinaryApi.GetUserDetailResult {
    /** 邀请码 */
    InviteCode: number;
    /** 佣金 */
    Amount: number;
    /** 冻结佣金 */
    FrozenAmount: number;
    /** 累计佣金 */
    SumAmount: number;
    /** 注册时间 */
    RegTime: string;
  }

  /** 客服申请列表请求参数 */
  export interface GetCustomerApplyListParams
    extends Omit<SystemApi.GetMessageListParams, 'IsPlus' | 'Sex'>,
      Pagination {
    /** 客服类型 */
    Type: number;
    /** 0-审核通过 1-待审核 2-审核不通过  */
    Status: number;
  }

  /** 客服申请列表返回值 */
  export interface GetCustomerApplyListResult
    extends OrdinaryApi.GetUserDetailResult {
    /** 用户Id */
    MemberId: number;
    /** 用户昵称 */
    UserNick: string;
    /** 姓名 */
    Name: string;
    /** 客服类型 */
    Type: string;
    /** 0-审核通过 1-待审核 2-审核不通过  */
    Status: number;
    /** 国家 ID */
    CountryId: number;
    /** 国家 */
    CountryName: string;
    /** 申请时间 */
    AddTime: string;
    /** 审核时间 */
    UpdateTime: string;
  }

  /** 客服申请修改 */
  export interface UpdateCustomerParams extends AuditParams {
    /** 客服Id */
    Id: number;
    /** 姓名 */
    Name: string;
    /** 国家 */
    CountryId: number;
    /** 联系方式 */
    Mobile: string;
    /** 邮箱 */
    Email: string;
    /** 审核备注 */
    Remark: string;
  }

  /** 代理客服业绩列表请求参数 */
  export interface GetAgentAchievementParams
    extends Omit<OrdinaryApi.GetUserListParams, 'IsPlus' | 'Sex'>,
      Pagination {
    /** 代理Id */
    Id: number;
  }
}

enum Api {
  /** 客服删除*/
  DELETE_CUSTOMER = '/api/CustomerService/DelCustomerService',

  /** 代理客服业绩 */
  GET_AGENT_ACHIEVEMENT = '/api/CustomerService/PerformanceList',
  /** 客服申请列表 */
  GET_CUSTOMER_APPLY_LIST = '/api/CustomerService/CustomerServiceList',
  /** 获取客服详情*/
  GET_CUSTOMER_DETAIL = '/api/CustomerService/CustomerServiceDetails',
  /** 获取客服列表 */
  GET_CUSTOMETR_LIST = '/api/CustomerService/CsAgentUserList',
  /** 客服申请修改 */
  UPDATE_CUSTOMER = '/api/CustomerService/UpdateCustomerService',

  /** 客服审核*/
  UPDATE_CUSTOMER_APPLY = '/api/CustomerService/CustomerServiceReview',
}

/**
 * @description 客服列表
 * @param params
 * @returns
 */
export function GetCustomerList(
  params: Omit<OrdinaryApi.GetUserListParams, 'IsPlus'> & Pagination,
) {
  return requestClient.post<ServiceApi.GetCustomerListResult[]>(
    Api.GET_CUSTOMETR_LIST,
    params,
  );
}

/**
 * @description 客服申请列表
 * @param params
 * @returns
 */
export function GetCustomerApplyList(
  params: ServiceApi.GetCustomerApplyListParams,
) {
  return requestClient.post<ServiceApi.GetCustomerApplyListResult[]>(
    Api.GET_CUSTOMER_APPLY_LIST,
    params,
  );
}

/**
 * @description 客服详情
 * @param params
 * @returns
 */
export function GetCustomerDetail(params: DetailParams) {
  return requestClient.post<ServiceApi.GetCustomerApplyListResult>(
    Api.GET_CUSTOMER_DETAIL,
    params,
  );
}

/**
 * @description 客服审核
 * @param params
 * @returns
 */
export function UpdateCustomerApply(params: AuditParams) {
  return requestClient.post(Api.UPDATE_CUSTOMER_APPLY, params);
}

/**
 * @description 客服申请修改
 * @param params
 * @returns
 */
export function UpdateCustomer(params: ServiceApi.UpdateCustomerParams) {
  return requestClient.post(Api.UPDATE_CUSTOMER, params);
}

/**
 * @description 客服删除
 * @param params
 * @returns
 */
export function DeleteCustomer(params: DeleteParams) {
  return requestClient.post(Api.DELETE_CUSTOMER, params);
}

/**
 * @description 代理客服业绩
 * @param params
 * @returns
 */
export function GetAgentAchievement(
  params: ServiceApi.GetAgentAchievementParams,
) {
  return requestClient.post<OrdinaryApi.GetUserFlowDetailResult[]>(
    Api.GET_AGENT_ACHIEVEMENT,
    params,
  );
}
