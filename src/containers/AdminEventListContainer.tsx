import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { connect, useSelector } from 'react-redux';
import { StoreState } from '../modules';
import { bindActionCreators } from 'redux';
import { eventSlice, EventData, adminEventListSelector } from '../modules/event';

import { actionCreators as eventEditActions, initialState } from '../modules/eventEdit';

import AdminMenu from '../views/AdminMenu';
import EventListMenu from '../views/EventListMenu';
import EventListTable from '../views/EventListTable';

//////////////////////////////////////////////////////////////////////////////////////

interface EventListTableProps {
  adminEventList: EventData[] | null;
  adminFilter: string;
  EventActions: any;
  EventEditActions: typeof eventEditActions;
  history: any;
}

const AdminEventListContainer: React.FunctionComponent<EventListTableProps> = ({
  adminEventList,
  adminFilter,
  EventActions,
  history,
  EventEditActions,
}: EventListTableProps) => {
  const filteredEventList = useSelector(adminEventListSelector);
  console.log('셀렉터', filteredEventList);

  // store에 editEventId 바꾸기
  const changeSelectedEvent = (id: string): void => {
    EventActions.changeEditEventId(id);
  };

  // store에 adminFilter 바꾸기
  const changeFilter = (filter: string): void => {
    EventActions.changeFilter(filter);
  };

  // 삭제 요청 보내는 액션
  const deleteEvent = (id: number, history: any): void => {
    EventActions.axiosAdminEventDeleteRequest({ id: id, history: history });
  };

  useEffect(() => {
    EventActions.axiosAdminEventListRequest();
    EventActions.changeEditEventId('');
    EventEditActions.putOldData(initialState);
  }, []);

  if (adminEventList === null) {
    alert('접근 권한이 없습니다.');
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div>
      <AdminMenu />
      <div style={{ marginTop: 10 }}></div>
      <EventListMenu filter={adminFilter} changeFilter={changeFilter} />
      <EventListTable
        eventList={filteredEventList ? filteredEventList : []}
        changeSelectedEvent={changeSelectedEvent}
        deleteEvent={deleteEvent}
        history={history}
      />
    </div>
  );
};

export default connect(
  ({ event }: StoreState) => ({
    adminEventList: event.adminEventList,
    editEventId: event.editEventId,
    adminFilter: event.adminFilter,
  }),
  dispatch => ({
    EventActions: bindActionCreators(eventSlice.actions, dispatch),
    EventEditActions: bindActionCreators(eventEditActions, dispatch),
  }),
)(AdminEventListContainer);
