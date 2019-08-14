import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Select } from 'antd';
import { FIRST_ALBUM, SEARCH_ALBUM } from './Query/QuariesAlbum';
import { Query, Mutation } from 'react-apollo';
import { Loading, Err } from '../../Shared/loading';
import SingleIMG from './SingleIMG';
import './Album.css';

const { Option } = Select;

interface Data {
  getFirstAlbum: {
    success: boolean;
    boards: {
      id: number;
      title: string;
      content: string;
      photo: string;
      creator: {
        id: number;
        nickName: string;
      };
      boardName: string;
      createdAt: string;
      updatedAt: string;
    };
    err: string;
  };
}

interface getSearch {
  success: boolean;
  boards: {
    id: number;
    title: string;
    content: string;
    photo: string;
    creator: {
      id: number;
      nickName: string;
    };
    boardName: string;
    createdAt: string;
    updatedAt: string;
  };
  err: string;
}

interface postSearch {
  category: string;
  searchWord: string;
  lastId: number;
  boardName: string;
}

interface Variables {
  boardName: string;
}
export default class Album extends Component {
  state = {
    category: '제목',
    searchWord: '',
    lastId: 0,
    boardName: 'album',
    search: false,
    data: '',
  };

  selectCategory = (val: any) => {
    this.setState({
      searchWord: val,
    });
  };

  updateSearch = async (e: any, mufn: any) => {
    this.setState({
      lastId: 0,
    });
    let result: any = await mufn();

    if (
      result.data.searchAlbum.success === true &&
      result.data.searchAlbum.boards.length !== 0
    ) {
      this.setState({
        search: true,
        data: result.data.searchAlbum.boards,
        lastId:
          result.data.searchAlbum.boards[
            result.data.searchAlbum.boards.length - 1
          ].id,
      });
    } else {
      this.setState({
        search: true,
        data: result.data.searchAlbum.boards,
        lastId: 0,
      });
    }
  };

  handleSearch = (e: any) => {
    this.setState({
      searchWord: e.target.value,
    });
  };

  plusSearchData = async (e: any, searchAlbum: any) => {
    const resSearchAlbum = await searchAlbum();

    let newData = Array.from(this.state.data);
    console.log('newData--->', newData);
    if (resSearchAlbum.data.searchAlbum.boards.length !== 0) {
      newData = newData.concat(resSearchAlbum.data.searchAlbum.boards);
      this.setState({
        data: newData,
        lastId:
          resSearchAlbum.data.searchAlbum.boards[
            resSearchAlbum.data.searchAlbum.boards.length - 1
          ].id,
      });
    }
  };

  render() {
    return (
      <Query<Data, Variables>
        query={FIRST_ALBUM}
        variables={{ boardName: 'album' }}
      >
        {({ loading, error, data }: any) => {
          if (loading) return <Loading />;
          if (error) return <Err />;

          if (this.state.lastId === 0 && this.state.search === false && data.getFirstAlbum.boards.length !== 0) {
            this.setState({
              lastId:
                data.getFirstAlbum.boards[data.getFirstAlbum.boards.length - 1]
                  .id,
              data: data.getFirstAlbum.boards,
            });
          }
          const rows = chunk(this.state.data, 3);

          return (
            <div>
              <span style={{ marginBottom: 16 }}>
                <Mutation<getSearch, postSearch>
                  mutation={SEARCH_ALBUM}
                  variables={{
                    category: this.state.category,
                    searchWord: this.state.searchWord,
                    lastId: 0,
                    boardName: this.state.boardName,
                  }}
                >
                  {addSearch => (
                    <span>
                      <Select
                        defaultValue="제목"
                        onSelect={(value: string) => {
                          this.setState({ category: value });
                        }}
                      >
                        <Option value="작성자">작성자</Option>
                        <Option value="제목">제목</Option>
                      </Select>
                      <Input
                        style={{ width: '40%', marginBottom: '10px' }}
                        placeholder="search"
                        onPressEnter={e => {
                          this.updateSearch(e, addSearch);
                        }}
                        onChange={this.handleSearch}
                      />
                    </span>
                  )}
                </Mutation>
                {localStorage.getItem('token') === null ? (
                  <Button
                    style={{ float: 'right' }}
                    onClick={() => alert('please login')}
                  >
                    New
                  </Button>
                ) : (
                  <Link to="/new">
                    <Button style={{ float: 'right' }}>New</Button>
                  </Link>
                )}
              </span>

              {rows.map((row: any, idx: number) => (
                <div style={{ clear: 'both' }} key={idx}>
                  {row.map((col: any, idx: number) => (
                    <SingleIMG idx={idx} col={col} key={idx} />
                  ))}
                </div>
              ))}

              <Mutation<getSearch, postSearch>
                mutation={SEARCH_ALBUM}
                variables={{
                  category: this.state.category,
                  searchWord: this.state.searchWord,
                  lastId: this.state.lastId,
                  boardName: this.state.boardName,
                }}
              >
                {searchAlbum => (
                  <div
                    style={{
                      clear: 'both',
                      textAlign: 'center',
                      marginTop: 20,
                      height: 32,
                      lineHeight: '32px',
                    }}
                  >
                    <Button
                      icon="download"
                      onClick={e => {
                        this.plusSearchData(e, searchAlbum);
                      }}
                    >
                      loading more
                    </Button>
                  </div>
                )}
              </Mutation>
            </div>
          );
        }}
      </Query>
    );
  }
}

function chunk(arr: any, size: number) {
  var result = [];
  for (var i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, size + i));
  }

  return result;
}
