import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as eventEditActions } from '../modules/eventEdit';
import { bindActionCreators } from 'redux';
// import TextField from '@material-ui/core/TextField';

interface EventEditContainerProps {
  eventTitle: string;
  startDate: string;
  endDate: string;
  pageImageFile: File | null;
  pageImageFileName: string;
  bannerImageFile: File | null;
  bannerImageFileName: string;
  buttonImageFile: File | null;
  buttonImageFileName: string;
  detailPageUrl: string;
  isChecked: boolean;
  EventEditActions: typeof eventEditActions;
}
//! 컴퍼넌트 작성
const EventEditContainer: React.FunctionComponent<EventEditContainerProps> = ({
  EventEditActions,
  isChecked,
}: EventEditContainerProps) => {
  //! 이벤트설정: 타이틀
  function titleChangeHnadler(event: React.FormEvent<HTMLInputElement>): void {
    const title = event.currentTarget.value;
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
  //! 이벤트설정: URL입력(하단버튼누룰시이동)
  function urlChangeHnadler(event: React.FormEvent<HTMLInputElement>): void {
    const url = event.currentTarget.value;
    EventEditActions.changePageUrl(url);
  }
  //! 이벤트설정: 상시버튼(상시버튼 클릭시 종료시간disable됨)
  function isCheckChangeHnadler(event: React.FormEvent<HTMLInputElement>): void {
    console.log('event.currentTarget.checked: ', event.currentTarget.checked);
    EventEditActions.changeIsChecked(!isChecked);
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
      이벤트설정
      <form
        onSubmit={e => {
          e.preventDefault();
          alert('서버전송');
        }}
      >
        <div>
          타이틀
          <input type="text" id="eventTitle" onChange={titleChangeHnadler}></input>
        </div>
        <div>
          기간설정 상시{' '}
          <input
            type="checkbox"
            value="상시"
            checked={isChecked}
            onChange={isCheckChangeHnadler}
          />
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
          URL입력(하단버튼누룰시이동)
          <input id="detailPageUrl" onChange={urlChangeHnadler}></input>
        </div>
        <button type="submit">완료</button>
      </form>
    </div>
  );
};

export default connect(
  ({ eventEdit }: StoreState) => ({
    eventTitle: eventEdit.eventTitle,
    startDate: eventEdit.startDate,
    endDate: eventEdit.endDate,
    pageImageFile: eventEdit.pageImageFile,
    pageImageFileName: eventEdit.pageImageFileName,
    bannerImageFile: eventEdit.bannerImageFile,
    bannerImageFileName: eventEdit.bannerImageFileName,
    buttonImageFile: eventEdit.buttonImageFile,
    buttonImageFileName: eventEdit.buttonImageFileName,
    detailPageUrl: eventEdit.detailPageUrl,
    isChecked: eventEdit.isChecked,
  }),
  dispatch => ({
    EventEditActions: bindActionCreators(eventEditActions, dispatch),
  }),
)(EventEditContainer);
