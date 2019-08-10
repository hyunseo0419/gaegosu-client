import gql from 'graphql-tag';

export const FIRST_ALBUM = gql`
  query getFirstAlbum($boardName: String!) {
    getFirstAlbum(boardName: $boardName) {
      success
      boards {
        id
        title
        content
        photo
        creator {
          id
          nickName
        }
        boardName
        createdAt
        updatedAt
      }
      err
    }
  }
`;

export const NEW_BOARD = gql`
  mutation createAlbum(
    $title: String!
    $content: String!
    $boardName: String!
    $photo: String!
  ) {
    createAlbum(
      title: $title
      content: $content
      boardName: $boardName
      photo: $photo
    ) {
      success
      board {
        id
        title
        content
        photo
        creator {
          id
          nickName
        }
        boardName
        createdAt
        updatedAt
      }
      err
      isLogin
    }
  }
`;

export const GET_CONTENT = gql`
  query getContent($id: Int!, $boardName: String!) {
    getAlbumContent(id: $id) {
      success
      err
      isMe
      isLogin
    }
    getComments(id: $id, boardName: $boardName) {
      success
      err
      comments {
        isMe
        comment {
          id
          creator {
            id
            nickName
            profileImage
          }
          content
          createdAt
        }
      }
    }
    getLikes(board: $id, boardName: $boardName) {
      isLike
      likesCount
      err
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($boardId: Int!, $boardName: String!, $content: String!) {
    createComment(boardId: $boardId, boardName: $boardName, content: $content) {
      success
      err
      isLogin
    }
  }
`;

export const DEL_COMMENT = gql`
  mutation delComment($commentId: Int!) {
    deleteComment(id: $commentId) {
      success
      err
      isLogin
    }
  }
`;

export const LIKE = gql`
  mutation toggleLike($board: Int!, $boardName: String!) {
    toggleLike(board: $board, boardName: $boardName) {
      success
      err
      isLogin
    }
  }
`;
