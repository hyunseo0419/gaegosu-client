import React, { Component } from 'react';

declare var kakao: any;

export default class RescueDetail extends Component {
  state = {
    data: [{ title: null, xlocation: null, ylocation: null, id: null }],
  };
  componentDidMount = async () => {
    for (let i = 0; i < this.state.data.length; i++) {
      var mapContainer = document.getElementById(`map${this.state.data[i].id}`), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(
            this.state.data[i].ylocation,
            this.state.data[i].xlocation
          ), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      // 마커가 표시될 위치입니다
      var markerPosition = new kakao.maps.LatLng(
        this.state.data[i].ylocation,
        this.state.data[i].xlocation
      );

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    }
  };
  render() {
    return <div></div>;
  }
}
