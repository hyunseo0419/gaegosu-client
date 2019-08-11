import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Icon, Button } from 'antd';
import './InfoDetail.css';
import './KakaoMap.css';
import InfoComment from './InfoComment';
import Infostarpoint from './Infostarpoint';
//import client from '../../../apolloClient';
//import { Link } from 'react-router-dom';
//import { RouteComponentProps } from 'react-router';
declare var kakao: any;

interface InfoDetailProps {
  item: any;
  back: any;
}
interface InfoDetailState {}

//const { Search } = Input;

export default class InfoDetail extends Component<
  InfoDetailProps,
  InfoDetailState
> {
  constructor(props: any) {
    super(props);
    console.log('----->', this.props.item);
    this.state = {};
  }

  componentDidMount() {
    // //console.log('x좌표--', this.props.item.locationY);
    // // 이미지 지도에서 마커가 표시될 위치입니다
    // var markerPosition = new kakao.maps.LatLng(
    //   this.props.item.locationY,
    //   this.props.item.locationX
    // );
    // // 이미지 지도에 표시할 마커입니다
    // // 이미지 지도에 표시할 마커는 Object 형태입니다
    // var marker = {
    //   position: markerPosition,
    //   text: this.props.item.title,
    // };
    // var staticMapContainer = document.getElementById('staticMap'), // 이미지 지도를 표시할 div
    //   staticMapOption = {
    //     center: new kakao.maps.LatLng(
    //       this.props.item.locationY,
    //       this.props.item.locationX
    //     ), // 이미지 지도의 중심좌표
    //     level: 2, // 이미지 지도의 확대 레벨
    //     marker: marker, // 이미지 지도에 표시할 마커
    //   };
    // // 이미지 지도를 생성합니다
    // new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
    var mapContainer = document.getElementById('staticMap'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(
          this.props.item.locationY,
          this.props.item.locationX
        ), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
    var map = new kakao.maps.Map(mapContainer, mapOption);
    // 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(
      this.props.item.locationY,
      this.props.item.locationX
    );
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
    var iwContent = `<div style="padding:5px;">${this.props.item.title}<br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>`,
      iwPosition: any = new kakao.maps.LatLng(
        this.props.item.locationY,
        this.props.item.locationX
      ); //인포윈도우 표시 위치입니다
    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });
    // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    infowindow.open(map, marker);
  }

  render() {
    return (
      <>
        <div>
          <div className="titlearea">
            <h3>{this.props.item.title}</h3>
          </div>
          <div>
            <div className="maparea">
              <div className="kakaomap" id="staticMap" />
            </div>
            <ul>
              <li>주소 {this.props.item.roadAddress}</li>
              <li>연락처 {this.props.item.phone}</li>
            </ul>
          </div>
          <div className="divarea">
            <h3>동물병원 별점이예요!!</h3>
            <Infostarpoint hospitalid={this.props.item.id} />
            <div className="divarea">
              <h3>후기를 남겨주세요!!</h3>
              <div>
                <InfoComment hospitalid={this.props.item.id} />
              </div>
            </div>
          </div>
          <div className="divarea">
            <Button onClick={(e: any) => this.props.back(e)}>
              <Icon type="left" />
              Go back
            </Button>
          </div>
        </div>
      </>
    );
  }
}
