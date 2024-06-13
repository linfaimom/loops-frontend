export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
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
    name: '日常运维',
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
