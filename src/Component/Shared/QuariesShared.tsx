import gql from 'graphql-tag';

export const GET_ME = gql`
  query {
    getMe {
      isMe
      user {
        id
        nickName
      }
      err
    }
  }
`;
