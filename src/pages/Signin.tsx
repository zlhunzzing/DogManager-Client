import * as React from 'react';

import Typography from '@material-ui/core/Typography';

interface Props {
    idInput: string;
    pwInput: string;
    onPwChange(e: any): void;
    onIdChange(e: any): void;
  }

const Signin: React.SFC<Props> = ({idInput, pwInput, onPwChange, onIdChange}) => (
    <div>
        여기는 로그인
        <Typography component="h1" variant="h5">
            Sign in
        </Typography>
        <input onChange={onIdChange} value={idInput} placeholder="아이디" />
        <input onChange={onPwChange} value={pwInput} placeholder="비번"/>
        <button>로그인</button>
    </div>
)

export default Signin;