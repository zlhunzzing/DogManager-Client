import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as eventEditActions } from '../modules/eventEdit';
import { bindActionCreators } from 'redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
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

interface EventEditContainerProps {
  eventTitle: string;
  startDate: string;
  endDate: string;
  pageImage: File | null | Blob;
  bannerImage: File | null | Blob;
  buttonImage: File | null | Blob;
  buttonUrl: string;
  detailPageUrl: string;
  isChecked: boolean;
  EventEditActions: typeof eventEditActions;
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
}: EventEditContainerProps) => {
  const classes = useStyles();
  const classes2 = useStyles2();

  //! 이벤트설정: 타이틀

  //! 이벤트설정: 시작일(데이터 형식) 202003131300 년월일시간분

  //! 이벤트설정: 종료일(데이터 형식) 202003131300 년월일시간분

  //! 이벤트설정: 이미지파일업로드
  function fileChangeHandler(event: React.FormEvent<HTMLInputElement>): void {
    console.log('target: ', event.currentTarget.files);

    const imageFile = event.currentTarget.files;
    if (imageFile) {
      EventEditActions.changePageImage(imageFile[0]);
    }
  }

  //! 이벤트설정: 배너페이지이미지업로드
  function bannerChangeHandler(event: React.FormEvent<HTMLInputElement>): void {
    console.log('target: ', event.currentTarget.files);

    const banner = event.currentTarget.files;
    if (banner) {
      EventEditActions.changeBannerImage(banner[0]);
    }
  }
  //! 이벤트설정: 하단버튼이미지업로드
  function lowerButtonChangeHandler(event: React.FormEvent<HTMLInputElement>): void {
    console.log('target: ', event.currentTarget.files);

    const lowerButton = event.currentTarget.files;
    if (lowerButton) {
      EventEditActions.changeButtonImage(lowerButton[0]);
    }
  }
  //! 이벤트설정: 하단버튼 URL입력(하단버튼 연결)

  //! 이벤트설정: URL입력(상세페이지)

  //! 이벤트설정: 상시버튼(상시버튼 클릭시 종료시간disable됨)

  // ! 폼 데이터 제출
  function handleSubmitFormData(e: React.FormEvent): void {
    e.preventDefault();
    const formData = new FormData();
    formData.append('eventTitle', eventTitle);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    if (pageImage !== null) {
      formData.append('pageImageFile', pageImage);
    }

    if (bannerImage !== null) {
      formData.append('bannerImageFile', bannerImage);
    }

    if (buttonImage !== null) {
      formData.append('bannerImageFile', buttonImage);
    }
    formData.append('buttonUrl', buttonUrl);
    formData.append('detailPageUrl', detailPageUrl);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    console.log(formData);
    axios.post('http://localhost:3001/test', formData, config).then(res => {
      console.log(res);
    });
    alert('제출이요');
  }

  //! props 설정후 true 와 false 으로 값을 넗어준다.

  let endDateInput: JSX.Element;
  if (isChecked) {
    endDateInput = (
      <TextField
        id="datetime-local"
        label="종료일자"
        type="datetime-local"
        disabled
        className={classes2.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event): void => {
          const { value } = event.target;
          if (value) {
            const data2 = value
              .split('')
              .join('')
              .match(/\d+/g)
              ?.join('');
            if (data2 !== undefined) {
              EventEditActions.changeEndDate(data2);
            }
          }
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
        onChange={(event): void => {
          const { value } = event.target;
          if (value) {
            const data2 = value
              .split('')
              .join('')
              .match(/\d+/g)
              ?.join('');
            if (data2 !== undefined) {
              EventEditActions.changeEndDate(data2);
            }
          }
        }}
      />
    );
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
        <div>이벤트 등록 / 수정</div>
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
              placeholder="티이틀을 적어주세요"
              style={{ paddingRight: 80 }}
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
            onChange={(event): void => {
              const { value } = event.target;
              if (value) {
                const data1 = value
                  .split('')
                  .join('')
                  .match(/\d+/g)
                  ?.join('');
                if (data1 !== undefined) {
                  EventEditActions.changeEndDate(data1);
                }
              }
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
            onChange={fileChangeHandler}
          ></input>
        </div>
        <div>
          <span style={{ fontWeight: 'bold' }}>배너페이지 업로드</span>
          <input
            type="file"
            style={{ margin: 10, paddingRight: 70 }}
            id="bannerImgFile"
            onChange={bannerChangeHandler}
          ></input>
        </div>
        <div style={{ paddingBottom: 30 }}>
          <span style={{ fontWeight: 'bold' }}>하단버튼</span>
          <input
            type="file"
            style={{ margin: 20 }}
            id="buttonImgFile"
            onChange={lowerButtonChangeHandler}
          ></input>
        </div>
        <div className={classes.root}>
          <div>
            <span style={{ fontWeight: 'bold' }}> 하단버튼 URL</span>
            <TextField
              id="standard-textarea"
              placeholder="버튼이미지 URL"
              style={{ paddingRight: 50, paddingTop: 20 }}
              multiline
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
  ({ eventEdit }: StoreState) => ({
    eventTitle: eventEdit.eventTitle,
    startDate: eventEdit.startDate,
    endDate: eventEdit.endDate,
    pageImage: eventEdit.pageImage,
    bannerImage: eventEdit.bannerImage,
    buttonImage: eventEdit.buttonImage,
    buttonUrl: eventEdit.buttonUrl,
    detailPageUrl: eventEdit.detailPageUrl,
    isChecked: eventEdit.isChecked,
  }),
  dispatch => ({
    EventEditActions: bindActionCreators(eventEditActions, dispatch),
  }),
)(EventEditContainer);
