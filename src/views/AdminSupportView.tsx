//! 모듈
import React, { useEffect, useRef, ReactElement } from 'react';
import socket from '../socket';
// import { RouteComponentProps } from 'react-router-dom';
//! 컴포넌트
import { ChatData } from '../modules/chat';

//! css

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import Modal from '@material-ui/core/Modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@material-ui/icons/RadioButtonCheckedOutlined';

interface AdminChatListContainerContainerProps {
  chatRoom: ChatData;
  history: any;
}
export function getModalStyle() {
  return {
    width: 615,
    height: 378,
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  };
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 200,
      height: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

const AdminSupportView: React.FunctionComponent<AdminChatListContainerContainerProps> = ({
  chatRoom,
  history,
}: AdminChatListContainerContainerProps) => {
  //!모달
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  //! 소켓
  const [isSocketConnected, setIsSocketConnected] = React.useState(false);
  //! 스크롤 고정
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [chatLog, setChatLog] = React.useState<Array<any>>([]);
  //! state:
  const [myChat, setMyChat] = React.useState('');

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.go('/admin/support');
  };

  // useEffect(callback,[]) [] < 이것은 무엇인가? 무엇이 들어가는가?
  // userEffect()함수안에 callback,[] 매게변수가 들어간다.
  // [open]의 의미는?
  // open 값은 false 인데 open 값이 변경 될때마다 callback 함수가 실행되는것으로 이해함.
  useEffect(() => {
    if (open) {
      console.log('어드민 로그인 에밋');
      socket.emit('login', {
        token: localStorage.getItem('accessToken'),
        userId: chatRoom.id,
      });
    } else {
    }
  }, [open]);

  //! 소켓
  useEffect(() => {
    socket.on('chatLog', (chatLogs: any) => {
      console.log('와우 기록데이터:', chatLogs);
      setChatLog(chatLogs);
      chatBoxRef.current?.scrollTo(0, chatBoxRef.current?.scrollHeight);
    });
  }, []);

  console.log('chatRoom: ', chatRoom);
  console.log('chatRoom.adminCheck: ', chatRoom.adminCheck);

  let icon: JSX.Element;
  if (!chatRoom.adminCheck) {
    icon = <RadioButtonUncheckedOutlinedIcon />;
  } else {
    icon = <RadioButtonCheckedOutlinedIcon />;
  }
  return (
    <div>
      <ListItem button>
        <ListItemIcon>{icon}</ListItemIcon>
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
        <div
          style={{
            width: '400px',
            height: '500px',
            backgroundColor: 'white',
            position: 'fixed',
            right: '20px',
            bottom: '10px',
            borderRadius: 3,
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`,
          }}
        >
          <div style={{ position: 'fixed' }}>
            <button
              style={{
                position: 'fixed',
                marginLeft: 367,
                paddingLeft: 90,
                padding: 10,
                fontSize: 'unset',
              }}
              onClick={handleClose}
            >
              X
            </button>
          </div>
          <h3 id="simple-modal-title" style={{ textAlign: 'center' }}>
            답변 하기
          </h3>
          <div
            style={{
              marginTop: '12px',
              border: 'solid 1px',
              height: '65%',
              overflow: 'scroll',
            }}
            onScrollCapture={() => {
              console.log('스크롤');
            }}
            ref={chatBoxRef}
          >
            {' '}
            {chatLog.map((chat: any, index: number) => {
              console.log('chat: ', chat);
              console.log('chatLog:', chatLog);
              console.log('chatLog.length: ', chatLog.length);
              if (chat.writer === 'admin') {
                return (
                  <div>
                    <div
                      style={{
                        color: 'red',
                        fontWeight: 'bold',
                        textAlign: 'right',
                        margin: 12,
                      }}
                      key={index}
                    >
                      {chat.content}
                    </div>
                    {index < chatLog.length - 1 ? (
                      <div>
                        {' '}
                        {chatLog[index + 1].writer === 'user' ? (
                          <div
                            style={{
                              color: 'black',
                              fontWeight: 'bold',
                              textAlign: 'left',
                              margin: 12,
                            }}
                          >
                            User
                          </div>
                        ) : null}{' '}
                      </div>
                    ) : null}
                  </div>
                );
              } else {
                return (
                  <div
                    style={{
                      color: 'black',
                      textAlign: 'left',
                      margin: 12,
                    }}
                    key={index}
                  >
                    {chat.content}
                  </div>
                );
              }
            })}
          </div>
          <div style={{ bottom: '5px' }}>
            <textarea
              name="Text1"
              style={{
                width: '334px',
                height: '64px',
                margin: '12px',
                fontSize: '16px',
              }}
              value={myChat}
              placeholder="메세지를 입력해주세요"
              onChange={e => {
                setMyChat(e.target.value);
              }}
            ></textarea>
            <button
              onClick={() => {
                socket.emit('chat', {
                  token: localStorage.getItem('accessToken'),
                  userId: chatRoom.id,
                  content: myChat,
                });
                setMyChat('');
              }}
              style={{
                position: 'absolute',
                marginLeft: 366,
                padding: 6,
                marginTop: -43,
                display: 'flex',
              }}
            >
              입력
            </button>
          </div>
          {/* <button style={{ position: 'absolute', right: '10px' }}>완료</button> */}
        </div>
      </Modal>
    </div>
  );
};

export default AdminSupportView;
