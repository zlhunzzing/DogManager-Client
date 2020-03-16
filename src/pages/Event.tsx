import React from 'react';
import { RouteComponentProps } from 'react-router';
import UserMenu from '../views/UserMenu';
interface Props {
  id: string;
}
const Event = () => {
  //console.log(match.params.eventurl);
  //url로 id알아내서 상세페이지 이미지 가져와서 렌더링하기
  return (
    <div>
      <UserMenu />
      <div>상세페이지 이미지</div>
    </div>
  );
};

export default Event;
