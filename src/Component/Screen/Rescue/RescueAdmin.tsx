import React, { Component } from 'react';
import { GET_SOS, SOSData } from './Query/QuRescue';
import { Button, List, Avatar } from 'antd';

import { Query } from 'react-apollo';
import { Loading, Err } from '../../Shared/loading';

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
  state = {};
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
            <div>
              <List
                itemLayout="horizontal"
                dataSource={SOSDatas}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon="medicine-box" />}
                      //title={<Link to="/Path">{item.title}</Link>}
                      title={
                        <Button
                          onClick={() => {
                            console.log(item);
                          }}
                        >
                          {item.creator.nickName}
                        </Button>
                      }
                      description={`동물 : ${
                        item.content.split(',')[0]
                      } / 상태 : ${item.content.split(',')[1]} / 상세위치 : ${
                        item.content.split(',')[2]
                      }  /  🚨구조상태 : ${item.status}`}
                    />
                  </List.Item>
                )}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}
