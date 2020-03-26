import React from 'react';

import Divider from '@material-ui/core/Divider';

interface CommentProps {
  comment?: object;
}

const Comment: React.FunctionComponent<CommentProps> = ({}: CommentProps) => {
  return (
    <div
      style={{
        width: '40%',
        marginLeft: '30%',
        marginTop: '20px',
      }}
    >
      <div>작성자 / 작성시간</div>
      <div>작성내용</div>
      <div>좋아요</div>

      <Divider />
    </div>
  );
};

export default Comment;
