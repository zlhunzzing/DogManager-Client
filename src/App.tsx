import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Admin from './pages/Admin'
import Home from './pages/Home'
import Signin from './pages/Signin'
import EventEdit from './pages/EventEdit'
import SigninContainer from './pages/SigninContainer'
import SignInSide from './pages/SignInSide'

// 중첩 라우팅

function App() {
  return (
    
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user/signin" component={SignInSide}/>
        <Route path="/user/event-list" />
        <Route path="/admin/signin" />
        <Route path="/admin/event-list" component={Admin} />
        <Route path="/admin/event-edit" />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
