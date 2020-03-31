import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators, combineReducers } from 'redux';
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
import AdminCouponView from './pages/AdminCouponView';

import Chat from './views/Chat';

import axios from 'axios';
interface AppProps {
  UserActions: any;
}

const App: React.FunctionComponent<AppProps> = ({ UserActions }: AppProps) => {
  useEffect(() => {
    axios
      .get('http://13.125.249.151:3002/api/user/userId', {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      })
      .then(res => {
        console.log('여기');
        UserActions.changeUserId(res.data.id);
      });
    // if (localStorage.getItem('accessToken')) {
    //   UserActions.changeIsLogin(true);
    // }
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
        <Route path="/admin/coupon-view" component={AdminCouponView} />
        <Redirect path="*" to="/" />
      </Switch>
      <Chat isLogin={true} />
    </BrowserRouter>
  );
};

export default connect(
  () => ({}),
  dispatch => ({
    UserActions: bindActionCreators(userSlice.actions, dispatch),
  }),
)(App);
