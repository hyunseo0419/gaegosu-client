// form of login === https://ant.design/components/form/
// auto complete === https://ant.design/components/auto-complete/
// if want modal === https://ant.design/components/modal/

import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './login.css';
// import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { ApolloError } from 'apollo-client';
// import { ApolloConsumer } from 'react-apollo';
import { LOGIN_BUTTON } from '../../../queries';
import { Form, Icon, Input, Button, Checkbox, Layout, Breadcrumb } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Headbar from '../Share/Headbar';
import Footbar from '../Share/Footbar';
// import Submit from './Submit';

const { Content } = Layout;

interface IUserProps {
  id: number;
  nickName: string;
  email: string;
}

interface ILocalLoginProps {
  isLogin: boolean;
  user: IUserProps;
  err: string;
  token: string;
}

interface ILocalLoginBtnProps {
  data: ILocalLoginProps[];
  error?: ApolloError;
  loading: boolean;
}

class Login extends React.Component<{} & FormComponentProps> {
  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // <Submit />
        return (
          //   <ApolloConsumer>
          <Query
            query={LOGIN_BUTTON}
            variables={{
              email: values.username,
              password: values.password,
            }}
          >
            {({ loading, error, data }: ILocalLoginBtnProps) => {
              console.log();
              if (loading) return 'loading';
              if (error) return 'error';
              return 'connected';
            }}
          </Query>
          //   </ApolloConsumer>
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Layout>
          <Headbar />
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Breadcrumb style={{ margin: '50px 0' }} />
            <div style={{ background: '#fff', padding: 24, minHeight: 520 }}>
              <Form onSubmit={this.handleSubmit} className="login-form">
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
                  Or <a href="/">SignUp</a>
                </Form.Item>
              </Form>
            </div>
          </Content>
          <Footbar />
        </Layout>
      </React.Fragment>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

// ReactDOM.render(<WrappedNormalLoginForm />, mountNode);

// export default Form.create()(Login);

export default WrappedNormalLoginForm;
