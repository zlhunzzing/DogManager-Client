import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AdminEventList from './pages/AdminEventList';
import Home from './pages/Home';
import Signin from './pages/Signin';
import EventEdit from './pages/EventEdit';

// 중첩라우팅?
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user/signin" component={Signin} />
        <Route path="/user/event-list" />
        <Route path="/admin/signin" />
        <Route path="/admin/event-list" component={AdminEventList} />
        <Route path="/admin/event-edit" />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
