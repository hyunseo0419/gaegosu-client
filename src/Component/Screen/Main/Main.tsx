// https://ant.design/components/tabs/

import React, { Component } from 'react';
// import styled from 'styled-components';
// import { Query } from 'react-apollo';
// import { MAIN_PAGE } from '../../../queries';
// import ReactDOM from 'react-dom';
// import { ApolloProvider } from 'react-apollo';
import { Layout, Breadcrumb, Tabs } from 'antd';
import Headbar from '../../Shared/Headbar';
import Footbar from '../../Shared/Footbar';
import './main.css';
import Album from '../Album/Album';
import Search from '../Album/Search';

const { Content } = Layout;
const { TabPane } = Tabs;

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
        <Headbar />
        <Layout>
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Breadcrumb style={{ margin: '50px 0' }} />
            <div className="card-container">
              <Tabs type="card" defaultActiveKey="2">
                <TabPane tab="Report" key="1">
                  {/* Report form page 
                <component /> */}
                  <p>Content of Tab Pane 1</p>
                  <p>Content of Tab Pane 1</p>
                  <p>Content of Tab Pane 1</p>
                </TabPane>
                <TabPane tab="Album" key="2">
                  <Search />
                  <Album />
                </TabPane>
                <TabPane tab="Info" key="3">
                  {/* Use map API and show near shops */}
                  <p>Content of Tab Pane 3</p>
                  <p>Content of Tab Pane 3</p>
                  <p>Content of Tab Pane 3</p>
                </TabPane>
              </Tabs>
            </div>
          </Content>
        </Layout>
        <Footbar />
      </Layout>
    );
  }
}

export default Main;
