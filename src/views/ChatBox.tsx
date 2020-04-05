import React, { useEffect, useRef } from 'react';

import socket from '../socket';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chat from './Chat';

import img from '../codemate.jpg';

//////////////////////////////////////////////////////////////////////////////////////

interface ChatBoxProps {
  isLogin: boolean;
  UserActions: any;
}

const ChatBox: React.FunctionComponent<ChatBoxProps> = ({
  isLogin,
  UserActions,
}: ChatBoxProps) => {
  const [open, setOpen] = React.useState(false);
  const [myChat, setMyChat] = React.useState('');
  const [chatLog, setChatLog] = React.useState<Array<any>>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // socket.disconnect();
    setOpen(false);
  };

  const chatBoxRef = useRef<HTMLDivElement>(null);

  const chat = () => {
    console.log('소켓으로 채팅 보내기');
    if (myChat.length !== 0) {
      socket.emit('chat', {
        content: myChat,
        token: localStorage.getItem('accessToken'),
      });
    }
    console.log('myChatMessage: ', myChat);
    setMyChat('');
  };

  useEffect(() => {
    socket.on('chatLog', (chatLogs: any) => {
      console.log('여기', chatLogs);
      setChatLog(chatLogs);
      // 여기서 저 div 스크롤 bottom으로 고정시켜야지
      chatBoxRef.current?.scrollTo(0, chatBoxRef.current?.scrollHeight);
      // console.log(chatBoxRef.current?.scrollHeight);
    });
  }, []);

  useEffect(() => {
    socket.on('disconnect', function() {
      console.log('client disconnected from server');
    });
  }, []);

  useEffect(() => {
    socket.on('connect', function() {
      console.log('여기는 뭐라고 나오려나');
    });
  }, []);

  useEffect(() => {
    if (open) {
      console.log('로그인 에밋');
      socket.emit('login', {
        token: localStorage.getItem('accessToken'),
      });
    } else {
    }
  }, [open]);

  return (
    <div>
      <img
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '80px',
          height: '80px',
          cursor: 'pointer',
        }}
        onClick={() => {
          if (isLogin) {
            handleOpen();
          } else {
            alert('로그인이 필요합니다.');
          }
        }}
        src="https://clipartart.com/images/chat-icon-clipart.png"
      ></img>

      {open && isLogin ? (
        <div
          style={{
            width: '400px',
            height: '800px',
            backgroundColor: '#FFFFFF',
            position: 'fixed',
            right: '20px',
            bottom: '10px',
            borderRadius: 4,
            border: 'solid 1px blue',
          }}
        >
          <div style={{ position: 'relative', height: '20px' }}>
            <Button
              style={{ position: 'absolute', right: '0px' }}
              size="small"
              onClick={handleClose}
              variant="outlined"
            >
              X
            </Button>
            {/* <button style={{ position: 'absolute', right: '0px' }} onClick={handleClose}>
              X
            </button> */}
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            ** 안녕하세요! 무엇을 도와드릴까요? **
          </div>
          <div
            style={{
              margin: '10px',
              border: 'solid 1px',
              height: '80%',
              overflow: 'auto',
            }}
            onScrollCapture={() => {
              console.log('스크롤');
            }}
            ref={chatBoxRef}
          >
            {chatLog.map((chat: any, index: number) => {
              if (chat.writer === 'user') {
                return (
                  <div>
                    <Chat chat={chat} key={index} />

                    {index < chatLog.length - 1 ? (
                      <div>
                        {' '}
                        {chatLog[index + 1].writer === 'admin' ? (
                          <img
                            style={{
                              marginLeft: '10px',
                              marginTop: '10px',
                              width: '50px',
                              height: '50px',
                              borderRadius: 5,
                            }}
                            src={img}
                          />
                        ) : null}{' '}
                      </div>
                    ) : null}
                  </div>
                );
              } else {
                return <Chat key={index} chat={chat} />;
                // <div key={index}>{chat.content}</div>;
              }
            })}
          </div>
          <div style={{ margin: '10px', position: 'relative' }}>
            <TextField
              id="outlined-basic"
              required={false}
              variant="outlined"
              style={{ width: '80%' }}
              value={myChat}
              onChange={(event: any) => {
                setMyChat(event.target.value);
              }}
              onKeyDown={(event: any) => {
                if (event.keyCode === 13) {
                  chat();
                }
              }}
            />
            <Button
              variant="outlined"
              onClick={chat}
              style={{ position: 'absolute', right: '0px', height: '100%', width: '10%' }}
            >
              입력
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ChatBox;
