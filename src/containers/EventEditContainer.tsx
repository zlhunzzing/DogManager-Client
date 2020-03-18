import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as eventEditActions, initialState } from '../modules/eventEdit';
import { actionCreators as eventActions } from '../modules/event';
import { bindActionCreators } from 'redux';

import axios from 'axios';
import server from '../server';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

//? 체크박스  material
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { blue } from '@material-ui/core/colors';
//?

//! material - URL input
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

//! material- 시간날짜input
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

// 날짜시간데이터 value "2020-03-18T23:00" -> DB 형식으로
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

// 날짜시간데이터 DB 형식 -> value
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
  buttonUrl: string;
  detailPageUrl: string;
  isChecked?: boolean;
  eventId?: string;
  EventEditActions: typeof eventEditActions;
  history: any;
  selectedEvent: string | null;
}
//! 컴퍼넌트 작성
const EventEditContainer: React.FunctionComponent<EventEditContainerProps> = ({
  eventTitle,
  startDate,
  endDate,
  pageImage,
  bannerImage,
  buttonImage,
  buttonUrl,
  detailPageUrl,
  EventEditActions,
  isChecked,
  history,
  selectedEvent,
}: EventEditContainerProps) => {
  const classes = useStyles();
  const classes2 = useStyles2();

  // 서버에서 이벤트 정보 가져오기
  const getEvent = async () => {
    const serverurl = server + '/api/admin/events/entry/' + selectedEvent;
    const res = await axios.get(serverurl);
    EventEditActions.putOldData(res.data);
    console.log(res.data.endDate);
    // 체크박스 반영하면 오류나는데 왜그런지;
    if (res.data.endDate === '') {
      EventEditActions.changeIsChecked(true);
    } else {
      EventEditActions.changeIsChecked(false);
    }
    EventEditActions.changeStartDate(fillDateTimeInput(res.data.startDate));
    EventEditActions.changeEndDate(fillDateTimeInput(res.data.endDate));
  };

  // 리액트 훅?
  useEffect(() => {
    if (selectedEvent !== '') {
      getEvent();
    } else {
      EventEditActions.putOldData(initialState);
    }
  }, []);

  // 이미지 업로드 함수
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

  // ! 폼 데이터 제출
  function handleSubmitFormData(e: React.FormEvent): void {
    e.preventDefault();
    if (startDate.length > 16 || endDate.length > 16) {
      alert('날짜의 연도는 4자리를 넘어가지 않게 작성해주세요');
      return;
    }
    // 1. 새로 등록하는 경우
    if (selectedEvent === null) {
      if (
        eventTitle === '' ||
        startDate.length !== 16 ||
        pageImage === null ||
        bannerImage === null ||
        buttonImage === null ||
        buttonUrl === '' ||
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
        buttonUrl === '' ||
        detailPageUrl === ''
      ) {
        alert('데이터를 다 채워주세요');
        return;
      }
    }
    if (buttonUrl[0] !== '/' || detailPageUrl[0] !== '/') {
      alert('url은 /로 시작해서 작성해주세요');
      return;
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

    formData.append('buttonUrl', buttonUrl);
    formData.append('detailPageUrl', detailPageUrl);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    // 새로 등록하는 경우
    if (selectedEvent === '') {
      const url = server + '/api/admin/events/entry';
      axios.post(url, formData, config).then(res => {
        console.log(res);
        history.push('/admin/event-list');
      });
      alert('제출이요');
    } else {
      // 수정하는 경우
      const url = server + '/api/admin/events/entry/' + selectedEvent;
      axios.put(url, formData, config).then(res => {
        console.log(res);
        history.push('/admin/event-list');
      });
    }
  }

  //! props 설정후 true 와 false 으로 값을 넗어준다.
  //! state 에 있는 isChecked 값이 false 면 종료시간이 활성화
  //! state 에 잇는 isChecked 값이 true 면 종료시간이 비활성화
  let endDateInput: JSX.Element;
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
  //! 이미지파일업로드 미리보기
  let pageImgInput: JSX.Element;
  if (pageImage) {
    const pageUrl = URL.createObjectURL(pageImage);

    pageImgInput = <img style={{ width: 400, height: 250 }} src={pageUrl}></img>;
  } else {
    pageImgInput = <img style={{ display: 'none' }}></img>;
  }

  //! 배너페이지이미지업로드 미리보기
  let bannerImgInput: JSX.Element;
  if (bannerImage) {
    const bannerUrl = URL.createObjectURL(bannerImage);

    bannerImgInput = <img style={{ width: 400, height: 250 }} src={bannerUrl}></img>;
  } else {
    bannerImgInput = <img style={{ display: 'none' }}></img>;
  }
  //! 하단버튼이미지업로드 미리보기
  let buttonImgInput: JSX.Element;
  if (buttonImage) {
    const buttonInputUrl = URL.createObjectURL(buttonImage);

    buttonImgInput = <img style={{ width: 400, height: 250 }} src={buttonInputUrl}></img>;
  } else {
    buttonImgInput = <img style={{ display: 'none' }}></img>;
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
              // label="타이틀"
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
        <span>{endDateInput}</span>
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
        {pageImgInput}
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
        {bannerImgInput}
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
        {buttonImgInput}
        <div className={classes.root}>
          <div>
            <span style={{ fontWeight: 'bold' }}> 하단버튼 URL</span>
            <TextField
              id="standard-textarea"
              placeholder="버튼이미지 URL"
              style={{ paddingRight: 50, paddingTop: 20 }}
              multiline
              value={buttonUrl}
              onChange={(event): void => {
                const { value } = event.target;
                EventEditActions.changeButtonUrl(value);
              }}
            />
          </div>

          <div>
            <span style={{ fontWeight: 'bold' }}>상세페이지 URL</span>
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
  ({ eventEdit, event }: StoreState) => ({
    eventTitle: eventEdit.eventTitle,
    startDate: eventEdit.startDate,
    endDate: eventEdit.endDate,
    pageImage: eventEdit.pageImage,
    bannerImage: eventEdit.bannerImage,
    buttonImage: eventEdit.buttonImage,
    buttonUrl: eventEdit.buttonUrl,
    detailPageUrl: eventEdit.detailPageUrl,
    isChecked: eventEdit.isChecked,
    selectedEvent: event.selectedEvent,
  }),
  dispatch => ({
    EventEditActions: bindActionCreators(eventEditActions, dispatch),
    EventActions: bindActionCreators(eventActions, dispatch),
  }),
)(EventEditContainer);

// function startDateChangeHandler(event: React.FormEvent<HTMLInputElement>): void {
//   const date = event.currentTarget.value;
//   if (date) {
//     const dateTime = date
//       .split('')
//       .join('')
//       .match(/\d+/g)
//       ?.join('');
//     if (dateTime !== undefined) {
//       EventEditActions.changeStartDate(dateTime);
//     }
//   }
// }

// //! 이벤트설정: 이미지파일업로드
// function fileChangeHandler(event: React.FormEvent<HTMLInputElement>): void {
//   console.log('target: ', event.currentTarget.files);
//   const imageFile = event.currentTarget.files;
//   if (imageFile) {
//     EventEditActions.changePageImage(imageFile[0]);
//   }
// }

// //! 이벤트설정: 배너페이지이미지업로드
// function bannerChangeHandler(event: React.FormEvent<HTMLInputElement>): void {
//   console.log('target: ', event.currentTarget.files);
//   const banner = event.currentTarget.files;
//   if (banner) {
//     EventEditActions.changeBannerImage(banner[0]);
//   }
// }
// //! 이벤트설정: 하단버튼이미지업로드
// function lowerButtonChangeHandler(event: React.FormEvent<HTMLInputElement>): void {
//   console.log('target: ', event.currentTarget.files);
//   const lowerButton = event.currentTarget.files;
//   if (lowerButton) {
//     EventEditActions.changeButtonImage(lowerButton[0]);
//   }
// }
