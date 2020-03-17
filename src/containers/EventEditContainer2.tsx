import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as eventEditActions } from '../modules/eventEdit';
import { bindActionCreators } from 'redux';
// import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import EventEdit from '../views/EventEdit';

interface EventEditContainerProps {
  eventTitle: string;
  startDate: string;
  endDate: string;
  pageImageFile: File | null | Blob;
  pageImageFileName: string;
  bannerImageFile: File | null | Blob;
  bannerImageFileName: string;
  buttonImageFile: File | null | Blob;
  buttonImageFileName: string;
  detailPageUrl: string;
  isChecked: boolean;
  EventEditActions: typeof eventEditActions;
}
//! 컴퍼넌트 작성
const EventEditContainer: React.FunctionComponent<EventEditContainerProps> = ({
  eventTitle,
  startDate,
  endDate,
  pageImageFile,
  pageImageFileName,
  bannerImageFile,
  bannerImageFileName,
  buttonImageFile,
  buttonImageFileName,
  detailPageUrl,
  EventEditActions,
  isChecked,
}: EventEditContainerProps) => {
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

  function handleSubmitFormData(e: React.FormEvent): void {
    e.preventDefault();
    const formData = new FormData();
    //formData['eventTitle'] = eventTitle;
    // formData.append('thiss', 'sksksk');
    formData.append('eventTitle', eventTitle);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);

    if (pageImageFile !== null) {
      formData.append('pageImageFile', pageImageFile);
    }

    if (bannerImageFile !== null) {
      formData.append('bannerImageFile', bannerImageFile);
    }

    if (buttonImageFile !== null) {
      formData.append('buttonImageFile', buttonImageFile);
    }

    formData.append('detailPageUrl', detailPageUrl);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    // const bb = formData.getAll('name');
    //  console.log('폼데이터', bb);
    axios
      .post('http://localhost:3001/api/admin/events/entry', formData, config)
      .then(res => {
        console.log(res);
        alert('제출이요');
      });
    // window.fetch('http://localhost:4000/test', {
    //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //   mode: 'cors', // no-cors, cors, *same-origin
    //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: 'same-origin', // include, *same-origin, omit
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   redirect: 'follow', // manual, *follow, error
    //   referrer: 'no-referrer', // no-referrer, *client
    //   body: JSON.stringify(aa), // body data type must match "Content-Type" header
    // });
  }

  return (
    <div>
      <EventEdit
        eventTitle={eventTitle}
        startDate={startDate}
        endDate={endDate}
        pageImageFile={pageImageFile}
        pageImageFileName={pageImageFileName}
        bannerImageFile={bannerImageFile}
        bannerImageFileName={bannerImageFileName}
        buttonImageFile={buttonImageFile}
        buttonImageFileName={buttonImageFileName}
        detailPageUrl={detailPageUrl}
        isChecked={isChecked}
        titleChangeHnadler={titleChangeHnadler}
        isCheckChangeHnadler={isCheckChangeHnadler}
        startDateChangeHandler={startDateChangeHandler}
        endDateChangeHandler={endDateChangeHandler}
        fileChangeHandler={fileChangeHandler}
        bannerChangeHandler={bannerChangeHandler}
        lowerButtonChangeHandler={lowerButtonChangeHandler}
        urlChangeHnadler={urlChangeHnadler}
      />
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
