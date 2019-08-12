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

export const USER_IMG = gql`
  mutation uploadUserIMG($profileImage: String!) {
    changeImage(profileImage: $profileImage) {
      success
      err
    }
  }
`;

export const PET_IMG = gql`
  mutation uploadUserIMG($id: Int!, $profileImage: String!) {
    changePetImage(id: $id, profileImage: $profileImage) {
      success
      err
    }
  }
`;
