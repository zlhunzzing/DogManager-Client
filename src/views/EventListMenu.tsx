import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { actionCreators as eventActions } from '../modules/event';
import { bindActionCreators } from 'redux';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const EventListMenu: React.FunctionComponent = () => {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current!.offsetWidth);
  // }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setAge(event.target.value as string);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          상태
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={10}>준비중</MenuItem>
          <MenuItem value={20}>완료</MenuItem>
          <MenuItem value={30}>진행중</MenuItem>
        </Select>
      </FormControl>

      <Link to="/admin/event-add">
        <Button variant="outlined" style={{ height: 56, marginRight: 10 }}>
          새 이벤트 추가
        </Button>
      </Link>
    </div>
  );
};

export default connect(
  ({ event }: StoreState) => ({
    // eventLists: event.eventLists,
    // selectedEvent: event.selectedEvent,
    filter: event.filter,
  }),
  dispatch => ({
    EventActions: bindActionCreators(eventActions, dispatch),
  }),
)(EventListMenu);
