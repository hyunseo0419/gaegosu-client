import React from 'react';
import 'antd/dist/antd.css';
import './Album.css';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { FIRST_ALBUM, NEW_BOARD } from './Query/QuariesAlbum';
import {
  Form,
  Input,
  Button,
  Layout,
  Breadcrumb,
  Upload,
  message,
  Icon,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Headbar from '../../Shared/Headbar';
import Footbar from '../../Shared/Footbar';

const { Content } = Layout;

class NewBoard extends React.Component<{} & FormComponentProps> {
  state = {
    title: '',
    content: '',
    boardName: 'album',
    imageUrl: '',
    submit: false,
    loading: false,
  };

  handleSubmit = (e: any, createBoard: any, img: string) => {
    e.preventDefault();
    this.props.form.validateFields((err: any | null, values: any | null) => {
      if (!err) {
        this.setState(
          {
            title: values.title,
            content: values.content,
            boardName: this.state.boardName,
            imageUrl: img,
          },
          async () => {
            if (this.state.imageUrl !== '') {
              const response = await createBoard();
              console.log('response---->', response);
              this.setState({
                submit: true,
              });
            }
          }
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const albumProps = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      albumIMG: '',

      onChange(info: any) {
        if (info.file.status !== 'uploading') {
          console.log('--->', info.file, 'list-->', info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          let formData = new FormData();

          formData.append('photo', info.file.originFileObj);

          fetch('http://localhost:4000/photo', {
            method: 'POST',
            body: formData,
          })
            .then(res => res.json())
            .then(json => (albumProps.albumIMG = json))
            .catch(err => console.error('Caught error: ', err));
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

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
                    photo: this.state.imageUrl,
                  }}
                  refetchQueries={[
                    {
                      query: FIRST_ALBUM,
                      variables: { boardName: 'album' },
                    },
                  ]}
                >
                  {(createBoard: any) => (
                    <Form
                      onSubmit={e => {
                        this.handleSubmit(e, createBoard, albumProps.albumIMG);
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
                        })(
                          <div
                            style={{
                              textAlign: 'center',
                            }}
                          >
                            <Upload
                              {...albumProps}
                              onChange={data => albumProps.onChange(data)}
                            >
                              <Button type="default" size="large">
                                <Icon type="upload" />
                                upload / change
                              </Button>
                            </Upload>
                          </div>
                        )}
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
