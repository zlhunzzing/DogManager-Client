import React, { useEffect } from 'react';

import UserMenu from '../views/UserMenu';
import CommentListBox from '../views/CommentListBox';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { eventSlice, EventData } from '../modules/event';
import { couponSlice } from '../modules/coupon';
import { bindActionCreators } from 'redux';

//////////////////////////////////////////////////////////////////////////////////////

interface EventContainerProps {
  nowEvent: EventData | null;
  EventActions: any;
  CouponActions: any;
  isLogin: boolean;
  userId: number | null;
  match: any;
}

const EventContainer: React.FunctionComponent<EventContainerProps> = ({
  nowEvent,
  EventActions,
  CouponActions,
  isLogin,
  userId,
  match,
}: EventContainerProps) => {
  //

  useEffect(() => {
    EventActions.axiosUserEventRequest(match.params.eventurl);
  }, []);

  return (
    <div>
      <UserMenu />
      <div>
        {nowEvent ? (
          <img style={{ marginLeft: '30%', width: '40%' }} src={nowEvent.pageImage} />
        ) : null}
        {nowEvent ? (
          <button
            style={{
              // position: 'fixed',
              // bottom: 0,
              marginLeft: '30%',
              width: '40%',
              height: '70px',
              border: 'solid 1px',
              background: `url(${nowEvent.buttonImage}) no-repeat`,
              backgroundSize: '100%',
            }}
            onClick={() => {
              if (isLogin) {
                CouponActions.axiosUserCouponPostRequest();
              } else {
                alert('로그인이 필요합니다.');
              }
            }}
          >
            {/* <img src={nowEvent.buttonImage} /> */}
          </button>
        ) : null}
      </div>
      <CommentListBox
        isLogin={true}
        commentList={nowEvent?.commentList}
        userId={userId}
      ></CommentListBox>
    </div>
  );
};

export default connect(
  ({ event, user }: StoreState) => ({
    nowEvent: event.nowEvent,
    isLogin: user.isLogin,
    userId: user.userId,
  }),
  dispatch => ({
    EventActions: bindActionCreators(eventSlice.actions, dispatch),
    CouponActions: bindActionCreators(couponSlice.actions, dispatch),
  }),
)(EventContainer);
