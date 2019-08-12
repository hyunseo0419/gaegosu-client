import React, { Component } from 'react';
import { Icon, Button, Avatar } from 'antd';
import { Mutation } from 'react-apollo';
import { RESCUE_COM, COMSOS } from './Mutation/MuRescue';
// import { Redirect } from 'react-router';

declare var kakao: any;

interface Props {
  list: any;
  back: any;
}

export default class RescueDetail extends Component<Props> {
  state = {
    done: false,
  };
  constructor(props: any) {
    super(props);
    console.log('#######', this.props.list);
  }

  sosComplete = async (e: any, mufn: any) => {
    let result = await mufn();
    console.log('this is result-->', result);
    if (result.data.completeRescue.success === true) {
      await alert('구조 요청 확인이 완료되었습니다.');
      this.setState({
        done: true,
      });
    }
  };

  componentDidMount = async () => {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(
          this.props.list.locationY,
          this.props.list.locationX
        ), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(
      this.props.list.locationY,
      this.props.list.locationX
    );

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  };

  render() {
    if (this.state.done === true) {
      return (
        <div>
          <div>구조 확인이 완료되었습니다.</div>
          <a href="http://localhost:3000">
            <Button>확인</Button>
          </a>
        </div>
      );
    }
    return (
      <div style={{ margin: '3%' }}>
        <div style={{ float: 'left' }}>
          <Button
            onClick={(e: any) => this.props.back(e)}
            style={{ marginBottom: '4%' }}
          >
            <Icon type="left" />
            Go back
          </Button>
          <h3 style={{ marginBottom: '40%', marginTop: '40%' }}>
            동물 : {this.props.list.content.split(',')[0]}
          </h3>
          <h3 style={{ marginBottom: '40%' }}>
            상태 : {this.props.list.content.split(',')[1]}
          </h3>
          <h3 style={{ marginBottom: '40%' }}>
            위치 : {this.props.list.content.split(',')[2]}
          </h3>
        </div>
        {this.props.list.photo !== '' ? (
          <div style={{ float: 'left', marginLeft: '20%', marginBottom: '5%' }}>
            <Avatar
              shape="square"
              size={250}
              icon="user"
              src={this.props.list.photo}
            />
          </div>
        ) : null}
        <div
          className="kakaomap"
          id="map"
          style={{
            textAlign: 'center',
            width: '70%',
            height: 350,
            marginTop: '1%',
          }}
        />

        <Mutation<COMSOS>
          mutation={RESCUE_COM}
          variables={{ id: this.props.list.id }}
        >
          {status => (
            <div style={{ marginTop: '10%', marginLeft: '35%' }}>
              <Button
                onClick={e => {
                  this.sosComplete(e, status);
                }}
                style={{ marginBottom: '4%' }}
              >
                Rescue Complete
              </Button>
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}
