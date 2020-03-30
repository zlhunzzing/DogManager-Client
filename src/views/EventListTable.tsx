import React, { useEffect } from 'react';

import { EventData } from '../modules/event';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import EventItem from '../views/EventItem';

interface EventListTableProps {
  eventList: EventData[] | null;
  changeSelectedEvent: (id: string) => void;
  history: any;
  currentPage: number;
  perPage: number;
  deleteEvent: (id: number, history: any) => void;
}

const EventListTable: React.FunctionComponent<EventListTableProps> = ({
  eventList,
  changeSelectedEvent,
  history,
  deleteEvent,
  currentPage,
  perPage,
}: EventListTableProps) => {
  // 이벤트 리스트 상태 바꿔 넣기

  const eventItems = [];
  for (let i = perPage * (currentPage - 1); i < perPage * currentPage; i++) {
    if (eventList && eventList[i] !== undefined) {
      eventItems.push(
        <EventItem
          key={i}
          num={i}
          event={eventList[i]}
          changeSelectedEvent={changeSelectedEvent}
          history={history}
          deleteEvent={deleteEvent}
        />,
      );
    }
  }
  console.log(eventItems);

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
        {eventItems}
        {/* {eventList
          ? eventList.map((event, index) => {
              return (
                <EventItem
                  key={index}
                  num={index}
                  event={event}
                  changeSelectedEvent={changeSelectedEvent}
                  history={history}
                  deleteEvent={deleteEvent}
                />
              );
            })
          : null} */}
      </TableBody>
    </Table>
  );
};

export default EventListTable;
