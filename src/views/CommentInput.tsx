import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//////////////////////////////////////////////////////////////////////////////////////

interface CommentInputProps {
  isLogin: boolean;
}

const CommentInput: React.FunctionComponent<CommentInputProps> = ({
  isLogin,
}: CommentInputProps) => {
  if (isLogin) {
    return (
      <div
        style={{ width: '40%', height: '150px', marginLeft: '30%', position: 'relative' }}
      >
        {/* <input
          type="text"
          style={{
            width: '80%',
            height: '80%',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}
        ></input> */}
        <TextField
          id="outlined-full-width"
          //   label="Label"
          style={{ margin: 0 }}
          placeholder="여러분의 소중한 댓글을 입력해주세요."
          //   helperText="Full width!"
          inputProps={{ maxlength: 130 }}
          fullWidth
          margin="normal"
          multiline
          rows={3}
          rowsMax={3}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

        <Button
          variant="outlined"
          style={{ position: 'absolute', right: '0px', bottom: '10px' }}
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
