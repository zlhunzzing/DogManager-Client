import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { bindActionCreators } from 'redux';

import { eventSlice, EventData } from '../modules/event';
import { couponSlice } from '../modules/coupon';
import { commentSlice } from '../modules/comment';

import UserMenu from '../views/UserMenu';
import DetailEvent from '../views/DetailEvent';
import CommentListBox from '../views/CommentListBox';

//////////////////////////////////////////////////////////////////////////////////////

interface EventContainerProps {
  nowEvent?: EventData | null;
  isLogin: boolean;
  userId: number | null;
  match: any;
  EventActions: any;
  CouponActions: any;
  CommentActions: any;
  userThumbsList: [];
}

const EventContainer: React.FunctionComponent<EventContainerProps> = ({
  nowEvent,
  isLogin,
  userId,
  match,
  EventActions,
  CouponActions,
  CommentActions,
  userThumbsList,
}: EventContainerProps) => {
  //

  useEffect(() => {
    EventActions.axiosUserEventRequest(match.params.eventurl);
    if (isLogin) {
      CommentActions.axiosCommentThumbListRequest(match.params.eventurl);
    }
  }, []);

  return (
    <div>
      <UserMenu isLogin={isLogin} />
      <DetailEvent nowEvent={nowEvent} isLogin={isLogin} CouponActions={CouponActions} />
      <CommentListBox
        isLogin={isLogin}
        commentList={nowEvent?.commentList}
        eventId={nowEvent?.id}
        userId={userId}
        userThumbsList={userThumbsList}
        CommentActions={CommentActions}
      ></CommentListBox>
    </div>
  );
};

export default connect(
  ({ event, user, comment }: StoreState) => ({
    nowEvent: event.nowEvent,
    isLogin: user.isLogin,
    userId: user.userId,
    userThumbsList: comment.userThumbsList,
  }),
  dispatch => ({
    EventActions: bindActionCreators(eventSlice.actions, dispatch),
    CouponActions: bindActionCreators(couponSlice.actions, dispatch),
    CommentActions: bindActionCreators(commentSlice.actions, dispatch),
  }),
)(EventContainer);
