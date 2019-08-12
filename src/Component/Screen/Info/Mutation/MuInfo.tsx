import gql from 'graphql-tag';

export const MU_CRETECOMMENT = gql`
  mutation mucreatecomment(
    $boardId: Int!
    $boardName: String!
    $content: String
  ) {
    createComment(boardId: $boardId, boardName: $boardName, content: $content) {
      success
      err
      isLogin
    }
  }
`;

export interface CreateCommentData {
  success: boolean;
  err: string;
  isLogin: boolean;
}

export interface CreateVariables {
  boardId: number;
  boardName: string;
  content: string;
}

export const MU_GIVERATE = gql`
  mutation mugiverate($hospitalId: Int!, $rate: Int!) {
    giveRate(hospitalId: $hospitalId, rate: $rate) {
      success
      err
      isLogin
    }
  }
`;

export interface GiveRateData {
  success: boolean;
  err: string;
  isLogin: boolean;
}

export interface GiveRateVariables {
  hospitalId: number;
  rate: number;
}

export const MU_DELETECOMMENT = gql`
  mutation mucreatecomment($id: Int!) {
    deleteComment(id: $id) {
      success
      err
      isLogin
    }
  }
`;

export interface DeleteCommentData {
  success: boolean;
  err: string;
  isLogin: boolean;
}

export interface DelteteCommentVariables {
  id: string;
}
