import React, { Component } from 'react';
// import { ApolloProvider } from 'react-apollo';
// import Header from '../Share/Headbar';
import { Layout, Menu } from 'antd'; //, Breadcrumb

const { Header, Footer } = Layout; //, Content
// import styled from "styled-components";
// import { Query } from "react-apollo";
// import { HOME_PAGE } from "./queries";
// import { Link } from "react-router-dom";
// import Movie from "./Movie";

// const Container = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 0.7fr);
//   flex-wrap: wrap;
//   justify-items: center;
// `;

class Main extends Component {
  render() {
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">empty</Menu.Item>
            <Menu.Item key="2">logout</Menu.Item>
            <Menu.Item key="3">login/Mypage</Menu.Item>
          </Menu>
        </Header>
        {/* <Content style={{ padding: '0 50px', marginTop: 64 }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>Content</div>
    </Content> */}
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

export default Main;
