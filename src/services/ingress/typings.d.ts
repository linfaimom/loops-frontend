// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Ingress = {
    envId: number;
    namespace: string;
    ingressName: string;
    ingressClass: string;
    rules: { [key: string]: string[] };
  };
}
