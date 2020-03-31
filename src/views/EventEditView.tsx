import React, { ElementType, ReactNode } from 'react';

//! css
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

interface EventEditViewProps {
  handleSubmitFormData: (e: React.FormEvent) => void;
  eventTitle: string;
  changedTitle: (e: any) => void;
  isChecked?: boolean;
  changedChecked: (e: boolean) => void;
  startDate: string;
  changedStartData: (e: any) => void;
  showEndDate: () => ReactNode;
  handleChangeImageFile: (image: File, name: string) => void;
  handleChangePreviewImageFile: (image: File | null | Blob | string) => void;
  pageImage: File | null | Blob | string;
  bannerImage: File | null | Blob | string;
  buttonImage: File | null | Blob | string;
  showCouponListInput: () => void;
  detailPageUrl: string;
  changedUrl: (e: any) => void;
}

const EventEditView: React.FunctionComponent<EventEditViewProps> = ({
  handleSubmitFormData,
  eventTitle,
  changedTitle,
  isChecked,
  changedChecked,
  startDate,
  changedStartData,
  showEndDate,
  handleChangeImageFile,
  handleChangePreviewImageFile,
  pageImage,
  bannerImage,
  buttonImage,
  showCouponListInput,
  detailPageUrl,
  changedUrl,
}: EventEditViewProps) => {
  const classes = useStyles();
  const classes2 = useStyles2();
  return (
    <div>
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
                changedTitle(value);
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
                changedChecked(!isChecked);
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
              changedStartData(value);
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
                changedUrl(value);
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

export default EventEditView;
