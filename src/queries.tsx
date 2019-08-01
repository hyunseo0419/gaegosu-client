import gql from 'graphql-tag';

export const MAIN_PAGE = gql`
  {
    movies(limit: 50, rating: 7) {
      id
      title
      rating
      medium_cover_image
    }
  }
`;

export const LOGIN_BUTTON = gql`
  query clickLoginBtn($email: String!, $password: String!) {
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
