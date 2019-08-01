import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './apolloClient';
import Main from './Component/Screen/Main/Main';
import Login from './Component/Screen/Login/Login';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <React.Fragment>
            <Route exact={true} path={'/'} component={Main} />
            <Route exact={true} path={'/login'} component={Login} />
            {/* <Route path={'/details/:movieId'} component={Detail} /> */}
          </React.Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
