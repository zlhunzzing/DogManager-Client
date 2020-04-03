import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { StoreState } from '../modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { adminSlice } from '../modules/admin';

import PrivateRoute from '../containers/PrivateRoute';

import HomeContainer from '../containers/HomeContainer';
import Signin from './Signin';
import Signup from './Signup';
import EventList from './EventList';
import Event from './Event';
import CouponList from './CouponList';

///////////////////////////////////////////////////////////////////////////////////

interface UserProps {
  AdminActions: any;
}

function User({ AdminActions }: UserProps) {
  useEffect(() => {
    AdminActions.changeIsAdminPage(false);
  });
  return (
    <Switch>
      <Route path="/user" exact component={HomeContainer} />
      <Route path="/user/signin" component={Signin} />
      <Route path="/user/signup" component={Signup} />
      <Route path="/user/event-list" component={EventList} />
      <Route path="/user/event/:eventurl" component={Event} />
      <PrivateRoute path="/user/coupon" component={CouponList} />
    </Switch>
  );
}

export default connect(
  () => ({}),
  dispatch => ({
    AdminActions: bindActionCreators(adminSlice.actions, dispatch),
  }),
)(User);
