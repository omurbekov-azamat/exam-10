import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createPost, fetchOnePost, fetchPosts} from "./newsThunks";
import {ApiNews, NewsMutation} from "../../types";

interface NewsState {
    createPostLoading: boolean;
    fetchPostsLoading: boolean;
    posts: ApiNews[];
    fetchOnePost: boolean;
    post: NewsMutation | null;
}

const initialState: NewsState = {
    createPostLoading: false,
    fetchPostsLoading: false,
    posts: [],
    fetchOnePost: false,
    post: null,
};

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.fetchPostsLoading = true;
        });
        builder.addCase(fetchPosts.fulfilled, (state, {payload: news}) => {
            state.fetchPostsLoading = false;
            state.posts = news;
        });
        builder.addCase(fetchPosts.rejected, (state) => {
            state.fetchPostsLoading = false;
        });
        builder.addCase(fetchOnePost.pending, (state) => {
            state.fetchOnePost = true;
        });
        builder.addCase(fetchOnePost.fulfilled, (state, {payload: post}) => {
            state.fetchOnePost = false;
            state.post = post;
        });
        builder.addCase(fetchOnePost.rejected, (state) => {
            state.fetchOnePost = false;
        });
        builder.addCase(createPost.pending, (state) => {
            state.createPostLoading = true;
        });
        builder.addCase(createPost.fulfilled, (state) => {
            state.createPostLoading = false;
        });
        builder.addCase(createPost.rejected, (state) => {
            state.createPostLoading = true;
        });
    }
});

export const newsReducer = newsSlice.reducer;
export const selectFetchPosts = (state: RootState) => state.news.posts;
export const selectFetchPostsLoading = (state: RootState) => state.news.fetchPostsLoading;
export const selectFetchOnePost = (state: RootState) => state.news.post;
export const selectFetchOnePostLoading = (state: RootState) => state.news.fetchOnePost;
export const selectCreatePost = (state: RootState) => state.news.createPostLoading;
