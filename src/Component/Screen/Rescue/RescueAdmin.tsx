import React, { Component } from 'react';
import { Button } from 'antd';

//import { Query } from 'react-apollo';
//import { Loading, Err } from '../../Shared/loading';

//declare var kakao: any;

export default class RescueAdmin extends Component {
  // state = {
  //   data: [
  //     {
  //       id: null,
  //       name: null,
  //       detail: null,
  //       xlocation: null,
  //       ylocation: null,
  //       img: null,
  //     }
  //   ],
  // };

  // componentDidMount = () => {
  //   if (this.state.data[0].name !== null) {
  //     for (let i = 0; i < this.state.data.length; i++) {
  //       var mapContainer = document.getElementById(
  //           `map${this.state.data[i].id}`
  //         ), // 지도를 표시할 div
  //         mapOption = {
  //           center: new kakao.maps.LatLng(
  //             this.state.data[i].ylocation,
  //             this.state.data[i].xlocation
  //           ), // 지도의 중심좌표
  //           level: 3, // 지도의 확대 레벨
  //         };

  //       var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  //       // 마커가 표시될 위치입니다
  //       var markerPosition = new kakao.maps.LatLng(
  //         this.state.data[i].ylocation,
  //         this.state.data[i].xlocation
  //       );

  //       // 마커를 생성합니다
  //       var marker = new kakao.maps.Marker({
  //         position: markerPosition,
  //       });

  //       // 마커가 지도 위에 표시되도록 설정합니다
  //       marker.setMap(map);
  //     }
  //   }
  // };

  render() {
    // const newData = [
    //   {
    //     id: '1',
    //     name: 'John Brown',
    //     detail: '개,정신이상,주차장',
    //     ylocation: 33.450701,
    //     xlocation: 126.570667,
    //     img:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz6t9ufHSImQVUKovTiPBA4cHgtUdFHKFEM2M6bf_c3fZsFJZW6A',
    //   },
    //   {
    //     id: '2',
    //     name: 'Jim Green',
    //     detail: '호랑이,비만,놀이터',
    //     ylocation: 33.450701,
    //     xlocation: 126.570667,
    //     img:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUziVJAq5KjrIS-f3hUmbG2l1JND1lvm_G4Fj5FqK5XISwPX7d',
    //   },
    //   {
    //     id: '3',
    //     name: 'Joe Black',
    //     detail: '고양이,난폭함,위워크',
    //     ylocation: 33.450701,
    //     xlocation: 126.570667,
    //     img:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_9_Q6WE48KssRE13sU3K32EdAUqH4HeuVGTIGaO_-9IuZxzHAA',
    //   },
    //   {
    //     id: '4',
    //     name: 'Disabled User',
    //     detail: '코끼리,날뜀,어린이대공원',
    //     ylocation: 33.450701,
    //     xlocation: 126.570667,
    //     img:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8d1vM_iVIAacHjz51XRwWDQ2yom3LNYx4UiDqDjBoyUgynJFi',
    //   },
    // ];

    return (
      <div>
        {/* {this.state.data[0].name === null ? (
          <Button
            onClick={() => {
              this.setState({
                data: newData,
              });
            }}
          >
            data load
          </Button>
        ) : 
          
            {this.state.data.map((el: any, idx: number) => (
              <div>              
                <div>신고자 : {el.name}</div>
                <div>세부사항 : {el.detail}</div>
                <div
                  id={`map${el.id}`}
                  style={{ width: 200, height: 200 }}
                />

                <Button>완료</Button> */}
      </div>
      // ))}

      //   }
      // </div>
    );
  }
}
