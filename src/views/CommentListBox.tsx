import React from 'react';

import { CommentType } from '../modules/comment';

import CommentInput from './CommentInput';
import Comment from './Comment';

interface CommentListBoxProps {
  commentList?: CommentType[];
  isLogin: boolean;
  userId?: number | null;
}

const CommentListBox: React.FunctionComponent<CommentListBoxProps> = ({
  commentList,
  isLogin,
  userId,
}: CommentListBoxProps) => {
  // 코멘트 뿌릴 함수
  if (commentList !== undefined) {
    commentList.map(comment => {
      if (comment.userId === userId) {
        return <Comment isMine={true} comment={comment}></Comment>;
      } else {
        return <Comment comment={comment}></Comment>;
      }
    });
  }

  return (
    <div>
      <div style={{ height: '10px' }}></div>
      <CommentInput isLogin={isLogin} />
      <div>
        <Comment isMine={true}></Comment>
        <Comment></Comment>
        <Comment isMine={true}></Comment>
      </div>
    </div>
  );
};

export default CommentListBox;
