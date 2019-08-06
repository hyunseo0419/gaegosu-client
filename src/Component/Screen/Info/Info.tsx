import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, List, Icon, Avatar, Button } from 'antd';
import './Info.css';
//import { Link } from 'react-router-dom';
import InfoDetail from './InfoDetail';
//import { RouteComponentProps } from 'react-router';

const { Search } = Input;

const data = [
  {
    title: '한아름동물병원',
    roadAddress: '서울특별시 마포구 독막로 100',
    phone: '02-000-0000',
    locationX: 132.01923,
    locationY: 32.0123,
  },
  {
    title: '소풍동물병원',
    roadAddress: '서울특별시 강남구 행복로 100',
    phone: '02-000-1100',
    locationX: 132.03923,
    locationY: 32.0123,
  },
  {
    title: '천사동물병원',
    roadAddress: '서울특별시 서초구 강남대로 100',
    phone: '02-300-1100',
    locationX: 132.03923,
    locationY: 32.0123,
  },
];

// interface infoState {
//   mode: string;
//   detail: {
//     title: string;
//     roadAddress: string;
//     phone: string;
//     locationX: any;
//     locationY: any;
//   };
// }

class Info extends Component<{}> {
  state = {
    mode: 'infoAll',
    // detail: {
    //   title: '',
    //   roadAddress: '',
    //   phone: '',
    //   locationX: null,
    //   locationY: null,
    // },
    detail: {},
  };

  changeView = (e: any, item: any) => {
    console.log('item---->', item);
    this.setState({
      mode: 'infoDetail',
      detail: item,
    });
  };

  render() {
    return (
      <>
        {this.state.mode === 'infoDetail' ? (
          <InfoDetail item={this.state.detail} />
        ) : (
          <div>
            <div>
              <Search
                placeholder="동물병원을 검색 해주세요"
                onSearch={value => console.log(value)}
                style={{
                  width: 300,
                }}
              />
            </div>
            <div>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon="medicine-box" />}
                      //title={<Link to="/Path">{item.title}</Link>}
                      title={
                        <Button
                          onClick={e => {
                            this.changeView(e, item);
                          }}
                        >
                          {item.title}
                        </Button>
                      }
                      description={item.roadAddress}
                    />
                    {item.phone}
                  </List.Item>
                )}
              />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Info;
