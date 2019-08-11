import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, Modal } from 'antd';
import {
  MU_CRETECOMMENT,
  CreateCommentData,
  CreateVariables,
  MU_DELETECOMMENT,
  DeleteCommentData,
  DelteteCommentVariables,
} from './Mutation/MuInfo';
import {
  QU_COMMENTPOINT,
  InfoCommentData,
  InfoCommentVariables,
} from './Query/QuInfo';
import { Mutation, Query } from 'react-apollo';
import { Loading, Err } from '../../Shared/loading';

const { TextArea } = Input;

interface InfoCommentProps {
  hospitalid: number;
}

interface InfoCommentState {
  writeReply: any;
  create: any;
}

var reply = '';

export default class InfoComment extends Component<
  InfoCommentProps,
  InfoCommentState
> {
  constructor(props: any) {
    super(props);
    console.log('commeent---->', this.props);
    this.state = {
      writeReply: '',
      create: false, //뮤테이션 함수에 같이 넣어서 쿼리 재렌더링 없애야함
    };
  }

  replydelete = (e: any) => {
    //id를 비교 후 삭제
    //console.log('reply onclick e---->', e);
  };

  replyWrite = (e: any) => {
    reply = e.target.value;
    console.log('reply-->', reply);
    this.setState({
      writeReply: reply,
    });
  };

  errorLogin = () => {
    Modal.error({
      title: '댓글작성은 로그인을 해야 합니다!!!',
      content: '로그인 상태면 로그아웃 후 재로그인 부탁드립니다',
    });
  };

  replySend = async (e: any, createComment: any) => {
    const resReplyData = await createComment();
    if (resReplyData.data.createComment.isLogin === false) {
      return this.errorLogin();
    }
  };

  deleteMyComment = async (e: any, deleteComment: any) => {
    const resDeleteData = await deleteComment();
    console.log('resDeleteData--->', resDeleteData);
    if (resDeleteData.data.deleteComment.isLogin === false) {
      alert('로그아웃 후 재로그인');
    }
  };

  render() {
    const { hospitalid } = this.props;
    const { writeReply } = this.state;
    //console.log('hospitalid-->', hospitalid, writeReply);
    return (
      <Query<InfoCommentData, InfoCommentVariables>
        query={QU_COMMENTPOINT}
        variables={{ id: hospitalid, boardName: 'info' }}
      >
        {({ loading, error, data }: any) => {
          if (loading) return <Loading />;
          if (error) return <Err />;
          console.log('commentdata--->', data.getComments.comments);
          let commentData = data.getComments.comments;
          return (
            <div>
              <div>
                {commentData.map((value: any, i: any) => {
                  return (
                    <div
                      className="commentbox"
                      key={value.comment.creator.nickName + i}
                    >
                      <div className="avatar">사진</div>
                      <div className="eachcommentbox">
                        <div className="commentinfobox">
                          <div className="commentid">
                            {value.comment.creator.nickName}
                          </div>
                          <div className="commentcreatAt">
                            {value.comment.createdAt}
                          </div>
                        </div>
                        <div className="comment">{value.comment.content}</div>
                      </div>
                      {value.isMe === true ? (
                        <Mutation<DeleteCommentData, DelteteCommentVariables>
                          mutation={MU_DELETECOMMENT}
                          variables={{ id: value.comment.id }}
                          refetchQueries={[
                            {
                              query: QU_COMMENTPOINT,
                              variables: {
                                id: hospitalid,
                                boardName: 'info',
                              },
                            },
                          ]}
                        >
                          {deleteComment => (
                            <Button
                              onClick={e => {
                                this.deleteMyComment(e, deleteComment);
                              }}
                            >
                              삭제
                            </Button>
                          )}
                        </Mutation>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div>
                <TextArea
                  rows={4}
                  onChange={(e: any) => {
                    this.replyWrite(e);
                  }}
                />
                <Mutation<CreateCommentData, CreateVariables>
                  mutation={MU_CRETECOMMENT}
                  variables={{
                    boardId: hospitalid,
                    boardName: 'info',
                    content: writeReply,
                  }}
                  refetchQueries={[
                    {
                      query: QU_COMMENTPOINT,
                      variables: {
                        id: hospitalid,
                        boardName: 'info',
                      },
                    },
                  ]}
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
