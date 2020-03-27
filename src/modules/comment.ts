import { createSlice } from '@reduxjs/toolkit';

export interface CommentType {
  id: number;
  userId: number;
  userName: string;
  content: string;
  createdAt: string;
  thumb: number;
}

export interface CommentState {
  commentInput: string;
  userThumbsList: [];
}

export const initialState: CommentState = {
  commentInput: '',
  userThumbsList: [],
};

///////////////////////////////////////////////////////////////////////////////////////

export const commentSlice = createSlice({
  name: 'comment',
  initialState: initialState,
  reducers: {
    changeCommentInput: (state, action): void => {
      state.commentInput = action.payload;
    },
    changeUserThumbList: (state, action): void => {
      state.userThumbsList = action.payload;
    },

    axiosCommentPostRequest: (stat, action): void => {
      console.log('댓글등록요청 -> event/nowEvent의 commentList업데이트');
    },
    axiosCommentPutRequest: (stat, action): void => {
      console.log('댓글수정요청');
    },
    axiosCommentDeleteRequest: (stat, action): void => {
      console.log('댓글삭제요청');
    },

    axiosCommentThumbListRequest: (state, action): void => {
      console.log('좋아요 댓글 리스트 요청');
    },
    axiosUserCommentThumbUpRequest: (state, action): void => {
      console.log('좋아요 요청');
    },
    axiosUserCommentThumbDownRequest: (state, action): void => {
      console.log('좋아요 취소 요청');
    },
  },
});

//------------------------------------------------------------------------------------

export const commentReducer = commentSlice.reducer;
export const {
  changeCommentInput,
  changeUserThumbList,

  axiosCommentPostRequest,
  axiosCommentPutRequest,
  axiosCommentDeleteRequest,

  axiosCommentThumbListRequest,
  axiosUserCommentThumbUpRequest,
  axiosUserCommentThumbDownRequest,
} = commentSlice.actions;
