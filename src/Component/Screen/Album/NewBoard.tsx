// form of login === https://ant.design/components/form/
// auto complete === https://ant.design/components/auto-complete/
// if want modal === https://ant.design/components/modal/

import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './Album.css';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { NEW_BOARD } from './Query/QuariesAlbum';
import { Form, Input, Button, Layout, Breadcrumb } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Headbar from '../../Shared/Headbar';
import Footbar from '../../Shared/Footbar';

const { Content } = Layout;

class NewBoard extends React.Component<{} & FormComponentProps> {
  state = {
    title: '',
    content: '',
    boardName: 'album',
    photo: '',
    submit: false,
  };

  handleSubmit = (e: any, createBoard: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any | null, values: any | null) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState(
          {
            title: values.title,
            content: values.content,
            boardName: this.state.boardName,
            photo: values.photo,
          },
          async () => {
            const response = await createBoard();

            console.log('create New Board :', response);
            this.setState({
              submit: true,
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
        {this.state.submit === true ? (
          <Redirect to={`/`} />
        ) : (
          <Layout>
            <Headbar />
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
              <Breadcrumb style={{ margin: '50px 0' }} />
              <div style={{ background: '#fff', padding: 24, minHeight: 520 }}>
                <Mutation
                  mutation={NEW_BOARD}
                  variables={{
                    title: this.state.title,
                    content: this.state.content,
                    boardName: this.state.boardName,
                    photo: this.state.photo,
                  }}
                >
                  {(createBoard: any) => (
                    <Form
                      onSubmit={e => {
                        this.handleSubmit(e, createBoard);
                      }}
                      className="login-form"
                    >
                      <Form.Item>
                        {getFieldDecorator('title', {
                          rules: [
                            {
                              required: true,
                              message: 'Title cannot be NULL !',
                            },
                          ],
                        })(<Input placeholder="Title" />)}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator('content', {
                          rules: [
                            {
                              required: true,
                              message: 'Content cannot be NULL !',
                            },
                          ],
                        })(<Input placeholder="Content" />)}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator('photo', {
                          rules: [
                            {
                              required: true,
                              message: 'Photo cannot be NULL !',
                            },
                          ],
                        })(<Input placeholder="Photo" />)}
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                        >
                          Submit
                        </Button>
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
const WrappedNewBoardForm = Form.create({ name: 'normal_login' })(NewBoard);
export default WrappedNewBoardForm;
