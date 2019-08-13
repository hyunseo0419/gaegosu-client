import React from 'react';
import { Link } from 'react-router-dom';
import { GET_CONTENT, ADD_COMMENT, DEL_COMMENT } from './Query/QuariesAlbum';
import { Input, Button } from 'antd';
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
  // getLikes: {
  //   isLike: boolean;
  //   likesCount: number;
  //   err: string;
  // };
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

    this.setState({
      toggle: this.state.toggle ? false : true,
    });
    console.log('create Comment :', this.state.toggle, result);
  };

  deleteComment = async (e: any, mufn: any) => {
    let result: any = await mufn();

    this.setState({
      toggle: this.state.toggle ? false : true,
    });
    console.log('delete Comment :', this.state.toggle, result);
  };

  handleComment = async (e: any) => {
    await this.setState({
      comment: e.target.value,
    });
    console.log("!!'", this.state.comment);
  };

  render() {
    console.log('Received Data', this.props.boards);
    return (
      <Query<Data, Variables>
        query={GET_CONTENT}
        variables={{ id: this.props.boards.id, boardName: 'album' }}
        // onCompleted={data => this.setLike(data.getLikes.isLike)}
      >
        {({ loading, error, data }: any) => {
          if (loading) return <Loading />;
          if (error) return <Err />;
          const comments: any = data.getComments.comments;
          // this.setState({
          //   like: data.getLikes.isLike,
          // });
          // this.state.like = data.getLikes.isLike;
          console.log('received comments :', comments);
          // console.log('Like status :', like);

          return (
            <div className="container">
              <img
                className="box-left"
                src={this.props.boards.photo}
                alt={this.props.boards.photo}
              />
              <div className="box-right">
                <div>photo title : {this.props.boards.title}</div>
                <div>content : {this.props.boards.content}</div>
                <div>
                  {/* /////////////// LIKE //////////////// */}
                  <LikeBTN boards={this.props.boards} />
                  {/* //////////////  ADD COMMENT ////////////// */}
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
                      <Input
                        placeholder="comment"
                        onPressEnter={e => {
                          this.updateComment(e, addComment);
                        }}
                        addonAfter="+"
                        onChange={this.handleComment}
                      />
                    )}
                  </Mutation>
                </div>

                <div>comment</div>
                <div>
                  {/* ////////////// SHOW COMMENT ////////////// */}
                  {comments.map((comment: any, idx: number) => (
                    <div>
                      {console.log('comment :', comment)}
                      <img
                        className="profile"
                        // src={this.props.boards.photo}
                        // alt={this.props.boards.photo}
                        src={comment.comment.creator.profileImage}
                        alt={comment.comment.creator.profileImage}
                      />
                      <Link to={`/mypage/${comment.comment.creator.id}`}>
                        {comment.comment.creator.nickName}
                      </Link>
                      {comment.comment.content}
                      {/* <Mutation<getEditComm, postEditComm>
                        mutation={EDIT_COMMENT}
                        variables={{
                          commentId: comment.comment.id,
                          comment: ''
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
                          <>
                          <Button
                            onClick={e => {
                              this.deleteComment(e, delComment);
                            }}
                          >
                            edit
                          </Button>
                          add input space
                          </>
                        )}
                      </Mutation> */}
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

// mutate({
//     mutation: ADD_COMMENT,
//     variables: {
//       ...values
//     },
//     refetchQueries: [`getContent`]
//   })
