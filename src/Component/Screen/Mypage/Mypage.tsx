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
import { MY_PROFILE } from './Query/QueriesMypage';
import { CHANGE_NICKNAME } from './Mutation/MutationMypage';
import { CHANGE_PASSWORD } from './Mutation/MutationMypage';
import { Query, Mutation } from 'react-apollo';
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

interface getNickNew {
  success: boolean;
  err: string;
  isLogin: boolean;
}

interface postNickNew {
  newNickName: string;
}

interface getPassNew {
  success: boolean;
  err: string;
  isLogin: boolean;
}

interface postPassNew {
  password: string;
}

interface Variables {
  id: number;
  nickName: string;
}

// interface res {
//   loading: boolean;
//   error: ApolloError;
//   data: Data;
// }

const props = {
  id: 15,
  nickName: 'hshs',
};

const { Content } = Layout;

//console.log(token);

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
    newNN: '',
    newPW: '',
  };
  // modals =======================================
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
  // change info ==================================
  onchangeNewPassWord = async (e: any) => {
    await this.setState({
      newPW: e.target.value,
    });
    console.log("!!'", this.state.newPW);
  };

  updatePassword = async (e: any, mufn: any) => {
    let result: any = await mufn();

    console.log(result);
    if (result.data.changePassWord.success) {
      return alert('비밀번호 변경이 완료되었습니다.');
    }
    return alert(result.data.changePassWord.err);
  };

  onchangeNewNickName = async (e: any) => {
    await this.setState({
      newNN: e.target.value,
    });
    console.log(this.state.newNN);
  };

  updateNickName = async (e: any, mufn: any) => {
    let result = await mufn();
    if (result.data.changeNickName.success) {
      return alert('닉네임 변경이 완료되었습니다.');
    }
    return alert(result.data.changeNickName.err);
  };

  render() {
    return (
      <Query<Data, Variables>
        query={MY_PROFILE}
        variables={{ id: props.id, nickName: props.nickName }}
      >
        {({ loading, error, data }: any) => {
          if (loading) return <Loading />;
          if (error) return <Err />;
          console.log(data);

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
                          {data.getMe.isMe === true ? (
                            // token 실어서 보내면 true 일 때가 된다! 토큰 헤더에서 실어서 요청해야함.

                            <div style={{ marginTop: '20%' }}>
                              <Button
                                type="default"
                                size="large"
                                onClick={this.showModal}
                              >
                                edit
                              </Button>
                              <Button></Button>
                              <Modal
                                title="Change info"
                                visible={this.state.editModal}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                              >
                                <p>
                                  new Password
                                  <Mutation<getPassNew, postPassNew>
                                    mutation={CHANGE_PASSWORD}
                                    variables={{
                                      password: this.state.newPW,
                                    }}

                                    // context={ headers: {
                                    //   "x-jwt": token ? `Bearer ${token}` : ""
                                    // }}
                                  >
                                    {changePassWord => (
                                      <Input
                                        placeholder="write new password and press enter"
                                        onPressEnter={e => {
                                          this.updatePassword(
                                            e,
                                            changePassWord
                                          );
                                        }}
                                        addonAfter="press Enter"
                                        onChange={this.onchangeNewPassWord}
                                      />
                                    )}
                                  </Mutation>
                                </p>
                                <p>
                                  new NickName
                                  <Mutation<getNickNew, postNickNew>
                                    mutation={CHANGE_NICKNAME}
                                    variables={{
                                      newNickName: this.state.newNN,
                                    }}
                                  >
                                    {changeNickName => (
                                      <Input
                                        placeholder="write new nickname and press enter"
                                        onPressEnter={e => {
                                          this.updateNickName(
                                            e,
                                            changeNickName
                                          );
                                        }}
                                        addonAfter="press Enter"
                                        onChange={this.onchangeNewNickName}
                                      />
                                    )}
                                  </Mutation>
                                </p>

                                <p style={{ marginTop: '5%' }}>
                                  Place the cursor where you want to change and
                                  press "enter"
                                </p>
                              </Modal>
                            </div>
                          ) : (
                            <div />
                          )}
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
