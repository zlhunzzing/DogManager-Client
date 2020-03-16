import React from 'react';
import { EventData } from '../modules/event';

import moment from 'moment';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

interface EventItemProps {
  event: EventData;
  num: number;
}

const EventItem: React.FunctionComponent<EventItemProps> = ({
  num,
  event,
}: EventItemProps) => {
  // start_date과 end_date으로 진행중 준비중 완료 구분하는 로직
  const now = Number(moment(new Date()).format('YYYYMMDD'));
  let eventCondition: string;
  if (event.endDate < now) {
    eventCondition = '완료';
  } else if (event.startDate <= now) {
    eventCondition = '진행중';
  } else {
    eventCondition = '준비중';
  }

  // 보기 버튼을 누를 때 로직
  const handleClickView = (): void => {
    // 이벤트 이름 한번 더 확인해주기
    alert('상세 페이지로 이동 할 거야');
  };

  // 수정 버튼을 누를 때 로직
  const handleClickEdit = (): void => {
    // id를 selected-event에 매치 (아 이거 타입을 그냥 number로 바꿀까봐)
    // id에 해당하는 event 객체를 event-edit 페이지에 넘겨준다
    alert('수정 페이지로 이동 할 거야');
  };

  // 삭제 버튼을 누를 때 로직
  const handleClickDelete = (id: number): void => {
    // 이벤트 이름 한번 더 확인해주기
    alert(`id: ${id} / 이벤트를 정말 삭제하시겠습니까?`);
    // 서버에 이벤트 삭제 요청
    //DELETE /api/admin/events/entry/:id
  };
  return (
    <TableRow>
      <TableCell>{num}</TableCell>
      <TableCell>{eventCondition}</TableCell>
      <TableCell>{event.eventTitle}</TableCell>
      <TableCell>
        {event.startDate} - {event.endDate}
      </TableCell>
      <TableCell>
        <button onClick={handleClickView}>보기</button>
      </TableCell>
      <TableCell>
        <button onClick={handleClickEdit.bind(null, event.id)}>수정</button>
      </TableCell>
      <TableCell>
        <button onClick={handleClickDelete.bind(null, event.id)}>삭제</button>
      </TableCell>
    </TableRow>
  );
};

export default EventItem;
