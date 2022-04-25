import { LoginForm, ProFormText, ProForm } from '@ant-design/pro-form';
import {
  UserOutlined,
  LockOutlined,
  // WechatOutlined,
  MailOutlined,
} from '@ant-design/icons';
import {
  // message,
  Tabs, Button, Input } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';
import { getUserApi, createUserApi, getImgCaptchaApi, getEmailCaptchaApi } from '@/services';
import { history } from 'umi';

import './index.less';

type LoginType = 'login' | 'register';

// const iconStyles: CSSProperties = {
//   marginLeft: '16px',
//   color: 'rgba(0, 0, 0, 0.2)',
//   fontSize: '24px',
//   verticalAlign: 'middle',
//   cursor: 'pointer',
// };

export default () => {
  const [loginType, setLoginType] = useState<LoginType>('login');
  const [imgCaptcha, setImgCaptcha] = useState();
  const [values, setValues] = useState({
    username: 'admin',
    password: 'admin',
    email: '919590347@qq.com',
  });

  const onFinish = async (data) => {
    console.log('onFinish :>> ', data);
    if (loginType === 'login') {
      await getUserApi(data);
      history.push('/index');
    } else {
      await createUserApi(data);
    }
    return Promise.resolve();
  };

  const getImgCaptcha = async () => {
    try {
      const { data: { data } } = await getImgCaptchaApi() || {};
      setImgCaptcha(data);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  const getEmailCaptcha = async () => {
    await getEmailCaptchaApi(values);
  };

  useEffect(
    () => {
      getImgCaptcha();
    }
    , [],
  );

  return (
    <div className="account-container">
      <LoginForm
        onValuesChange={setValues}
        initialValues={values}
        onFinish={onFinish}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="可能留学"
        subTitle="后台管理系统"
        // actions={
        //   <Space>
        //     其他登录方式
        //     <WechatOutlined style={iconStyles} />
        //   </Space>
        // }
      >
        <Tabs activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)}>
          <Tabs.TabPane key={'login'} tab="登录" />
          <Tabs.TabPane key={'register'} tab="注册" />
        </Tabs>
        <ProFormText
          name="username"
          label="姓名"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined />,
          }}
          placeholder="请输入用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          label="密码"
          allowClear
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined />,
          }}
          placeholder="请输入密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        {
          loginType === 'register' &&
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <MailOutlined />,
            }}
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            rules={[
              {
                required: true,
                message: '请输入邮箱！',
              },
              {
                pattern: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
                message: '邮箱格式错误！',
              },
            ]}
          />
        }
        <ProForm.Item
          name="captcha"
          label="验证码"
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
            {
              len: 4,
              message: '验证码为4位',
            },
          ]}
          extra="请打开注册邮箱，并输入4位验证码！"
        >
          <div className="df">
            <Input
              placeholder="请输入验证码"
              allowClear
            />
            {loginType === 'register' ?
              (
                <Button
                  type="primary"
                  className="ml10"
                  onClick={getEmailCaptcha}
                >
                  获取验证码
                </Button>
              ) : (
                // eslint-disable-next-line react/no-danger-with-children
                <div
                  className="ml10 captcha-wrap"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: imgCaptcha || '验证码加载失败',
                  }}
                  onClick={getImgCaptcha}
                />
              )
          }
          </div>
        </ProForm.Item>
        {/* <ProFormCaptcha
          name="captcha"
          label="验证码"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined />,
          }}
          captchaProps={{
            size: 'large',
          }}
          placeholder={'请输入验证码'}
          captchaTextRender={(timing, count) => {
            if (timing) {
              return `${count} ${'获取验证码'}`;
            }
            return '获取验证码';
          }}
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
          onGetCaptcha={async () => {
            message.success('获取验证码成功！验证码为：1234');
          }}
        /> */}
        {/* {
          loginType === 'login' &&
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        } */}
      </LoginForm>
    </div>
  );
};
