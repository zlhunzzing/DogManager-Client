import React from 'react';
import { RouteComponentProps } from 'react-router';
import EventEditContainer from '../containers/EventEditContainer';

function AdminEventAdd({ history }: RouteComponentProps) {
  return (
    <div>
      <EventEditContainer history={history} />
    </div>
  );
}
export default AdminEventAdd;
