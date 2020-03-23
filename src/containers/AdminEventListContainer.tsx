import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { eventSlice, EventData } from '../modules/event';

import { actionCreators as eventEditActions, initialState } from '../modules/eventEdit';
import { bindActionCreators } from 'redux';

import AdminMenu from '../views/AdminMenu';
import EventListMenu from '../views/EventListMenu';
import EventListTable from '../views/EventListTable';

//////////////////////////////////////////////////////////////////////////////////////

interface EventListTableProps {
  adminEventList: EventData[];
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
  // 서버에서 이벤트리스트 받아서 sotre에 업데이트
  // const getEventLists = async () => {
  //   const res = await axios.get(serverurl + '/api/admin/events/list');
  //   const { eventList } = res.data;
  //   eventList.forEach((event: any) => {
  //     const condition = eventCondition(event.startDate, event.endDate);
  //     event.condition = condition;
  //   });
  //   console.log(eventList);
  //   if (filter === '모두') {
  //     EventActions.changeEventList(eventList);
  //   } else {
  //     const filterdList = eventList.filter((element: any) => {
  //       return element.condition === filter;
  //     });
  //     EventActions.changeEventList(filterdList);
  //   }
  // };

  // store에 selectedEvent 바꾸기
  const changeSelectedEvent = (id: string): void => {
    EventActions.selectEvent(id);
  };

  // store에 filter 바꾸기
  const changeFilter = (filter: string): void => {
    EventActions.changeFilter(filter);
  };
  // Similar to componentDidMount and componentDidUpdate
  // 함수형 컴포넌트에서 라이프사이클 함수를 사용(Hook)
  // 리액트 훅?
  useEffect(() => {
    EventActions.axiosAdminEventListRequest();
    // EventActions.axiosEventListRequest();
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
