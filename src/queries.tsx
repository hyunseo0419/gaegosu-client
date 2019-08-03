import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';

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

export interface IUserProps {
  id: number;
  nickName: string;
  email: string;
}

export interface ILocalLoginProps {
  isLogin: boolean;
  user: IUserProps;
  err: string;
  token: string;
}

export interface ILocalLoginBtnProps {
  data: ILocalLoginProps[];
  error?: ApolloError;
  loading: boolean;
}
