import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import {
  GET_CONTENT,
  ADD_COMMENT,
  DEL_COMMENT,
  LIKE,
} from './Query/QuariesAlbum';
import { Input, Button, Icon } from 'antd';
import { Query, Mutation } from 'react-apollo';
import { Loading, Err } from '../../Shared/loading';
import './Album.css';
// import AddComment from './AddComment';

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
  getLikes: {
    isLike: boolean;
    likesCount: number;
    err: string;
  };
}

interface getLike {
  success: boolean;
  err: string;
  isLogin: boolean;
}

interface postLike {
  board: number;
  boardName: string;
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
    like: false,
  };

  switchLike = async (e: any, mufu: any) => {
    let result: any = await mufu();

    console.log('click Like result :', result);
    // if (result)
    this.setState({
      like: this.state.like ? false : true,
    });
    console.log('clicked Like');
  };

  updateComment = async (e: any, mufn: any) => {
    let result: any = await mufn();

    this.setState({
      toggle: this.state.toggle ? false : true,
    });
    console.log('create Comment :', this.state.toggle, result);
    // if (result.data.createComment.success) {
    //   return alert('Comment is Applied');
    // }
    // return alert(result.data.changePassWord.err);
  };

  deleteComment = async (e: any, mufn: any) => {
    let result: any = await mufn();

    this.setState({
      toggle: this.state.toggle ? false : true,
    });
    console.log('delete Comment :', this.state.toggle, result);
    // if (result.data.createComment.success) {
    //   return alert('Comment is Applied');
    // }
    // return alert(result.data.changePassWord.err);
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
      >
        {({ loading, error, data }: any) => {
          if (loading) return <Loading />;
          if (error) return <Err />;
          //   console.log('each data :', data);
          console.log('this.props *********', this.props);
          //   const likeState: any = data.getLikes.
          const comments: any = data.getComments.comments;
          console.log('received comments :', comments);

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
                  <Mutation<getLike, postLike>
                    mutation={LIKE}
                    variables={{
                      board: this.props.boards.id,
                      boardName: this.props.boards.boardName,
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
                    {toggleLike => (
                      <Button onClick={e => this.switchLike(e, toggleLike)}>
                        {this.state.like ? (
                          <Icon
                            type="heart"
                            theme="twoTone"
                            twoToneColor="#ff0000"
                          />
                        ) : (
                          <Icon type="heart" />
                        )}
                      </Button>
                    )}
                  </Mutation>
                  {data.getLikes.likesCount}
                  {console.log(
                    'where is like count ... ',
                    data.getLikes.likesCount
                  )}
                  <Mutation<getAddComm, postAddComm>
                    mutation={ADD_COMMENT}
                    // update={(cache, {data: {getAddComm}}) => {
                    //     const {todos: any} = cache.readQuery({query: GET_CONTENT})
                    //     cache.writeQuery({
                    //         query: GET_CONTENT,
                    //         data: {todos: todos.concat([getAddComm])}
                    //     })
                    // }}
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
                  {comments.map((comment: any, idx: number) => (
                    <div>
                      {console.log('comment :', comment)}
                      <img
                        className="profile"
                        src={this.props.boards.photo}
                        alt={this.props.boards.photo}
                        // src={comment.comment.creator.profileImage}
                        // alt={comment.comment.creator.profileImage}
                      />
                      <a href={`/mypage/${comment.comment.creator.id}`}>
                        {comment.comment.creator.nickName}
                      </a>
                      {comment.comment.content}
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
                            Delete
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
