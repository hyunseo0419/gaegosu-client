import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import EmailSignup from './Email-Signup';
import SocialSignup from './Social-Signup';

const { Header, Content, Footer } = Layout;

class CommmonSignup extends Component {
  state = {
    current: 'mail',
  };

  handleClick = (e: any) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  selectSingup = () => {
    if (this.state.current === 'mail') {
      return <EmailSignup />;
    } else {
      return <SocialSignup />;
    }
  };

  render() {
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>

          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item key="mail">
              <Icon type="mail" />
              Email 회원가입
            </Menu.Item>
            <Menu.Item key="social">
              <Icon type="appstore" />
              Social 회원가입
            </Menu.Item>
          </Menu>

          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            {this.selectSingup()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

export default CommmonSignup;
