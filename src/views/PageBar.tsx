import React from 'react';

interface PageBarProps {
  pages: number;
  currentPage: number;
  changePage: (page: number) => void;
}

const PageBar: React.FunctionComponent<PageBarProps> = ({
  pages,
  currentPage,
  changePage,
}: PageBarProps) => {
  const buttons = [];
  for (let i = 1; i <= pages; i++) {
    if (i === currentPage) {
      buttons.push(
        <button disabled style={{ backgroundColor: '#D8D8D8' }} key={i}>
          {i}
        </button>,
      );
    } else {
      buttons.push(
        <button
          onClick={() => {
            changePage(i);
          }}
          key={i}
        >
          {i}
        </button>,
      );
    }
  }

  return (
    <div
      style={{
        width: '30%',
        left: '35%',
        textAlign: 'center',
        bottom: '20px',
        position: 'fixed',
      }}
    >
      {buttons}
    </div>
  );
};

export default PageBar;
