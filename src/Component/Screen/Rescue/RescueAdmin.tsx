import React, { Component } from 'react';
import { GET_SOS, SOSData } from './Query/QuRescue';
import { Button } from 'antd';

import { Query } from 'react-apollo';
import { Loading, Err } from '../../Shared/loading';

//declare var kakao: any;

export default class RescueAdmin extends Component {
  render() {
    return (
      <Query<SOSData> query={GET_SOS}>
        {({ loading, error, data }: any) => {
          if (loading) return <Loading />;
          if (error) return <Err />;
          console.log('data--->', data);
          return <div></div>;
        }}
      </Query>
    );
  }
}
