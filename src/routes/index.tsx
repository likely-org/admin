import React from 'react';
import {
  SmileOutlined, CrownOutlined,
  // TabletOutlined,
} from '@ant-design/icons';
import { IRoute } from 'umi';

export const routes: IRoute[] = [
  {
    path: '/',
    component: '@/layouts',
    exact: false,
    // redirect: '/index',
    routes: [
      {
        path: '/index',
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
      {
        path: '/account',
        component: '@/pages/account',
        exact: true,
      },
    ],
  },
];
