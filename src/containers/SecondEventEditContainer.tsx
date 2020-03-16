import React from 'react';
import AdminMenu from '../views/AdminMenu';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
);

const SecondEventEditContainer: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div>
      <AdminMenu />
      <div style={{ margin: 40 }}>
        <TextField
          id="standard-full-width"
          label="이벤트 타이틀"
          placeholder="시스템에 노출되지는 않지만 알아볼 수 있도록 로그 남기듯 이벤트명 입력 예)펫미업-1000원할인"
          fullWidth
          helperText="Full width!"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div>기간설정</div>
        <form className={classes.container} noValidate>
          <TextField
            id="date"
            label="Birthday"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <form className={classes.container} noValidate>
          <TextField
            id="time"
            label="Alarm clock"
            type="time"
            defaultValue="07:30"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </form>
        <div>이미지 업로드</div>
        <div>버튼설정</div>
        <div>유의사항</div>
        <div>url명</div>
      </div>
    </div>
  );
};

export default SecondEventEditContainer;
