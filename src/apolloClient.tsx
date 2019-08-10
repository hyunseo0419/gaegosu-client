import ApolloClient from 'apollo-boost';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { withClientState } from 'apollo-link-state';

// import { resolvers, defaults } from './resolvers';
//import { setContext } from 'apollo-link-context';

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       'x-jwt': token ? `Bearer ${token}` : '',
//     },
//   };
// });

// const cache = new InMemoryCache();
// const stateLink = withClientState({ cache, resolvers, defaults });

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  // cache,

  request: async operation => {
    console.log('is it run?!?!??!?!?');
    const token: any = await localStorage.getItem('token');
    console.log('!!!', token, '!!!');

    operation.setContext({
      headers: {
        'x-jwt': token ? token : null,
      },
    });
  },
});

export default client;
