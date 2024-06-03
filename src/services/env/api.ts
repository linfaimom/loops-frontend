import { request } from '@umijs/max';

/** 获取 env 列表 GET /api/v1/envs */
export async function fetchEnvs(options?: { [key: string]: any }) {
  return request<API.CommonResponse<API.Env[]>>('/api/v1/envs', {
    method: 'GET',
    ...(options || {}),
  });
}
