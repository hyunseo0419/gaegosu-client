import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Comment, Tooltip, List, Input, Button, Modal } from 'antd';
import moment from 'moment';
import {
  MU_CRETECOMMENT,
  CreateCommentData,
  CreateVariables,
} from './Mutation/MuInfo';
import { Mutation } from 'react-apollo';
import InfoDetail from './InfoDetail';

const { TextArea } = Input;

const data = [
  {
    author: '로만',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: <p>여기 완전짱이예요</p>,
    datetime: (
      <Tooltip
        title={moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>
          {moment()
            .subtract(1, 'days')
            .fromNow()}
        </span>
      </Tooltip>
    ),
  },
  {
    author: '만수르',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: <p>원장님이 진짜 친절해요</p>,
    datetime: (
      <Tooltip
        title={moment()
          .subtract(2, 'days')
          .format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>
          {moment()
            .subtract(2, 'days')
            .fromNow()}
        </span>
      </Tooltip>
    ),
  },
];

let reply = '';

interface InfoCommentProps {
  onRerender: any;
}
interface InfoCommentState {
  writeReply: any;
  create: any;
}

export default class InfoComment extends Component<
  InfoCommentProps,
  InfoCommentState
> {
  constructor(props: any) {
    super(props);
    console.log('commeent---->', this.props);
    this.state = {
      writeReply: undefined,
      create: false, //뮤테이션 함수에 같이 넣어서 쿼리 재렌더링 없애야함
    };
  }

  replydelete = (e: any) => {
    //id를 비교 후 삭제
    //console.log('reply onclick e---->', e);
  };
  replyWrite = (e: any) => {
    console.log('e--->', e.target.value);
    // this.setState({
    //   wirteReply: e.target.value,
    // });
    reply = e.target.value;
    console.log('reply-->', reply);
    this.setState({
      writeReply: reply,
    });
  };

  errorLogin = () => {
    Modal.error({
      title: '댓글작성은 로그인을 해야 합니다!!!',
      content: '로그인 후 이용 해주세요',
    });
  };

  replySend = async (e: any, createComment: any) => {
    const resReplyData = await createComment();
    if (resReplyData.data.createComment.isLogin === false) {
      return this.errorLogin();
    } else {
      this.props.onRerender();
    }
  };

  render() {
    //console.log('commentState----->', this.state);
    return (
      <>
        <div>
          <List
            className="comment-list"
            header={`${data.length} replies`}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <li>
                <Comment
                  author={item.author}
                  avatar={item.avatar}
                  content={item.content}
                  datetime={item.datetime}
                />
                <Button
                  style={{}}
                  onClick={(e: any) => {
                    this.replydelete(e);
                  }}
                >
                  delete
                </Button>
              </li>
            )}
          />
        </div>
        <div>
          <TextArea
            rows={4}
            onChange={e => {
              this.replyWrite(e);
            }}
          />
          <Mutation<CreateCommentData, CreateVariables>
            mutation={MU_CRETECOMMENT}
            variables={{ boardId: 1, boardName: 'info', content: '짱좋아요' }}
          >
            {createComment => (
              <Button
                onClick={e => {
                  this.replySend(e, createComment);
                }}
              >
                입력
              </Button>
            )}
          </Mutation>
        </div>
      </>
    );
  }
}
