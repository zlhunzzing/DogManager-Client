import React from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

//------------------------------------------------------------------------------------

interface EventBannerProps {
  condition?: string;
  banner?: any;
}

const EventBanner: React.FunctionComponent<EventBannerProps> = ({
  condition,
  banner,
}: EventBannerProps) => {
  if (condition === '진행중') {
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
          //   border: 'solid 1px',
        }}
      >
        <Link to={detailPageUrl}>
          <img style={{ width: '100%', height: 200 }} src={banner.bannerImage} />
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
  } else if (condition === '준비중') {
    return (
      <div
        style={{
          marginTop: 10,
          width: '30%',
          height: 200,
          position: 'relative',
          left: '35%',
          //   border: 'solid 1px',
        }}
      >
        <img
          style={{ width: '100%', height: 200 }}
          src="https://static.dogmate.co.kr/img/story/affiliate/main/banner-preparing.png"
        />
      </div>
    );
  } else if (condition === '종료') {
    return (
      <div
        style={{
          marginTop: 10,
          width: '30%',
          height: 200,
          position: 'relative',
          left: '35%',
          //   border: 'solid 1px',
        }}
      >
        <img style={{ width: '100%', height: 200 }} src={banner.bannerImage} />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default EventBanner;
