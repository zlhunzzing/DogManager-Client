import React from 'react';

interface ExProps {
  name: string;
  num: number;
}

function Ex({ name, num }: ExProps) {
  return <div>예시 컴포넌트</div>;
}

Ex.defaultProps = {
  num: 0,
};

export default Ex;
