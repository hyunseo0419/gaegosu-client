import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { List, Avatar, Button } from 'antd';
//import { Link } from 'react-router-dom';
//import { RouteComponentProps } from 'react-router';
import InfoDetail from './InfoDetail';
import { QU_INFODATA, InfoData, InfoVariables } from './Query/QuInfo';
import { Query } from 'react-apollo';
import { Loading, Err } from '../../Shared/loading';
//const { Search } = Input;

let datahos = [
  {
    id: 1,
    title: '압구정웰동물병원',
    roadAddress: '서울특별시 강남구 압구정로 108 (신사동, 덕산빌딩 203호)',
    phone: '02-000-0000',
    locationX: 127.02060004625373,
    locationY: 37.522888920194404,
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
    locate: {
      locationX: 126.980537, //처음 렌더링할때 아무것도 안나오게 별나라 좌표 기준점으로 씀
      locationY: 37.64198,
    },
    detail: {},
  };

  mygetLocation = () => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        position => {
          // console.log(
          //   position.coords.latitude + ' ' + position.coords.longitude
          // );
          this.setState({
            locate: {
              locationX: position.coords.longitude, //내위치 없어서 임의로 아래 것 넣음
              locationY: position.coords.latitude,
              // locationX: 126.870856565175,
              // locationY: 37.5444197827755,
            },
          });
        },
        error => {
          console.error(error);
          this.setState({
            locate: {
              locationX: 127.0498633976286, //좌표값 거부하면 선릉역 위워크 기준
              locationY: 37.503286044998404,
            },
          });
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
    //console.log('e-->', e);
    //data에 concat 작성해야함
  };

  componentDidMount() {
    this.mygetLocation();
  }

  render() {
    const { detail, locate } = this.state;

    return (
      <Query<InfoData, InfoVariables>
        query={QU_INFODATA}
        variables={{ locationX: locate.locationX, locationY: locate.locationY }}
      >
        {({ loading, error, data }: any) => {
          if (loading) return <Loading />;
          if (error) return <Err />;

          datahos = data.getInfoList.info;
          return (
            <>
              {this.state.mode === 'infoDetail' ? (
                <InfoDetail item={detail} back={this.backInfoView.bind(this)} />
              ) : (
                <div>
                  {/* <div>
                    <Search
                      placeholder="동물병원을 검색 해주세요"
                      onSearch={value => console.log(value)}
                      style={{
                        width: 300,
                      }}
                    />
                  </div> */}
                  자신의 위치에서 반경 4KM이내에 동물병원을 자동 검색 - 내 위치
                  미 허용시 선릉역 위워크 기준
                  <div>
                    <List
                      itemLayout="horizontal"
                      dataSource={datahos}
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
                          <div>연락처 {item.phone}</div>
                        </List.Item>
                      )}
                    />
                  </div>
                  {/* <div>
                    <Button onClick={e => this.addInfo(e)}>더보기</Button>
                  </div> */}
                </div>
              )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default Info;
