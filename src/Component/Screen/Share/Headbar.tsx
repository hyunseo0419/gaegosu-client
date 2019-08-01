import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './logo.css';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

class Headbar extends Component {
  logoClick = () => {
    // <Link to={`/`} />;
  };
  render() {
    return (
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo">
          <img
            // src="https://www.clipartmax.com/png/middle/93-935635_dog-with-long-body-comments-dog-with-long-body.png"
            alt="logo"
            onClick={this.logoClick}
          />
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          // defaultSelectedKeys={['2']}
          style={{ position: 'fixed', right: 0, lineHeight: '64px' }}
        >
          <Menu.Item key="1">empty</Menu.Item>
          <Menu.Item key="2">logout</Menu.Item>
          <Menu.Item key="3">
            login/Mypage
            <Link to={`/login`} />
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default Headbar;
