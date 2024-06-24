// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

// 直接在 nginx 侧配个 proxy_pass，不然会有跨域问题
/** 获取集团出口 ip 列表。curl -H "Content-Type: application/json" -H "key:egrees_1" -H "secret:5de25b29de21702d9534663d2d9e04b6" -d '{"status":"1"}' -X POST http://network.netease.com/api/forward/ipam_get_egress */
export async function fetchCorpEgresses(options?: { [key: string]: any }) {
  return request('/api/v1/corpegresses', {
    method: 'POST',
    headers: { key: 'egrees_1', secret: '5de25b29de21702d9534663d2d9e04b6' },
    data: {
      status: '1',
    },
    ...(options || {}),
  });
}
