import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { eventSlice } from '../modules/event';
import { bindActionCreators } from 'redux';
import { EventData } from '../modules/event';

import axios from 'axios';
import serverurl from '../server';
import moment from 'moment';

// import { eventCondition } from './AdminEventListContainer';
import UserMenu from '../views/UserMenu';

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
  // 서버에서 고객용 이벤트리스트 가져오기
  const getEventLists = async () => {
    // const res = await axios.get(serverurl + '/api/user/events/list');
    // const { eventList } = res.data;
    // eventList.forEach((event: any) => {
    //   const condition = eventCondition(event.startDate, event.endDate);
    //   event.condition = condition;
    // });
    // let filterdList = eventList.filter((element: any) => {
    //   return element.condition === '진행중';
    // });
    // if (filterdList.length < 4) {
    //   filterdList = eventList.filter((element: any) => {
    //     return element.condition === '진행중' || element.condition === '준비중';
    //   });
    // }
    // UserEventActions.ChangeEventLists(filterdList);
  };

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
  ({ event }: StoreState) => ({
    userEventList: event.userEventList,
  }),
  dispatch => ({
    EventActions: bindActionCreators(eventSlice.actions, dispatch),
  }),
)(EventListContainer);
