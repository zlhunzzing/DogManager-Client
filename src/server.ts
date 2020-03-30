// const server = 'http://localhost:4000';
const server = 'http://13.125.249.151:3002';

export default server;

export const userSignupUrl = server + '/api/user/signup';

export const userSigninUrl = server + '/api/user/signin';
export const adminSigninUrl = server + '/api/admin/signin';

export const adminEventListUrl = server + '/api/admin/events/list';
// POST & GET & PUT & DELETE
export const adminEventUrl = server + '/api/admin/events/entry'; // /:id

export const userEventListUrl = server + '/api/user/events/list';
export const userEventUrl = server + '/api/user/events/entry'; //:url

export const userCouponListUrl = server + '/api/user/coupon/list';
export const userCouponPostUrl = server + '/api/user/coupon';
export const adminCounponListUrl = server + '/api/admin/coupon/list';
export const adminCounponViewListUrl = server + '/api/admin/user/coupon/list';
export const adminCouponPostUrl = server + '/api/admin/coupon';

// POST & PUT & DELETE
export const userCommentUrl = server + '/api/user/comment/entry'; // /:commentId
// POST & DELETE
export const userCommentThumbUrl = server + '/api/user/comment/entry/thumb'; // /:commentId
export const userCommentThumbListUrl = server + '/api/user/thumb/list'; // /:eventUrl
