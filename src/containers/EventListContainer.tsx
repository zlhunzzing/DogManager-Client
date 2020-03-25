import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { eventSlice, EventData } from '../modules/event';
import { bindActionCreators } from 'redux';

import UserMenu from '../views/UserMenu';

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

  return (
    <div>
      <UserMenu isLogin={isLogin} />
      <div style={{ height: 50 }}></div>
      {userEventList.map((banner, index) => {
        const detailPageUrl = '/user/event' + banner.detailPageUrl;
        return (
          <div style={{ textAlign: 'center', marginTop: 10 }} key={index}>
            <Link to={detailPageUrl}>
              <img
                style={{ width: 500, height: 200, border: 'solid 1px' }}
                src={banner.bannerImage}
              />
            </Link>
          </div>
        );
      })}
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
