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
  commentList: CommentType[];
}

export const initialState: CommentState = {
  commentInput: '',
  commentList: [],
};

///////////////////////////////////////////////////////////////////////////////////////

export const commentSlice = createSlice({
  name: 'comment',
  initialState: initialState,
  reducers: {
    changeCommentInput: (state, action): void => {
      state.commentInput = action.payload;
    },

    axiosCommentPostRequest: (stat, action): void => {
      console.log('댓글등록요청');
    },
    axiosCommentPutRequest: (stat, action): void => {
      console.log('댓글수정요청');
    },
    axiosCommentDeleteRequest: (stat, action): void => {
      console.log('댓글삭제요청');
    },
  },
});

export const commentReducer = commentSlice.reducer;
export const { changeCommentInput, axiosCommentPostRequest } = commentSlice.actions;
