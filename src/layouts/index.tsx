import {
  ReactNode,
} from 'react';

import ProLayout,
{
  PageContainer,
} from '@ant-design/pro-layout';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export default ({ children }: {
  children: ReactNode;
}) => {
  const history = useHistory();
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        location={{
          pathname: history.location.pathname,
        }}
        ErrorBoundary={false}
        breadcrumbRender={(routers = []) => routers}
        rightContentRender={() => (
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        )}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              history.push(item.path || '/');
            }}
          >
            {dom}
          </a>
        )}
        menuDataRender={() => [
          {
            path: '/',
            name: '首页',
          },
          {
            path: '/colleges',
            name: '院校管理',
          },
        ]}
      >
        <PageContainer>
          {children}
        </PageContainer>
      </ProLayout>
    </div>
  );
};
