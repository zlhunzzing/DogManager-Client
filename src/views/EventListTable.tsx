import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as eventActions, EventState } from '../modules/event';
import { bindActionCreators } from 'redux';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import EventItem from '../views/EventItem';

function EventListTable({ eventLists, selectedEvent, filter }: EventState) {
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
          return <EventItem key={index} event={event} />;
        })}
      </TableBody>
    </Table>
  );
}

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
