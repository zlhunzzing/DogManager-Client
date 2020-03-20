import React from 'react';
import { Link } from 'react-router-dom';

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
  filter: string;
  changeFilter: (filter: string) => void;
}

const EventListMenu: React.FunctionComponent<EventListMenuProps> = ({
  filter,
  changeFilter,
}: EventListMenuProps) => {
  const classes = useStyles();

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current!.offsetWidth);
  // }, []);

  // const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
  //   EventActions.ChangeFilter(event.target.value as string);
  // };

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
          onChange={event => {
            changeFilter(event.target.value as string);
          }}
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

export default EventListMenu;

// export default connect(
//   ({ event }: StoreState) => ({
//     // eventLists: event.eventLists,
//     // selectedEvent: event.selectedEvent,
//     filter: event.filter,
//   }),
//   dispatch => ({
//     EventActions: bindActionCreators(eventActions, dispatch),
//   }),
// )(EventListMenu);
