import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { bindActionCreators } from 'redux';
import { userSlice } from '../modules/user';

import ChatBox from '../views/ChatBox';

//////////////////////////////////////////////////////////////////////////////////////

interface UserChatContainer {
  isLogin: boolean;
  UserActions: any;
}

const UserChatContainer: React.FunctionComponent<UserChatContainer> = ({
  isLogin,
  UserActions,
}: UserChatContainer) => {
  return <ChatBox isLogin={isLogin} UserActions={UserActions} />;
};

//////////////////////////////////////////////////////////////////////////////////////

export default connect(
  ({ user }: StoreState) => ({
    isLogin: user.isLogin,
    chatLog: user.chatLog,
  }),
  dispatch => ({
    UserActions: bindActionCreators(userSlice.actions, dispatch),
  }),
)(UserChatContainer);
