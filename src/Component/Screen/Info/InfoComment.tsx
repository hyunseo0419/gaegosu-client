import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, Modal, Avatar } from 'antd';
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
import { Link } from 'react-router-dom';

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
          let commentData = data.getComments.comments;
          return (
            <div>
              <div>
                {commentData.map((value: any, i: any) => {
                  let date = new Date(Number(value.comment.createdAt));
                  let month = date.getMonth() + 1;
                  let created =
                    date.getFullYear() +
                    '년 ' +
                    month +
                    '월 ' +
                    date.getDate() +
                    '일 ' +
                    date.getHours() +
                    '시 ' +
                    date.getMinutes() +
                    '분 ';
                  return (
                    <div
                      className="commentbox"
                      key={value.comment.creator.nickName + i}
                    >
                      <div className="avatar">
                        <Avatar src={value.comment.creator.profileImage} />
                      </div>
                      <div className="eachcommentbox">
                        <div className="commentinfobox">
                          <div className="commentid">
                            <Link to={`/mypage/${value.comment.creator.id}`}>
                              {value.comment.creator.nickName}
                            </Link>
                          </div>
                          <div className="commentcreatAt">{created}</div>
                        </div>
                        <div className="infocomment">
                          {value.comment.content}
                          {value.isMe === true ? (
                            <Mutation<
                              DeleteCommentData,
                              DelteteCommentVariables
                            >
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
                                  type="danger"
                                  ghost
                                  size="small"
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
                      </div>
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
