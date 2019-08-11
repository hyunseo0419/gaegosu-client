import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Row,
  Col,
  Checkbox,
  Button,
  Layout,
  Breadcrumb,
  Divider,
  Modal,
} from 'antd';
import { Redirect } from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';
import { Mutation } from 'react-apollo';
import { MU_SIGNUP, Data, MVariables } from './Mutation/SignupMutation';
import { MU_EMAILSEND, MuemailVariables } from './Mutation/EmailSendMutation';
import { MU_EMAILAUTH, Muemailauth } from './Mutation/EmailAuthMutation';

const { Content } = Layout;
let id = 0;

interface IState {}

interface IMutation {}

class Signup extends Component<{} & FormComponentProps> {
  state = {
    val: '',
    authWord: '',
    cofirmEmail: false,
    confirmDirty: false,
    autoCompleteResult: [],
    values: {
      nickname: '',
      email: '',
      password: '',
      provider: 'local',
      admin: false,
      profileImage: '',
      pets: [],
    },
    send: false,
    auth: false,
    online: false,
  };

  errorSignup = () => {
    Modal.error({
      title: '회원가입 실패했습니다.',
      content: '회원가입 정보를 다시 한번 확인해주세요',
    });
  };

  handleSubmit = (e: any, localsignUp: any) => {
    e.preventDefault();
    console.log('handelSubmit');
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(err);
      if (!err) {
        console.log('Received values of form: ', values);

        values.pets = [];
        for (var i = 0; i < values.keys.length; i++) {
          values.pets[i] = {};
          values.pets[i].name = values.petname[i];
          values.pets[i].animal = values.pettype[i];
          values.pets[i].breeds = values.petbreed[i];
          values.pets[i].profileImage = '';
        }
        values.admin = false;
        values.profileImage = '';
        values.provider = 'local';
        this.setState(
          {
            values: values,
          },
          async () => {
            if (this.state.auth && this.state.send) {
              const response = await localsignUp();
              console.log('response---->', response);
              this.setState({
                online: true,
              });
            } else {
              this.errorSignup();
            }
          }
        );
        // this.setState({
        //   online: true,
        // });
      }
    });
  };

  handleConfirmBlur = (e: any) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('비밀번호가 일치하지 않습니다.');
    } else {
      callback();
    }
  };

  remove = (k: any) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 0) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter((key: any) => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  validateToNextPassword = (rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  emailVal = (rule: any, value: any, callback: any) => {
    //const { form } = this.props;
    this.setState({
      val: value,
    });
    callback();
  };

  authNum = (rule: any, value: any, callback: any) => {
    //const { form } = this.props;
    this.setState({
      authWord: value,
    });
    callback();
  };

  successMail = () => {
    Modal.success({
      title: '등록한 이메일로 인증번호를 발송했습니다',
      content: '이메일에서 인증번호 확인 후 기입해주세요',
    });
  };

  errorMail = () => {
    Modal.error({
      title: '이미 가입된 이메일 입니다',
      content: '다른 이메일로 가입해주세요',
    });
  };

  successAuth = () => {
    Modal.success({
      title: '이메일이 인증 되었습니다.',
      content: '회원가입 절차를 계속 진행해주세요',
    });
  };

  errorAuth = () => {
    Modal.error({
      title: '이메일 인증이 실패되었습니다.',
      content: '인증번호 확인 후 기입해주세요',
    });
  };

  checkEmail = async (e: any, emailSend: any) => {
    const rescheckData = await emailSend();
    console.log('rescheckData--->', rescheckData.data.emailSend);
    this.setState({
      send: rescheckData.data.emailSend,
    });
    if (rescheckData.data.emailSend === true) {
      return this.successMail();
    } else {
      return this.errorMail();
    }
  };

  authSend = async (e: any, emailAuth: any) => {
    const resauthData = await emailAuth();
    console.log('resauthData---->', resauthData.data.emailAuth);
    this.setState({
      auth: resauthData.data.emailAuth,
    });
    if (resauthData.data.emailAuth === true) {
      return this.successAuth();
    } else {
      return this.errorAuth();
    }
  };

  render() {
    const { values, val, authWord } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 20,
          offset: 4,
        },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k: any, index: any) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'PetInfo' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`petname[${index}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input pet's info or delete this field.",
            },
          ],
        })(
          <Input
            placeholder="필수: 애완동물이름"
            style={{ width: '62%', marginRight: 8 }}
          />
        )}
        {getFieldDecorator(`pettype[${index}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input pet's Type or delete this field.",
            },
          ],
        })(
          <Input
            placeholder="필수: 애완동물종류(ex: 개, 고양이)"
            style={{ width: '62%', marginRight: 8 }}
          />
        )}
        {getFieldDecorator(`petbreed[${index}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input pet's breed or delete this field.",
            },
          ],
        })(
          <Input
            placeholder="필수: 애완동물품종(ex: 모르면 모름 기입)"
            style={{ width: '62%', marginRight: 8 }}
          />
        )}

        {keys.length > 0 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <>
        {this.state.online === true ? (
          <Redirect to={'/login'} />
        ) : (
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
              <Mutation<Data, MVariables>
                mutation={MU_SIGNUP}
                variables={{
                  nickname: values.nickname,
                  email: values.email,
                  password: values.password,
                  profileImage: values.profileImage,
                  provider: values.provider,
                  admin: values.admin,
                  pets: values.pets,
                }}
              >
                {localsignUp => (
                  <Form
                    {...formItemLayout}
                    onSubmit={e => {
                      this.handleSubmit(e, localsignUp);
                    }}
                  >
                    <Form.Item label="E-mail" extra="이메일 인증은 필수입니다.">
                      <Row gutter={8}>
                        <Col span={12}>
                          {getFieldDecorator('email', {
                            rules: [
                              {
                                type: 'email',
                                message: '이메일을 입력해주세요!',
                              },
                              {
                                required: true,
                                message: '이메일을 등록해주세요!',
                              },
                              {
                                validator: this.emailVal,
                              },
                            ],
                          })(<Input />)}
                        </Col>
                        <Col span={12}>
                          <Mutation<Boolean, MuemailVariables>
                            mutation={MU_EMAILSEND}
                            variables={{ email: val }}
                          >
                            {emailSend => (
                              <Button
                                onClick={e => {
                                  this.checkEmail(e, emailSend);
                                }}
                              >
                                본인이메일 확인
                              </Button>
                            )}
                          </Mutation>
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label="인증번호"
                      extra="본인이메일로 가서 인증번호를 확인해주세요"
                    >
                      <Row gutter={8}>
                        <Col span={12}>
                          {getFieldDecorator('captcha', {
                            rules: [
                              {
                                required: true,
                                message: '이메일인증번호를 입력해주세요',
                              },
                              {
                                validator: this.authNum,
                              },
                            ],
                          })(<Input />)}
                        </Col>
                        <Col span={12}>
                          <Mutation<Boolean, Muemailauth>
                            mutation={MU_EMAILAUTH}
                            variables={{ email: val, randomWord: authWord }}
                          >
                            {emailauth => (
                              <Button
                                onClick={e => {
                                  this.authSend(e, emailauth);
                                }}
                              >
                                이메일인증 확인
                              </Button>
                            )}
                          </Mutation>
                        </Col>
                      </Row>
                    </Form.Item>
                    <Form.Item label="Password" hasFeedback>
                      {getFieldDecorator('password', {
                        rules: [
                          {
                            required: true,
                            message: '패스워드를 입력해주세요!',
                          },
                          {
                            validator: this.validateToNextPassword,
                          },
                        ],
                      })(
                        <Input.Password
                          style={{ width: '62%', marginRight: 8 }}
                        />
                      )}
                    </Form.Item>
                    <Form.Item label="Confirm Password" hasFeedback>
                      {getFieldDecorator('confirm', {
                        rules: [
                          {
                            required: true,
                            message: '패스워드를 다시한번 확인해주세요!',
                          },
                          {
                            validator: this.compareToFirstPassword,
                          },
                        ],
                      })(
                        <Input.Password
                          onBlur={this.handleConfirmBlur}
                          style={{ width: '62%', marginRight: 8 }}
                        />
                      )}
                    </Form.Item>
                    <Form.Item
                      label={
                        <span>
                          Nickname&nbsp;
                          <Tooltip title="중복되지 않는 닉네임을 설정해주세요">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                      }
                    >
                      {getFieldDecorator('nickname', {
                        rules: [
                          {
                            required: true,
                            message: '닉네임을 입력해주세요!',
                            whitespace: true,
                          },
                        ],
                      })(<Input style={{ width: '62%', marginRight: 8 }} />)}
                    </Form.Item>
                    <div className="container">
                      <Divider orientation="left" className="first">
                        애완동물 정보 기입 [선택사항]
                      </Divider>
                      {formItems}
                      <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button
                          type="dashed"
                          onClick={this.add}
                          style={{ width: '62%' }}
                        >
                          <Icon type="plus" /> 애완동물 정보를 기입해주세요
                        </Button>
                      </Form.Item>
                    </div>
                    <Form.Item {...tailFormItemLayout}>
                      {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                      })(<Checkbox>I have read the agreement</Checkbox>)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                      <Button type="primary" htmlType="submit">
                        회원가입
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </Mutation>
            </div>
          </Content>
        )}
      </>
    );
  }
}

export default Form.create()(Signup);
