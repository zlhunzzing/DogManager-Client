import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { eventSlice, EventData } from '../modules/event';
import { bindActionCreators } from 'redux';

import moment from 'moment';

import UserMenu from '../views/UserMenu';

//////////////////////////////////////////////////////////////////////////////////////

interface EventListContainerProps {
  userEventList: EventData[];
  EventActions: any;
}

// 날짜로 태그 만드는 함수
function makeTag(startDate: string, endDate: string): string {
  let tag: string;
  const now = Number(moment(new Date()).format('YYYYMMDDHHmm'));
  if (endDate === '' && startDate) {
    tag = '상시';
  }
  return endDate;
}

const EventListContainer: React.FunctionComponent<EventListContainerProps> = ({
  userEventList,
  EventActions,
}: EventListContainerProps) => {
  //
  useEffect(() => {
    EventActions.axiosUserEventListRequest();
  }, []);

  return (
    <div>
      <UserMenu />
      <div style={{ height: 50 }}></div>
      {userEventList.map((banner, index) => {
        const detailPageUrl = '/user/event' + banner.detailPageUrl;
        return (
          <div style={{ textAlign: 'center', marginTop: 10 }} key={index}>
            <Link
              to={detailPageUrl}
              onClick={() => {
                EventActions.changeNowEventUrl(banner.detailPageUrl);
              }}
            >
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
  ({ event }: StoreState) => ({
    userEventList: event.userEventList,
  }),
  dispatch => ({
    EventActions: bindActionCreators(eventSlice.actions, dispatch),
  }),
)(EventListContainer);
