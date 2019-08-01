import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './apolloClient';
import CommmonSignup from './Component/Screen/Signup/Common-Signup';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <React.Fragment>
            <Route exact={true} path={'/'} component={CommmonSignup} />
            {/* <Route exact={true} path={"/"} component={Home} />
            <Route path={"/details/:movieId"} component={Detail} /> */}
          </React.Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
