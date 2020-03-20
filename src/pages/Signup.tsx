import React from 'react';
import SignupContainer from '../containers/SignupContainer';
import { RouteComponentProps } from 'react-router-dom';

function Signup({ history }: RouteComponentProps) {
  return <SignupContainer history={history} />;
}
export default Signup;
