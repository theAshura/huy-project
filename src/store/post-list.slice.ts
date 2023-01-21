/* SLICE: POST_LIST
   ========================================================================== */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IPostData } from "api/post/post.interface";
import { getPosts } from "api/post/post.api";

const initialState = {
  data: [] as IPostData[],
  isLoading: false,
  error: "",
  newData: [] as IPostData[],
};

/**
 * Async actions for post-list
 */
const actions = {
  fetchList: createAsyncThunk(
    "POST/FETCH_LIST",
    async (_, { rejectWithValue }) => {
      const response = await getPosts();
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response.data);
      }
      return response.data as unknown as IPostData[];
    }
  ),

  fetchListData: createAsyncThunk(
    "POST/FETCH_LIST_DATA",
    async (_, { rejectWithValue }) => {
      const response = await getPosts();
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response.data);
      }
      return response.data as unknown as IPostData[];
    }
  ),
};

/**
 * Slice for post-list
 */
const postListSlice = createSlice({
  name: "postList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Post List
    builder.addCase(actions.fetchList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.fetchList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(actions.fetchList.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(actions.fetchListData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.fetchListData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newData = action.payload;
    });
    builder.addCase(actions.fetchListData.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

/**
 * Export all actions, reducer for post-list
 */
export const postListActions = { ...postListSlice.actions, ...actions };

export default postListSlice.reducer;
