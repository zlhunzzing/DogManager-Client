import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../modules';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import {
    actionCreators as userActions,
} from '../modules/user';
import {bindActionCreators} from 'redux';

interface Props {
    idInput: string;
    pwInput: string;
    UserActions: typeof userActions;
}

class SigninContainer extends React.Component<Props> {

    onIdChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const { value } = e.currentTarget;
        const { UserActions } = this.props;
        UserActions.changeIdInput(value);
    }

    onPwChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const { value } = e.currentTarget;
        const { UserActions } = this.props;
        UserActions.changePwInput(value);
    }

    render() {
        const { idInput, pwInput, UserActions } = this.props;
        const { onIdChange, onPwChange } = this;
        return (
            <div>
            <Typography component="h1" variant="h5">
            Sign in
            </Typography>
            <form>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={event=>{
                const { value } = event.target;
                UserActions.changeIdInput(value);
              }}
            />
                <input onChange={onIdChange} value={idInput} placeholder="아이디" />
                <input onChange={onPwChange} value={pwInput} placeholder="비번"/>
                <button>로그인</button>
            </form>
            </div>
        );
    }
}

export default connect(
    ({user}:StoreState ) => ({
        signinData: user.signinData,
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
    })
)(SigninContainer);