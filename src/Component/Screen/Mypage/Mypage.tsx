import React from 'react';
import Headbar from '../Share/Headbar';
import Footbar from '../Share/Footbar';
import { Layout } from 'antd';
import { MY_PROFILE } from './queries';
import { Query } from 'react-apollo';
import { Loading, Err } from '../Share/loading';
import { ApolloError } from 'apollo-client';

interface Data {
  getMe: {
    user: {
      nickName: string;
      profile: string;
      email: string;
      provider: string;
      pets: {
        name: string;
        animal: string;
        breeds: string;
        profileImage: string;
      };
    };
  };
}

interface res {
  loading: boolean;
  error: ApolloError;
  data: Data;
}

// interface IPet {
//   name: string;
//   animal: string;
//   breeds: string;
//   profileImage: string;
// }

// interface IInfo{
//   nickName: string;
//   profile: string;
//   email: string;
//   provider: string;
//   pets: IPet[]
// }

// interface IUser{
//   user: IInfo
// }

// interface IGetMe{
//   getMe: IUser
// }

// interface IRes {
//   loading: boolean;
//   error: ApolloError;
//   data: IGetMe;
// }

interface Variables {
  id: number;
  nickName: string;
}

const { Content } = Layout;

const fakeData = {
  fakeName: '현서',
  fakeimg:
    'http://img.etoday.co.kr/pto_db/2018/10/600/20181026091134_1263675_664_906.jpg',
  fakeMail: 'wewe@naver.com',
  fakeProv: 'local',
  fakePet: {
    name: 'gucci',
    animal: 'cat',
    breeds: '샴',
    profileImage:
      'https://previews.123rf.com/images/da161/da1611612/da161161200003/69890854-%EC%A7%91%EC%97%90%EC%84%9C-%EC%86%8C%ED%8C%8C%EC%97%90-%EC%83%B4-%EA%B3%A0%EC%96%91%EC%9D%B4%EC%9D%98-%EC%B4%88%EC%83%81%ED%99%94-.jpg',
  },
};
//let token;

export const Mypage = () => (
  <Query<Data, Variables>
    query={MY_PROFILE}
    variables={{ id: 15, nickName: 'hshs' }}
  >
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <Err />;

      console.log(data);
      return (
        <Layout>
          <Headbar />
          <Layout>
            <Content style={{ padding: '0 50px', marginTop: 64 }}></Content>
          </Layout>
          <Footbar />
        </Layout>
      );
    }}
  </Query>
);
