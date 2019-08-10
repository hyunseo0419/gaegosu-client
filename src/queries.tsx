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
