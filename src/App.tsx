import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './apolloClient';
import CommmonSignup from './Component/Screen/Signup/Common-Signup';
import Main from './Component/Screen/Main/Main';
import Signin from './Component/Screen/Signin/Signin';
import Mypage from './Component/Screen/Mypage/Mypage';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <React.Fragment>
            <Route exact={true} path={'/'} component={Main} />
            <Route path={'/signup'} component={CommmonSignup} />
            <Route path={'/login'} component={Signin} />
            <Route path={'/mypage'} component={Mypage} />
          </React.Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
