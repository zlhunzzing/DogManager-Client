import React, { useEffect } from 'react';

interface ChatProps {
  chat: any;
  timeStamp?: boolean;
}

const Chat: React.FunctionComponent<ChatProps> = ({ chat, timeStamp }: ChatProps) => {
  if (chat.writer === 'user') {
    return (
      <div>
        <div>
          {timeStamp ? chat.createdAt : null}
          {chat.content}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          {chat.content}
          {timeStamp ? chat.createdAt : null}
        </div>
      </div>
    );
  }
};

export default Chat;
