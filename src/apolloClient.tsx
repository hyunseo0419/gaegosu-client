import ApolloClient from 'apollo-boost';
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

const client = new ApolloClient({
  uri: 'http://localhost:4000',

  request: async operation => {
    console.log('is it run?!?!??!?!?');
    const token: any = localStorage.getItem('token');
    console.log('!!!', token, '!!!');

    operation.setContext({
      headers: {
        'x-jwt': token ? token : null,
      },
    });
  },
});

export default client;
