import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import EventList from './pages/EventList';
import Event from './pages/Event';

import AdminSignin from './pages/AdminSignin';
import AdminEventList from './pages/AdminEventList';
import AdminEventAdd from './pages/AdminEventAdd';
import AdminEventEdit from './pages/AdminEventEdit';
import AdminSupport from './pages/AdminSupport';
import AdminCoupon from './pages/AdminCoupon';

// 중첩라우팅?
function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user/signin" component={Signin} />
        <Route path="/user/signup" component={Signup} />
        <Route path="/user/event-list" component={EventList} />
        <Route path="/user/event/:eventurl" component={Event} />

        <Route path="/admin/signin" component={AdminSignin} />
        <Route path="/admin/event-list" component={AdminEventList} />
        <Route path="/admin/event-add" component={AdminEventAdd} />
        <Route path="/admin/event-edit" component={AdminEventEdit} />
        <Route path="/admin/support" component={AdminSupport} />
        <Route path="/admin/coupon" component={AdminCoupon} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
