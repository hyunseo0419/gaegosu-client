import gql from 'graphql-tag';

export const MU_EMAILAUTH = gql`
  mutation muemailauth($email: String!, $randomWord: String!) {
    emailAuth(address: $email, randomWord: $randomWord)
  }
`;

export interface Muemailauth {
  email: string;
  randomWord: string;
}
