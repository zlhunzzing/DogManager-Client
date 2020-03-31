//! 모듈
import React from 'react';
//! 컴포넌트
import AdminMenu from '../views/AdminMenu';
import AdminSupportView from '../views/AdminSupportView';
//! css
import Divider from '@material-ui/core/Divider';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      paddingTop: 50,
      maxWidth: 460,
      paddingLeft: 670,
      backgroundColor: theme.palette.background.paper,
      fontSize: 50,
    },
  }),
);

export interface FakeChatDataProps {
  userName: string;
  userId: string;
}

const fakeChatData: FakeChatDataProps[] = [
  {
    userName: 'jj',
    userId: 'jungstring',
  },
  {
    userName: 'tim',
    userId: '12323tring',
  },
  {
    userName: 'esther',
    userId: 'asd1212',
  },
  {
    userName: 'Tom',
    userId: 'sds12d123g',
  },
  {
    userName: 'kim',
    userId: 'junsdg',
  },
];

const AdminSupportContainer: React.FunctionComponent = () => {
  const classes = useStyles();
  console.log('fakeChatData:', fakeChatData);
  return (
    <div>
      <AdminMenu />
      <div
        style={{
          height: 50,
          textAlign: 'center',
          fontSize: '35px',
          fontWeight: 'bold',
          paddingBottom: 20,
        }}
      >
        <div style={{ height: '75%' }}></div>
        <div>현재 채팅 방 </div>
      </div>
      <Divider />
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <List component="nav" className={classes.root} aria-label="contacts">
          {fakeChatData
            ? fakeChatData.map((chatRoom, index) => {
                return <AdminSupportView key={index} chatRoom={chatRoom} />;
              })
            : null}
        </List>
      </div>
    </div>
  );
};

export default AdminSupportContainer;
