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
  // 준비중 이벤트 리스트
  const preparedEvent = userEventList.filter(event => {
    return event.condition === '준비중';
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
        const detailPageUrl = '/user/event' + banner.detailPageUrl;
        let tag;
        if (banner.endDate === '') {
          tag = '상시';
        } else {
          const now = moment(new Date());
          const end = moment(banner.endDate, 'YYYYMMDDHHmm');
          const diff = moment.duration(end.diff(now)).asDays();
          if (1 < diff && diff < 14) {
            tag = `${Math.floor(diff + 1)}일 남음`;
          } else if (0 < diff) {
            console.log('여기');
          }
        }
        return (
          <div
            style={{
              marginTop: 10,
              width: '30%',
              height: 200,
              position: 'relative',
              left: '35%',
              border: 'solid 1px',
            }}
            key={index}
          >
            <Link to={detailPageUrl}>
              <img
                style={{ width: '100%', height: 200, border: 'solid 1px' }}
                src={banner.bannerImage}
              />
              {tag ? (
                <div
                  style={{
                    padding: '5px 10px',
                    backgroundColor: 'gray',
                    textAlign: 'center',
                    position: 'absolute',
                    bottom: '0%',
                    right: '0%',
                  }}
                >
                  {tag}
                </div>
              ) : null}
            </Link>
          </div>
        );
      })}
      {onGoingEvent.length < 4
        ? preparedEvent.map((banner, index) => {
            return (
              <div
                style={{
                  marginTop: 10,
                  width: '30%',
                  height: 200,
                  position: 'relative',
                  left: '35%',
                  border: 'solid 1px',
                }}
                key={index}
              >
                <img
                  style={{ width: '100%', height: 200, border: 'solid 1px' }}
                  src={banner.bannerImage}
                />
                <div
                  style={{
                    padding: '5px 10px',
                    backgroundColor: 'gray',
                    textAlign: 'center',
                    position: 'absolute',
                    bottom: '0%',
                    right: '0%',
                  }}
                >
                  준비중
                </div>
              </div>
            );
          })
        : null}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => {
            setEndList(!endList);
          }}
        >
          종료된 이벤트
        </button>
      </div>
      {endList
        ? endEvent.map((banner, index) => {
            return (
              <div
                style={{
                  marginTop: 10,
                  width: '30%',
                  height: 200,
                  position: 'relative',
                  left: '35%',
                  border: 'solid 1px',
                }}
                key={index}
              >
                <img
                  style={{ width: '100%', height: 200, border: 'solid 1px' }}
                  src={banner.bannerImage}
                />
              </div>
            );
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
