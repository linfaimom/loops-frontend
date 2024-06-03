// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取 namespace 列表 GET /api/v1/namespaces */
export async function fetchNamespaces(
  params: {
    envId: number;
  },
  options?: { [key: string]: any },
) {
  return request('/api/v1/namespaces', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
