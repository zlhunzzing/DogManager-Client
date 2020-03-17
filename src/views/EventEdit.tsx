import React from 'react';

import Divider from '@material-ui/core/Divider';
import axios from 'axios';

interface EventEditProps {
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
  titleChangeHnadler(e: any): void;
  isCheckChangeHnadler(e: any): void;
  startDateChangeHandler(e: any): void;
  endDateChangeHandler(e: any): void;
  fileChangeHandler(e: any): void;
  bannerChangeHandler(e: any): void;
  lowerButtonChangeHandler(e: any): void;
  urlChangeHnadler(e: any): void;
}
//! 컴퍼넌트 작성
const EventEdit: React.FunctionComponent<EventEditProps> = ({
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
  isChecked,
  titleChangeHnadler,
  isCheckChangeHnadler,
  startDateChangeHandler,
  endDateChangeHandler,
  fileChangeHandler,
  bannerChangeHandler,
  lowerButtonChangeHandler,
  urlChangeHnadler,
}: EventEditProps) => {
  // ! 폼 데이터 제출
  console.log(eventTitle);
  function handleSubmitFormData(e: React.FormEvent): void {
    e.preventDefault();
    const aa = new FormData();
    //formData['eventTitle'] = eventTitle;
    aa.append('thiss', 'sksksk');
    aa.append('eventTitle', eventTitle);
    // formData.append('startDate', startDate);
    // formData.append('endDate', endDate);
    // if (pageImageFile !== null) {
    //   formData.append('pageImageFile', pageImageFile);
    // }
    // formData.append('pageImageFileName', pageImageFileName);
    // if (bannerImageFile !== null) {
    //   formData.append('bannerImageFile', bannerImageFile);
    // }
    // formData.append('bannerImageFileName', bannerImageFileName);
    // if (buttonImageFile !== null) {
    //   formData.append('bannerImageFile', buttonImageFile);
    // }
    // formData.append('buttonImageFileName', buttonImageFileName);
    // formData.append('detailPageUrl', detailPageUrl);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const bb = aa.getAll('name');
    console.log('폼데이터', bb);
    axios.post('http://localhost:3000/api/admin/events/entry', aa, config).then(res => {
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
          URL입력(하단버튼누룰시이동)
          <input id="detailPageUrl" onChange={urlChangeHnadler}></input>
        </div>
        <button type="submit">등록/수정</button>
      </form>
    </div>
  );
};

export default EventEdit;
