import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const getPosts = createAsyncThunk("localhost:4444/posts", async () => {
  let { data } = await axios.get("/posts");
  return data;
});

export const getTags = createAsyncThunk("localhost:4444/tags", async () => {
  let { data } = await axios.get("/tags");
  return data;
});

export const postPosts = createAsyncThunk("localhost:4444/posts", async () => {
  let { data } = await axios.post("/posts");
  return data;
});
export const RemovePosts = createAsyncThunk(
  "localhost:4444/posts/delete",
  async (id) => {
    let { data } = await axios.delete(`/posts/${id}`);
    return data;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: {
      items: [],
      status: "loading",
    },
    tags: {
      items: [],
      status: "loading",
    },
  },
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.posts.status = "loading";
      state.posts.items = [];
    },
    [getPosts.fulfilled]: (state, action) => {
      state.posts.status = "success";
      state.posts.items = action.payload.reverse();
    },
    [getPosts.rejected]: (state) => {
      state.posts.status = "error";
      state.posts.items = [];
    },
    [getTags.pending]: (state) => {
      state.tags.status = "loading";
      state.tags.items = [];
    },
    [getTags.fulfilled]: (state, action) => {
      state.tags.status = "success";
      state.tags.items = action.payload;
    },
    [getTags.rejected]: (state) => {
      state.tags.status = "error";
      state.tags.items = [];
    },
    [RemovePosts.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id != action.meta.arg
      );
      state.posts.status = "loading";
    },
    [RemovePosts.fulfilled]: (state) => {
      state.posts.status = "success";
    },
    [RemovePosts.rejected]: (state) => {
      state.posts.status = "error";
    },
  },
});

export default postsSlice.reducer;
