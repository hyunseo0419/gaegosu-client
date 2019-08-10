import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, Modal } from 'antd';
import {
  MU_CRETECOMMENT,
  CreateCommentData,
  CreateVariables,
} from './Mutation/MuInfo';

import {
  QU_COMMENTPOINT,
  InfoCommentData,
  InfoCommentVariables,
} from './Query/QuInfo';
import { Mutation, Query } from 'react-apollo';
import { Loading, Err } from '../../Shared/loading';

const { TextArea } = Input;

interface InfoCommentProps {}

interface InfoCommentState {
  writeReply: any;
  create: any;
}

//var reply = '';

export default class InfoComment extends Component<
  InfoCommentProps,
  InfoCommentState
> {
  constructor(props: any) {
    super(props);
    console.log('commeent---->', this.props);
    this.state = {
      writeReply: undefined,
      create: false, //뮤테이션 함수에 같이 넣어서 쿼리 재렌더링 없애야함
    };
  }

  replydelete = (e: any) => {
    //id를 비교 후 삭제
    //console.log('reply onclick e---->', e);
  };
  replyWrite = (e: any) => {
    // console.log('e--->', e.target.value);
    // // this.setState({
    // //   wirteReply: e.target.value,
    // // });
    // reply = e.target.value;
    // console.log('reply-->', reply);
    // this.setState({
    //   writeReply: reply,
    // });
  };

  errorLogin = () => {
    Modal.error({
      title: '댓글작성은 로그인을 해야 합니다!!!',
      content: '로그인 후 이용 해주세요',
    });
  };

  replySend = async (e: any, createComment: any) => {
    const resReplyData = await createComment();
    if (resReplyData.data.createComment.isLogin === false) {
      return this.errorLogin();
    }
  };

  render() {
    //console.log('infoComment렌더링');
    return (
      <Query<InfoCommentData, InfoCommentVariables>
        query={QU_COMMENTPOINT}
        variables={{ id: 1, boardName: 'info' }}
      >
        {({ loading, error, data }: any) => {
          if (loading) return <Loading />;
          if (error) return <Err />;
          //console.log('commentdata--->', data);
          return (
            <div>
              <div>
                {/* <List
                  className="comment-list"
                  header={`${data.length} replies`}
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item: any) => (
                    <li>
                      <Comment
                        author={item.author}
                        avatar={item.avatar}
                        content={item.content}
                        datetime={item.datetime}
                      />
                      <Button
                        style={{}}
                        onClick={(e: any) => {
                          this.replydelete(e);
                        }}
                      >
                        delete
                      </Button>
                    </li>
                  )}
                /> */}
                잘되냐?
              </div>
              <div>
                <TextArea
                  rows={4}
                  onChange={e => {
                    this.replyWrite(e);
                  }}
                />
                <Mutation<CreateCommentData, CreateVariables>
                  mutation={MU_CRETECOMMENT}
                  variables={{
                    boardId: 1,
                    boardName: 'info',
                    content: '짱좋아요',
                  }}
                >
                  {createComment => (
                    <Button
                      onClick={e => {
                        this.replySend(e, createComment);
                      }}
                    >
                      입력
                    </Button>
                  )}
                </Mutation>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
