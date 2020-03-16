import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AdminEventList from './pages/AdminEventList';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import AdminSignin from './pages/AdminSignin';
import AdminSupport from './pages/AdminSupport';
import AdminCoupon from './pages/AdminCoupon';
import EventEdit from './pages/EventEdit';
import SecondEventEdit from './pages/SecondEventEdit';

// 중첩라우팅?
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user/signin" component={Signin} />
        <Route path="/user/signup" component={Signup} />
        <Route path="/user/event-list" />
        <Route path="/admin/signin" component={AdminSignin} />
        <Route path="/admin/support" component={AdminSupport} />
        <Route path="/admin/coupon" component={AdminCoupon} />
        <Route path="/admin/event-list" component={AdminEventList} />
        <Route path="/admin/event-edit" component={SecondEventEdit} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
