import React from 'react';
import { EventData } from '../modules/event';

//------------------------------------------------------------------------------------

interface DetailEventProps {
  nowEvent?: EventData | null;
  isLogin: boolean;
  CouponActions: any;
}

const DetailEvent: React.FunctionComponent<DetailEventProps> = ({
  nowEvent,
  isLogin,
  CouponActions,
}: DetailEventProps) => {
  return (
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
  );
};

export default DetailEvent;
