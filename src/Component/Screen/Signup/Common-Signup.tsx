import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import EmailSignup from './Email-Signup';
import SocialSignup from './Social-Signup';
import Headbar from '../../Shared/Headbar';
import Footbar from '../../Shared/Footbar';

const { Content } = Layout;

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
        <Headbar />
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
          </Menu>

          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            {this.selectSingup()}
          </div>
        </Content>
        <Footbar />
      </Layout>
    );
  }
}

export default CommmonSignup;
