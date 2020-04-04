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
import PageBar from '../views/PageBar';

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
  history: any;
}

const AdminSupportContainer: React.FunctionComponent<AdminChatListContainerContainerProps> = ({
  userChatList,
  ChatActions,
  history,
}: AdminChatListContainerContainerProps) => {
  const classes = useStyles();

  useEffect(() => {
    ChatActions.axiosUserChatListRequest();
  }, []);
  console.log('userChatList: ', userChatList);
  //! 페이징 기능
  const [currentPage, setCurrentPage] = React.useState(1);
  const changePage = (page: number): void => {
    setCurrentPage(page);
  };
  //!

  const eventItems = [];
  const num = 5;
  for (let i = num * (currentPage - 1); i < num * currentPage; i++) {
    if (userChatList && userChatList[i] !== undefined) {
      eventItems.push(<AdminSupportView history={history} chatRoom={userChatList[i]} />);
    }
  }
  return (
    <div>
      <AdminMenu />
      <div
        style={{
          height: 40,
          textAlign: 'center',
          fontSize: '35px',
          fontWeight: 'bold',
          paddingBottom: 20,
        }}
      >
        <div style={{ height: '85%' }}></div>
        <div>채팅 방</div>
        <Divider />
      </div>
      <div style={{ marginTop: 30, textAlign: 'center' }}>
        <List component="nav" className={classes.root} aria-label="contacts">
          {eventItems}
        </List>
        <PageBar
          pages={Math.floor(userChatList.length / 4)}
          currentPage={currentPage}
          changePage={changePage}
        />
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
