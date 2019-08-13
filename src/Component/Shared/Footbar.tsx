import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

const { Footer } = Layout;

class Footbar extends Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center', bottom: 0 }}>
        corp. Gaegosoo ©2019 Created by Gaegosaeng
      </Footer>
    );
  }
}

export default Footbar;
