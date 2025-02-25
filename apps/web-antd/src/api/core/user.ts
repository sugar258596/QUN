import type { DeleteParams, DetailParams, Pagination } from '#/api/parameter';

import { requestClient } from '#/api/request';

export namespace UserApi {
  /** * 管理员用户信息返回值 */
  export interface adminInfoResult {
    /** 账号 */
    Username: string;
    /** 账号类型 */
    roleName: string;
    /** 首页地址 */
    homePath: string;
  }

  /** 管理员列表请求参数 */
  export interface adminListParams extends Pagination {
    /** 搜索 */
    Keywords?: string;
  }
  /** 管理员列表返回值 */
  export interface adminListResult {
    /** 管理员ID */
    Id: number;
    /** 注册时间 */
    AddTime: string;
    /** 手机号 */
    Mobile: string;
    /** 姓名 */
    RoleName: string;
    /** 登录名 */
    Username: string;
  }
  /** 新增/修改 管理员请求参数 */
  export interface adminAddParams {
    /** 管理员id */
    Id?: number;
    /** 角色Id */
    roleId: number;
    /** 是否锁定账户 0-否 1-是 */
    isLock: number;
    /** 登录名 */
    userName: string;
    /** 密码 */
    password: string;
    /** 二次密码 */
    usePassword: string;
    /** 姓名 */
    realName?: string;
    /** 手机号 */
    mobile: string;
    /** 邮箱 */
    email?: string;
  }
  /** 管理员详情返回值 */
  export interface adminDetailResult extends adminListResult {
    /** 是否锁定 */
    Is_lock: number;
    /** 手机区号 */
    MobileCountryCode: number;
    /** 角色类型 */
    Role_id: number;
    /** 姓名 */
    Realname: string;
    /** 邮箱 */
    Email: string;
  }

  /** 菜单列表返回值 */
  export interface menuListResult {
    /** 菜单ID */
    Id: number;
    /** 菜单排序 */
    Sort_id: number;
    /** 父级菜单ID */
    Parent_id: number;
    /** 菜单名称 */
    Title: string;
    /** 菜单图标标识 */
    Icon_url: string;
    /** 菜单调用名称 */
    Name: string;
    /** 菜单链接 */
    Link_url: string;
    /** 菜单状态 0-禁用 1-启用 */
    Is_lock: number;
    /** 子菜单 */
    SubMenuList: menuListResult[];
  }
  /** 菜单列表的顶级菜单返回值 */
  export interface menuTopListResult {
    /** 菜单ID */
    Id: number;
    /** 菜单名称 */
    Title: string;
  }
  /** 菜单详情返回值 */
  export interface menuDetailResult extends menuListResult {
    /** 权限 */
    Action_type: string;
  }
  /** 添加修改请求参数 */
  export interface menuAddParams extends Partial<menuDetailResult> {
    isLock: number;
    actionType: string;
  }

  /** 角色列表返回参值 */
  export interface roleListResult {
    /** 角色ID */
    Id: number;
    /** 角色名称 */
    Role_name: string;
    /** 角色类型 管理员类型 1-超级用户 2-系统用户 */
    Role_type: number;
  }

  /** 获取角色权限资源 */
  export interface roleAuthorityResult extends Partial<menuListResult> {
    /** 拥有权限 */
    Action_type: string;
    /** 选中权限 */
    Admin_ActionType: string;
    /** 子菜单 */
    SubRoleList?: roleAuthorityResult[];
  }

  /** 角色详情返回参数*/
  export interface roleDetailResult extends roleListResult {
    /** 角色类型 */
    Role_type: number;
    /** 角色名称 */
    Role_name: string;
    /** 权限 */
    RoleList: roleAuthorityResult[];
  }

  /** 角色类型放回数据 */
  export interface roleTypeListResult {
    /** 角色Id */
    Id: number;
    /** 角色类型名称 */
    Name: string;
  }

  /** 添加修角色请求参数 */
  export interface roleAddParams extends Partial<roleListResult> {
    /** 角色类型 */
    roleType: number;
    /** 角色名称 */
    roleName: string;
    /** 权限序列化 */
    authorityJson: string;
  }

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
    /** 用户ID */
    Id: number;
    /** 头像 */
    Avatar: string;
    /** 昵称 */
    NickName: string;
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
  /** 获取管理员详情 */
  GET_ADMIN_DETAIL = '/api/System/AdminInfo',
  /** 获取管理员用户信息 */
  GET_ADMIN_INFO = '/api/System/GetAdminInfo',
  /** 管理员列表 */
  GET_ADMIN_LIST = '/api/System/AdminList',
  /** 行为日志 */
  GET_BEHAVIOR_LOG = '/api/System/AdminLog',
  /** 获取菜单详情 */
  GET_MENU_DETAIL = '/api/System/MenuInfo',

  /** 菜单列表 */
  GET_MENU_LIST = '/api/System/MenuList',
  /** 获取菜单列表的顶级菜单 */
  GET_MENU_TOP_LIST = '/api/System/TopMenuBox',
  /** 获取角色权限资源 */
  GET_ROLE_AUTHORITY = '/api/System/ShowMenuInfo',
  /** 获取角色详情 */
  GET_ROLE_DETAIL = '/api/System/RoleInfo',
  /** 获取角色列表 */
  GET_ROLE_LIST = '/api/System/RoleList',

  /** 获取角色类型数据 */
  GET_ROLE_TYPE_LIST = '/api/System/GetRoleTypeList',
  /** 获取用户流水详情 */
  GET_USER_FLOW_DETAIL = '/api/User/UserWalletLogDetails',
  /** 获取用户流水列表 */
  GET_USER_FLOW_LIST = '/api/User/UserWalletLogList',
  /** 获取普通用户列表 */
  GET_USER_LIST = '/api/User/UserList',
  /** 新增/修改管理员*/
  POST_ADMIN_ADD = '/api/System/AddOrEditAdmin',
  /** 删除管理员 */
  POST_ADMIN_DELETE = '/api/System/DelAdmin',
  /** 新增/修改菜单 */
  POST_MENU_ADD = '/api/System/AddOrEditMenu',

  /** 删除菜单 */
  POST_MENU_DELETE = '/api/System/DelMenu',
  /** 新增/修改角色 */
  POST_ROLE_ADD = '/api/System/AddOrEditRole',
  /** 删除角色 */
  POST_ROLE_DELETE = '/api/System/DelRole',
}

/**
 * @description 获取管理员用户信息
 * @param params
 * @returns
 */
export async function getUserInfoApi(params?: any) {
  return requestClient.post(Api.GET_ADMIN_INFO, params);
}

/**
 * @description 获取管理员列表
 * @param params
 * @returns
 */
export async function getAdminListApi(params: UserApi.adminListParams) {
  return requestClient.post<UserApi.adminListResult[]>(
    Api.GET_ADMIN_LIST,
    params,
  );
}

/**
 * @description 新增/修改管理员
 * @param params
 * @returns
 */
export async function postAdminAddApi(params: UserApi.adminAddParams) {
  return requestClient.post(Api.POST_ADMIN_ADD, params);
}

/**
 * @description 获取管理员详情
 * @param params
 * @returns
 */
export async function getAdminDetailApi(params: DetailParams) {
  return requestClient.post<UserApi.adminDetailResult>(
    Api.GET_ADMIN_DETAIL,
    params,
  );
}

/**
 * @description 删除管理员
 * @param params
 * @returns
 */
export async function postAdminDeleteApi(params: DeleteParams) {
  return requestClient.post(Api.POST_ADMIN_DELETE, params);
}

/**
 * @description 获取菜单列表
 * @param params
 * @returns
 */
export async function getMenuListApi(params?: any) {
  return requestClient.post<UserApi.menuListResult[]>(
    Api.GET_MENU_LIST,
    params,
  );
}

/**
 * @description 获取菜单列表的顶级菜单
 * @param params
 * @returns
 */
export async function getMenuTopListApi(params?: any) {
  return requestClient.post<UserApi.menuListResult[]>(
    Api.GET_MENU_TOP_LIST,
    params,
  );
}

/**
 * @description 获取菜单详情
 * @param params
 * @returns
 */
export async function getMenuDetailApi(params: DetailParams) {
  return requestClient.post<UserApi.menuDetailResult>(
    Api.GET_MENU_DETAIL,
    params,
  );
}

/**
 * @description 新增/修改菜单
 * @param params
 * @returns
 */
export async function postMenuAddApi(params: UserApi.menuAddParams) {
  return requestClient.post(Api.POST_MENU_ADD, params);
}

/**
 * @description 删除菜单
 * @param params
 * @returns
 */
export async function postMenuDeleteApi(params: DeleteParams) {
  return requestClient.post(Api.POST_MENU_DELETE, params);
}

/**
 * @description 获取角色列表
 * @param params
 * @returns
 */
export async function getRoleListApi(params?: UserApi.adminListParams) {
  return requestClient.post<UserApi.roleListResult[]>(
    Api.GET_ROLE_LIST,
    params,
  );
}

/**
 * @description 获取角色详情
 * @param params
 * @returns
 */
export async function getRoleDetailApi(params: DetailParams) {
  return requestClient.post<UserApi.roleDetailResult>(
    Api.GET_ROLE_DETAIL,
    params,
  );
}
/**
 * @description 获取角色类型数据
 * @param params
 * @returns
 */
export async function getRoleTypeListApi(params?: any) {
  return requestClient.post<UserApi.roleListResult[]>(
    Api.GET_ROLE_TYPE_LIST,
    params,
  );
}

/**
 * @description 新增/修改角色
 * @param params
 * @returns
 */
export async function postRoleAddApi(params: UserApi.roleAddParams) {
  return requestClient.post(Api.POST_ROLE_ADD, params);
}

/**
 * @description 获取角色权限资源
 * @param params
 * @returns
 */
export async function getRoleAuthorityApi(params?: any) {
  return requestClient.post<UserApi.roleAuthorityResult[]>(
    Api.GET_ROLE_AUTHORITY,
    params,
  );
}

/**
 * @description 删除角色
 * @param params
 * @returns
 */
export async function postRoleDeleteApi(params: DeleteParams) {
  return requestClient.post(Api.POST_ROLE_DELETE, params);
}

/**
 * @description 获取行为日志列表
 * @param params
 * @returns
 */
export async function getBehaviorLogApi(params?: any) {
  return requestClient.post<UserApi.adminListResult[]>(
    Api.GET_BEHAVIOR_LOG,
    params,
  );
}

/**
 * @description 获取普通用户列表
 * @param params
 * @returns
 */
export function getUserList(params: UserApi.GetUserListParams) {
  return requestClient.post<UserApi.GetUserListResult[]>(
    Api.GET_USER_LIST,
    params,
  );
}

/**
 * @description 获取用户流水列表
 * @param params
 * @returns
 */
export function getUserFlowList(params: UserApi.GetUserFlowListParams) {
  return requestClient.post<UserApi.GetUserFlowListResult[]>(
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
  return requestClient.post<UserApi.GetUserFlowDetailResult>(
    Api.GET_USER_FLOW_DETAIL,
    params,
  );
}
