import ApolloClient from 'apollo-boost';
const client = new ApolloClient({
  uri: 'http://15.164.212.171:4000:4000/',
  // cache,

  request: async operation => {
    //console.log('is it run?!?!??!?!?');
    const token: any = await localStorage.getItem('token');
    //console.log('!!!', token, '!!!');

    operation.setContext({
      headers: {
        'x-jwt': token ? token : null,
      },
    });
  },
});

export default client;
