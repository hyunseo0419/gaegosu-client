import React, { Component } from 'react';
import { Form, Input, Button, Tabs, Upload, message, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Mutation } from 'react-apollo';

const { TabPane } = Tabs;

declare var kakao: any;

function callback(key: any) {
  console.log(key);
}
let currLat: any = null;
let currLang: any = null;

let initLat: any = null;
let initLang: any = null;
class Rescue extends Component<{} & FormComponentProps> {
  state = {
    lat: null,
    lang: null,
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(Object.values(values).join(','));
        let result = Object.values(values).join(',');
        this.setState({
          result: result,
        });
      }
    });
  };

  componentDidMount = async () => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lang = position.coords.longitude;
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
          mapOption = {
            center: new kakao.maps.LatLng(lat, lang), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
          };
        initLat = lat;
        initLang = lang;
        this.setState({
          lat: initLat,
          lang: initLang,
        });
        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        // 지도를 클릭한 위치에 표출할 마커입니다
        var marker = new kakao.maps.Marker({
          // 지도 중심좌표에 마커를 생성합니다
          position: map.getCenter(),
        });
        // 지도에 마커를 표시합니다
        marker.setMap(map);

        // 지도에 클릭 이벤트를 등록합니다
        // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
        kakao.maps.event.addListener(map, 'click', function(mouseEvent: any) {
          // 클릭한 위도, 경도 정보를 가져옵니다
          var latlng = mouseEvent.latLng;

          // 마커 위치를 클릭한 위치로 옮깁니다
          marker.setPosition(latlng);

          var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
          message += '경도는 ' + latlng.getLng() + ' 입니다';

          currLat = latlng.getLat();
          currLang = latlng.getLng();
          console.log('이츠 좌표쓰-->', currLat, currLang);

          var resultDiv = document.getElementById('clickLatlng');
          if (resultDiv !== null) {
            resultDiv.innerHTML = message;
          }
        });
      });
    }
  };

  render() {
    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

      onChange(info: any) {
        if (info.file.status !== 'uploading') {
          console.log('--->', info.file, 'list-->', info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          let formData = new FormData();

          formData.append('photo', info.file.originFileObj);
          console.log('@@@@', info.file.originFileObj);
          fetch('http://localhost:4000/', {
            method: 'POST',
            body: formData,
            // headers: {
            //   'content-type': 'multipart/form-data',
            // },
          })
            // .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error('Caught error: ', err));
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    const { getFieldDecorator } = this.props.form;
    // var currLat: any;
    // var currLang: any;
    // const el = document.getElementById('map');
    // let kakaoMap = new kakao.maps.Map(el, {
    //   center: new kakao.maps.LatLng(33.450701, 126.570667),
    // });
    //console.log('!!!!!!', this.state);
    return (
      <div>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          onSubmit={this.handleSubmit}
        >
          <br />
          <div>
            <div id="map" style={{ width: '100%', height: 350 }}></div>
            <div style={{ marginTop: '3%', textAlign: 'center' }}>
              유기동물의 상태 , 사진을 첨부해주세요.
              <div
                style={{
                  marginTop: '3%',
                }}
              >
                <Upload {...props}>
                  <Button type="default" size="large">
                    <Icon type="upload" />
                    upload / change
                  </Button>
                </Upload>
              </div>
            </div>
          </div>
          <div
            id="clickLatlng"
            style={{ textAlign: 'center', marginTop: '4%' }}
          ></div>
          {/* <Mutation></Mutation> */}
          <div style={{ textAlign: 'center', marginTop: '4%' }}>
            <Button
              type="primary"
              onClick={async () => {
                if (this.state.lang === null) {
                  await this.setState({
                    lat: initLat,
                    lang: initLang,
                  });
                  console.log('init this is states--->', this.state);
                }
                await this.setState({
                  lat: currLat,
                  lang: currLang,
                });
                console.log('this is states--->', this.state);
              }}
            >
              위치확인 완료
            </Button>
          </div>
          <br />

          <br />
          <Form.Item label="Animal">
            {getFieldDecorator('animal', {
              rules: [
                { required: true, message: 'Please input type of animal!' },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Status">
            {getFieldDecorator('status', {
              rules: [
                { required: true, message: "Please input animal's status!" },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Detail">
            {getFieldDecorator('detail', {
              rules: [
                { required: true, message: 'Please input detail location!' },
              ],
            })(<Input />)}
          </Form.Item>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="주의사항" key="1" style={{ marginBottom: '5%' }}>
              허위 신고는 혼나요!
            </TabPane>
          </Tabs>
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <div style={{ textAlign: 'center', marginLeft: '12%' }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ marginLeft: '4%' }}
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Rescue);
export default WrappedNormalLoginForm;
