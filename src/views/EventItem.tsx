import React from 'react';
import { EventData } from '../modules/event';

import axios from 'axios';
import serverurl from '../server';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

interface EventItemProps {
  event: EventData;
  num: number;
  changeSelectedEvent: (id: string) => void;
  history: any;
}

const EventItem: React.FunctionComponent<EventItemProps> = ({
  num,
  event,
  changeSelectedEvent,
  history,
}: EventItemProps) => {
  // 보기 버튼을 누를 때 로직
  const handleClickView = (url: string | undefined): void => {
    // 이벤트 이름 한번 더 확인해주기
    // alert('상세 페이지로 이동 할 거야');
    if (url === undefined) {
      alert('연결된 페이지가 없는데?');
    }
    console.log(url);
    window.open(
      `http://dogandcodemate.s3-website.ap-northeast-2.amazonaws.com/user/event${url}`,
    );
  };

  // 수정 버튼을 누를 때 로직
  const handleClickEdit = (id: number): void => {
    // id를 selected-event에 매치 (아 이거 타입을 그냥 number로 바꿀까봐)
    // id에 해당하는 event 객체를 event-edit 페이지에 넘겨준다
    // event.id
    const a = id.toString();
    changeSelectedEvent(a);
    history.push('/admin/event-edit');
    console.log(history);
    // alert('수정 페이지로 이동 할 거야');
  };

  // 삭제 버튼을 누를 때
  const handleClickDelete = (id: number): void => {
    // 서버에 이벤트 삭제 요청
    console.log(serverurl, id);
    const url = `${serverurl}/api/admin/events/entry/${id}`;
    console.log(url);
    axios.delete(url).then(res => console.log('삭제완료', res));
    // alert(`id: ${id} / 이벤트를 정말 삭제하시겠습니까?`);
    history.go('/admin/event-list');
  };
  return (
    <TableRow>
      <TableCell>{num}</TableCell>
      <TableCell>{event.condition}</TableCell>
      <TableCell>{event.eventTitle}</TableCell>
      <TableCell>
        {event.startDate} - {event.endDate}
      </TableCell>
      <TableCell>
        <button onClick={handleClickView.bind(null, event.detailPageUrl)}>보기</button>
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
