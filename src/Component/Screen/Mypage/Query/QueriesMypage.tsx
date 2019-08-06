import gql from 'graphql-tag';

export const MY_PROFILE = gql`
  query getMyProfile($id: Int!, $nickName: String!) {
    getMe(id: $id, nickName: $nickName) {
      isMe
      user {
        nickName
        profileImage
        email
        provider
        pets {
          name
          animal
          breeds
          profileImage
        }
      }
    }
  }
`;
