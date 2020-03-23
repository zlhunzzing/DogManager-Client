import React from 'react';
import EventEditContainer from '../containers/EventEditContainer';
import { RouteComponentProps } from 'react-router-dom';

function AdminEventEdit({ history }: RouteComponentProps) {
  return (
    <div>
      <EventEditContainer history={history} />
    </div>
  );
}

export default AdminEventEdit;
