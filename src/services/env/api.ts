import { request } from '@umijs/max';

/** 获取 env 列表 GET /api/v1/envs */
export async function fetchEnvs(options?: { [key: string]: any }) {
  return request<API.CommonResponse<API.Env[]>>('/api/v1/envs', {
    method: 'GET',
    ...(options || {}),
  });
}

type EnvCreateReqProps = {
  name: string;
  description: string;
  agentUrl: string;
  agentAuthUser: string;
  agentAuthPasswd: string;
};

/** 创建 env 信息 POST /api/v1/envs */
export async function createEnv(params: EnvCreateReqProps, options?: { [key: string]: any }) {
  return request<API.CommonResponse<number>>('/api/v1/envs', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除 env 信息 DELETE /api/v1/envs */
export async function deleteEnv(params: { id: number }, options?: { [key: string]: any }) {
  return request<API.CommonResponse<boolean>>('/api/v1/envs/' + params.id, {
    method: 'DELETE',
    ...(options || {}),
  });
}
