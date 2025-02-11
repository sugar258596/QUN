import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';
/**
 * 获取用户信息
 */

enum Api {
  GetAdminInfo = '/api/System/GetAdminInfo ',
}

export async function getUserInfoApi() {
  return requestClient.post<UserInfo>(Api.GetAdminInfo);
}
