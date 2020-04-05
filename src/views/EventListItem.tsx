import React from 'react';
import { EventData } from '../modules/event';

import { useStyles, getModalStyle } from './CouponListItem';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Modal from '@material-ui/core/Modal';

interface EventItemProps {
  event: EventData;
  num: number;
  changeSelectedEvent: (id: string) => void;
  history: any;
  deleteEvent: (id: number, history: any) => void;
}

const EventListItem: React.FunctionComponent<EventItemProps> = ({
  num,
  event,
  changeSelectedEvent,
  history,
  deleteEvent,
}: EventItemProps) => {
  // 보기 버튼을 누를 때 로직
  const handleClickView = (url: string | undefined): void => {
    // 이벤트 이름 한번 더 확인해주기
    // alert('상세 페이지로 이동 할 거야');
    if (url === undefined) {
      alert('연결된 페이지가 없는데?');
    }
    // console.log(url);
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
  };

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //
  function eventTime(stringTime: string | undefined) {
    if (stringTime === '') return;
    if (stringTime !== undefined) {
      return `${stringTime.slice(0, 4)}.${stringTime.slice(4, 6)}.${stringTime.slice(
        6,
        8,
      )}. ${stringTime.slice(8, 10)}:${stringTime.slice(10, 12)}`;
    }
  }

  return (
    <TableRow>
      <TableCell>{num}</TableCell>
      <TableCell>{event.condition}</TableCell>
      <TableCell>{event.eventTitle}</TableCell>
      <TableCell>
        {eventTime(event.startDate)} - {eventTime(event.endDate)}
      </TableCell>
      <TableCell>
        <button
          onClick={handleClickView.bind(null, event.detailPageUrl)}
          style={{ cursor: 'pointer' }}
        >
          보기
        </button>
      </TableCell>
      <TableCell>
        <button
          onClick={handleClickEdit.bind(null, event.id)}
          style={{ cursor: 'pointer' }}
        >
          수정
        </button>
      </TableCell>
      <TableCell>
        <button onClick={handleOpen} style={{ cursor: 'pointer' }}>
          삭제
        </button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">이벤트 삭제</h2>
            <p id="simple-modal-description">정말 삭제하시겠습니까?</p>
            <button
              onClick={() => {
                deleteEvent(event.id, history);
                handleClose();
              }}
              style={{ cursor: 'pointer' }}
            >
              삭제
            </button>
            <button onClick={handleClose} style={{ cursor: 'pointer' }}>
              닫기
            </button>
          </div>
        </Modal>
      </TableCell>
    </TableRow>
  );
};

export default EventListItem;
