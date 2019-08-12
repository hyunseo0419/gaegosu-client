import gql from 'graphql-tag';

export const GET_SOS = gql`
  query getRescueList {
    getRescueList {
      success
      rescueList {
        id
        locationX
        locationY
        content
        creator {
          nickName
        }
        status
        photo
        createdAt
      }
    }
  }
`;

export interface SOSData {
  getRescueListResult: {
    success: boolean;
    rescueList: {
      id: number;
      locationX: number;
      locationY: number;
      content: string;
      creator: {
        nickName: string;
      };
      status: boolean;
      photo: string;
      createdAt: string;
    };
  };
}
