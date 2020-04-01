//! 모듈
import React, { useEffect } from 'react';
import socket from '../socket';
//! 컴포넌트
import { ChatData } from '../modules/chat';
//! css

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import { useStyles, getModalStyle } from './CouponItem';
import Modal from '@material-ui/core/Modal';

interface AdminChatListContainerContainerProps {
  chatRoom: ChatData;
}

// interface ChatBoxProps {
//   isLogin: boolean;
//   chatLog?: [];
// }

const AdminSupportView: React.FunctionComponent<AdminChatListContainerContainerProps> = ({
  chatRoom,
}: AdminChatListContainerContainerProps) => {
  //!소켓
  // const [open, setOpen] = React.useState(false);
  // const [isSocketConnected, setIsSocketConnected] = React.useState(false);
  // const [myChat, setMyChat] = React.useState('');
  // const [sendChat, setSendChat] = React.useState(false);
  //!---
  //! 모달
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

  //! 소켓
  // useEffect(() => {
  //   socket.on('chatLog', (chatLogs: any) => {
  //     console.log('와우 기록데이터:', chatLogs);
  //     setSendChat(false);
  //   });
  // }, []);
  //!--
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText
          onClick={handleOpen}
          primary={`${'고유번호:  '}${chatRoom.id} 이름:  ${chatRoom.name}`}
        />
      </ListItem>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <div style={{ position: 'relative' }}>
            <button
              style={{
                position: 'absolute',
                marginLeft: 398,
                paddingLeft: 90,
                padding: 10,
              }}
              onClick={handleClose}
            >
              X
            </button>
          </div>
          <h1 id="simple-modal-title" style={{ textAlign: 'center' }}>
            답변 하기
          </h1>
          <div
            style={{
              marginTop: '10px',
              border: 'solid 1px',
              height: '80%',
              overflow: 'auto',
            }}
          >
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
            <div>메세지</div>
          </div>
          <div style={{ bottom: '5px' }}>
            <input
              style={{ margin: 20, width: 200, height: 20, fontSize: 10 }}
              type="text"
              placeholder="메세지를 입력해주세요"
            />
            <button style={{ position: 'relative', right: '10px' }}>입력</button>
          </div>
          <button onClick={handleClose} style={{ padding: 12, marginLeft: 330 }}>
            완료
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminSupportView;

{
  /* <div style={{ position: 'absolute', bottom: '5px' }}>
            <input
              style={{ marginLeft: '10px' }}
              type="text"
              placeholder="메세지를 입력해주세요"
            />
            <button style={{ position: 'relative', right: '10px' }}>입력</button>
          </div>
          <button onClick={handleClose}>완료</button>
        </div> */
}
