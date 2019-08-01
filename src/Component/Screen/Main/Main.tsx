// https://ant.design/components/tabs/

import React, { Component } from 'react';
// import styled from 'styled-components';
// import { Query } from 'react-apollo';
// import { MAIN_PAGE } from '../../../queries';
// import ReactDOM from 'react-dom';
// import { ApolloProvider } from 'react-apollo';
import { Layout, Breadcrumb, Tabs } from 'antd';
import Headbar from '../Share/Headbar';
import Footbar from '../Share/Footbar';
import './main.css';

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
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Breadcrumb style={{ margin: '50px 0' }} />
          <div className="card-container">
            <Tabs type="card">
              <TabPane tab="Report" key="1">
                {/* Report form page 
                <component /> */}
                <p>Content of Tab Pane 1</p>
                <p>Content of Tab Pane 1</p>
                <p>Content of Tab Pane 1</p>
              </TabPane>
              <TabPane tab="Album" key="2">
                {/* <Container>
                  {/* 게시판 형식 들어갈 자리 
                  <Query query={MAIN_PAGE}></Query>
                </Container> */}
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
        <Footbar />
      </Layout>
    );
  }
}

export default Main;
