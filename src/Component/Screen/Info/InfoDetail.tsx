import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, List, Icon, Avatar, Button, Rate } from 'antd';
import './InfoDetail.css';
import InfoComment from './InfoComment';
//import { Link } from 'react-router-dom';
//import { RouteComponentProps } from 'react-router';

interface InfoDetailProps {
  item: any;
  back: any;
}
interface InfoDetailState {
  value: any;
}

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const { Search } = Input;

export default class InfoDetail extends Component<
  InfoDetailProps,
  InfoDetailState
> {
  constructor(props: any) {
    super(props);
    console.log('----->', this.props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (value: any) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    console.log('this.state', this.state);
    return (
      <>
        <div>
          <div className="titlearea">
            <h3>{this.props.item.title}</h3>
          </div>
          <div>
            <div className="maparea"></div>
            <ul>
              <li>주소 {this.props.item.roadAddress}</li>
              <li>연락처 {this.props.item.phone}</li>
            </ul>
          </div>
          <div className="divarea">
            <h3>동물병원 별점이예요!!</h3>
            <div className="stararea">
              <div>
                <Rate disabled defaultValue={2} />
              </div>
              <div>
                <span>
                  <p>동물병원의 별점을 선택해주세요~~</p>
                  <Rate
                    tooltips={desc}
                    onChange={this.handleChange}
                    value={value}
                  />
                  {value ? (
                    <span className="ant-rate-text">{desc[value - 1]}</span>
                  ) : (
                    ''
                  )}
                </span>
              </div>
            </div>
            <div className="divarea">
              <h3>후기를 남겨주세요!!</h3>
              <div>
                <InfoComment />
              </div>
            </div>
          </div>
          <div className="divarea">
            <Button onClick={(e: any) => this.props.back(e)}>
              <Icon type="left" />
              Go back
            </Button>
          </div>
        </div>
      </>
    );
  }
}
