//! 모듈
import React, { useEffect } from 'react';
import axios from 'axios';
//! 컴포넌트
import AdminMenu from '../views/AdminMenu';
import AdminSupportView from '../views/AdminSupportView';
import { adminChatRoomGetUrl } from '../server';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { bindActionCreators } from 'redux';
import { ChatData, chatSlice } from '../modules/chat';

//! css
import Divider from '@material-ui/core/Divider';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      paddingTop: 50,
      maxWidth: 460,
      paddingLeft: 670,
      backgroundColor: theme.palette.background.paper,
      fontSize: 50,
    },
  }),
);

interface AdminChatListContainerContainerProps {
  userChatList: ChatData[];
  ChatActions: any;
}

const AdminSupportContainer: React.FunctionComponent<AdminChatListContainerContainerProps> = ({
  userChatList,
  ChatActions,
}: AdminChatListContainerContainerProps) => {
  const classes = useStyles();

  useEffect(() => {
    ChatActions.axiosUserChatListRequest();
  }, []);
  console.log('userChatList: ', userChatList);

  return (
    <div>
      <AdminMenu />
      <div
        style={{
          height: 50,
          textAlign: 'center',
          fontSize: '35px',
          fontWeight: 'bold',
          paddingBottom: 20,
        }}
      >
        <div style={{ height: '75%' }}></div>
        <div>현재 채팅 방</div>
      </div>
      <Divider />
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <List component="nav" className={classes.root} aria-label="contacts">
          {userChatList
            ? userChatList.map((chatRoom, index) => {
                return <AdminSupportView key={index} chatRoom={chatRoom} />;
              })
            : null}
        </List>
      </div>
    </div>
  );
};

export default connect(
  ({ chat }: StoreState) => ({
    userChatList: chat.userChatList,
  }),
  dispatch => ({
    ChatActions: bindActionCreators(chatSlice.actions, dispatch),
  }),
)(AdminSupportContainer);
