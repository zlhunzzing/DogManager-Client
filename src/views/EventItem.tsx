import React from 'react';
import { EventData } from '../modules/event';

import moment from 'moment';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

interface EventItemProps {
  event: EventData;
}

function EventItem({ event }: EventItemProps) {
  // start_date과 end_date으로 진행중 준비중 완료 구분하는 로직
  const now: number = Number(moment(new Date()).format('YYYYMMDD'));
  let eventCondition: string;
  if (event.end_date < now) {
    eventCondition = '완료';
  } else if (event.start_date <= now) {
    eventCondition = '진행중';
  } else {
    eventCondition = '준비중';
  }

  // 보기 버튼을 누를 때 로직
  const handleClickView = () => {
    // 이벤트 이름 한번 더 확인해주기
    alert('상세 페이지로 이동 할 거야');
  };

  // 수정 버튼을 누를 때 로직
  const handleClickEdit = () => {
    // 이벤트 이름 한번 더 확인해주기
    alert('수정 페이지로 이동 할 거야');
  };

  // 삭제 버튼을 누를 때 로직
  const handleClickDelete = () => {
    // 이벤트 이름 한번 더 확인해주기
    alert('정말 삭제하시겠습니까?');
    // 서버에 이벤트 삭제 요청
    //DELETE /api/admin/events/entry/:id
  };
  return (
    <TableRow>
      <TableCell>번호</TableCell>
      <TableCell>{eventCondition}</TableCell>
      <TableCell>{event.event_title}</TableCell>
      <TableCell>
        {event.start_date} - {event.end_date}
      </TableCell>
      <TableCell>
        <button onClick={handleClickView}>보기</button>
      </TableCell>
      <TableCell>
        <button onClick={handleClickEdit}>수정</button>
      </TableCell>
      <TableCell>
        <button onClick={handleClickDelete}>삭제</button>
      </TableCell>
    </TableRow>
  );
}

export default EventItem;
