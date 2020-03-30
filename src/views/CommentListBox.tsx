import React from 'react';

import { CommentType } from '../modules/comment';

import CommentInput from './CommentInput';
import Comment from './Comment';

interface CommentListBoxProps {
  commentList?: CommentType[];
  likeComments?: number[];
  isLogin: boolean;
  eventId: number | undefined;
  userId?: number | null;
  userThumbsList: any[];
  CommentActions: any;
}

const CommentListBox: React.FunctionComponent<CommentListBoxProps> = ({
  commentList,
  isLogin,
  userId,
  eventId,
  userThumbsList,
  CommentActions,
}: CommentListBoxProps) => {
  return (
    <div>
      <div style={{ height: '10px' }}></div>
      <CommentInput isLogin={isLogin} CommentActions={CommentActions} eventId={eventId} />
      <div>
        {commentList
          ? commentList.map(comment => {
              if (comment.userId === userId) {
                if (userThumbsList.indexOf(comment.id) !== -1) {
                  return (
                    <Comment
                      CommentActions={CommentActions}
                      isMine={true}
                      comment={comment}
                      eventId={eventId}
                      isLogin={isLogin}
                      isLiked={true}
                    ></Comment>
                  );
                } else {
                  return (
                    <Comment
                      CommentActions={CommentActions}
                      isMine={true}
                      eventId={eventId}
                      comment={comment}
                      isLogin={isLogin}
                      isLiked={false}
                    ></Comment>
                  );
                }
              } else {
                if (userThumbsList.indexOf(comment.id) !== -1) {
                  return (
                    <Comment
                      CommentActions={CommentActions}
                      comment={comment}
                      isLogin={isLogin}
                      isLiked={true}
                    ></Comment>
                  );
                } else {
                  return (
                    <Comment
                      CommentActions={CommentActions}
                      comment={comment}
                      isLogin={isLogin}
                      isLiked={false}
                    ></Comment>
                  );
                }
              }
            })
          : null}
        {/* <Comment isMine={true} isLogin={isLogin}></Comment>
        <Comment isLogin={isLogin}></Comment>
        <Comment isMine={true} isLogin={isLogin}></Comment> */}
      </div>
    </div>
  );
};

export default CommentListBox;
