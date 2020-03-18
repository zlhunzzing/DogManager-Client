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

interface EventListMenuProps {
  EventActions: typeof eventActions;
  filter: string;
}

const EventListMenu: React.FunctionComponent<EventListMenuProps> = ({
  EventActions,
  filter,
}: EventListMenuProps) => {
  const classes = useStyles();

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current!.offsetWidth);
  // }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    EventActions.ChangeFilter(event.target.value as string);
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
          value={filter}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="모두">
            <em>All</em>
          </MenuItem>
          <MenuItem value="준비중">준비중</MenuItem>
          <MenuItem value="완료">완료</MenuItem>
          <MenuItem value="진행중">진행중</MenuItem>
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
