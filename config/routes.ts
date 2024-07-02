export default [
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '平台管理',
    icon: 'setting',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/env' },
      { path: '/admin/env', name: '环境管理', component: './Admin/Env' },
    ],
  },
  {
    name: '研发自助工具',
    icon: 'crown',
    path: '/dev',
    routes: [
      { path: '/dev', redirect: '/dev/envDeployInfo' },
      { path: '/dev/envDeployInfo', name: '环境部署情况', component: './Dev/EnvDeployInfo' },
      { path: '/dev/corpEgressInfo', name: '集团出口 IP', component: './Dev/CorpEgressInfo' },
    ],
  },
  {
    name: 'SRE 运维工具',
    icon: 'table',
    access: 'canAdmin',
    path: '/ops',
    routes: [
      { path: '/ops', redirect: '/ops/ingress' },
      { path: '/ops/ingress', name: 'Ingress 管理', component: './Ops/Ingress' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
