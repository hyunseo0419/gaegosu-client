// form of login === https://ant.design/components/form/
// auto complete === https://ant.design/components/auto-complete/
// if want modal === https://ant.design/components/modal/

import React from 'react';
// import ReactDOM from 'react-dom';
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

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

// function beforeUpload(file: any) {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJpgOrPng && isLt2M;
// }

class NewBoard extends React.Component<{} & FormComponentProps> {
  state = {
    title: '',
    content: '',
    boardName: 'album',
    imageUrl: '',
    submit: false,
    loading: false,
  };

  // handleChange = (info: any) => {
  //   if (info.file.status === 'uploading') {
  //     this.setState({ loading: true });
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, (imageUrl: any) =>
  //       this.setState({
  //         imageUrl,
  //         loading: false,
  //       })
  //     );
  //   }
  // };

  handleSubmit = (e: any, createBoard: any, photo: string) => {
    e.preventDefault();
    this.props.form.validateFields((err: any | null, values: any | null) => {
      if (!err) {
        console.log('Received values of form: ', photo);
        this.setState(
          {
            title: values.title,
            content: values.content,
            boardName: this.state.boardName,
            imageUrl: photo,
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

  albumSetIMG = async (album: string, muFn: any) => {
    await this.setState({
      albumPhoto: album,
    });
    let result = muFn();
    console.log('result====>', result);
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const albumProps = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      albumIMG: '',

      // S3로 전송 및 저장
      onChange(info: any) {
        if (info.file.status !== 'uploading') {
          console.log('--->', info.file, 'list-->', info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          let formData = new FormData();

          formData.append('photo', info.fileList[0].originFileObj);
          console.log('@@@@', info.file.originFileObj);

          fetch('http://localhost:4000/photo', {
            method: 'POST',
            body: formData,
            // headers: {
            //   'content-type': 'multipart/form-data',
            // },
          })
            .then(res => res.json())
            .then(json => console.log('this is json :', json)) //(albumProps.albumIMG = json)
            .then(test =>
              console.log('uploaded image url :', albumProps.albumIMG)
            )
            .catch(err => console.error('Caught error: ', err));
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    // const uploadButton = (
    //   <div>
    //     <Icon type={this.state.loading ? 'loading' : 'plus'} />
    //     <div className="ant-upload-text">Upload</div>
    //   </div>
    // );

    // const { imageUrl } = this.state;

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
                    imageUrl: this.state.imageUrl,
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
                          // <Input placeholder="Photo" />
                          <div
                            style={{
                              textAlign: 'center',
                            }}
                          >
                            <Upload
                              {...albumProps}
                              multiple={false}
                              onChange={data => albumProps.onChange(data)}
                            >
                              {/* this.setState({ imageUrl: data }) */}
                              <Button
                                type="default"
                                size="large"
                                // onClick={this.albumSetIMG()}
                              >
                                <Icon type="upload" />
                                upload / change
                              </Button>
                            </Upload>

                            {/* <Upload
                              name="avatar"
                              listType="picture-card"
                              className="avatar-uploader"
                              showUploadList={false}
                              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                              beforeUpload={beforeUpload}
                              onChange={this.handleChange}
                            >
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt="avatar"
                                  style={{ width: '100%' }}
                                />
                              ) : (
                                uploadButton
                              )}
                            </Upload> */}
                            {/* <Mutation<uploadAlbum>
                              mutation={ALBUM_IMG}
                              variables={{
                                profileImage: this.state.photo,
                              }}
                            >
                              {postIMG => (
                                <Button
                                  style={{ marginTop: '2%' }}
                                  onClick={() => {
                                    this.albumSetIMG(albumProps.albumIMG, postIMG);
                                  }}
                                >
                                  Confirm
                                </Button>
                              )}
                            </Mutation> */}
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
