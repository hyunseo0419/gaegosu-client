/*global kakao*/
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, List, Icon, Avatar, Button, Rate } from 'antd';
import './InfoDetail.css';
import './KakaoMap.css';
import InfoComment from './InfoComment';
//import { Link } from 'react-router-dom';
//import { RouteComponentProps } from 'react-router';
declare var kakao: any;

interface InfoDetailProps {
  item: any;
  back: any;
}
interface InfoDetailState {
  value: any;
}

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const { Search } = Input;

export default class InfoDetail extends Component<
  InfoDetailProps,
  InfoDetailState
> {
  constructor(props: any) {
    super(props);
    console.log('----->', this.props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (value: any) => {
    this.setState({ value });
  };

  // componentDidMount() {
  //   // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
  //   var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  //   var mapContainer = document.getElementById('map'), // 지도를 표시할 div
  //     mapOption = {
  //       center: new kakao.maps.LatLng(127.051354632802, 37.5042332638622), // 지도의 중심좌표
  //       level: 3, // 지도의 확대 레벨
  //     };
  //   // 지도를 생성합니다
  //   var map = new kakao.maps.Map(mapContainer, mapOption);
  //   // 장소 검색 객체를 생성합니다
  //   var ps = new kakao.maps.services.Places();
  //   // 키워드로 장소를 검색합니다
  //   ps.keywordSearch('동물병원', placesSearchCB);
  //   // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  //   function placesSearchCB(data: any, status: any, pagination: any) {
  //     if (status === kakao.maps.services.Status.OK) {
  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
  //       // LatLngBounds 객체에 좌표를 추가합니다
  //       var bounds = new kakao.maps.LatLngBounds();
  //       for (var i = 0; i < data.length; i++) {
  //         displayMarker(data[i]);
  //         bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
  //       }
  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  //       map.setBounds(bounds);
  //     }
  //   }
  //   // 지도에 마커를 표시하는 함수입니다
  //   function displayMarker(place: any) {
  //     // 마커를 생성하고 지도에 표시합니다
  //     var marker = new kakao.maps.Marker({
  //       map: map,
  //       position: new kakao.maps.LatLng(place.y, place.x),
  //     });
  //     // 마커에 클릭이벤트를 등록합니다
  //     kakao.maps.event.addListener(marker, 'click', function() {
  //       // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
  //       infowindow.setContent(
  //         '<div style="padding:5px;font-size:12px;">' +
  //           place.place_name +
  //           '</div>'
  //       );
  //       infowindow.open(map, marker);
  //     });
  //   }
  // }
  componentDidMount() {
    console.log('x좌표--', this.props.item.locationY);

    // 이미지 지도에서 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(
      this.props.item.locationY,
      this.props.item.locationX
    );

    // 이미지 지도에 표시할 마커입니다
    // 이미지 지도에 표시할 마커는 Object 형태입니다
    var marker = {
      position: markerPosition,
      text: this.props.item.title,
    };

    var staticMapContainer = document.getElementById('staticMap'), // 이미지 지도를 표시할 div
      staticMapOption = {
        center: new kakao.maps.LatLng(
          this.props.item.locationY,
          this.props.item.locationX
        ), // 이미지 지도의 중심좌표
        level: 2, // 이미지 지도의 확대 레벨
        marker: marker, // 이미지 지도에 표시할 마커
      };

    // 이미지 지도를 생성합니다
    var staticMap = new kakao.maps.StaticMap(
      staticMapContainer,
      staticMapOption
    );
  }

  render() {
    const { value } = this.state;
    console.log('this.state', this.state);
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
            <div className="stararea">
              <div>
                <Rate disabled defaultValue={2} />
              </div>
              <div>
                <span>
                  <p>동물병원의 별점을 선택해주세요~~</p>
                  <Rate
                    tooltips={desc}
                    onChange={this.handleChange}
                    value={value}
                  />
                  {value ? (
                    <span className="ant-rate-text">{desc[value - 1]}</span>
                  ) : (
                    ''
                  )}
                </span>
              </div>
            </div>
            <div className="divarea">
              <h3>후기를 남겨주세요!!</h3>
              <div>
                <InfoComment />
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
