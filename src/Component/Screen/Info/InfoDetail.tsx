import React, { Component } from 'react';

interface InfoDetailProps {
  item: any;
}

interface InfoDetailState {}

export default class InfoDetail extends Component<
  InfoDetailProps,
  InfoDetailState
> {
  constructor(props: any) {
    super(props);
    console.log('----->', this.props);
  }

  render() {
    return <div>사진자리</div>;
  }
}
