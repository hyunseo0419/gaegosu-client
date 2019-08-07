import React, { Component } from 'react';
import './Album.css';
//import { Pagination } from 'antd';
import { Modal, Button } from 'antd'; // Input, Select, Dropdown, Menu
import { fakedata } from './fakedata';

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
    modal2_vis: false,
    confirmLoading: false,
    title: '',
    photo: '',
    comment: '',
  };

  showModal1 = () => {
    console.log('open search modal');
    this.setState({
      modal1_vis: true,
    });
  };

  showModal2 = () => {
    console.log('open a image');
    this.setState({
      modal2_vis: true,
    });
    // return this.ClickPhoto(data);
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

  handleCancel2 = () => {
    console.log('close a image');
    this.setState({
      modal2_vis: false,
    });
  };

  ClickPhoto = (data: any) => {
    // const { modal2_vis } = this.state;

    this.setState({
      modal2_vis: true,
      title: data.title,
      photo: data.photo,
      comment: data.comment,
    });

    // return (
    //   <Modal
    //     title={data.title}
    //     visible={modal2_vis}
    //     onCancel={this.handleCancel2}
    //     centered
    //     footer={[]}
    //   >
    //     <div>title : {data.title}</div>
    //     <div>
    //       photo : <img className="thumb1" src={data.photo} alt="" />
    //     </div>
    //     <div>comment : {data.comment}</div>
    //   </Modal>
    // );

    // Modal.success({
    //   title: data.title,
    //   content: (
    //     <div>
    //       <div>title : {data.title}</div>
    //       <div>
    //         photo : <img className="thumb1" src={data.photo} alt="" />
    //       </div>
    //       <div>comment : {data.comment}</div>
    //     </div>
    //   ),
    // });
  };

  render() {
    const rows: any = chunk(fakedata, 3);
    const {
      modal1_vis,
      modal2_vis,
      confirmLoading,
      title,
      photo,
      comment,
    } = this.state;
    return (
      <div className="tab">
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
          <Button style={{ float: 'right' }}>New</Button>
        </div>
        {rows.map((row: any) => (
          <div className="row">
            {row.map((col: any) => (
              <span>
                <img
                  className="thumb1"
                  src={col.photo}
                  alt={col}
                  onClick={() => this.ClickPhoto(col)}
                />
                <Modal
                  title={title}
                  visible={modal2_vis}
                  onCancel={this.handleCancel2}
                  centered
                  footer={[]}
                >
                  <div>photo title : {title}</div>
                  <div>
                    photo : <img className="thumb1" src={photo} alt={photo} />
                  </div>
                  <div>comment : {comment}</div>
                </Modal>
              </span>
            ))}
          </div>
        ))}
      </div>
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
