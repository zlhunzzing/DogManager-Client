import React from 'react';
import UserMenu from '../views/UserMenu';

const CouponListContainer: React.FunctionComponent = () => {
  // 로그인되었는지 확인 필요한 컴ㅁ포넌트임
  // 이 페이지가 페이지 상단에 링크를 가지고 있는건 로그인 되었을 때만 생기는 것이 맞나?
  // 쿠폰 리스트 서버로부터 가져오는 로직 (요청 헤더에 토큰 같이 보냄)
  return (
    <div>
      <UserMenu />
      <div> 발급된 쿠폰을 확인할 수 있는 페이지 용도로만 사용</div>
      <div
        style={{
          textAlign: 'center',
          marginLeft: '15%',
          backgroundColor: 'yellow',
          width: '70%',
        }}
      >
        <h1> 나의 쿠폰함 </h1>
        <div style={{ marginLeft: '25%', width: '50%', border: 'solid 1px' }}>
          <div>쿠폰이름 / 쿠폰 간단 설명 /만료날짜 </div>
        </div>
      </div>
    </div>
  );
};

export default CouponListContainer;
