import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { Pagination } from 'antd';
import { Modal, Button } from 'antd'; // Input, Select, Dropdown, Menu
// import { fakedata } from './fakedata';
import { FIRST_ALBUM } from './Query/QuariesAlbum';
import { Query } from 'react-apollo';
import { Loading, Err } from '../../Shared/loading';
import SingleIMG from './SingleIMG';
import './Album.css';

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
    modal1_vis: false,
    confirmLoading: false,
  };

  showModal1 = () => {
    console.log('open search modal');
    this.setState({
      modal1_vis: true,
    });
  };

  handleOk1 = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        modal1_vis: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel1 = () => {
    console.log('close search modal');
    this.setState({
      modal1_vis: false,
    });
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

          const rows: any = chunk(data.getFirstAlbum.boards, 3);
          const { modal1_vis, confirmLoading } = this.state;

          return (
            <div>
              <div style={{ marginBottom: 16 }}>
                <Button type="primary" icon="search" onClick={this.showModal1}>
                  Search
                </Button>
                <Modal
                  title="Search"
                  visible={modal1_vis}
                  onOk={this.handleOk1}
                  confirmLoading={confirmLoading}
                  onCancel={this.handleCancel1}
                  centered
                >
                  {/* <Form> */}
                  <div>
                    <p>
                      need to set dropwon and textbox for search
                      {/* <Dropdown overlay={menu} trigger={['click']}>
                  검색 범위
                </Dropdown> */}
                      {/* <Search
                // addonBefore={selectBefore}
                placeholder="input search text"
                onSearch={value => console.log(value)}
                enterButton
                style={{ width: 300 }}
              /> */}
                    </p>
                  </div>
                  {/* </Form> */}
                </Modal>
                <Link to="/new">
                  <Button style={{ float: 'right' }}>New</Button>
                </Link>
              </div>
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
