// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前登陆用户 */
export async function fetchCurrentUser(options?: { [key: string]: any }) {
  return request<API.CommonResponse<API.CurrentUser>>('/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}
