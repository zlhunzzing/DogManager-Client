import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as eventActions, EventData } from '../modules/event';
import { bindActionCreators } from 'redux';

import axios from 'axios';
import serverurl from '../server';
import moment from 'moment';

import AdminMenu from '../views/AdminMenu';
import EventListMenu from '../views/EventListMenu';
import EventListTable from '../views/EventListTable';

interface EventListTableProps {
  eventList: EventData[];
  filter: string;
  EventActions: typeof eventActions;
  history: any;
}

const AdminEventListContainer: React.FunctionComponent<EventListTableProps> = ({
  eventList,
  filter,
  EventActions,
  history,
}: EventListTableProps) => {
  // 이벤트 상태 필터링 함수
  const eventCondition = (start: string, end: string): string => {
    const now = Number(moment(new Date()).format('YYYYMMDDHHmm'));
    const startNum = Number(start);
    const endNum = Number(end);
    let result = '';
    if (endNum === 0 && startNum <= now) {
      result = '진행중';
    } else if (endNum === 0 && startNum > now) {
      result = '준비중';
    } else if (endNum < now) {
      result = '완료';
    } else if (startNum <= now) {
      result = '진행중';
    } else {
      result = '준비중';
    }
    return result;
  };

  // 서버에서 이벤트리스트 받아서 sotre에 업데이트
  const getEventLists = async () => {
    const res = await axios.get(serverurl + '/api/admin/events/list');
    const { eventList } = res.data;
    eventList.forEach((event: any) => {
      const condition = eventCondition(event.startDate, event.endDate);
      event.condition = condition;
    });
    console.log(eventList);
    if (filter === '모두') {
      EventActions.ChangeEventList(eventList);
    } else {
      const filterdList = eventList.filter((element: any) => {
        return element.condition === filter;
      });
      EventActions.ChangeEventList(filterdList);
    }
  };

  // store에 selectedEvent 바꾸기
  const changeSelectedEvent = (id: string): void => {
    EventActions.SelectEvent(id);
  };

  // Similar to componentDidMount and componentDidUpdate
  // 함수형 컴포넌트에서 라이프사이클 함수를 사용(Hook)
  // 리액트 훅?
  useEffect(() => {
    EventActions.SelectEvent('');
    getEventLists();
  }, [filter]);

  return (
    <div>
      <AdminMenu />
      <div style={{ marginTop: 10 }}></div>
      <EventListMenu />
      <EventListTable
        eventList={eventList}
        changeSelectedEvent={changeSelectedEvent}
        history={history}
      />
    </div>
  );
};

export default connect(
  ({ event }: StoreState) => ({
    eventList: event.eventList,
    selectedEvent: event.selectedEvent,
    filter: event.filter,
  }),
  dispatch => ({
    EventActions: bindActionCreators(eventActions, dispatch),
  }),
)(AdminEventListContainer);
