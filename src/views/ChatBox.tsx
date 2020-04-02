import React, { useEffect } from 'react';

import socket from '../socket';

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
  const [isSocketConnected, setIsSocketConnected] = React.useState(false);
  const [myChat, setMyChat] = React.useState('');
  const [sendChat, setSendChat] = React.useState(false);

  const [chatLog, setChatLog] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // socket.disconnect();
    setOpen(false);
    setIsSocketConnected(false);
  };

  const chat = () => {
    console.log('소켓으로 채팅 보내기');
    socket.emit('chat', {
      content: myChat,
      token: localStorage.getItem('accessToken'),
    });
    console.log(myChat);
    setMyChat('');
    setSendChat(true);
  };

  useEffect(() => {
    socket.on('chatLog', (chatLogs: any) => {
      console.log('여기', chatLogs);
      setChatLog(chatLogs);
      setSendChat(false);
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
          right: '10px',
          width: '80px',
          height: '80px',
        }}
        onClick={() => {
          if (isLogin) {
            handleOpen();
          } else {
            alert('로그인이 필요합니다.');
          }
        }}
        src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-speech-bubble-26.png&r=0&g=0&b=0"
      ></img>

      {open ? (
        <div
          style={{
            width: '400px',
            height: '500px',
            backgroundColor: '#D5D5D5',
            position: 'fixed',
            right: '20px',
            bottom: '10px',
            borderRadius: 4,
          }}
        >
          <div style={{ position: 'relative', height: '20px' }}>
            <button style={{ position: 'absolute', right: '0px' }} onClick={handleClose}>
              X
            </button>
          </div>
          <div style={{ textAlign: 'center' }}>안녕하세요 코드메이트입니다.</div>
          <div
            style={{
              marginTop: '10px',
              border: 'solid 1px',
              height: '80%',
              overflow: 'auto',
            }}
          >
            {chatLog.map((chat: any, index: number) => {
              if (chat.writer === 'user') {
                return (
                  <div
                    style={{
                      textAlign: 'right',
                    }}
                    key={index}
                  >
                    {chat.content}
                  </div>
                );
              } else {
                return <div key={index}>{chat.content}</div>;
              }
            })}
            {/* <div>메세지</div>
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
            <div>메세지</div> */}
          </div>
          <div style={{ position: 'absolute', bottom: '5px' }}>
            <input
              style={{ marginLeft: '10px' }}
              type="text"
              placeholder="메세지를 입력해주세요"
              value={myChat}
              onChange={event => {
                setMyChat(event.target.value);
              }}
            />
            <button style={{ position: 'relative', right: '10px' }} onClick={chat}>
              입력
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ChatBox;
