import ProLayout,
{
  PageContainer,
} from '@ant-design/pro-layout';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { IRouteComponentProps } from 'umi';
import { routes } from '@/routes';

export default function Layouts(props: IRouteComponentProps) {
  const {
    children,
    // route,
    location,
  } = props;
  const history = useHistory();
  if (location.pathname === '/account') {
    return children;
  }

  return (
    <div className="full">
      <ProLayout
        route={routes[0]}
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
        menuItemRender={(item, dom) => {
          return (
            <a
              onClick={() => {
                history.push(item.path || '/');
              }}
            >
              {dom}
            </a>
          );
        }}
        menuDataRender={(menuData) => {
          return menuData;
        }}
      >
        <PageContainer>
          {children}
        </PageContainer>
      </ProLayout>
    </div>
  );
}
