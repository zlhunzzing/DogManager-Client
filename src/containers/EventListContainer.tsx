import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { bindActionCreators } from 'redux';
import { eventSlice, EventData } from '../modules/event';

import UserMenu from '../views/UserMenu';
import EventBanner from '../views/EventBanner';

//////////////////////////////////////////////////////////////////////////////////////

interface EventListContainerProps {
  userEventList: EventData[];
  EventActions: any;
  isLogin: boolean;
}

const EventListContainer: React.FunctionComponent<EventListContainerProps> = ({
  userEventList,
  EventActions,
  isLogin,
}: EventListContainerProps) => {
  //
  useEffect(() => {
    EventActions.axiosUserEventListRequest();
  }, []);

  // 진행중 이벤트 리스트
  const onGoingEvent = userEventList.filter(event => {
    return event.condition === '진행중';
  });
  // 종료된 이벤트 리스트
  const endEvent = userEventList.filter(event => {
    return event.condition === '완료';
  });

  const [endList, setEndList] = React.useState(false);

  return (
    <div>
      <UserMenu isLogin={isLogin} />
      <div style={{ height: 10 }}></div>
      <h3 style={{ textAlign: 'center' }}>진행중인 이벤트</h3>
      {onGoingEvent.map((banner, index) => {
        return <EventBanner banner={banner} key={index} condition="진행중" />;
      })}
      {onGoingEvent.length < 4 ? <EventBanner condition="준비중" /> : null}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => {
            setEndList(!endList);
          }}
          style={{ cursor: 'pointer' }}
        >
          종료된 이벤트
        </button>
      </div>
      {endList
        ? endEvent.map((banner, index) => {
            return <EventBanner banner={banner} key={index} condition="종료" />;
          })
        : null}
    </div>
  );
};

export default connect(
  ({ event, user }: StoreState) => ({
    userEventList: event.userEventList,
    isLogin: user.isLogin,
  }),
  dispatch => ({
    EventActions: bindActionCreators(eventSlice.actions, dispatch),
  }),
)(EventListContainer);
