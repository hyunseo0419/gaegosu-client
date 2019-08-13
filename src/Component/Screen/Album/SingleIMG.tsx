import React, { Component } from 'react';
import SingleContent from './SingleContent';
import './Album.css';
import { Modal } from 'antd';

interface Props {
  idx: any;
  col: any;
}

interface State {}

export default class SingleIMG extends Component<Props, State> {
  state = {
    modal2_vis: false,
  };

  handleCancel2 = () => {
    console.log('close a image');
    this.setState({
      modal2_vis: false,
    });
  };

  ClickPhoto = (data: any) => {
    console.log('open a image');

    this.setState({
      modal2_vis: true,
    });
  };

  render() {
    const { modal2_vis } = this.state;
    return (
      <div className="thumb-wrapper" key={this.props.idx * -1}>
        <img
          className="thumb"
          key={this.props.idx * -1}
          src={this.props.col.photo}
          alt={this.props.col}
          onClick={() => this.ClickPhoto(this.props.col)}
        />
        <Modal
          title={this.props.col.title}
          visible={modal2_vis}
          onCancel={this.handleCancel2}
          centered
          footer={[]}
          width={750}
          bodyStyle={{ height: 400 }}
        >
          <SingleContent boards={this.props.col} />
        </Modal>
      </div>
    );
  }
}
