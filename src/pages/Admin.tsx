import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { StoreState } from '../modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { adminSlice } from '../modules/admin';

import AdminSignin from './AdminSignin';
import AdminEventList from './AdminEventList';
import AdminEventAdd from './AdminEventAdd';
import AdminEventEdit from './AdminEventEdit';
import AdminSupport from './AdminSupport';
import AdminCouponList from './AdminCouponList';
import AdminCouponEdit from './AdminCouponEdit';
import AdminCouponView from './AdminCouponView';

interface AdminProps {
  AdminActions: any;
}
function Admin({ AdminActions }: AdminProps) {
  useEffect(() => {
    //console.log('어드민일때만찍히나?');
    AdminActions.changeIsAdminPage(true);
  });
  return (
    <Switch>
      <Route path="/admin/signin" component={AdminSignin} />
      <Route path="/admin/event-list" component={AdminEventList} />
      <Route path="/admin/event-add" component={AdminEventAdd} />
      <Route path="/admin/event-edit" component={AdminEventEdit} />
      <Route path="/admin/support" component={AdminSupport} />
      <Route path="/admin/coupon" component={AdminCouponList} />
      <Route path="/admin/coupon-edit" component={AdminCouponEdit} />
      <Route path="/admin/coupon-view" component={AdminCouponView} />
    </Switch>
  );
}

export default connect(
  () => ({}),
  dispatch => ({
    AdminActions: bindActionCreators(adminSlice.actions, dispatch),
  }),
)(Admin);
