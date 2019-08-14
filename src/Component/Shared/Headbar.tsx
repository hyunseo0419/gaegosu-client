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

class Headbar extends Component {
  logoutClick = async () => {
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

          return (
            <Header
              style={{
                position: 'fixed',
                zIndex: 2,
                width: '100%',
                backgroundColor: '#FBE233',
              }}
            >
              <span className="logo" style={{}}>
                <a href={`/`}>
                  <img
                    src="https://gaegosu.s3.ap-northeast-2.amazonaws.com/photo/ff5ce581c0c958e27f2e35ee29caa65e"
                    style={{
                      width: '8%',
                      // marginTop: '-9%',
                      marginLeft: '-5%',
                    }}
                  />
                </a>
                <img
                  src="https://gaegosu.s3.ap-northeast-2.amazonaws.com/photo/8f7e5311c495a22cf15d6883d82aa38f"
                  style={{
                    width: '23%',

                    marginLeft: '63%',
                  }}
                />
              </span>

              {data.getMe.err === null && data.getMe.user ? (
                <Menu
                  theme="light"
                  mode="horizontal"
                  style={{
                    position: 'fixed',
                    left: '87.3%',
                    right: 0,
                    lineHeight: '455%',
                  }}
                >
                  <Menu.Item key="1" onClick={this.logoutClick}>
                    <a href="/">logout</a>
                  </Menu.Item>

                  <Menu.Item key="2">
                    mypage
                    <Link to={`/mypage/${data.getMe.user.id}`} />
                  </Menu.Item>
                </Menu>
              ) : (
                <Menu
                  theme="light"
                  mode="horizontal"
                  style={{ position: 'fixed', right: 0, lineHeight: '455%' }}
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
