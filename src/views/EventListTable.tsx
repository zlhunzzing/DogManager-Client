import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as eventActions, EventData } from '../modules/event';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import serverurl from '../server';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import EventItem from '../views/EventItem';

interface EventListTableProps {
  eventLists: EventData[];
  EventActions: typeof eventActions;
}

const EventListTable: React.FunctionComponent<EventListTableProps> = ({
  eventLists,
  EventActions,
}: EventListTableProps) => {
  /*
  Similar to componentDidMount and componentDidUpdate
  함수형 컴포넌트에서 라이프사이클 함수를 사용(Hook)
  */

  // 이벤트 리스트 업데이트 반영하는 로직
  useEffect(() => {
    axios.get(serverurl + '/api/admin/events/list');
    // .then((eventlist: EventData[]): void => {
    //   console.log('요청성공');
    //   EventActions.ChangeEventLists(eventlist);
    // });
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>번호</TableCell>
          <TableCell>상태</TableCell>
          <TableCell>이벤트명</TableCell>
          <TableCell>기간</TableCell>
          <TableCell>보기</TableCell>
          <TableCell>수정</TableCell>
          <TableCell>삭제</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {eventLists.map((event, index) => {
          return <EventItem key={index} num={index} event={event} />;
        })}
      </TableBody>
    </Table>
  );
};

export default connect(
  ({ event }: StoreState) => ({
    eventLists: event.eventLists,
    selectedEvent: event.selectedEvent,
    filter: event.filter,
  }),
  dispatch => ({
    EventActions: bindActionCreators(eventActions, dispatch),
  }),
)(EventListTable);
