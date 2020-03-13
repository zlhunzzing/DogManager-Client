import React from 'react';

interface EventItemProps {
  event_title: string;
  start_date: string;
  end_date: string;
  detail_page_url: string;
  /* skip_optional?: string; 있어도 없어도 상관없는 props 받을 때*/
  /* 함수를 props로 받을 때 형식
  onClick: (name: string) => void; // 아무것도 리턴하지 않는다는 함수를 의미합니다.
  */
}

function EventItem({
  event_title,
  start_date,
  end_date,
  detail_page_url,
}: EventItemProps) {
  // const handleClick = () => onClick(name);
  return <div>Hello</div>;
}

EventItem.defaultProps = {
  event_title: '예시',
  start_date: '예시',
  end_date: '예시',
  detail_page_url: '예시',
};

export default EventItem;
