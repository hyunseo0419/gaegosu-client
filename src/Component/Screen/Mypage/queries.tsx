import gql from 'graphql-tag';

export const MY_PROFILE = gql`
  query getMyProfile($id: Int!, $nickName: String!) {
    getMe(id: $id, nickName: $nickName) {
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

// nickName: '현서짱',
//   profile:
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScUlC45GdFqi2mbeBLX0dPKmGcWB80o5iHP7QHjPoJb1DF7KPW',
//   email: 'qwe@naver.com',
//   password: '1234',
//   provider: 'local',
//   pets: {
//     petName: '구찌',
//     type: '고양이',
//     greed: '샴',
//     petImg:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2gizBgx_QGM21pKJd5c9E_9jeNeGsn5yZkWK9VjrQVYVYVY2rrg',
//   },
