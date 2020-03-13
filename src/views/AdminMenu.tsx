import React from 'react';

interface AdminMenuProps {
  nowMenu: string;
}

function AdminMenu({ nowMenu }: AdminMenuProps) {
  return (
    <div>
      <button>메뉴</button>
      <span>{nowMenu}</span>
    </div>
  );
}

AdminMenu.defaultProps = {
  nowMenu: '이벤트 리스트',
};

export default AdminMenu;
