import React from 'react';
import { RouteComponentProps } from 'react-router';
import EventEditContainer from '../containers/EventEditContainer';

function AdminEventAdd({ history }: RouteComponentProps) {
  console.log(history);
  return (
    <div>
      이건 새 이벤트 등록할 때
      <EventEditContainer history={history} />
    </div>
  );
}
export default AdminEventAdd;
