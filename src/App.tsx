import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userSlice } from './modules/user';

import HomeContainer from './containers/HomeContainer';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import EventList from './pages/EventList';
import Event from './pages/Event';
import CouponList from './pages/CouponList';

import AdminSignin from './pages/AdminSignin';
import AdminEventList from './pages/AdminEventList';
import AdminEventAdd from './pages/AdminEventAdd';
import AdminEventEdit from './pages/AdminEventEdit';
import AdminSupport from './pages/AdminSupport';
import AdminCouponList from './pages/AdminCouponList';
import AdminCouponEdit from './pages/AdminCouponEdit';

interface AppProps {
  UserActions: any;
}

const App: React.FunctionComponent<AppProps> = ({ UserActions }: AppProps) => {
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      UserActions.changeIsLogin(true);
    }
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomeContainer} />
        <Route path="/user/signin" component={Signin} />
        <Route path="/user/signup" component={Signup} />
        <Route path="/user/event-list" component={EventList} />
        <Route path="/user/event/:eventurl" component={Event} />
        <Route path="/user/coupon" component={CouponList} />

        <Route path="/admin/signin" component={AdminSignin} />
        <Route path="/admin/event-list" component={AdminEventList} />
        <Route path="/admin/event-add" component={AdminEventAdd} />
        <Route path="/admin/event-edit" component={AdminEventEdit} />
        <Route path="/admin/support" component={AdminSupport} />
        <Route path="/admin/coupon" component={AdminCouponList} />
        <Route path="/admin/coupon-edit" component={AdminCouponEdit} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default connect(
  () => ({}),
  dispatch => ({
    UserActions: bindActionCreators(userSlice.actions, dispatch),
  }),
)(App);
