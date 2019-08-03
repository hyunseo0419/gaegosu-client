import gql from 'graphql-tag';

export const MU_EMAILSEND = gql`
  mutation muemailsend($email: String!) {
    emailSend(address: $email)
  }
`;

export interface MuemailVariables {
  email: string;
}

// export const MU_EMAILAUTH = gql`
//   mutation muemailauth($email: String!) {
//     emailAuth()
//   }
// `;
