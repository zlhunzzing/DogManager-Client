import React, { useEffect } from 'react';

import UserMenu from '../views/UserMenu';
import axios from 'axios';
import server from '../server';
import { EventData } from '../modules/event';
import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as userEventActions } from '../modules/userEvent';
import { bindActionCreators } from 'redux';

interface EventContainerProps {
  url: string;
  nowEvent: EventData | null;
  UserEventActions: typeof userEventActions;
}

const EventContainer: React.FunctionComponent<EventContainerProps> = ({
  url,
  UserEventActions,
  nowEvent,
}: EventContainerProps) => {
  console.log(nowEvent);
  // 서버에 이벤트 정보 요청하기
  const getUserEvent = async () => {
    const serverurl = server + '/api/user/events/entry/' + url;
    const res = await axios.get(serverurl);
    UserEventActions.ChangeNowEvent(res.data);
  };

  // 이벤트 리스트 업데이트 반영하는 로직
  useEffect(() => {
    console.log('이벤트상세페이지업데이트');
    getUserEvent();
  }, []);

  return (
    <div>
      <UserMenu />
      <div style={{ textAlign: 'center' }}>
        <div>이벤트 상세페이지</div>
        <img style={{ width: '40%' }} src={nowEvent?.pageImage} />
      </div>

      <img
        style={{
          position: 'fixed',
          bottom: 0,
          left: '30%',
          width: '40%',
          height: '7%',
          border: 'solid 1px',
        }}
        src={nowEvent?.buttonImage}
      />
    </div>
  );
};

export default connect(
  ({ userEvent }: StoreState) => ({
    nowEvent: userEvent.nowEvent,
  }),
  dispatch => ({
    UserEventActions: bindActionCreators(userEventActions, dispatch),
  }),
)(EventContainer);
