//! 모듈
import React from 'react';

//! 컴포넌트
import AdminSupportContainer from '../containers/AdminSupportContainer';
// import { FakeChatDataProps } from '../containers/AdminSupportContainer';
import { ChatData } from '../modules/chat';
//! css

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

interface AdminChatListContainerContainerProps {
  chatRoom: ChatData;
}

const AdminSupportView: React.FunctionComponent<AdminChatListContainerContainerProps> = ({
  chatRoom,
}: AdminChatListContainerContainerProps) => {
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText
          primary={`${'고유번호:  '}${chatRoom.id} 이름:  ${chatRoom.name}`}
        />
      </ListItem>
    </div>
  );
};

export default AdminSupportView;
