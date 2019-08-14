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
import {
  CHANGE_PASSWORD,
  CHANGE_NICKNAME,
  USER_IMG,
  PET_IMG,
} from './Mutation/MutationMypage';

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
        id: number;
        name: string;
        animal: string;
        breeds: string;
        profileImage: string;
      };
    };
  };
}
//========URL params & Varialbes=====================
interface MyProps {
  match: {
    params: {
      id: string;
    };
  };
}

interface Variables {
  id: any;
}
//========change info================================
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
//========change img=================================
interface uploadUser {
  success: boolean;
  err: string;
}

interface uploadPet {
  success: boolean;
  err: string;
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
    userPhoto: null,
    petPhoto: null,
  };

  // modals ==============================================================================
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
  // change info =========================================================================

  urlSetter = (url: string) => {
    this.setState({
      photo: url,
    });
  };

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
  // change img===========================================================================
  userSetIMG = async (user: string, muFn: any) => {
    await this.setState({
      userPhoto: user,
    });
    let result = muFn();
    console.log('result====>', result);
  };

  petSetIMG = async (pet: string, muFn: any) => {
    await this.setState({
      petPhoto: pet,
    });
    let result = muFn();
    console.log('result====>', result);
  };

  // changeUserIMG = (user: string, mufn) => {
  //   this.setState({
  //     userPhoto: user,
  //   });
  // };

  // =====================================================================================
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

          const userProps = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            userIMG: '',

            onChange(info: any) {
              if (info.file.status !== 'uploading') {
                console.log('--->', info.file, 'list-->', info.fileList);
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                let formData = new FormData();

                formData.append('photo', info.fileList[0].originFileObj);
                console.log('@@@@', info.file.originFileObj);
                fetch('http://15.164.212.171:4000/photo', {
                  method: 'POST',
                  body: formData,
                  // headers: {
                  //   'content-type': 'multipart/form-data',
                  // },
                })
                  .then(res => res.json())
                  .then(json => (userProps.userIMG = json))
                  .catch(err => console.error('Caught error: ', err));
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
          };

          const petProps = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            petIMG: '',

            onChange(info: any) {
              if (info.file.status !== 'uploading') {
                console.log('--->', info.file, 'list-->', info.fileList);
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                let formData = new FormData();

                formData.append('photo', info.fileList[0].originFileObj);
                console.log('@@@@', info.file.originFileObj);

                fetch('http://15.164.212.171:4000/photo', {
                  method: 'POST',
                  body: formData,
                  // headers: {
                  //   'content-type': 'multipart/form-data',
                  // },
                })
                  .then(res => res.json())
                  .then(json => (petProps.petIMG = json))
                  // .then(json => Mypage.urlSetter(json))
                  .catch(err => console.error('Caught error: ', err));
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
          };

          //=====================================================================

          const profile = data.getUser.user;

          return (
            <Layout>
              <Headbar />

              <Layout>
                <Content
                  style={{
                    padding: '0 50px',
                    marginTop: 64,
                    backgroundColor: 'white',
                    marginLeft: '20%',
                    marginRight: '20%',
                  }}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK696pWeUIrrgHW6sS6YuFg4RzOYue-RhleaIn3Pyh7WZuBQ6J"
                    style={{
                      width: '91.83%',
                      height: 150,
                      textAlign: 'center',
                    }}
                  />
                  <div style={{ textAlign: 'center', fontSize: '325%' }}>
                    <img
                      src="https://gaegosu.s3.amazonaws.com/photo/9c2762563d335d44a24cfba4c55b6755"
                      style={{
                        width: '50%',
                        marginTop: '5%',
                        marginBottom: '5%',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      marginLeft: '10%',
                      marginRight: '10%',
                      marginBottom: '10%',
                    }}
                  >
                    <Row>
                      <Col span={18} push={10}>
                        <div
                          style={{
                            textAlign: 'center',
                          }}
                        >
                          <Avatar
                            size={250}
                            icon="user"
                            src={profile.profileImage}
                            style={{ margin: '10%' }}
                          />
                        </div>

                        {data.getUser.isMe === true ? (
                          <div
                            style={{
                              textAlign: 'center',
                            }}
                          >
                            <Upload {...userProps} multiple={false}>
                              <Button
                                type="default"
                                size="large"
                                // onClick={this.userSetIMG()}
                              >
                                <Icon type="upload" />
                                upload / change
                              </Button>
                            </Upload>
                            <Mutation<uploadUser>
                              mutation={USER_IMG}
                              variables={{
                                profileImage: this.state.userPhoto,
                              }}
                              refetchQueries={[
                                {
                                  query: MY_PROFILE,
                                  variables: {
                                    id: personalId,
                                  },
                                },
                              ]}
                            >
                              {postIMG => (
                                <Button
                                  style={{
                                    marginTop: '2%',
                                    backgroundColor: '#FBE233',
                                  }}
                                  onClick={() => {
                                    this.userSetIMG(userProps.userIMG, postIMG);
                                  }}
                                >
                                  Confirm
                                </Button>
                              )}
                            </Mutation>
                          </div>
                        ) : // {this.photoURL}
                        null}
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
                                  // style={{ backgroundColor: '#FBE233' }}
                                  type="default"
                                  size="large"
                                  onClick={this.showModal}
                                >
                                  edit
                                </Button>
                                {/* <Button
                                  type="default"
                                  size="large"
                                  onClick={() => {
                                    console.log(
                                      '@@@@@@@@@@@@@@@@@@@',
                                      userProps.userIMG
                                    );
                                  }}
                                >
                                  exit
                                </Button> */}
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

                    {profile.pets[0] !== undefined ? (
                      <span>
                        {profile.pets.map((ele: any, idx: number) => (
                          <div key={ele.id + ele.name}>
                            <Divider>Pet {idx + 1}</Divider>
                            <Row>
                              <Col span={18} push={10}>
                                <div style={{ textAlign: 'center' }}>
                                  <Avatar
                                    size={250}
                                    icon="user"
                                    src={ele.profileImage}
                                    style={{ margin: '10%' }}
                                  />
                                </div>
                                {data.getUser.isMe === true ? (
                                  <div
                                    style={{
                                      textAlign: 'center',
                                    }}
                                  >
                                    <Upload {...petProps}>
                                      <Button
                                        type="default"
                                        size="large"
                                        style={{ marginBottom: '5%' }}
                                      >
                                        <Icon type="upload" />
                                        upload / change
                                      </Button>
                                    </Upload>
                                    <Mutation<uploadPet>
                                      mutation={PET_IMG}
                                      variables={{
                                        id: ele.id,
                                        profileImage: this.state.petPhoto,
                                      }}
                                      refetchQueries={[
                                        {
                                          query: MY_PROFILE,
                                          variables: {
                                            id: personalId,
                                          },
                                        },
                                      ]}
                                    >
                                      {postIMG => (
                                        <Button
                                          style={{
                                            marginTop: '2%',
                                            backgroundColor: '#FBE233',
                                          }}
                                          onClick={() => {
                                            this.petSetIMG(
                                              petProps.petIMG,
                                              postIMG
                                            );
                                          }}
                                        >
                                          Confirm
                                        </Button>
                                      )}
                                    </Mutation>
                                  </div>
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
                                  <div>{ele.name}</div>
                                  <br />
                                  <br />
                                  <div>Animal : </div>
                                  <div>{ele.animal}</div>
                                  <br />
                                  <br />
                                  <div>Breeds : </div>
                                  <div>{ele.breeds}</div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        ))}
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
