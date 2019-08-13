import React, { Component } from 'react';

import 'antd/dist/antd.css';
import './logo.css';
import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;

class Headbar extends Component {
  render() {
    return (
      <Layout>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            Content
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Headbar;
