export default [
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '平台管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/env' },
      { path: '/admin/env', name: '环境管理', component: './Admin/Env' },
    ],
  },
  {
    name: '研发自助工具',
    icon: 'table',
    path: '/dev',
    routes: [
      { path: '/dev', redirect: '/dev/deployinfo' },
      { path: '/dev/corpegress', name: '集团出口 IP', component: './Dev/CorpEgress' },
      { path: '/dev/deployinfo', name: '环境版本信息', component: './Dev/VersionInfo' },
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
