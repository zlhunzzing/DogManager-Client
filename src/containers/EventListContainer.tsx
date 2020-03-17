import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as userEventActions } from '../modules/userEvent';
import { bindActionCreators } from 'redux';
import { EventData } from '../modules/event';

import axios from 'axios';
import serverurl from '../server';

import UserMenu from '../views/UserMenu';

interface EventListContainerProps {
  eventLists: EventData[];
  UserEventActions: typeof userEventActions;
}

const EventListContainer: React.FunctionComponent<EventListContainerProps> = ({
  eventLists,
  UserEventActions,
}: EventListContainerProps) => {
  // 서버에서 고객용 이벤트리스트 가져오기
  const getEventLists = async () => {
    const res = await axios.get(serverurl + '/api/user/events/list');
    const { eventList } = res.data;
    UserEventActions.ChangeEventLists(eventList);
  };

  useEffect(() => {
    console.log('유즈이펙트');
    getEventLists();
  }, []);

  return (
    <div>
      <UserMenu />
      <div style={{ height: 50 }}></div>
      {eventLists.map((banner, index) => {
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
  ({ userEvent }: StoreState) => ({
    eventLists: userEvent.eventLists,
  }),
  dispatch => ({
    UserEventActions: bindActionCreators(userEventActions, dispatch),
  }),
)(EventListContainer);
