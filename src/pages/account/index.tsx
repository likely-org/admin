import { LoginForm, ProFormText, ProFormCaptcha, ProFormCheckbox, ProForm } from '@ant-design/pro-form';
import {
  UserOutlined,
  MobileOutlined,
  LockOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
  WechatOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { message, Tabs, Space, Button, Input } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import './index.less';

type LoginType = 'login' | 'register';

const iconStyles: CSSProperties = {
  marginLeft: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

export default () => {
  const [loginType, setLoginType] = useState<LoginType>('login');
  return (
    <div className="account-container">
      <LoginForm
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="可能留学"
        subTitle="后台管理系统"
        actions={
          <Space>
            其他登录方式
            <WechatOutlined style={iconStyles} />
          </Space>
        }
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
          placeholder={'用户名: admin or user'}
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
          placeholder={'密码: ant.design'}
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
            name="mobile"
            label="邮箱"
            placeholder={'邮箱'}
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
        }
        <ProForm.Item
          name="captcha"
          label="验证码"
          // rules={rules('Please input correct captcha!', 'captcha')}
          extra="We must make sure that your are a human."
        >
          <div className="df">
            <Input
              placeholder="input four code"
              allowClear
            />
            {loginType === 'register' && (
            <Button
              type="primary"
              className="ml10"
              // onClick={onCaptchaByEmail}
            >
              获取验证码
            </Button>
            )}
            {loginType === 'login' && (
            <div
              className="ml10 captcha-wrap"
              // dangerouslySetInnerHTML={{
              //   __html: captchaInfo.data || '验证码加载失败',
              // }}
              // onClick={onCaptcha}
            >
              11
            </div>
            )}
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
