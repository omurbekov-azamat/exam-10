import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createComment, fetchComments} from "./commentsThunks";
import {CommentMutation} from "../../types";

interface CommentSliceState {
    fetchComments: boolean;
    comments: CommentMutation[],
    crateCommentLoading: boolean;
}

const initialState: CommentSliceState = {
    fetchComments: false,
    comments: [],
    crateCommentLoading: false,
}

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.comments = [];
            state.fetchComments = false;
        });
        builder.addCase(fetchComments.fulfilled, (state,{payload: comments}) => {
            state.fetchComments = false;
            state.comments = comments;
        });
        builder.addCase(fetchComments.rejected, (state) => {
            state.fetchComments = false;
        });
        builder.addCase(createComment.pending, (state) => {
            state.crateCommentLoading = true;
        });
        builder.addCase(createComment.fulfilled, (state) => {
            state.crateCommentLoading = false;
        });
        builder.addCase(createComment.rejected, (state) => {
            state.crateCommentLoading = false;
        });
    }
});

export const commentsReducer = commentsSlice.reducer;
export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsFetchLoading = (state: RootState) => state.comments.fetchComments;
export const selectCreateComment = (state: RootState) => state.comments.crateCommentLoading;