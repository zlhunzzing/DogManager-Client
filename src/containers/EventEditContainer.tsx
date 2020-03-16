import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as eventEditActions } from '../modules/eventEdit';
import { bindActionCreators } from 'redux';
import TextField from '@material-ui/core/TextField';

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
  EventEditActions: typeof eventEditActions;
}
const EventEditContainer: React.FunctionComponent<EventEditContainerProps> = ({
  EventEditActions,
}: EventEditContainerProps) => {
  function dateChangeHandler(event: React.FormEvent<HTMLInputElement>): void {
    console.log(event.currentTarget.value);
  }
  function fileChangeHandler(event: React.FormEvent<HTMLInputElement>): void {
    console.log('target: ', event.currentTarget.files);

    const file = event.currentTarget.files;
    if (file) {
      console.log('file[0]:', file[0]);
      EventEditActions.changePageImage(file[0]);
    }
  }
  // 시작 202003131300 종료
  return (
    <div>
      이벤트설정
      <form>
        <div>
          타이틀
          <TextField
            style={{ width: 400 }}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            onChange={(event): void => {
              const { value } = event.target;
              EventEditActions.changeEventTitle(value);
            }}
          ></TextField>
          {/* <input type="text" id="eventTitle" onChange={}></input> */}
        </div>
        <div>
          기간설정 상시 <input type="checkbox" value="상시" />
          시작일시 <input type="date" id="startDate" onChange={dateChangeHandler}></input>
          종료일시 <input type="date" id="endDate" onChange={dateChangeHandler}></input>
        </div>
        <div>
          이미지업로드
          <input type="file" id="pageImgFile" onChange={fileChangeHandler}></input>
        </div>
        <div>
          배너페이지업로드
          <input type="file" id="bannerImgFile"></input>
        </div>
        <div>
          하단버튼(이미지)
          <input type="file" id="buttonImgFile"></input>
        </div>
        <div>
          URL입력(하단버튼누룰시이동)
          <input
            id="detailPageUrl"
            onChange={(event): void => {
              const { value } = event.target;
              EventEditActions.changeEventTitle(value);
            }}
          ></input>
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
  }),
  dispatch => ({
    EventEditActions: bindActionCreators(eventEditActions, dispatch),
  }),
)(EventEditContainer);
