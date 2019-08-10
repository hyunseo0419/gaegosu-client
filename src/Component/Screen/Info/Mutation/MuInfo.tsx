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
