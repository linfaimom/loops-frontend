// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取 ingress 列表 GET /api/v1/ingresses */
export async function fetchIngresses(
  params: {
    envId: number;
    namespace?: string;
    domain?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<API.Ingress[]>>('/api/v1/ingresses', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取 ingress yaml GET /api/v1/ingresses/one/yaml */
export async function fetchIngressYaml(
  params: {
    envId: number;
    namespace: string;
    name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<string>>('/api/v1/ingresses/one/yaml', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取 ingress 白名单 GET /api/v1/ingresses/one/yaml/whitelist */
export async function fetchIngressWhiteList(
  params: {
    envId: number;
    namespace: string;
    name: string;
    raw?: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<string[]>>('/api/v1/ingresses/one/whitelist', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新 ingress 白名单 POST /api/v1/ingresses/one/yaml/whitelist */
export async function updateIngressWhiteList(
  params: {
    envId: number;
    namespace: string;
    name: string;
    ipList: string[];
    override?: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<API.Ingress>>('/api/v1/ingresses/one/whitelist', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
