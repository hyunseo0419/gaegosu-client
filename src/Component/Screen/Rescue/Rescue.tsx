import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  Tabs,
  Upload,
  message,
  Icon,
  Divider,
  Avatar,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Mutation } from 'react-apollo';
import { POSTSOS, POST_RESCUE, POSTVALUES } from './Mutation/MuRescue';

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
    lat: 0,
    lang: 0,
    detail: '',
    photo: '',
    done: false,
  };

  postSOSgo = async (e: any, mufn: any) => {
    let result = await mufn();
    console.log(result);
    if (result.data.createRescue.success === true) {
      alert('구조 요청이 완료되었습니다.');
      this.setState({
        done: true,
      });
    }
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log(Object.values(values).join(','));
        let detail = Object.values(values).join(',');
        await this.setState({
          detail: detail,
        });
        console.log('$$$$$$$$', this.state);
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

          var message =
            '클릭한 위치의 위도는 ' +
            latlng
              .getLat()
              .toString()
              .slice(0, 10) +
            ' 이고, ';
          message +=
            '경도는 ' +
            latlng
              .getLng()
              .toString()
              .slice(0, 10) +
            ' 입니다';

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
    const SOSprops = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      animalIMG: '',
      onChange(info: any) {
        if (info.file.status !== 'uploading') {
          console.log('--->', info.file, 'list-->', info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          let formData = new FormData();

          formData.append('photo', info.file.originFileObj);
          console.log('@@@@', info.file.originFileObj);
          fetch('http://15.164.212.171:4000/photo', {
            method: 'POST',
            body: formData,
            // headers: {
            //   'content-type': 'multipart/form-data',
            // },
          })
            .then(res => res.json())
            .then(json => (SOSprops.animalIMG = json))
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

    if (this.state.done === true) {
      return (
        <div>
          <div>요청이 완료되었습니다.</div>
          <a href="http://localhost:3000">
            <Button>확인</Button>
          </a>
        </div>
      );
    }
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
            <div
              id="clickLatlng"
              style={{ textAlign: 'center', marginTop: '4%' }}
            ></div>
            <Divider />

            {this.state.photo !== '' ? (
              <div style={{ textAlign: 'center' }}>
                <Avatar
                  shape="square"
                  size={250}
                  icon="user"
                  src={this.state.photo}
                />
              </div>
            ) : null}
            <div style={{ marginTop: '3%', textAlign: 'center' }}>
              유기동물의 상태 , 사진을 첨부해주세요.
              <div
                style={{
                  marginTop: '3%',
                }}
              >
                <Upload {...SOSprops}>
                  <Button type="default" size="large">
                    <Icon type="upload" />
                    upload / change
                  </Button>
                </Upload>
                <Button
                  style={{ marginTop: '2%' }}
                  onClick={() => {
                    this.setState({
                      photo: SOSprops.animalIMG,
                    });
                  }}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>

          {/* <Mutation></Mutation> */}

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
            <TabPane tab="신고 동의 약관" key="1">
              허위의 정보를 기재하거나, 장난으로 구조 요청을 하는 경우 <br />
              300만원 이하의 벌금이 부과되며 서비스 이용자격이 박탈됩니다.
              <br />
              허위가 아닌 정확한 신고로 더 많은 동물을 구조할 수 있습니다.
              <br />
              감사합니다.
            </TabPane>
          </Tabs>
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <div style={{ textAlign: 'center', marginLeft: '12%' }}>
              <div>약관에 동의하십니까?</div>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ marginLeft: '4%' }}
              >
                네, 동의합니다.
              </Button>
            </div>
          </Form.Item>
        </Form>
        <Divider />
        <Mutation<POSTSOS, POSTVALUES>
          mutation={POST_RESCUE}
          variables={{
            locationY: this.state.lat,
            locationX: this.state.lang,
            content: this.state.detail,
            photo: this.state.photo,
          }}
        >
          {postData => (
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ marginLeft: '46%' }}
              onClick={e => {
                this.postSOSgo(e, postData);
              }}
            >
              Submit
            </Button>
          )}
        </Mutation>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Rescue);
export default WrappedNormalLoginForm;
