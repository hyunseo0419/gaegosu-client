import gql from 'graphql-tag';

// export const MU_CRETECOMMENT = gql`
//   mutation mucreatecomment(
//     $boardId: Int!
//     $boardName: String!
//     $content: String
//   ) {
//     createComment(boardId: $boardId, boardName: $boardName, content: $content) {
//       success
//       err
//       isLogin
//       comment {
//         id
//         creator {
//           id
//           nickName
//           profileImage
//         }
//         content
//         createdAt
//       }
//     }
//   }
// `;

// export interface CreateCommentData {
//   success: boolean;
//   err: string;
//   isLogin: boolean;
//   comment: {
//     id: number;
//     creator: {
//       id: number;
//       nickName: string;
//       profileImage: string;
//     };
//     content: string;
//     createdAt: string;
//   };
// }

// export interface CreateVariables {
//   boardId: number;
//   boardName: string;
//   content: string;
// }

// export const MU_CRETECOMMENT = gql`
//   mutation mucreatecomment(
//     $boardId: Int!
//     $boardName: String!
//     $content: String
//   ) {
//     createComment(boardId: $boardId, boardName: $boardName, content: $content) {
//       success
//       err
//       isLogin
//       comment {
//         id
//         creator {
//           id
//           nickName
//           profileImage
//         }
//         content
//         createdAt
//       }
//     }
//   }
// `;

// export interface CreateCommentData {
//   success: boolean;
//   err: string;
//   isLogin: boolean;
//   comment: {
//     id: number;
//     creator: {
//       id: number;
//       nickName: string;
//       profileImage: string;
//     };
//     content: string;
//     createdAt: string;
//   };
// }

// export interface CreateVariables {
//   boardId: number;
//   boardName: string;
//   content: string;
// }

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
