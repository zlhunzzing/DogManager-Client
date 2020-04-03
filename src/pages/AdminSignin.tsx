import React from 'react';
import { RouteComponentProps } from 'react-router';

import SigninContainer from '../containers/SigninContainer';

function AdminSignin({ history }: RouteComponentProps) {
  return <SigninContainer isAdmin={true} history={history} />;
}

export default AdminSignin;
