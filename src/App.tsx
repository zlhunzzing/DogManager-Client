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
import EventList from './pages/EventList';
import Event from './pages/Event';
import AdminEventAdd from './pages/AdminEventAdd';
import SecondEventEdit from './pages/SecondEventEdit';

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
        <Route path="/admin/event-edit" component={EventEdit} />
        <Route path="/admin/support" component={AdminSupport} />
        <Route path="/admin/coupon" component={AdminCoupon} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
