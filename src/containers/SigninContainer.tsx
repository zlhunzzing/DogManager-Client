import React from 'react';

interface SigninContainerProps {
  isAdmin: boolean;
}

function SigninContainer({ isAdmin }: SigninContainerProps) {
  // input 박스 change => 스토어 스테이트 업데이트

  // 로그인 버튼 눌렀을 때
  // 서버에 로그인 요청
  // isAdmin으로 구분해서 요청

  let version: string;
  if (isAdmin) {
    version = '관리자';
  } else {
    version = '고객';
  }
  return (
    <div>
      <div>{version}로그인 컨테이너</div>
      <input placeholder="아이디"></input>
      <input placeholder="비번"></input>
      <button>로그인</button>
    </div>
  );
}

export default SigninContainer;
