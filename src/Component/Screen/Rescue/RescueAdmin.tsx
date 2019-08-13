import React, { Component } from 'react';
import { GET_SOS, SOSData } from './Query/QuRescue';
import { Button, List, Avatar } from 'antd';
import { Query } from 'react-apollo';
import { Loading, Err } from '../../Shared/loading';
import RescueDetail from './RescueDetail';

let SOSDatas = [
  {
    id: 1,
    locationX: 127.02060004625373,
    locationY: 37.522888920194404,
    content: '동물,상태,장소',
    creator: {
      nickName: '',
    },
    status: null,
    createdAt: null,
  },
];

//declare var kakao: any;

export default class RescueAdmin extends Component<{}> {
  state = {
    mode: false,
    list: {},
  };
  changeDetailView = async (item: any) => {
    console.log('item---->', item);
    await this.setState({
      mode: true,
      list: item,
    });
  };

  backInfoView = (e: any) => {
    this.setState({
      mode: false,
    });
  };

  render() {
    return (
      <Query<SOSData> query={GET_SOS}>
        {({ loading, error, data }: any) => {
          if (loading) return <Loading />;
          if (error) return <Err />;
          console.log('data--->', data);
          SOSDatas = data.getRescueList.rescueList;
          console.log('DATA@!!@!!@', SOSDatas);
          return (
            <>
              {this.state.mode ? (
                <RescueDetail
                  list={this.state.list}
                  back={this.backInfoView.bind(this)}
                />
              ) : (
                <div>
                  <List
                    itemLayout="horizontal"
                    dataSource={SOSDatas}
                    renderItem={item => (
                      <List.Item>
                        {item.status === false ? (
                          <List.Item.Meta
                            avatar={<Avatar icon="alert" />}
                            title={
                              <div>
                                <Button
                                  onClick={() => {
                                    console.log(item);
                                    this.changeDetailView(item);
                                  }}
                                  style={{ marginRight: '3%' }}
                                >
                                  Show detail
                                </Button>
                                동물 : {item.content.split(',')[0]}
                              </div>
                            }
                            description={`구조상태 : 🔴
                            ㅤ ㅤ            상태 : ${
                              item.content.split(',')[1]
                            }ㅤㅤㅤ ㅤ            신고자 :${
                              item.creator.nickName
                            }`}
                          />
                        ) : (
                          <List.Item.Meta
                            avatar={<Avatar icon="alert" />}
                            //title={<Link to="/Path">{item.title}</Link>}
                            title={
                              <div>
                                <Button
                                  onClick={() => {
                                    console.log(item);
                                    this.changeDetailView(item);
                                  }}
                                  style={{ marginRight: '3%' }}
                                >
                                  Show detail
                                </Button>
                                동물 : {item.content.split(',')[0]}
                              </div>
                            }
                            description={`구조상태 : 🔵
                            ㅤ ㅤ            상태 : ${
                              item.content.split(',')[1]
                            }ㅤㅤㅤ ㅤ            신고자 :${
                              item.creator.nickName
                            }`}
                          />
                        )}
                      </List.Item>
                    )}
                  />
                </div>
              )}
            </>
          );
        }}
      </Query>
    );
  }
}
