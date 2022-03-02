import React from 'react';
import {
  SmileOutlined, CrownOutlined,
  // TabletOutlined,
} from '@ant-design/icons';

export const routes = [
  {
    path: '/',
    component: '@/layouts',
    routes: [
      {
        path: '/',
        name: '首页',
        exact: true,
        icon: <SmileOutlined />,
        component: '@/pages/index',
      },
      {
        path: '/colleges',
        name: '院校管理',
        exact: true,
        icon: <CrownOutlined />,
        component: '@/pages/colleges',
      },
    ],
  },
  {
    path: '/user',
    component: '@/pages/index',
  },
];
