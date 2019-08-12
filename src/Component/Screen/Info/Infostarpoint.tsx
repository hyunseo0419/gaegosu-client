import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Rate, Button } from 'antd';
import './InfoDetail.css';
import { QU_STARPOINT, InfoStarData, InfoStarVariables } from './Query/QuInfo';
import {
  MU_GIVERATE,
  GiveRateData,
  GiveRateVariables,
} from './Mutation/MuInfo';
import { Loading, Err } from '../../Shared/loading';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

interface InfostarpointProps {
  hospitalid: number;
}

interface InfostarpointState {
  value: any;
  meValue: any;
}

export default class Infostarpoint extends Component<
  InfostarpointProps,
  InfostarpointState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: 0,
      meValue: 0,
    };
  }

  handleChange = (value: any) => {
    this.setState({ value });
  };
  givestarpoint = async (e: any, giveRate: any) => {
    const resStarData = await giveRate();
    //console.log('resStarData---', resStarData);
    if (resStarData.data.giveRate.isLogin === false) {
      alert('로그아웃 후 재로그인');
    }
  };

  render() {
    //console.log('starthis.props', this.props);
    //console.log('starthis.state', this.state);
    const { value } = this.state;
    const { hospitalid } = this.props;

    return (
      <Query<InfoStarData, InfoStarVariables>
        query={QU_STARPOINT}
        variables={{ id: hospitalid }}
      >
        {({ loading, error, data }: any) => {
          if (loading) return <Loading />;
          if (error) return <Err />;

          if (this.state.meValue !== data.getRate.meRate) {
            this.setState({
              value: data.getRate.meRate,
              meValue: data.getRate.meRate,
            });
          }

          return (
            <div className="stararea">
              <div className="average">
                <Rate disabled value={data.getRate.rate} />
              </div>
              {data.getRate.isLogin === false ? (
                <div></div>
              ) : (
                <div>
                  <span>
                    <Rate
                      tooltips={desc}
                      onChange={this.handleChange}
                      value={value}
                    />
                    {value ? <span className="ant-rate-text"></span> : ''}
                    <Mutation<GiveRateData, GiveRateVariables>
                      mutation={MU_GIVERATE}
                      variables={{
                        hospitalId: hospitalid,
                        rate: value,
                      }}
                      refetchQueries={[
                        {
                          query: QU_STARPOINT,
                          variables: {
                            id: hospitalid,
                          },
                        },
                      ]}
                    >
                      {giveRate => (
                        <Button
                          onClick={e => {
                            this.givestarpoint(e, giveRate);
                          }}
                        >
                          입력
                        </Button>
                      )}
                    </Mutation>
                  </span>
                  <p>동물병원을 평가해주세요!!</p>
                </div>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}
