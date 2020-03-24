import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { eventSlice, EventData } from '../modules/event';

import { actionCreators as eventEditActions, initialState } from '../modules/eventEdit';
import { bindActionCreators } from 'redux';

import AdminMenu from '../views/AdminMenu';
import EventListMenu from '../views/EventListMenu';
import EventListTable from '../views/EventListTable';
import { Redirect } from 'react-router-dom';

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
  // store에 selectedEvent 바꾸기
  const changeSelectedEvent = (id: string): void => {
    EventActions.selectEvent(id);
  };

  // store에 filter 바꾸기
  const changeFilter = (filter: string): void => {
    EventActions.changeFilter(filter);
  };

  useEffect(() => {
    EventActions.axiosAdminEventListRequest();
    // EventActions.selectEvent('');
    // // getEventLists();
    // EventEditActions.putOldData(initialState);
  }, []);

  return (
    <div>
      <AdminMenu />
      <div style={{ marginTop: 10 }}></div>
      <EventListMenu filter={adminFilter} changeFilter={changeFilter} />
      <EventListTable
        eventList={adminEventList}
        changeSelectedEvent={changeSelectedEvent}
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
