// 모듈
import React from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

// 파일 불러오기
import { adminCouponPostUrl } from '../server';
import { StoreState } from '../modules';
import { actionCreators as couponEditActions } from '../modules/couponEdit';

// css
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

export interface CouponEditContainerProps {
  couponName: string;
  couponPageCode: string;
  couponDesc: string;
  couponPeriod: string;
  couponDiscount: string;
  history: any;
  CouponEditActions: typeof couponEditActions;
}
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
const AdminCouponEditContainer: React.FunctionComponent<CouponEditContainerProps> = ({
  CouponEditActions,
  couponName,
  couponPageCode,
  couponPeriod,
  couponDesc,
  couponDiscount,
  history,
}: CouponEditContainerProps) => {
  const classes = useStyles();

  function handleSubmitCouponFormData(e: React.FormEvent): void {
    e.preventDefault();
    alert('성공');
  }

  //! input Hander 함수들....
  const handlCouponNameInputChange = (value: string): any => {
    CouponEditActions.changeCouponName(value);
  };
  const handlCouponPageCodeInputChange = (value: string): any => {
    CouponEditActions.changeCouponPageCode(value);
  };
  const handlCouponDescInputChange = (value: string): any => {
    CouponEditActions.changeCouponDesc(value);
  };
  const handlCouponPeriodInputChange = (value: string): any => {
    CouponEditActions.changeCouponPeriod(value);
  };
  const handlCouponDiscountInputChange = (value: string): any => {
    CouponEditActions.changeCouponDiscount(value);
  };

  //! 디바운스 함수들 ..

  const dbCouponNameInputChange = debounce(handlCouponNameInputChange, 700);
  const dbCouponPageCodeInputChange = debounce(handlCouponPageCodeInputChange, 700);
  const dbCouponDescInputChange = debounce(handlCouponDescInputChange, 700);
  const dbCouponPeriodInputChange = debounce(handlCouponPeriodInputChange, 700);
  const dbCouponDiscountInputChange = debounce(handlCouponDiscountInputChange, 700);

  // API 함수 서버에 회원가입정보 post 요청
  async function handleSubmitCouponEdit(e: React.FormEvent) {
    e.preventDefault();
    //? 만약 사용자가 빈칸을 하나라도 남긴다면 경고창
    if (
      couponName === '' ||
      couponPageCode === '' ||
      couponDesc === '' ||
      couponPeriod === '' ||
      couponDiscount === ''
    ) {
      alert('데이터를 다 채워주세요~');
      return;
      //? 만약 사용자가 쿠폰기간을 숫자로 입력하지 않는다면 경고창
    } else if (!Number(couponPeriod)) {
      alert('쿠폰유효기간은 숫자로 입력해주세요');
      return;
    }
    const options = {
      headers: {
        //? 토큰을 헤더에 담는다.
        Authorization: localStorage.getItem('accessToken'),
        withCredentials: true,
      },
    };
    try {
      const res = await axios.post(
        adminCouponPostUrl,
        {
          couponName: couponName,
          couponCode: couponPageCode,
          description: couponDesc,
          period: Number(couponPeriod),
          discount: couponDiscount,
        },
        options,
      );
      console.log('status', res.status);
      alert('쿠폰이 등록되었습니다.');
      history.push('/admin/coupon');
    } catch (error) {
      console.log('error????: ', error);
      if (error.response.data === 'couponName already exist') {
        alert('쿠폰이름이 이미 존재합니다.');
      } else if (error.response.data === 'couponCode already exist') {
        alert('쿠폰코드가  이미 존재합니다.');
      }
    }
  }
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
      <form
        style={{ margin: 20, height: 50, textAlign: 'center', paddingTop: 40 }}
        onSubmit={handleSubmitCouponEdit}
      >
        <div className={classes.root}>
          <div style={{ paddingRight: 50, paddingTop: 20, margin: 10 }}>
            <span style={{ fontWeight: 'bold', paddingRight: 20 }}> 쿠폰이름</span>
            <TextField
              id="standard-textarea"
              style={{ paddingRight: 50 }}
              placeholder="쿠폰 이름을 작성해주세요"
              multiline
              onChange={(event): void => {
                const { value } = event.target;
                dbCouponNameInputChange(value);
              }}
            />
          </div>
          <div style={{ paddingRight: 50, paddingTop: 20, margin: 10 }}>
            <span style={{ fontWeight: 'bold' }}>쿠폰코드</span>
            <TextField
              id="standard-textarea"
              placeholder="쿠폰 코드를 작성해주세요"
              style={{ paddingRight: 65 }}
              multiline
              onChange={(event): void => {
                const { value } = event.target;
                dbCouponPageCodeInputChange(value);
              }}
            />
          </div>
          <div style={{ paddingRight: 50, paddingTop: 20, margin: 10 }}>
            <span style={{ fontWeight: 'bold' }}>쿠폰 설명</span>
            <TextField
              id="standard-textarea"
              placeholder="쿠폰설명을 적어주세요"
              style={{ paddingRight: 65 }}
              multiline
              onChange={(event): void => {
                const { value } = event.target;
                dbCouponDescInputChange(value);
              }}
            />
          </div>
          <div style={{ paddingRight: 50, paddingTop: 20, margin: 10 }}>
            <span style={{ fontWeight: 'bold' }}>쿠폰 유효기간</span>
            <TextField
              id="standard-textarea"
              placeholder="얼마간 쿠폰이 유효한지 숫자만 적어주세요 ex) 7 <- 7일동안 유효"
              style={{ paddingRight: 65 }}
              multiline
              onChange={(event): void => {
                const { value } = event.target;
                dbCouponPeriodInputChange(value);
              }}
            />
          </div>
          <div style={{ paddingRight: 50, paddingTop: 20, margin: 10 }}>
            <span style={{ fontWeight: 'bold' }}>할인 적용</span>
            <TextField
              id="standard-textarea"
              placeholder="ex) 50% 3000원"
              style={{ paddingRight: 65 }}
              multiline
              onChange={(event): void => {
                const { value } = event.target;
                dbCouponDiscountInputChange(value);
              }}
            />
          </div>
        </div>
        <Button style={{ width: 100, marginRight: 10 }} variant="outlined" type="submit">
          등록
        </Button>
      </form>
    </div>
  );
};

//! 5. connect 만들기
//? ({ couponEdit }: StoreState) => ({
//? couponEdit 이것은 어디서부터 불러오는가?????..
export default connect(
  ({ couponEdit }: StoreState) => ({
    couponName: couponEdit.couponName,
    couponPageCode: couponEdit.couponPageCode,
    couponDesc: couponEdit.couponDesc,
    couponPeriod: couponEdit.couponPeriod,
    couponDiscount: couponEdit.couponDiscount,
  }),
  dispatch => ({
    CouponEditActions: bindActionCreators(couponEditActions, dispatch),
  }),
)(AdminCouponEditContainer);
