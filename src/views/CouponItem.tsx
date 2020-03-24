import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import { CouponData } from '../modules/coupon';

function getModalStyle() {
  return {
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

//////////////////////////////////////////////////////////////////////////////////////

interface CouponItemProps {
  num: number;
  coupon: CouponData;
  handleClickDeleteCoupon(id: number): void;
  history?: any;
}

const CouponItem: React.FunctionComponent<CouponItemProps> = ({
  num,
  coupon,
  handleClickDeleteCoupon,
}: CouponItemProps) => {
  //

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableRow>
      <TableCell>{num}</TableCell>
      <TableCell>{coupon.couponName}</TableCell>
      <TableCell>{coupon.description}</TableCell>
      <TableCell>{coupon.couponCode}</TableCell>
      <TableCell>{coupon.discount}</TableCell>
      <TableCell>
        <button>수정</button>
      </TableCell>
      <TableCell>
        <button onClick={handleOpen}>삭제</button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">쿠폰 삭제</h2>
            <p id="simple-modal-description">정말 삭제하시겠습니까?</p>
            <button
              onClick={() => {
                handleClickDeleteCoupon(coupon.id);
                handleClose();
              }}
            >
              삭제
            </button>
            <button onClick={handleClose}>닫기</button>
          </div>
        </Modal>
      </TableCell>
    </TableRow>
  );
};

export default CouponItem;
