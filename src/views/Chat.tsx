import React from 'react';

interface ChatProps {
  isLogin: boolean;
}
// 메세지들이 담긴 리스트가 계속 업데이트 되겠지,,?
const Chat: React.FunctionComponent<ChatProps> = ({ isLogin }: ChatProps) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
            width: '300px',
            height: '500px',
            backgroundColor: '#D5D5D5',
            position: 'fixed',
            right: '10px',
            bottom: '10px',
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
          <div style={{ position: 'absolute', bottom: '5px' }}>
            <input style={{ marginLeft: '10px' }} type="text" placeholder="채팅입력" />
            <button
              style={{ position: 'relative', right: '10px' }}
              onClick={() => {
                console.log('소켓으로 채팅 보내기');
              }}
            >
              입력
            </button>
          </div>
        </div>
      ) : null}

      {/* <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">쿠폰 삭제</h2>
          <p id="simple-modal-description">정말 삭제하시겠습니까?</p>
          <button
            onClick={() => {
              handleClose();
            }}
          >
            삭제
          </button>
          <button onClick={handleClose}>닫기</button>
        </div>
      </Modal> */}
    </div>
  );
};

export default Chat;
