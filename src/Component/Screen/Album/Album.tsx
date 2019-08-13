import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { Pagination } from 'antd';
import { Input, Button, Select } from 'antd'; // Input, Select, Dropdown, Menu
// import { fakedata } from './fakedata';
import { FIRST_ALBUM, SEARCH_ALBUM } from './Query/QuariesAlbum';
import { Query, Mutation } from 'react-apollo';
import { Loading, Err } from '../../Shared/loading';
import SingleIMG from './SingleIMG';
import './Album.css';

// const InputGroup = Input.Group;
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

// const { Search } = Input;
// const { Option } = Select;

// const selectBefore = (
//   <Select defaultValue="검색" style={{ width: 80 }}>
//     <Option value="제목">제목</Option>
//     <Option value="닉네임">닉네임</Option>
//     <Option value="댓글">댓글</Option>
//   </Select>
// );

// const menu = (
//   <Menu>
//     <Menu.Item key="0">
//       <a href="http://www.alipay.com/">1st menu item</a>
//     </Menu.Item>
//     <Menu.Item key="1">
//       <a href="http://www.taobao.com/">2nd menu item</a>
//     </Menu.Item>
//     <Menu.Divider />
//     <Menu.Item key="3">3rd menu item</Menu.Item>
//   </Menu>
// );
export default class Album extends Component {
  state = {
    category: '제목',
    searchWord: '',
    lastId: 0,
    boardName: 'album',
    search: false,
    data: '',
  };

  // infiniteScroll = () => {
  //   let scrollHeight = Math.max(
  //     document.documentElement.scrollHeight,
  //     document.body.scrollHeight
  //   );
  //   let scrollTop = Math.max(
  //     document.documentElement.scrollTop,
  //     document.body.scrollTop
  //   );
  //   let clientHeight = document.documentElement.clientHeight;

  //   if (scrollTop + clientHeight === scrollHeight) {
  //     this.setState({
  //       preitems: this.state.items,
  //       items: this.state.items + 9,
  //     });
  //   }
  // };

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
    // console.log('category :', this.state.category);
    // console.log(result);

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
    // console.log("!!'", this.state.searchWord);
  };

  // componentDidMount() {
  //   window.addEventListener('scroll', this.infiniteScroll, true);
  // }

  plusSearchData = async (e: any, searchAlbum: any) => {
    const resSearchAlbum = await searchAlbum();
    // console.log('---plusSearchData----', resSearchAlbum);
    // console.log('data--->', this.state.data);

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

          if (this.state.lastId === 0 && this.state.search === false) {
            this.setState({
              lastId:
                data.getFirstAlbum.boards[data.getFirstAlbum.boards.length - 1]
                  .id,
              data: data.getFirstAlbum.boards,
            });
          }
          // const rows: any =
          //   this.state.search === true
          //     ? chunk(this.state.data, 3)
          //     : chunk(data.getFirstAlbum.boards, 3);
          const rows = chunk(this.state.data, 3);
          // const { modal1_vis, confirmLoading } = this.state;

          return (
            <div>
              <span style={{ marginBottom: 16 }}>
                {/* search input */}
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
                    // <InputGroup compact>
                    <span>
                      <Select
                        defaultValue="제목"
                        onSelect={(value: string) => {
                          this.setState({ category: value });
                        }}
                      >
                        {console.log(this.state.category)}
                        <Option value="작성자">작성자</Option>
                        <Option value="제목">제목</Option>
                      </Select>
                      <Input
                        style={{ width: '40%' }}
                        placeholder="search"
                        onPressEnter={e => {
                          this.updateSearch(e, addSearch);
                        }}
                        onChange={this.handleSearch}
                      />
                    </span>
                    // </InputGroup>
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

              <div>
                {rows.map((row: any, idx: number) => (
                  <div className="row" key={idx}>
                    {row.map((col: any, idx: number) => (
                      <SingleIMG idx={idx} col={col} key={idx} />
                    ))}
                  </div>
                ))}
              </div>

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
                      textAlign: 'center',
                      marginTop: 12,
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
