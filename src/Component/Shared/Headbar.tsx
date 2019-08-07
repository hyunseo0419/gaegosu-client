import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './logo.css';
import { Layout, Menu, Button } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Loading, Err } from '../Shared/loading';

const { Header } = Layout;

const GET_ME = gql`
  query {
    getMe {
      isMe
      user {
        id
        nickName
      }
      err
    }
  }
`;

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

const Xtoken: any = localStorage.getItem('token');

class Headbar extends Component {
  logoClick = () => {
    // <Link to={`/`} />;
  };

  logoutClick = async () => {
    //console.log('is it run???????');
    await localStorage.clear();
  };

  render() {
    return (
      <Query<DATAS> query={GET_ME}>
        {({ loading, error, data }: any) => {
          if (loading) return <Loading />;
          if (error) {
            console.log(error);
            return <Err />;
          }
          console.log('header data--->', data);

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
