import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { connect } from 'react-redux';
import { StoreState } from '../modules';

///////////////////////////////////////////////////////////////////////////////////

interface PrivateRouteProps extends RouteProps {
  isLogin: boolean;
}

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
  component,
  isLogin,
  ...rest
}: PrivateRouteProps) => {
  if (!component) {
    throw Error('component is undefined');
  }

  const routeComponent = (props: any) =>
    isLogin ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: '/user/signin' }} />
    );

  return <Route {...rest} render={routeComponent} />;
};

///////////////////////////////////////////////////////////////////////////////////

export default connect(({ user }: StoreState) => ({
  isLogin: user.isLogin,
}))(PrivateRoute);
