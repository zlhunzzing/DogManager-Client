import React, { useEffect } from 'react';

import UserMenu from '../views/UserMenu';

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
  match: any;
}

const EventContainer: React.FunctionComponent<EventContainerProps> = ({
  nowEvent,
  EventActions,
  CouponActions,
  isLogin,
  match,
}: EventContainerProps) => {
  //

  useEffect(() => {
    EventActions.axiosUserEventRequest(match.params.eventurl);
  }, []);

  return (
    <div>
      <UserMenu />
      <div style={{ textAlign: 'center' }}>
        {nowEvent ? <img style={{ width: '40%' }} src={nowEvent.pageImage} /> : null}
      </div>
      {nowEvent ? (
        <button
          style={{
            position: 'fixed',
            bottom: 0,
            left: '30%',
            width: '40%',
            height: '7%',
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
  );
};

export default connect(
  ({ event, user }: StoreState) => ({
    nowEvent: event.nowEvent,
    isLogin: user.isLogin,
  }),
  dispatch => ({
    EventActions: bindActionCreators(eventSlice.actions, dispatch),
    CouponActions: bindActionCreators(couponSlice.actions, dispatch),
  }),
)(EventContainer);
