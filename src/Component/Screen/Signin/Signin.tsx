// form of login === https://ant.design/components/form/
// auto complete === https://ant.design/components/auto-complete/
// if want modal === https://ant.design/components/modal/

import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './signin.css';
import { Link, Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { LOGIN_BUTTON } from '../../../queries';
import { Form, Icon, Input, Button, Checkbox, Layout, Breadcrumb } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
// import Main from '../../../Component/Screen/Main/Main';
import Headbar from '../../Shared/Headbar';
import Footbar from '../../Shared/Footbar';
// import client from '../../../apolloClient';
// import ClickLoginBtn from './clickLoginBtn';
// import Submit from './Submit';

const { Content } = Layout;

class Signin extends React.Component<{} & FormComponentProps> {
  state = {
    username: '',
    password: '',
    online: false,
  };
  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e: any, localLogin: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any | null, values: any | null) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState(
          {
            username: values.username,
            password: values.password,
          },
          async () => {
            const response = await localLogin();
            console.log(response.data.localLogin.isLogin);
            console.log(response.data.localLogin.user.id);
            console.log(response.data.localLogin.user.email);
            console.log(response.data.localLogin.user.nickName);
            console.log(response.data.localLogin.token);

            localStorage.setItem(
              'userInfo',
              JSON.stringify({
                isLogin: response.data.localLogin.isLogin,
                id: response.data.localLogin.user.id,
                email: response.data.localLogin.user.email,
                nickName: response.data.localLogin.user.nickName,
                token: response.data.localLogin.token,
              })
            );

            // this.props.history.push("/");
            this.setState({
              online: true,
            });
          }
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        {this.state.online === true ? (
          <Redirect to={'/'} />
        ) : (
          // <a href="/" />
          <Layout>
            <Headbar />
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
              <Breadcrumb style={{ margin: '50px 0' }} />
              <div style={{ background: '#fff', padding: 24, minHeight: 520 }}>
                <Mutation
                  mutation={LOGIN_BUTTON}
                  variables={{
                    email: this.state.username,
                    password: this.state.password,
                  }}
                >
                  {(localLogin: any) => (
                    <Form
                      onSubmit={e => {
                        this.handleSubmit(e, localLogin);
                      }}
                      className="login-form"
                    >
                      <Form.Item>
                        {getFieldDecorator('username', {
                          rules: [
                            {
                              required: true,
                              message: 'Please input your username!',
                            },
                          ],
                        })(
                          <Input
                            prefix={
                              <Icon
                                type="user"
                                style={{ color: 'rgba(0,0,0,.25)' }}
                              />
                            }
                            placeholder="Username"
                          />
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator('password', {
                          rules: [
                            {
                              required: true,
                              message: 'Please input your Password!',
                            },
                          ],
                        })(
                          <Input
                            prefix={
                              <Icon
                                type="lock"
                                style={{ color: 'rgba(0,0,0,.25)' }}
                              />
                            }
                            type="password"
                            placeholder="Password"
                          />
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator('remember', {
                          valuePropName: 'checked',
                          initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <a className="login-form-forgot" href="/">
                          Forgot password
                        </a>

                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                        >
                          Log in
                        </Button>

                        <a href="http://localhost:4000/kakao">
                          <Button
                            type="default"
                            htmlType="button"
                            className="login-form-kakao"
                          >
                            KAKAO Login
                          </Button>
                        </a>
                        {/* <a href="/signup">SignUp</a> */}
                        <Link to={`/signup`}>signup</Link>
                      </Form.Item>
                    </Form>
                  )}
                </Mutation>
              </div>
            </Content>
            <Footbar />
          </Layout>
        )}
      </React.Fragment>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Signin);

export default WrappedNormalLoginForm;
