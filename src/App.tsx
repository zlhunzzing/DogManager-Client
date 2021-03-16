import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators, combineReducers } from 'redux';
import { userSlice } from './modules/user';
import { StoreState } from './modules';

import PrivateRoute from './containers/PrivateRoute';

import HomeContainer from './containers/HomeContainer';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import EventList from './pages/EventList';
import Event from './pages/Event';
import CouponList from './pages/CouponList';

import User from './pages/User';
import Admin from './pages/Admin';

import AdminSignin from './pages/AdminSignin';
import AdminEventList from './pages/AdminEventList';
import AdminEventAdd from './pages/AdminEventAdd';
import AdminEventEdit from './pages/AdminEventEdit';
import AdminSupport from './pages/AdminSupport';
import AdminCouponList from './pages/AdminCouponList';
import AdminCouponEdit from './pages/AdminCouponEdit';
import AdminCouponView from './pages/AdminCouponView';

import UserChatContainer from './containers/UserChatContainer';

import axios from 'axios';

import { serverIp } from './env'

//////////////////////////////////////////////////////////////////////////////////////

interface AppProps {
  UserActions: any;
  isAdminPage: boolean;
}

const App: React.FunctionComponent<AppProps> = ({
  UserActions,
  isAdminPage,
}: AppProps) => {
  useEffect(() => {
    axios
      .get(`http://${serverIp}/api/user/userId`, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      })
      .then(res => {
        console.log('이거 얼마나 찍힐까? 로그인 유지?');
        UserActions.changeIsLogin(true);
        UserActions.changeUserId(res.data.id);
      })
      .catch(err => {
        console.log(err.response);
      });
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact component={HomeContainer} />
        <Route path="/user/signin" component={Signin} />
        <Route path="/user/signup" component={Signup} />
        <Route path="/user/event-list" component={EventList} />
        <Route path="/user/event/:eventurl" component={Event} />
        <PrivateRoute path="/user/coupon" component={CouponList} /> */}
        <Route path="/user" component={User} />
        <Route path="/admin" component={Admin} />
        {/* <Route path="/admin/signin" component={AdminSignin} />
        <Route path="/admin/event-list" component={AdminEventList} />
        <Route path="/admin/event-add" component={AdminEventAdd} />
        <Route path="/admin/event-edit" component={AdminEventEdit} />
        <Route path="/admin/support" component={AdminSupport} />
        <Route path="/admin/coupon" component={AdminCouponList} />
        <Route path="/admin/coupon-edit" component={AdminCouponEdit} />
        <Route path="/admin/coupon-view" component={AdminCouponView} /> */}

        <Redirect path="*" to="/user" />
      </Switch>
      {isAdminPage ? null : <UserChatContainer />}
    </BrowserRouter>
  );
};

export default connect(
  ({ admin }: StoreState) => ({
    isAdminPage: admin.isAdminPage,
  }),
  dispatch => ({
    UserActions: bindActionCreators(userSlice.actions, dispatch),
  }),
)(App);
