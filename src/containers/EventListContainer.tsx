import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as userEventActions } from '../modules/userEvent';
import { bindActionCreators } from 'redux';
import { EventData } from '../modules/event';

import UserMenu from '../views/UserMenu';

interface EventListContainerProps {
  eventLists: EventData[];
}

const EventListContainer: React.FunctionComponent<EventListContainerProps> = ({
  eventLists,
}: EventListContainerProps) => {
  return (
    <div>
      <UserMenu />
      {eventLists.map((banner, index) => {
        const detailPageUrl = '/user/event' + banner.detailPageUrl;
        return (
          <div key={index}>
            <Link to={detailPageUrl}>
              <img src={banner.bannerImage} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default connect(
  ({ userEvent }: StoreState) => ({
    eventLists: userEvent.eventLists,
  }),
  dispatch => ({
    UserEventActions: bindActionCreators(userEventActions, dispatch),
  }),
)(EventListContainer);
