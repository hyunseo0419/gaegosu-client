import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import { Mutation } from 'react-apollo';
import { RESCUE_COM, COMSOS } from './Mutation/MuRescue';

declare var kakao: any;

interface Props {
  list: any;
  back: any;
}

export default class RescueDetail extends Component<Props> {
  constructor(props: any) {
    super(props);
    console.log('#######', this.props.list);
  }

  sosComplete = async (e: any, mufn: any) => {
    let result = await mufn();
    console.log('this is result-->', result);
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
    return (
      <div style={{ margin: '3%' }}>
        <Button
          onClick={(e: any) => this.props.back(e)}
          style={{ marginBottom: '4%' }}
        >
          <Icon type="left" />
          Go back
        </Button>
        <h3>동물 : {this.props.list.content.split(',')[0]}</h3>
        <h3>상태 : {this.props.list.content.split(',')[1]}</h3>
        <h3>위치 : {this.props.list.content.split(',')[2]}</h3>
        <div
          className="kakaomap"
          id="map"
          style={{
            textAlign: 'center',
            width: '80%',
            height: 350,
            marginTop: '1%',
          }}
        />
        <Mutation<COMSOS>
          mutation={RESCUE_COM}
          variables={{ id: this.props.list.id }}
        >
          {status => (
            <Button
              onClick={e => {
                this.sosComplete(e, status);
              }}
              style={{ marginBottom: '4%' }}
            >
              Rescue Complete
            </Button>
          )}
        </Mutation>
      </div>
    );
  }
}
