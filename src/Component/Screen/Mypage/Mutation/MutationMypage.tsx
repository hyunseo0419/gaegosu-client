import gql from 'graphql-tag';

export const CHANGE_NICKNAME = gql`
  mutation nickNameChange($newNickName: String!) {
    changeNickName(newNickName: $newNickName) {
      success
      err
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation passWordChange($password: String!) {
    changePassWord(password: $password) {
      success
      err
    }
  }
`;
