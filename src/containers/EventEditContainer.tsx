import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as eventEditActions } from '../modules/eventEdit';
import { bindActionCreators } from 'redux';
// import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

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
  console.log(eventTitle);
  //! 이벤트설정: 타이틀
  function titleChangeHnadler(event: React.FormEvent<HTMLInputElement>): void {
    const title = event.currentTarget.value;
    eventTitle = title;
    EventEditActions.changeEventTitle(title);
  }

  //! 이벤트설정: 시작일(데이터 형식) 202003131300 년월일시간분
  function startDateChangeHandler(event: React.FormEvent<HTMLInputElement>): void {
    const date = event.currentTarget.value;
    if (date) {
      const dateTime = date
        .split('')
        .join('')
        .match(/\d+/g)
        ?.join('');
      if (dateTime !== undefined) {
        EventEditActions.changeStartData(dateTime);
      }
    }
  }
  //! 이벤트설정: 종료일(데이터 형식) 202003131300 년월일시간분
  function endDateChangeHandler(event: React.FormEvent<HTMLInputElement>): void {
    const date = event.currentTarget.value;
    if (date) {
      const dateTime = date
        .split('')
        .join('')
        .match(/\d+/g)
        ?.join('');
      if (dateTime !== undefined) {
        EventEditActions.changeEndDate(dateTime);
      }
    }
  }
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
  function bottonUrlChangeHnadler(event: React.FormEvent<HTMLInputElement>): void {
    const buttonUrl = event.currentTarget.value;
    EventEditActions.changeButtonUrl(buttonUrl);
  }

  //! 이벤트설정: URL입력(상세페이지)
  function urlChangeHnadler(event: React.FormEvent<HTMLInputElement>): void {
    const url = event.currentTarget.value;
    EventEditActions.changePageUrl(url);
  }

  //! 이벤트설정: 상시버튼(상시버튼 클릭시 종료시간disable됨)
  function isCheckChangeHnadler(event: React.FormEvent<HTMLInputElement>): void {
    console.log('event.currentTarget.checked: ', event.currentTarget.checked);
    EventEditActions.changeIsChecked(!isChecked);
  }

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
    axios.post('http://localhost:3001/', formData, config).then(res => {
      console.log(res);
    });
    alert('제출이요');
  }

  //! props 설정후 true 와 false 으로 값을 넗어준다.
  let endDateInput: JSX.Element;
  if (isChecked) {
    endDateInput = (
      <input
        type="datetime-local"
        id="endDate"
        disabled
        onChange={endDateChangeHandler}
      ></input>
    );
  } else {
    endDateInput = (
      <input type="datetime-local" id="endDate" onChange={endDateChangeHandler}></input>
    );
  }

  return (
    <div>
      <div style={{ height: 50, textAlign: 'center' }}>
        <div style={{ height: '25%' }}></div>
        <div>이벤트 등록 / 수정</div>
      </div>
      <Divider />
      {/* <form
        style={{ margin: 50 }}
        onSubmit={e => {
          e.preventDefault();
          alert('서버전송');
        }}
      > */}
      <form style={{ margin: 50 }} onSubmit={handleSubmitFormData}>
        <div style={{ marginRight: 20, float: 'left' }}>타이틀</div>
        <input type="text" id="eventTitle" onChange={titleChangeHnadler}></input>
        <div style={{ marginTop: 20 }}>기간설정</div>
        <div style={{ marginTop: 5, marginLeft: 20 }}>
          상시
          <input
            type="checkbox"
            value="상시"
            checked={isChecked}
            onChange={isCheckChangeHnadler}
          />
        </div>
        <div>
          시작일시{' '}
          <input
            type="datetime-local"
            id="startDate"
            onChange={startDateChangeHandler}
          ></input>
          종료일시 {endDateInput}
        </div>
        <div>
          이미지업로드
          <input type="file" id="pageImgFile" onChange={fileChangeHandler}></input>
        </div>
        <div>
          배너페이지업로드
          <input type="file" id="bannerImgFile" onChange={bannerChangeHandler}></input>
        </div>
        <div>
          하단버튼(이미지)
          <input
            type="file"
            id="buttonImgFile"
            onChange={lowerButtonChangeHandler}
          ></input>
        </div>
        <div>
          하단버튼 URL입력(하단버튼연결)
          <input id="buttonUrl" onChange={bottonUrlChangeHnadler}></input>
        </div>
        <div>
          URL입력(상세페이지이)
          <input id="detailPageUrl" onChange={urlChangeHnadler}></input>
        </div>
        <button type="submit">등록/수정</button>
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
