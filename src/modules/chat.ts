import { createSlice, createSelector } from '@reduxjs/toolkit';

export interface ChatData {
  id: number;
  name: string;
  adminCheck: boolean;
}

export interface ChatState {
  userChatList: ChatData[];
}

export const initialState: ChatState = {
  userChatList: [],
};

/////////////////////////////////////////////////////////////////////////////////////

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    axiosUserChatListRequest: (state, action): void => {
      console.log('axiosUserChatListRequest 요청');
    },
    axiosUserChatListSuccess: (state, action): void => {
      state.userChatList = action.payload;
    },
    axiosUserChatListFailure: (state, action): void => {
      console.log('axiosUserChatListFailure 요청 실패');
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const {
  axiosUserChatListRequest,
  axiosUserChatListSuccess,
  axiosUserChatListFailure,
} = chatSlice.actions;
