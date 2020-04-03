import React from 'react';
import { RouteComponentProps } from 'react-router';
import SigninContainer from '../containers/SigninContainer';

function Signin({ history }: RouteComponentProps) {
  return <SigninContainer isAdmin={false} history={history} />;
}

export default Signin;
