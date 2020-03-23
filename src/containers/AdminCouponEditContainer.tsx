// 모듈
import React from 'react';
import axios from 'axios';

// 로컬에서  가져오기
import server from '../server';

// css
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

// {
//   couponName:
//   couponCode:
//   description:
//   period: (숫자형, 일 기준)
//   discount:
// }

// const signupButton = (
//   <Link to="/user/signup">
//   <Button style={{ width: 100, marginRight: 10 }} variant="outlined">
//     등록
//   </Button>
//   </Link>
// );
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(5),
        width: 500,
      },
    },
  }),
);

const AdminCouponEditContainer: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div>
      <div
        style={{
          height: 50,
          textAlign: 'center',
          fontSize: '35px',
          fontWeight: 'bold',
          paddingBottom: 20,
        }}
      >
        <div style={{ height: '25%' }}></div>
        <div>쿠폰등록</div>
      </div>
      <Divider />
      <form style={{ margin: 20, height: 50, textAlign: 'center', paddingTop: 40 }}>
        <div className={classes.root}>
          <div style={{ paddingRight: 50, paddingTop: 20, margin: 10 }}>
            <span style={{ fontWeight: 'bold', paddingRight: 20 }}> 쿠폰이름</span>
            <TextField
              id="standard-textarea"
              style={{ paddingRight: 50 }}
              placeholder="쿠폰 이름을 작성해주세요"
              multiline
            />
          </div>
          <div style={{ paddingRight: 50, paddingTop: 20, margin: 10 }}>
            <span style={{ fontWeight: 'bold' }}>쿠폰코드</span>
            <TextField
              id="standard-textarea"
              placeholder="쿠폰 코드를 작성해주세요"
              style={{ paddingRight: 65 }}
              multiline
            />
          </div>
          <div style={{ paddingRight: 50, paddingTop: 20, margin: 10 }}>
            <span style={{ fontWeight: 'bold' }}>쿠폰 설명</span>
            <TextField
              id="standard-textarea"
              placeholder="쿠폰설명을 적어주세요"
              style={{ paddingRight: 65 }}
              multiline
            />
          </div>
          <div style={{ paddingRight: 50, paddingTop: 20, margin: 10 }}>
            <span style={{ fontWeight: 'bold' }}>쿠폰 유효기간</span>
            <TextField
              id="standard-textarea"
              placeholder="얼마간 쿠폰이 유효한지 숫자만 적어주세요 ex) 7 <- 7일동안 유효"
              style={{ paddingRight: 65 }}
              multiline
            />
          </div>
          <div style={{ paddingRight: 50, paddingTop: 20, margin: 10 }}>
            <span style={{ fontWeight: 'bold' }}>할인 적용</span>
            <TextField
              id="standard-textarea"
              placeholder="ex) 50% 3000원"
              style={{ paddingRight: 65 }}
              multiline
            />
          </div>
        </div>
        <Button style={{ width: 100, marginRight: 10 }} variant="outlined">
          등록
        </Button>
      </form>
    </div>
  );
};

export default AdminCouponEditContainer;
