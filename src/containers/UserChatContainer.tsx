import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { bindActionCreators } from 'redux';
import { signinSlice } from '../modules/signin';

import ChatBox from '../views/ChatBox';

//////////////////////////////////////////////////////////////////////////////////////

interface UserChatContainer {
  isLogin: boolean;
  chatLog: [];
}

const UserChatContainer: React.FunctionComponent<UserChatContainer> = ({
  isLogin,
  chatLog,
}: UserChatContainer) => {
  return <ChatBox isLogin={isLogin} chatLog={chatLog} />;
};

//////////////////////////////////////////////////////////////////////////////////////

export default connect(
  ({ user }: StoreState) => ({
    isLogin: user.isLogin,
    chatLog: user.chatLog,
  }),
  dispatch => ({
    SigninActions: bindActionCreators(signinSlice.actions, dispatch),
  }),
)(UserChatContainer);
