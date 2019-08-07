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
  Upload,
  message,
  Icon,
} from 'antd';
import { MY_PROFILE } from './Query/QueriesMypage';
import { CHANGE_NICKNAME } from './Mutation/MutationMypage';
import { CHANGE_PASSWORD } from './Mutation/MutationMypage';
import { Query, Mutation } from 'react-apollo';
import { Loading, Err } from '../../Shared/loading';

interface Data {
  getUser: {
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

interface MyProps {
  match: {
    params: {
      id: string;
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
  id: any;
}

// interface res {
//   loading: boolean;
//   error: ApolloError;
//   data: Data;
// }

const { Content } = Layout;

//console.log(token);

class Mypage extends Component<MyProps> {
  constructor(props: any) {
    super(props);
    console.log('this is props!!!!!!!!!', props.match.params.id);
    console.log('this is props!!!!!!!!!', props);
  }

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
  // ==============================================

  render() {
    console.log(Number(this.props.match.params.id));
    const personalId = Number(this.props.match.params.id);
    return (
      <Query<Data, Variables> query={MY_PROFILE} variables={{ id: personalId }}>
        {({ loading, error, data }: any) => {
          if (loading) return <Loading />;
          if (error) return <Err />;
          console.log(data);

          // =====================file uploead part==============================
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
                formData.append('photo', info.fileList[0]);
                fetch('http://localhost:4000/', {
                  method: 'POST',
                  body: formData,
                  headers: {
                    authorization: 'authorization-text',
                    'content-type': 'multipart/form-data',
                  },
                })
                  // .then(res => res.json())
                  .then(json => console.log(json))
                  .catch(err => console.error('Caught error: ', err));
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
          };
          //=====================================================================

          const profile = data.getUser.user;
          console.log('@@@@@@@@@@@@@', profile.pets[0]);
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
                  <div
                    style={{
                      marginLeft: '10%',
                      marginRight: '10%',
                      marginBottom: '10%',
                    }}
                  >
                    <Row>
                      <Col span={18} push={10}>
                        <div>
                          <Avatar
                            size={250}
                            icon="user"
                            src={profile.profileImage}
                            style={{ margin: '10%' }}
                          />
                        </div>

                        {data.getUser.isMe === true ? (
                          <Upload {...props}>
                            <Button
                              type="default"
                              size="large"
                              //onClick={this.showModal}
                              style={{
                                marginLeft: '21%',
                              }}
                            >
                              <Icon type="upload" />
                              upload / change
                            </Button>
                          </Upload>
                        ) : null}
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
                          {profile.email !== null ? (
                            <span>
                              <div>E-mail : </div>
                              <div>{profile.email}</div>
                            </span>
                          ) : null}
                          <br />
                          <br />
                          <div>Provider : </div>
                          <div>{profile.provider}</div>
                          {data.getUser.isMe === true ? (
                            // token 실어서 보내면 true 일 때가 된다! 토큰 헤더에서 실어서 요청해야함.

                            <div style={{ marginTop: '20%' }}>
                              <div>
                                <Button
                                  type="default"
                                  size="large"
                                  onClick={this.showModal}
                                >
                                  edit
                                </Button>

                                <Button
                                  type="default"
                                  size="large"
                                  // onClick={this.showModal}
                                >
                                  exit
                                </Button>
                              </div>
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
                    {profile.pets[0] !== undefined ? (
                      <span>
                        <br />
                        <Row>
                          <Col span={18} push={10}>
                            <div>
                              <Avatar
                                size={250}
                                icon="user"
                                src={profile.pets[0].profileImage}
                                style={{ margin: '10%' }}
                              />
                            </div>
                            {data.getUser.isMe === true ? (
                              <Upload {...props}>
                                <Button
                                  type="default"
                                  size="large"
                                  //onClick={this.showModal}
                                  style={{
                                    marginLeft: '21%',
                                  }}
                                >
                                  <Icon type="upload" />
                                  upload / change
                                </Button>
                              </Upload>
                            ) : null}
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
                              <div>{profile.pets[0].name}</div>
                              <br />
                              <br />
                              <div>Animal : </div>
                              <div>{profile.pets[0].animal}</div>
                              <br />
                              <br />
                              <div>Breeds : </div>
                              <div>{profile.pets[0].breeds}</div>
                            </div>
                          </Col>
                        </Row>
                      </span>
                    ) : null}
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
