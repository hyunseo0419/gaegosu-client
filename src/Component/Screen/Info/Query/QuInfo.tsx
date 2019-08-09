import gql from 'graphql-tag';

export const QU_INFODATA = gql`
  query quinfodata($locationX: Float!, $locationY: Float!) {
    getInfoList(locationX: $locationX, locationY: $locationY) {
      success
      err
      info {
        id
        title
        roadAddress
        phone
        locationX
        locationY
      }
    }
  }
`;

export interface InfoData {
  getInfoList: {
    success: boolean;
    err: string;
    info: {
      id: any;
      title: string;
      roadAddress: string;
      phone: string;
      locationX: number;
      locationY: number;
    };
  };
}

export interface InfoVariables {
  locationX: any;
  locationY: any;
}

export const QU_EACHINFODATA = gql`
  query queachinfodata($id: Int!, $boardName: String!) {
    getRate(hospital: $id) {
      success
      err
      isLogin
      meRate
      rate
    }
    getComments(id: $id, boardName: $boardName) {
      success
      err
      isLogin
      comments {
        isMe
        comment {
          id
          content
          creator {
            id
            nickName
            profileImage
          }
          createAt
        }
      }
    }
  }
`;
export interface InfoDetailData {
  getRate: {
    success: boolean;
    err: string;
    isLogin: boolean;
    meRate: number;
    rate: number;
  };
  getComments: {
    success: boolean;
    err: string;
    isLogin: boolean;
    comments: {
      isMe: boolean;
      comment: {
        id: number;
        content: string;
        creator: {
          id: number;
          nickName: string;
          profileImage: string;
        };
        createdAt: string;
      };
    };
  };
}

export interface InfoDetailVariables {}
