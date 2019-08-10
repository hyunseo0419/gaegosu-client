import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Rate } from 'antd';
import './InfoDetail.css';
import { QU_STARPOINT, InfoStarData, InfoStarVariables } from './Query/QuInfo';
import { Loading, Err } from '../../Shared/loading';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

interface InfostarpointProps {}

interface InfostarpointState {
  value: any;
}

export default class Infostarpoint extends Component<
  InfostarpointProps,
  InfostarpointState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (value: any) => {
    this.setState({ value });
  };

  render() {
    console.log('infostarpoint렌더링');
    const { value } = this.state;

    return (
      <Query<InfoStarData, InfoStarVariables>
        query={QU_STARPOINT}
        variables={{ id: 1 }}
      >
        {({ loading, error, data }: any) => {
          if (loading) return <Loading />;
          if (error) return <Err />;
          return (
            <div className="stararea">
              {' '}
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
          );
        }}
      </Query>
    );
  }
}
