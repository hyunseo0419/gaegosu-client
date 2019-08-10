import gql from 'graphql-tag';

export const LOGIN_BUTTON = gql`
  mutation clickLoginBtn($email: String!, $password: String!) {
    localLogin(email: $email, password: $password) {
      isLogin
      user {
        id
        nickName
        email
      }
      err
      token
    }
  }
`;
