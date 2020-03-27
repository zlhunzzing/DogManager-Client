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
  handleChangeCommentInput(value: string): void;
  CommentActions: any;
}

const CommentListBox: React.FunctionComponent<CommentListBoxProps> = ({
  commentList,
  isLogin,
  userId,
  eventId,
  userThumbsList,
  handleChangeCommentInput,
  CommentActions,
}: CommentListBoxProps) => {
  // 코멘트 뿌릴 함수
  if (commentList !== undefined) {
    commentList.map(comment => {
      if (comment.userId === userId) {
        if (comment.id) {
          return (
            <Comment
              CommentActions={CommentActions}
              isMine={true}
              comment={comment}
              isLogin={isLogin}
            ></Comment>
          );
        } else {
          return (
            <Comment
              CommentActions={CommentActions}
              isMine={true}
              comment={comment}
              isLogin={isLogin}
            ></Comment>
          );
        }
      } else {
        return (
          <Comment
            CommentActions={CommentActions}
            comment={comment}
            isLogin={isLogin}
          ></Comment>
        );
      }
    });
  }

  return (
    <div>
      <div style={{ height: '10px' }}></div>
      <CommentInput
        isLogin={isLogin}
        handleChangeCommentInput={handleChangeCommentInput}
        CommentActions={CommentActions}
        eventId={eventId}
      />
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
                      isLogin={isLogin}
                      isLiked={true}
                    ></Comment>
                  );
                } else {
                  return (
                    <Comment
                      CommentActions={CommentActions}
                      isMine={true}
                      comment={comment}
                      isLogin={isLogin}
                      isLiked={false}
                    ></Comment>
                  );
                }
              } else {
                return (
                  <Comment
                    CommentActions={CommentActions}
                    comment={comment}
                    isLogin={isLogin}
                  ></Comment>
                );
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
