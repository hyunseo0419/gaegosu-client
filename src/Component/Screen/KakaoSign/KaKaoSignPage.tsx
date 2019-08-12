import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal } from 'antd';

class KaKaoSignPage extends Component {
  constructor(props: any) {
    super(props);
    localStorage.setItem('token', props.match.params.token);
  }
  state = {
    go: null,
  };

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token !== null) {
      this.setState({
        go: true,
      });
    } else {
      this.setState({
        go: false,
      });
    }
  }

  failKakaoLogin() {
    alert('카카오 로그인 실패하였습니다.');
    return <Redirect to={`/login`}></Redirect>;
  }

  successKakaoLogin() {
    alert('카카오 로그인 성공하였습니다.');
    return <Redirect to={`/`} />;
  }

  render() {
    return (
      <div>
        {this.state.go === true ? (
          this.successKakaoLogin()
        ) : this.state.go !== null ? (
          this.failKakaoLogin()
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}

export default KaKaoSignPage;
