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
import Rescue from '../Rescue/Rescue';
import RescueAdmin from '../Rescue/RescueAdmin';
import { Query } from 'react-apollo';
import { Loading, Err } from '../../Shared/loading';
import gql from 'graphql-tag';
import AdvRescue from '../Rescue/AdvRescue';
const { Content } = Layout;
const { TabPane } = Tabs;

const GET_ME = gql`
  query {
    getMe {
      isMe
      user {
        id
        nickName
        admin
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
      admin: boolean;
    };
    err: string;
  };
}
// const Container = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 0.7fr);
//   flex-wrap: wrap;
//   justify-items: center;
// `;
class Main extends Component {
  render() {
    return (
      <Query<DATAS> query={GET_ME}>
        {({ loading, error, data }: any) => {
          if (loading) return <Loading />;
          if (error) {
            console.log(error);
            return <Err />;
          }
          console.log('getMe--->', data);
          return (
            <Layout>
              <Headbar />
              <Layout>
                <Content style={{ padding: '0 50px', marginTop: 64 }}>
                  <Breadcrumb style={{ margin: '50px 0' }} />
                  <div className="card-container">
                    <Tabs type="card" defaultActiveKey="2">
                      <TabPane tab="Report" key="1">
                        {data.getMe.user === null ? (
                          <AdvRescue />
                        ) : data.getMe.user.admin !== false ? (
                          <RescueAdmin />
                        ) : (
                          <Rescue />
                        )}
                      </TabPane>
                      <TabPane tab="Album" key="2">
                        <Search />
                        <Album />
                      </TabPane>
                      <TabPane tab="Info" key="3">
                        {/* Use map API and show near shops */}
                        <Info />
                      </TabPane>
                    </Tabs>
                  </div>
                </Content>
              </Layout>
              <Footbar />
            </Layout>
          );
        }}
      </Query>
    );
  }
}

export default Main;
