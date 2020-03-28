import React, { useState } from 'react';

import { CommentType } from '../modules/comment';

import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

interface CommentProps {
  comment: CommentType;
  isMine?: boolean;
  isLogin: boolean;
  isLiked?: boolean;
  CommentActions: any;
}

const Comment: React.FunctionComponent<CommentProps> = ({
  comment,
  isMine,
  isLogin,
  isLiked,
  CommentActions,
}: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [commentInput, setComment] = useState(comment.content);

  const commentTime = `${comment.createdAt.slice(0, 4)}.${comment.createdAt.slice(
    4,
    6,
  )}.${comment.createdAt.slice(6, 8)}. ${comment.createdAt.slice(
    8,
    10,
  )}:${comment.createdAt.slice(10, 12)}`;
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
      {isEditing ? (
        <TextField
          id="standard-full-width"
          placeholder="Placeholder"
          multiline
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={commentInput}
          onChange={event => {
            setComment(event.target.value);
          }}
        />
      ) : (
        <div style={{ marginTop: '5px' }}>{comment ? comment.content : '작성내용'}</div>
      )}

      <div style={{ marginTop: '5px' }}>{comment ? commentTime : '작성시간'}</div>
      <div style={{ right: '0px', bottom: '5px', position: 'absolute' }}>
        <button
          onClick={() => {
            if (isLogin) {
              if (isLiked) {
                // 좋아요 취소 요청
                CommentActions.axiosUserCommentThumbDownRequest(comment.id);
              } else {
                // 좋아요 요청
                CommentActions.axiosUserCommentThumbUpRequest(comment.id);
              }
            } else {
              alert('로그인이 필요합니다.');
            }
          }}
        >
          {isLiked ? '취소' : '좋아요'}
        </button>{' '}
        {comment ? comment.thumb : 0}
      </div>
      {isMine && !isEditing ? (
        <div style={{ right: '0px', top: '0px', position: 'absolute' }}>
          <button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            수정
          </button>{' '}
          <button
            onClick={() => {
              CommentActions.axiosCommentDeleteRequest(comment.id);
            }}
          >
            삭제
          </button>
        </div>
      ) : null}

      {isMine && isEditing ? (
        <div style={{ right: '0px', top: '0px', position: 'absolute' }}>
          <button
            onClick={() => {
              setIsEditing(false);
              setComment(comment.content);
              CommentActions.axiosCommentPutRequest({
                content: commentInput,
                eventId: comment.id,
              });
            }}
          >
            완료
          </button>
        </div>
      ) : null}

      <Divider style={{ marginTop: '20px' }} />
    </div>
  );
};

export default Comment;
