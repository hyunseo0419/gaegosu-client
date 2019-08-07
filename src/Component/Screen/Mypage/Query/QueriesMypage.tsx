import gql from 'graphql-tag';

export const MY_PROFILE = gql`
  query getMyProfile($id: Int!) {
    getUser(id: $id) {
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
