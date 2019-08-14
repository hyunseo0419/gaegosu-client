import React from 'react';
import { Link } from 'react-router-dom';
import { GET_CONTENT, ADD_COMMENT, DEL_COMMENT } from './Query/QuariesAlbum';
import { Input, Button, Col, Avatar } from 'antd';
import { Query, Mutation } from 'react-apollo';
import { Loading, Err } from '../../Shared/loading';
import LikeBTN from './LikeBTN';
import './Album.css';

interface Data {
  getAlbumContent: {
    success: boolean;
    err: string;
    isMe: boolean;
    isLogin: boolean;
    board: {
      creator: {
        id: number;
        nickName: string;
        profileImage: string;
      };
    };
  };
  getComments: {
    success: boolean;
    err: string;
    comments: {
      isMe: boolean;
      comment: {
        id: number;
        creator: {
          id: number;
          nickName: string;
          profileImage: string;
        };
        content: string;
        createdAt: string;
      };
    };
  };
}

interface getAddComm {
  success: boolean;
  err: string;
  isLogin: boolean;
}

interface postAddComm {
  boardId: number;
  boardName: string;
  content: string;
}

interface getDelComm {
  success: boolean;
  err: string;
  isLogin: boolean;
}

interface postDelComm {
  commentId: number;
}

interface Variables {
  id: number;
  boardName: string;
}

interface Props {
  boards: any;
}

interface State {}

export default class SingleContent extends React.Component<Props, State> {
  state = {
    comment: '',
    toggle: false,
  };

  updateComment = async (e: any, mufn: any) => {
    let result: any = await mufn();
    console.log(result);
    this.setState({
      toggle: this.state.toggle ? false : true,
    });
  };

  deleteComment = async (e: any, mufn: any) => {
    let result: any = await mufn();
    console.log(result);
    this.setState({
      toggle: this.state.toggle ? false : true,
    });
  };

  handleComment = async (e: any) => {
    await this.setState({
      comment: e.target.value,
    });
  };

  render() {
    return (
      <Query<Data, Variables>
        query={GET_CONTENT}
        variables={{ id: this.props.boards.id, boardName: 'album' }}
      >
        {({ loading, error, data }: any) => {
          if (loading) return <Loading />;
          if (error) return <Err />;
          const comments: any = data.getComments.comments;

          return (
            <div className="albumContainer">
              <div className="box-left">
                <img
                  className="box-left-image"
                  src={this.props.boards.photo}
                  alt={this.props.boards.photo}
                />
              </div>
              <div className="box-center" />
              <div className="box-right">
                <div>
                  <Avatar
                    src={data.getAlbumContent.board.creator.profileImage}
                  />
                  <Link to={`/mypage/${data.getAlbumContent.board.creator.id}`}>
                    {data.getAlbumContent.board.creator.nickName}
                  </Link>
                  <div style={{ marginTop: 15, marginBottom: 15 }}>
                    {this.props.boards.content}
                  </div>
                </div>
                <div>
                  <Col span={25}>
                    <LikeBTN boards={this.props.boards} />
                    <span>
                      <Mutation<getAddComm, postAddComm>
                        mutation={ADD_COMMENT}
                        variables={{
                          boardId: this.props.boards.id,
                          boardName: this.props.boards.boardName,
                          content: this.state.comment,
                        }}
                        refetchQueries={[
                          {
                            query: GET_CONTENT,
                            variables: {
                              id: this.props.boards.id,
                              boardName: 'album',
                            },
                          },
                        ]}
                      >
                        {addComment => (
                          <Col span={18}>
                            <Input
                              placeholder="comment"
                              onPressEnter={e => {
                                this.updateComment(e, addComment);
                              }}
                              addonAfter="+"
                              onChange={this.handleComment}
                            />
                          </Col>
                        )}
                      </Mutation>
                    </span>
                  </Col>
                </div>

                <div>comment</div>
                <div className="demo-infinite-container">
                  {comments.map((comment: any, idx: number) => (
                    <div className="commentbox">
                      {console.log('comment :', comment)}
                      <div className="avatar">
                        <Avatar src={comment.comment.creator.profileImage} />
                      </div>
                      <div className="eachcommentbox">
                        <div className="commentinfobox">
                          <div className="commentid">
                            <Link to={`/mypage/${comment.comment.creator.id}`}>
                              {comment.comment.creator.nickName}
                            </Link>
                          </div>
                        </div>
                        <div className="comment">{comment.comment.content}</div>
                      </div>
                      {comment.isMe ? (
                        <Mutation<getDelComm, postDelComm>
                          mutation={DEL_COMMENT}
                          variables={{
                            commentId: comment.comment.id,
                          }}
                          refetchQueries={[
                            {
                              query: GET_CONTENT,
                              variables: {
                                id: this.props.boards.id,
                                boardName: 'album',
                              },
                            },
                          ]}
                        >
                          {delComment => (
                            <Button
                              onClick={e => {
                                this.deleteComment(e, delComment);
                              }}
                            >
                              Del
                            </Button>
                          )}
                        </Mutation>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
