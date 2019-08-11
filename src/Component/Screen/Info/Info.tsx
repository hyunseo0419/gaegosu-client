import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, List, Avatar, Button } from 'antd';
import InfoDetail from './InfoDetail';

const { Search } = Input;

const data = [
  {
    title: '압구정웰동물병원',
    roadAddress: '서울특별시 강남구 압구정로 108 (신사동, 덕산빌딩 203호)',
    phone: '02-000-0000',
    locationX: 127.02060004625373,
    locationY: 37.522888920194404,
  },
  {
    title: '헬릭스동물메디컬센터',
    roadAddress: '서울특별시 서초구 신반포로 162 (반포동, 르본시티 2층)',
    phone: '02-2135-9119',
    locationX: 127.00228077997669,
    locationY: 37.50498992817702,
  },
  {
    title: '은빛동물병원',
    roadAddress: '서울특별시 노원구 동일로 1649 (상계동, 윤일빌딩)',
    phone: '02-300-1100',
    locationX: 127.05504239129915,
    locationY: 37.675669568927106,
  },
  {
    title: '민트동물병원',
    roadAddress: '서울특별시 용산구 원효로 51, 119호 (산천동, 삼성테마트)',
    phone: '02-707-2235',
    locationX: 126.95007055620239,
    locationY: 37.533863338059774,
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

  mygetLocation = () => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log('position---->', position);
          console.log(
            position.coords.latitude + ' ' + position.coords.longitude
          );
        },
        error => {
          console.log('=============');
          console.log(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert('GPS를 지원하지 않습니다');
      console.log('gps 거부');
    }
  };

  changeDetailView = (e: any, item: any) => {
    console.log('item---->', item);
    this.setState({
      mode: 'infoDetail',
      detail: item,
    });
  };

  backInfoView = (e: any) => {
    this.setState({
      mode: 'info',
    });
  };

  addInfo = (e: any) => {
    console.log('e-->', e);
    //data에 concat 작성해야함
  };

  componentDidMount() {
    this.mygetLocation();
  }

  render() {
    //const { detail, locate } = this.state;
    console.log('info 렌더 동작');

    return (
      <>
        {this.state.mode === 'infoDetail' ? (
          <InfoDetail
            item={this.state.detail}
            back={this.backInfoView.bind(this)}
          />
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
                            this.changeDetailView(e, item);
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
            <div>
              <Button onClick={e => this.addInfo(e)}>더보기</Button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Info;
