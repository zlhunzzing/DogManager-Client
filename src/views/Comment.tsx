import React from 'react';

import { CommentType } from '../modules/comment';

import Divider from '@material-ui/core/Divider';

interface CommentProps {
  comment?: CommentType;
  isMine?: boolean;
}

const Comment: React.FunctionComponent<CommentProps> = ({
  comment,
  isMine,
}: CommentProps) => {
  return (
    <div
      style={{
        width: '40%',
        marginLeft: '30%',
        marginTop: '20px',
        position: 'relative',
      }}
    >
      <div>{comment ? comment.userName : '작성자'}</div>
      <div>{comment ? comment.content : '작성내용'}</div>
      <div>{comment ? comment.createdAt : '작성시간'}</div>
      <div style={{ right: '0px', bottom: '0px', position: 'absolute' }}>
        <button>좋아요</button> {comment ? comment.thumb : 0}
      </div>
      {isMine ? (
        <div style={{ right: '0px', top: '0px', position: 'absolute' }}>
          <button>수정</button> <button>삭제</button>
        </div>
      ) : null}

      <Divider />
    </div>
  );
};

export default Comment;
