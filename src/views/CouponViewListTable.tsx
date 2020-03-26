/*eslint-disable*/
//! 모듈
import React from 'react';

//! 컴포넌트
import { FakeCouponData } from '../containers/AdminCouponViewContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
//!
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 90,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);
interface couponViewProps {
  coupon: FakeCouponData;
}

const CouponViewListTable: React.FunctionComponent<couponViewProps> = ({
  coupon,
}: couponViewProps) => {
  const classes = useStyles();
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth] = React.useState(0);
  console.log('coupon:', coupon);
  //   {
  //     userName: 'john1',
  //     userEmail: 'john1jungemail.com',
  //     couponName: 'helloworld1',
  //     couponCode: '12322312',
  //     assignedAt: 20200324,
  //     expiredAt: 20200329,
  //     isDeleted: 1,
  //   },
  return (
    <TableRow>
      <TableCell>{coupon.userName}</TableCell>
      <TableCell>{coupon.userEmail}</TableCell>
      <TableCell>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            쿠폰이름
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value="hello"
            labelWidth={labelWidth}
          >
            <MenuItem value="준비중">{coupon.couponName}</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>{coupon.couponCode}</TableCell>
      <TableCell>{coupon.assignedAt}</TableCell>
      <TableCell>{coupon.expiredAt}</TableCell>
      <TableCell>{coupon.isDeleted}</TableCell>
    </TableRow>
  );
};

export default CouponViewListTable;
