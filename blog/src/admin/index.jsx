import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSchemaData } from './hook/useSchemaData';
import { parseJsonByString } from '../common/utils';
import { AuthenticationClient } from 'authing-js-sdk'
import { getLoginStatus, cleanLoginData} from './util/login';
import HomeManagement from './container/HomeManagement'
import BasicSetting from './container/BasicSetting';
import { MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, RollbackOutlined } from '@ant-design/icons';
import { Layout, Menu, } from 'antd';
import store from './store';
import  Login  from './container/Login';

import './app.css';
import 'normalize.css';
import './style.scss';
import styles from './style.module.scss';
import request from '../common/request';

const { Header, Sider, Content } = Layout;

const authClient = new AuthenticationClient({
  // 替换你的 AppId
  appId: "62f8bc6e153d50bc57cea7b9",
});

const useCollapsed = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => { setCollapsed(!collapsed) }
  return { collapsed, toggleCollapsed }
}

const Wrapper = () => {

  const handleHomePageRedirect = () => { window.location.href = "/" }

  const { collapsed, toggleCollapsed } = useCollapsed();

  const { changeSchema } = useSchemaData();

  const login = getLoginStatus();
  
  const photo = window.localStorage.photo;

  const handleLogOut = () => {
    authClient.logout();
    cleanLoginData();
    window.location.reload();
  }

  useEffect(() => {
    request.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data;
      data && changeSchema(parseJsonByString(data.schema, {}));
    })
  }, [])// eslint-disable-line

  return login ? (
    <Router>
      <Layout>
        <Sider trigger={null} className={styles.sidbar} collapsible collapsed={collapsed}>
          {/* <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['admin-home']}
            onClick={({ key }) => { if (key === 'admin-key') { window.location.href = ('/') } }}
            items={[
              {
                key: 'admin-home',
                icon: <HomeOutlined />,
                label: '首页内容管理',
              },
              {
                key: 'admin-key',
                icon: <HomeOutlined />,
                label: '基础内容配置',
              },
              {
                key: 'admin-key',
                icon: <RollbackOutlined />,
                label: '返回用户页面',
              },
              
            ]}
          /> */}

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['admin-home']}>
            <Menu.Item key="admin-home">
              <Link to="/">
                <HomeOutlined />&nbsp; &nbsp;首页内容管理
              </Link>
            </Menu.Item>
            <Menu.Item key="admin-setting">
              <Link to="/setting">
                <HomeOutlined />&nbsp; &nbsp; 基础内容配置
              </Link>
            </Menu.Item>
            <Menu.Item key="admin-back" onClick={handleHomePageRedirect}>
              <RollbackOutlined />&nbsp; &nbsp; 返回用户页面
            </Menu.Item>
          </Menu>;

        </Sider>
        <Layout>
          <Header className={styles.header}
          >
            {
              collapsed ?
                <MenuUnfoldOutlined className='triggler' style={{ color: 'white' }} onClick={() => toggleCollapsed(!collapsed)} /> : <MenuFoldOutlined className='triggler' style={{ color: 'white' }} onClick={() => toggleCollapsed(!collapsed)} />
            }<img className={styles.avatar} src={photo} alt={'avatar'} onClick={handleLogOut}/>
          </Header>
          <Content
            style={{
              padding: 20,
              minHeight: 1000,
            }}
          >
            <Routes>
              <Route path='/' element={<HomeManagement />} exact />
              <Route path='setting' element={<BasicSetting />} exact />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  ): <Login/>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Wrapper />
  </Provider>
);


