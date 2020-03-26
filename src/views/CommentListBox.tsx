import React from 'react';

import CommentInput from './CommentInput';
import Comment from './Comment';
interface CommentListBoxProps {
  commentList?: [];
  isLogin: boolean;
}

const CommentListBox: React.FunctionComponent<CommentListBoxProps> = ({
  isLogin,
}: CommentListBoxProps) => {
  return (
    <div>
      <div style={{ height: '10px' }}></div>
      <CommentInput isLogin={isLogin} />
      <div>
        <Comment></Comment>
        <Comment></Comment>
        <Comment></Comment>
      </div>
    </div>
  );
};

export default CommentListBox;
