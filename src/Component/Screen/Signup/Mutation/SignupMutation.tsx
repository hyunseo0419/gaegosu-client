import gql from 'graphql-tag';

export const MU_SIGNUP = gql`
  mutation musignup(
    $nickname: String!
    $email: String
    $password: String
    $profileImage: String
    $provider: String
    $admin: Boolean!
    $pets: [inputPet]
  ) {
    localsignUp(
      nickName: $nickname
      email: $email
      password: $password
      provider: $provider
      admin: $admin
      profileImage: $profileImage
      pets: $pets
    ) {
      status
      err
    }
  }
`;

export interface Data {
  status: boolean;
  err: string;
}

export interface MVariables {
  nickname: string;
  email: string;
  password: string;
  profileImage: string;
  provider: string;
  admin: boolean;
  pets?: Array<inputPet>;
}

export interface inputPet {
  name: string;
  animal: string;
  breeds: string;
  profileImage: string;
}
