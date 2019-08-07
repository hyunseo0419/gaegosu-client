import React, { Component } from 'react';
import Headbar from '../../Shared/Headbar';
import Footbar from '../../Shared/Footbar';
import {
  Layout,
  Avatar,
  Breadcrumb,
  Row,
  Col,
  Divider,
  Button,
  Modal,
  Input,
} from 'antd';
import { MY_PROFILE } from './queries';
import { Query } from 'react-apollo';
import { Loading, Err } from '../../Shared/loading';

interface Data {
  getMe: {
    isMe: boolean;
    user: {
      nickName: string;
      profileImage: string;
      email: string;
      provider: string;
      pets: {
        name: string;
        animal: string;
        breeds: string;
        profileImage: string;
      };
    };
  };
}

// interface res {
//   loading: boolean;
//   error: ApolloError;
//   data: Data;
// }

const props = {
  id: 6,
  nickName: 'test001',
};

interface Variables {
  id: number;
  nickName: string;
}

const { Content } = Layout;

const fakeData = {
  fakeName: '현서',
  fakeimg:
    'http://img.etoday.co.kr/pto_db/2018/10/600/20181026091134_1263675_664_906.jpg',
  fakeMail: 'wewe@naver.com',
  fakeProv: 'local',
  fakePet: {
    name: 'gucci',
    animal: 'cat',
    breeds: '샴',
    profileImage:
      'https://previews.123rf.com/images/da161/da1611612/da161161200003/69890854-%EC%A7%91%EC%97%90%EC%84%9C-%EC%86%8C%ED%8C%8C%EC%97%90-%EC%83%B4-%EA%B3%A0%EC%96%91%EC%9D%B4%EC%9D%98-%EC%B4%88%EC%83%81%ED%99%94-.jpg',
  },
};
//let token;

class Mypage extends Component {
  state = {
    editModal: false,
  };

  showModal = () => {
    this.setState({
      editModal: true,
    });
  };

  handleOk = (e: any) => {
    this.setState({
      editModal: false,
    });
  };

  handleCancel = (e: any) => {
    this.setState({
      editModal: false,
    });
  };

  changePassword = () => {
    console.log('pw');
  };

  changeNickName = () => {
    console.log('nn');
  };

  render() {
    return (
      <Query<Data, Variables>
        query={MY_PROFILE}
        variables={{ id: props.id, nickName: props.nickName }}
      >
        {({ loading, error, data }: any) => {
          //console.log(localStorage.getItem('userInfo'));
          if (loading) return <Loading />;
          if (error) return <Err />;

          const profile = data.getMe.user;
          return (
            <Layout>
              <Headbar />
              <Layout>
                <Breadcrumb style={{ margin: '30px 0' }} />
                <Content
                  style={{
                    padding: '0 50px',
                    marginTop: 64,
                    backgroundColor: 'white',
                    marginLeft: '20%',
                    marginRight: '20%',
                  }}
                >
                  <div style={{ margin: '10%' }}>
                    <Row>
                      <Col span={18} push={10}>
                        <Avatar
                          size={250}
                          icon="user"
                          // src={fakeData.fakeimg}
                          style={{ margin: '10%' }}
                        />
                      </Col>
                      <Col span={6} pull={18}>
                        <div
                          style={{
                            marginTop: '20%',
                            marginBottom: '20%',
                            fontSize: 20,
                          }}
                        >
                          <div>NickName : </div>
                          <div>{profile.nickName}</div>
                          <br />
                          <br />
                          <div>E-mail : </div>
                          <div>{profile.email}</div>
                          <br />
                          <br />
                          <div>Provider : </div>
                          <div>{profile.provider}</div>

                          <div style={{ marginTop: '20%' }}>
                            <Button
                              type="default"
                              size="large"
                              onClick={this.showModal}
                            >
                              edit
                            </Button>
                            <Modal
                              title="Change info"
                              visible={this.state.editModal}
                              onOk={this.handleOk}
                              onCancel={this.handleCancel}
                            >
                              <p>
                                new Password
                                <Input
                                  placeholder="write new password and press enter"
                                  onPressEnter={this.changePassword}
                                  addonAfter="press Enter"
                                />
                              </p>
                              <p>
                                new NickName
                                <Input
                                  placeholder="write new nickname and press enter"
                                  onPressEnter={this.changeNickName}
                                  addonAfter="press Enter"
                                />
                              </p>
                              <p style={{ marginTop: '5%' }}>
                                Place the cursor where you want to change and
                                press "enter"
                              </p>
                            </Modal>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <br />
                    <Divider>Pet</Divider>
                    <br />
                    <Row>
                      <Col span={18} push={10}>
                        <Avatar
                          size={250}
                          icon="user"
                          src={fakeData.fakePet.profileImage}
                          style={{ margin: '10%' }}
                        />
                      </Col>
                      <Col span={6} pull={18}>
                        <div
                          style={{
                            marginTop: '20%',
                            marginBottom: '20%',
                            fontSize: 20,
                          }}
                        >
                          <div>Pet's Name : </div>
                          <div>{fakeData.fakePet.name}</div>
                          <br />
                          <br />
                          <div>Animal : </div>
                          <div>{fakeData.fakePet.animal}</div>
                          <br />
                          <br />
                          <div>Breeds : </div>
                          <div>{fakeData.fakePet.breeds}</div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Content>
              </Layout>
              <Footbar />
            </Layout>
          );
        }}
      </Query>
    );
  }
}

export default Mypage;
