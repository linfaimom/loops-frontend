// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取 namespace 列表 GET /api/v1/namespaces */
export async function fetchDeploymentBasicInfos(
  params: {
    envId: number;
    namespace: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<API.DeploymentWithContainers[]>>('/api/v1/deployments', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
