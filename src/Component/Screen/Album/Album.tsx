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
    console.log('category :', this.state.category);
    console.log(result);

    if (result.data.searchAlbum.success === true) {
      this.setState({
        search: true,
        data: result.data.searchAlbum.boards,
      });
    }
  };

  handleSearch = async (e: any) => {
    await this.setState({
      searchWord: e.target.value,
    });
    console.log("!!'", this.state.searchWord);
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
          console.log(data.getFirstAlbum.boards);

          const rows: any =
            this.state.search === true
              ? chunk(this.state.data, 3)
              : chunk(data.getFirstAlbum.boards, 3);
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
                    lastId: this.state.lastId,
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
              {rows.map((row: any, idx: number) => (
                <div className="row" key={idx}>
                  {row.map((col: any, idx: number) => (
                    <SingleIMG idx={idx} col={col} />
                  ))}
                </div>
              ))}
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
