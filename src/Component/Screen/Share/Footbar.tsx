import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

const { Footer } = Layout;

class Footbar extends Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        corp. Gaego ©2019 Created by Gaegosoo
      </Footer>
    );
  }
}

export default Footbar;
