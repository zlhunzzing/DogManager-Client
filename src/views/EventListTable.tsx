import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as eventActions, EventData } from '../modules/event';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import serverurl from '../server';

import moment from 'moment';

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
  // 이벤트 리스트 상태 바꿔 넣기
  const eventCondition = (start: string, end: string): string => {
    const now = Number(moment(new Date()).format('YYYYMMDDHHmm'));
    const startNum = Number(start);
    const endNum = Number(end);
    let result = '';
    if (endNum < now) {
      result = '완료';
    } else if (startNum <= now) {
      result = '진행중';
    } else {
      result = '준비중';
    }
    return result;
  };

  // 서버에서 이벤트리스트 가져오기
  const getEventLists = async () => {
    const res = await axios.get(serverurl + '/api/admin/events/list');
    const { data } = res.data;
    data.forEach((event: any) => {
      const condition = eventCondition(event.startDate, event.endDate);
      event.condition = condition;
    });
    EventActions.ChangeEventLists(data);
  };

  /*
  Similar to componentDidMount and componentDidUpdate
  함수형 컴포넌트에서 라이프사이클 함수를 사용(Hook)
  */
  // 이벤트 리스트 업데이트 반영하는 로직
  useEffect(() => {
    console.log('유즈이펙트');
    getEventLists();
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
