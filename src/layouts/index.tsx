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
  } = props;
  console.log('props :>> ', props);
  const history = useHistory();
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
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
          console.log('item, dom, ...rest :>> ', item, dom);
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
