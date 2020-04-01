//! 모듈
import React from 'react';

//! 컴포넌트
import AdminSupportContainer from '../containers/AdminSupportContainer';
import { FakeChatDataProps } from '../containers/AdminSupportContainer';
//! css

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

interface ChatRoomprops {
  chatRoom: FakeChatDataProps;
}

const AdminSupportView: React.FunctionComponent<ChatRoomprops> = ({
  chatRoom,
}: ChatRoomprops) => {
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary={`${' '}${chatRoom.userName}${chatRoom.userId}`} />
      </ListItem>
    </div>
  );
};

export default AdminSupportView;
