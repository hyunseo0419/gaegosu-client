import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Comment, Tooltip, List, Input, Button } from 'antd';
import moment from 'moment';

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

export default class InfoComment extends Component {
  replydelete = (e: any) => {
    //id를 비교 후 삭제
    console.log('reply onclick e---->', e);
  };

  render() {
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
          <TextArea rows={4} />
          <Button>입력</Button>
        </div>
      </>
    );
  }
}
