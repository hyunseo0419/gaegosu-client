import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './logo.css';
import { Layout, Menu, Button } from 'antd';
import { async } from 'q';
// import Mypage from '../Screen/Mypage/Mypage';

const { Header } = Layout;

// const isLogin = false;
const Storage: any = localStorage.getItem('userInfo');
const userStorage: any = JSON.parse(Storage);

class Headbar extends Component {
  logoClick = () => {
    // <Link to={`/`} />;
  };

  logoutClick = async () => {
    console.log('is it run???????');
    await localStorage.clear();
    console.log('스토리지--->', localStorage.getItem('userInfo'));
  };

  render() {
    console.log('헤드바가 렌더 됩니다');
    console.log(userStorage);
    return (
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo">
          <a href="/">
            <Button
              type="default"
              htmlType="button"
              className="login-form-kakao"
            >
              Gaego
            </Button>
          </a>
          {/* <img
            // src="https://www.clipartmax.com/png/middle/93-935635_dog-with-long-body-comments-dog-with-long-body.png"
            alt="logo"
            onClick={this.logoClick}
          /> */}
        </div>

        {userStorage !== null ? (
          <Menu
            theme="light"
            mode="horizontal"
            style={{ position: 'fixed', right: 0, lineHeight: '64px' }}
          >
            <Menu.Item key="1" onClick={this.logoutClick}>
              <a href="/">logout</a>
            </Menu.Item>
            <Menu.Item key="2">
              mypage
              <Link to={`/mypage`} />
            </Menu.Item>
          </Menu>
        ) : (
          <Menu
            theme="light"
            mode="horizontal"
            style={{ position: 'fixed', right: 0, lineHeight: '64px' }}
          >
            <Menu.Item key="2">
              Login
              <Link to={`/login`} />
            </Menu.Item>
          </Menu>
        )}
      </Header>
    );
  }
}

export default Headbar;
