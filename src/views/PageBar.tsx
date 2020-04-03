import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

interface PageBarProps {
  pages: number;
  currentPage: number;
  changePage: (page: number) => void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

const PageBar: React.FunctionComponent<PageBarProps> = ({
  pages,
  currentPage,
  changePage,
}: PageBarProps) => {
  const classes = useStyles();

  const buttons = [];
  for (let i = 1; i <= pages; i++) {
    if (i === currentPage) {
      buttons.push(
        <Button
          className={classes.root}
          color="primary"
          disabled
          style={{
            backgroundColor: '#D8D8D8',
            margin: 10,
            fontSize: 20,
            // textAlign: 'blod',
          }}
          key={i}
        >
          {i}
        </Button>,
      );
    } else {
      buttons.push(
        <Button
          className={classes.root}
          color="primary"
          // style={{ mar }}
          onClick={() => {
            changePage(i);
          }}
          key={i}
        >
          {i}
        </Button>,
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
