import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './logo.css';
import { Layout, Menu, Button } from 'antd';
import { Query } from 'react-apollo';
import { Loading, Err } from '../Shared/loading';
import { GET_ME } from './QuariesShared';

const { Header } = Layout;

interface DATAS {
  getMe: {
    isMe: boolean;
    user: {
      id: number;
      nickName: string;
    };
    err: string;
  };
}

// const Myparams = (id: any) => {
//   return (
//     <Menu.Item key="2">
//       mypage
//       <Link to={`/mypage/${id}`} />
//     </Menu.Item>
//   );
// };

//const Xtoken: any = localStorage.getItem('token');

class Headbar extends Component {
  logoClick = () => {
    // <Link to={`/`} />;
  };

  logoutClick = async () => {
    //console.log('is it run???????');
    await localStorage.clear();
  };

  render() {
    // const token = localStorage.getItem('token')
    // ? localStorage.getItem('token')
    // : null;
    return (
      <Query<DATAS> query={GET_ME}>
        {({ loading, error, data }: any) => {
          if (loading) return <Loading />;
          if (error) {
            console.log(error);
            return <Err />;
          }

          return (
            <Header style={{ position: 'fixed', zIndex: 2, width: '100%' }}>
              <div className="logo">
                <a href={`/`}>
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
              {console.log(
                '==============!!!!===========',
                data.getMe.err, // token expire 에러가 나왔음
                '/',
                data.getMe.user
              )}
              {data.getMe.err === null && data.getMe.user ? (
                <Menu
                  theme="light"
                  mode="horizontal"
                  style={{ position: 'fixed', right: 0, lineHeight: '64px' }}
                >
                  <Menu.Item key="1" onClick={this.logoutClick}>
                    <a href="/">logout</a>
                  </Menu.Item>
                  {/* <Myparams id={data.getMe.user.id} /> */}
                  <Menu.Item key="2">
                    mypage
                    <Link to={`/mypage/${data.getMe.user.id}`} />
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
        }}
      </Query>
    );
  }
}

export default Headbar;
