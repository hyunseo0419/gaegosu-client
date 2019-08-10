import gql from 'graphql-tag';

export const RESCUE_COM = gql`
  mutation rescueStatus($id: Int!) {
    completeRescue(id: $id) {
      success
      err
    }
  }
`;

export const POST_RESCUE = gql`
  mutation postRescue(
    $locationX: Float!
    $locationY: Float!
    $content: String!
    $photo: String!
  ) {
    createRescue(
      locationX: $locationX
      locationY: $locationY
      content: $content
      photo: $photo
    ) {
      success
      err
    }
  }
`;

export interface COMSOS {
  success: boolean;
  err: string;
}

export interface POSTSOS {
  success: boolean;
  err: string;
}

export interface POSTVALUES {
  locationX: number;
  locationY: number;
  content: string;
  photo: string;
}
