import React, { useEffect } from 'react';

interface ChatProps {
  chat: any;
  timeStamp?: boolean;
}

const SupportChat: React.FunctionComponent<ChatProps> = ({
  chat,
  timeStamp,
}: ChatProps) => {
  if (chat.writer !== 'user') {
    return (
      <div
        style={{
          marginTop: '15px',
          paddingLeft: '15px',
          paddingRight: '30px',
          textAlign: 'right',
        }}
      >
        <div>
          {chat.content}
          {timeStamp ? chat.createdAt : null}
        </div>
      </div>
    );
  } else {
    return (
      //   <div style={{ marginTop: '15px', paddingLeft: '15px', paddingRight: '30px' }}>
      //     <div>
      //       {chat.content}
      //       {timeStamp ? chat.createdAt : null}
      //     </div>
      //   </div>
      <div
        style={{
          marginTop: '15px',
          textAlign: 'left',
          paddingRight: '15px',
          paddingLeft: '30px',
        }}
      >
        <span style={{ backgroundColor: '#B2CCFF', padding: '3px', borderRadius: 5 }}>
          {timeStamp ? chat.createdAt : null}
          {chat.content}
        </span>
      </div>
    );
  }
};

export default SupportChat;
