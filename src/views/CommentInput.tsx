import React, { useState } from 'react';

import { debounce } from 'lodash';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//////////////////////////////////////////////////////////////////////////////////////

interface CommentInputProps {
  isLogin: boolean;
  CommentActions: any;
  eventId: number | undefined;
}

const CommentInput: React.FunctionComponent<CommentInputProps> = ({
  isLogin,
  CommentActions,
  eventId,
}: CommentInputProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const [comment, setComment] = useState('');

  const HandleChangeCommentInput = (value: string): any => {
    CommentActions.changeCommentInput(value);
    setIsTyping(false);
  };

  const debouncedHandleChangeCommentInput = debounce(HandleChangeCommentInput, 500);

  if (isLogin) {
    return (
      <div
        style={{ width: '40%', height: '150px', marginLeft: '30%', position: 'relative' }}
      >
        <TextField
          id="outlined-full-width"
          //   label="Label"
          style={{ margin: 0 }}
          placeholder="여러분의 소중한 댓글을 입력해주세요."
          //   helperText="Full width!"
          inputProps={{ maxLength: 130 }}
          fullWidth
          margin="normal"
          multiline
          rows={3}
          rowsMax={3}
          value={comment}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={event => {
            setIsTyping(true);
            setComment(event.target.value);
            debouncedHandleChangeCommentInput(event.target.value);
          }}
        />

        <Button
          variant="outlined"
          style={{ position: 'absolute', right: '0px', bottom: '10px' }}
          onClick={() => {
            if (isTyping) {
              console.log(isTyping);
              console.log('타이핑중');
            } else {
              console.log(isTyping);
              CommentActions.axiosCommentPostRequest(eventId);
              setComment('');
            }
          }}
        >
          Comment
        </Button>
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: '40%',
          height: '100px',
          marginLeft: '30%',
          //   textAlign: 'center',
          //   verticalAlign: 'middle',
          position: 'relative',
          backgroundColor: '#EAEAEA',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '40%',
            transform: 'translate(-50%,0)',
          }}
        >
          댓글을 입력하려면 로그인이 필요합니다.
        </div>
      </div>
    );
  }
};

export default CommentInput;
