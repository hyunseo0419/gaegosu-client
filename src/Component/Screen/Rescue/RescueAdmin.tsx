import React, { Component } from 'react';
import { Table } from 'antd';
//import { Query } from 'react-apollo';
//import { Loading, Err } from '../../Shared/loading';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Detail',
    dataIndex: 'detail',
  },
  {
    title: 'Location',
    dataIndex: 'location',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    detail: '개,다리다침,주차장',
    location: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    detail: '호랑이,눈에 흉터,놀이터',
    location: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    detail: '고양이,난폭함,위워크',
    location: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    detail: '코끼리,날뜀,어린이대공원',
    location: 'Sidney No. 1 Lake Park',
  },
];

// rowSelection object indicates the need for row selection

export default class RescueAdmin extends Component {
  render() {
    return (
      <div>
        <Table columns={columns} dataSource={data} />,
      </div>
    );
  }
}
