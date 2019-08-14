import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { LIKE, GET_LIKE } from './Query/QuariesAlbum';
import { Button, Icon } from 'antd';
import { Loading, Err } from '../../Shared/loading';

interface Data {
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

interface Variables {
  id: number;
  boardName: string;
}

interface Props {
  boards: any;
}

interface State {}

export default class LikeBTN extends React.Component<Props, State> {
  state = {
    like: false,
    count: 0,
  };

  setLike = (like: any) => {
    console.log('after complete Query :', like);
    this.setState({
      like: like.isLike,
      count: like.likesCount,
    });
  };

  switchLike = async (e: any, mufu: any) => {
    let result: any = await mufu();

    console.log('Like result :', result);
    if (result.data.toggleLike.success === true) {
      console.log('clicked Like');
    } else {
      alert('login please');
    }
  };

  render() {
    return (
      <Query<Data, Variables>
        query={GET_LIKE}
        variables={{ id: this.props.boards.id, boardName: 'album' }}
        onCompleted={data => this.setLike(data.getLikes)}
      >
        {({ loading, error, data }: any) => {
          if (loading) return <Loading />;
          if (error) return <Err />;
          console.log('query successful :', data);

          return (
            <span>
              <Mutation<getLike, postLike>
                mutation={LIKE}
                variables={{
                  board: this.props.boards.id,
                  boardName: this.props.boards.boardName,
                }}
                refetchQueries={[
                  {
                    query: GET_LIKE,
                    variables: {
                      id: this.props.boards.id,
                      boardName: 'album',
                    },
                  },
                ]}
                awaitRefetchQueries={true}
              >
                {toggleLike => (
                  <Button onClick={e => this.switchLike(e, toggleLike)}>
                    {this.state.like ? (
                      <>
                        <Icon
                          type="heart"
                          theme="twoTone"
                          twoToneColor="#ff0000"
                        />
                        {this.state.count}
                      </>
                    ) : (
                      <>
                        <Icon type="heart" />
                        {this.state.count}
                      </>
                    )}
                  </Button>
                )}
              </Mutation>
              {console.log('like count :', data.getLikes.likesCount)}
            </span>
          );
        }}
      </Query>
    );
  }
}
