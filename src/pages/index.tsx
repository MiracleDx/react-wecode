import React from 'react';
import styles from './index.css';

import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import CodeEditor from '@/components/CodeEditor';

const { Header, Sider, Content, Footer } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
    height: 0
  };

  componentDidMount(): void {
    let height = document.body.clientHeight;
    // 屏幕高度 - 头部 - content上边距 - 底部
    height = height - 65 - 25 - 90;
    this.setState({
      height: height
    })
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          breakpoint="lg"
          onBreakpoint={broken => {
            console.log(broken);
          }}
         >

          <div className={styles.logo} />

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <UserOutlined />
              <span>代码编辑器</span>
            </Menu.Item>

            <Menu.Item key="2">
              <VideoCameraOutlined />
              <span>提交记录</span>
            </Menu.Item>

            <Menu.Item key="3">
              <UploadOutlined />
              <span>DashBoard</span>
            </Menu.Item>
          </Menu>

        </Sider>

        <Layout className={styles.layout}>

          <Header className={styles.background} style={{ padding: 0}}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: styles.trigger,
              onClick: this.toggle,
            })}
          </Header>

          <Content
            className={styles.background}
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              height: this.state.height
            }}
          >
            {/*编辑器*/}
            <CodeEditor />
          </Content>

          <Footer style={{ textAlign: 'center' }}>WeCode ©2020 Created by Dx</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default () => {
  return (
      <App />
  );
}
