import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Admin from './pages/Admin'
import Home from './pages/Home'
import Signin from './pages/Signin'
import EventEdit from './pages/EventEdit'

// 중첩 라우팅

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/admin" component={Admin} />
        <Route path="/signin" component={Signin} />
        <Route path="/signin/admin" component={Signin} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
