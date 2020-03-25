//! 모듈
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

//! 컴포넌트
import { StoreState } from '../modules';
import { actionCreators as eventEditActions, initialState } from '../modules/eventEdit';
import { eventSlice } from '../modules/event';

import { couponSlice, CouponData } from '../modules/coupon';

import server from '../server';
//! Css
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { blue } from '@material-ui/core/colors';

import Button from '@material-ui/core/Button';

//? material - URL input
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }),
);
//? material- 시간날짜input
const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      width: 250,
      margin: 40,
      height: 40,
    },
  }),
);
//? 할일
//? 컴퍼넌트 나누기 form view 넣기 나누기

//? 날짜시간데이터 value "2020-03-18T23:00" -> DB 형식으로
export function makeDateTimeForm(input: string): string {
  if (input === '') {
    return '';
  }
  console.log(input);
  const ss =
    input.slice(0, 4) +
    input.slice(5, 7) +
    input.slice(8, 10) +
    input.slice(11, 13) +
    input.slice(14, 16);
  console.log(ss);
  return ss;
}

//? 날짜시간데이터 DB 형식 -> value
export function fillDateTimeInput(stringDate: string): string {
  if (stringDate === '') {
    return '';
  }
  return (
    stringDate.slice(0, 4) +
    '-' +
    stringDate.slice(4, 6) +
    '-' +
    stringDate.slice(6, 8) +
    'T' +
    stringDate.slice(8, 10) +
    ':' +
    stringDate.slice(10, 12)
  );
}

interface EventEditContainerProps {
  eventTitle: string;
  startDate: string;
  endDate: string;
  pageImage: File | null | Blob | string;
  bannerImage: File | null | Blob | string;
  buttonImage: File | null | Blob | string;
  couponCode: string;
  detailPageUrl: string;
  isChecked?: boolean;
  eventId?: string;
  EventEditActions: typeof eventEditActions;
  history: any;
  selectedEvent: string | null;
  CouponActions: any;
  adminCouponList: CouponData[];
}
//! 컴퍼넌트 작성
const EventEditContainer: React.FunctionComponent<EventEditContainerProps> = ({
  eventTitle,
  startDate,
  endDate,
  pageImage,
  bannerImage,
  buttonImage,
  couponCode,
  detailPageUrl,
  EventEditActions,
  isChecked,
  history,
  selectedEvent,
  CouponActions,
  adminCouponList,
}: EventEditContainerProps) => {
  const classes = useStyles();
  const classes2 = useStyles2();

  // 서버에서 이벤트 정보 가져오기

  const getEvent = async () => {
    const serverurl = server + '/api/admin/events/entry/' + selectedEvent;
    const res = await axios.get(serverurl, {
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    });
    EventEditActions.putOldData(res.data);
    // 체크박스 반영하면 오류나는데 왜그런지;
    if (res.data.endDate === '') {
      EventEditActions.changeIsChecked(true);
    } else {
      EventEditActions.changeIsChecked(false);
    }
    EventEditActions.changeStartDate(fillDateTimeInput(res.data.startDate));
    EventEditActions.changeEndDate(fillDateTimeInput(res.data.endDate));
  };
  //? 리액트 훅
  // 모든 함수들이 작동이 끝나면 useEffect 시작
  // 1. getEvent() 서버에서 이벤트 정보 가져오기
  // 2. state -> selectedEvent 채워져 있다면  기존에 데이터들을 가져온다.
  // 3. coupon등록되어잇는 list 들을 모두 가져오기 위해 request from coupon.ts(toolkit)함수를 사용한다.
  useEffect(() => {
    if (selectedEvent !== '') {
      getEvent();
    } else {
      EventEditActions.putOldData(initialState);
    }
    CouponActions.axiosAdminCouponListRequest();
  }, []);

  //? 이미지 업로드 함수
  function handleChangeImageFile(image: File, name: string): void {
    switch (name) {
      case 'pageImage':
        EventEditActions.changePageImage(image);
        break;
      case 'bannerImage':
        EventEditActions.changeBannerImage(image);
        break;
      case 'buttonImage':
        EventEditActions.changeButtonImage(image);
        break;
    }
  }

  //? 폼 데이터 제출

  function handleSubmitFormData(e: React.FormEvent): void {
    e.preventDefault();
    if (startDate.length > 16 || endDate.length > 16) {
      alert('날짜의 연도는 4자리를 넘어가지 않게 작성해주세요');
      return;
    }
    // 1. 새로 등록하는 경우

    if (selectedEvent === '') {
      if (
        eventTitle === '' ||
        startDate.length !== 16 ||
        pageImage === null ||
        bannerImage === null ||
        buttonImage === null ||
        couponCode === '' ||
        detailPageUrl === ''
      ) {
        alert('데이터를 다 채워주세요');
        return;
      }
      // 2. 수정하는 경우
    } else {
      if (
        eventTitle === '' ||
        startDate.length !== 16 ||
        couponCode === '' ||
        detailPageUrl === ''
      ) {
        alert('데이터를 다 채워주세요');
        return;
      }
    }
    if (detailPageUrl[0] !== '/') {
      alert('url은 /로 시작해서 작성해주세요');
      return;

      // 2. 수정하는 경우
    }
    const formData = new FormData();
    makeDateTimeForm(startDate);
    formData.append('eventTitle', eventTitle);
    formData.append('startDate', makeDateTimeForm(startDate));
    formData.append('endDate', makeDateTimeForm(endDate));

    if (pageImage !== null) {
      formData.append('pageImage', pageImage);
    }
    if (bannerImage !== null) {
      formData.append('bannerImage', bannerImage);
    }

    if (buttonImage !== null) {
      formData.append('buttonImage', buttonImage);
    }

    formData.append('couponCode', couponCode);
    formData.append('detailPageUrl', detailPageUrl);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: localStorage.getItem('accessToken'), //! 계속 401 에러
      },
    };

    // 새로 등록하는 경우
    if (selectedEvent === '') {
      const url = server + '/api/admin/events/entry';
      axios
        .post(url, formData, config)
        .then(res => {
          console.log(res);
          alert('제출이요');
          history.push('/admin/event-list');
        })
        .catch(err => {
          console.log(err.response);
          if (err.response.data === 'detailPageUrl') {
            alert('상세 페이지 url을 수정해주세요');
          } else if (err.response.data === 'buttonUrl') {
            alert('버튼 url을 수정해주세요');
          }
        });
    } else {
      // 수정하는 경우
      const url = server + '/api/admin/events/entry/' + selectedEvent;
      axios.put(url, formData, config).then(res => {
        console.log('수정: ', res);
        history.push('/admin/event-list');
      });
    }
  }

  // state 에 가져온 쿠폰 보여주기
  function showCouponListInput(): void {
    let couponInput: any;
    if (adminCouponList.length) {
      couponInput = (
        <div>
          <label
            style={{
              fontWeight: 'bold',
              paddingRight: 270,
              paddingLeft: -6,
              padding: -4,
              margin: -240,
            }}
          >
            쿠폰선택
          </label>
          <select
            onChange={(event): void => {
              const { value } = event.target;
              EventEditActions.changeCouponCode(value);
            }}
          >
            {' '}
            <option value="no">쿠폰리스트</option>
            {adminCouponList.map((coupon, index) => {
              if (coupon.couponCode === couponCode) {
                return (
                  <option selected={true} key={index} value={'' + coupon.couponCode}>
                    {coupon.couponName}
                  </option>
                );
              }
              return (
                <option key={index} value={'' + coupon.couponCode}>
                  {coupon.couponName}
                </option>
              );
            })}
          </select>
        </div>
      );
    } else {
      couponInput = (
        <div>
          <label
            style={{
              fontWeight: 'bold',
              paddingRight: 270,
              paddingLeft: -6,
              padding: -4,
              margin: -240,
            }}
          >
            쿠폰선택
          </label>
          <select>
            <option value="no">no coupon</option>
          </select>
        </div>
      );
    }
    return couponInput;
  }

  //? props 설정후 true 와 false 으로 값을 넗어준다.
  // state 에 있는 isChecked 값이 false 면 종료시간이 활성화
  // state 에 잇는 isChecked 값이 true 면 종료시간이 비활성화
  function showEndDate() {
    let endDateInput: any;
    if (isChecked) {
      endDateInput = (
        <TextField
          id="datetime-local"
          label="종료일시"
          type="datetime-local"
          disabled
          className={classes2.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event): void => {
            const { value } = event.target;
            EventEditActions.changeEndDate(value);
          }}
        />
      );
    } else {
      endDateInput = (
        <TextField
          id="datetime-local"
          label="종료일자"
          type="datetime-local"
          className={classes2.textField}
          InputLabelProps={{
            shrink: true,
          }}
          value={endDate}
          onChange={(event): void => {
            const { value } = event.target;
            EventEditActions.changeEndDate(value);
          }}
        />
      );
    }
    return endDateInput;
  }
  //? 미리보기핸들러함수 (이미지,베너페이지,하단버튼 업로드)
  // 인자로 file {} 받는다.
  // 만약 값이 string 이면 이미지를 업로드를 한상태가아니기때문에 null
  // 그게 아니면 Url.createObjectUrl 사용해서 인자로 받은 파일에 Url를 뽑아낸다.
  // 뽑아낸 URL은 img 속성 src 값으로 만든다. 그러면 갑이 보여진다.
  // 없을때는 disPlay:'none'
  function handleChangePreviewImageFile(image: File | null | Blob | string): void {
    let ret: any;
    if (typeof image === 'string') {
      ret = null;
    } else {
      if (image) {
        const pageUrl = URL.createObjectURL(image);
        ret = <img style={{ width: 400, height: 250 }} src={pageUrl}></img>;
      } else {
        ret = <img style={{ display: 'none' }}></img>;
      }
    }
    return ret;
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
        <div>이벤트 {selectedEvent === '' ? '등록' : '수정'}</div>
      </div>
      <Divider />

      <form
        style={{ margin: 20, height: 50, textAlign: 'center', paddingTop: 20 }}
        onSubmit={handleSubmitFormData}
      >
        <div className={classes.root}>
          <div>
            <span style={{ fontWeight: 'bold', paddingRight: 20 }}>이벤트 이름</span>
            <TextField
              id="standard-textarea"
              placeholder="타이틀을 적어주세요"
              style={{ paddingRight: 80 }}
              value={eventTitle}
              multiline
              onChange={(event): void => {
                const { value } = event.target;
                EventEditActions.changeEventTitle(value);
              }}
            />
          </div>
        </div>
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="start"
              control={<Checkbox color="primary" />}
              style={{ paddingTop: 20, paddingRight: 20, fontWeight: 'bold' }}
              label="상시"
              labelPlacement="start"
              checked={isChecked}
              onChange={(): void => {
                EventEditActions.changeIsChecked(!isChecked);
              }}
            />
          </FormGroup>
        </FormControl>
        <div>
          <span style={{ fontWeight: 'bold' }}>시작일시</span>
          <TextField
            id="datetime-local"
            label="시작일자"
            type="datetime-local"
            className={classes2.textField}
            InputLabelProps={{
              shrink: true,
            }}
            value={startDate}
            onChange={(event): void => {
              const { value } = event.target;
              EventEditActions.changeStartDate(value);
            }}
          />
        </div>
        <span style={{ fontWeight: 'bold' }}>종료 일시</span>
        <span>{showEndDate()}</span>
        <div>
          <span style={{ fontWeight: 'bold' }}>이미지 업로드</span>
          <input
            type="file"
            style={{ margin: 20, paddingRight: 40 }}
            id="pageImgFile"
            onChange={(event): void => {
              const { files } = event.target;
              if (files !== null) {
                handleChangeImageFile(files[0], 'pageImage');
              }
            }}
          ></input>
        </div>
        {handleChangePreviewImageFile(pageImage)}
        <div>
          <span style={{ fontWeight: 'bold' }}>배너페이지 업로드</span>
          <input
            type="file"
            style={{ margin: 10, paddingRight: 70 }}
            id="bannerImgFile"
            onChange={(event): void => {
              const { files } = event.target;
              if (files !== null) {
                handleChangeImageFile(files[0], 'bannerImage');
              }
            }}
          ></input>
        </div>
        {handleChangePreviewImageFile(bannerImage)}
        <div style={{ paddingBottom: 30 }}>
          <span style={{ fontWeight: 'bold' }}>하단버튼</span>
          <input
            type="file"
            style={{ margin: 20 }}
            id="buttonImgFile"
            onChange={(event): void => {
              const { files } = event.target;
              if (files !== null) {
                handleChangeImageFile(files[0], 'buttonImage');
              }
            }}
          ></input>
        </div>

        {handleChangePreviewImageFile(buttonImage)}
        {showCouponListInput()}
        <div className={classes.root}>
          <div style={{ paddingTop: 40, margin: -10 }}>
            <span style={{ fontWeight: 'bold', paddingRight: 39, margin: -21 }}>
              상세페이지 URL
            </span>
            <TextField
              id="standard-textarea"
              placeholder="상세 연결될 URL"
              style={{ paddingRight: 65 }}
              multiline
              value={detailPageUrl}
              onChange={(event): void => {
                const { value } = event.target;
                EventEditActions.changePageUrl(value);
              }}
            />
          </div>
        </div>
        <button style={{ margin: 20 }} type="submit">
          등록/수정
        </button>
      </form>
    </div>
  );
};

export default connect(
  ({ eventEdit, event, coupon }: StoreState) => ({
    eventTitle: eventEdit.eventTitle,
    startDate: eventEdit.startDate,
    endDate: eventEdit.endDate,
    pageImage: eventEdit.pageImage,
    bannerImage: eventEdit.bannerImage,
    buttonImage: eventEdit.buttonImage,
    couponCode: eventEdit.couponCode,
    detailPageUrl: eventEdit.detailPageUrl,
    isChecked: eventEdit.isChecked,
    selectedEvent: event.editEventId,
    adminCouponList: coupon.adminCouponList,
  }),
  dispatch => ({
    EventEditActions: bindActionCreators(eventEditActions, dispatch),
    EventActions: bindActionCreators(eventSlice.actions, dispatch),
    CouponActions: bindActionCreators(couponSlice.actions, dispatch),
  }),
)(EventEditContainer);
