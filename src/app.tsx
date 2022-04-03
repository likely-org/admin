import { ReactNode } from 'react';
import { history } from 'umi';
import { RecoilRoot } from 'recoil';
import Cookies from 'js-cookie';

export function render(oldRender: Function) {
  // TODO 接口后修改
  const token = Cookies.get('token') || 'token';
  console.log('token :>> ', token);
  if (!token) {
    history.push('/account');
  }
  oldRender();
}

export function rootContainer(container: ReactNode) {
  return (
    <RecoilRoot>
      {container}
    </RecoilRoot>
  );
}
