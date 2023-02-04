import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {AppDispatch} from "../../app/store";
import {ApiComment, CommentMutation} from "../../types";

export const createComment = createAsyncThunk<void, ApiComment, {dispatch: AppDispatch}>(
    'comments/createComment',
    async (comment, thunkAPI) => {
        await axiosApi.post('/comments', comment);
        await thunkAPI.dispatch(fetchComments(comment.news_id));
    }
);

export const fetchComments = createAsyncThunk<CommentMutation[], string>(
    'comments/fetchComments',
    async (id) => {
        const response = await axiosApi.get<CommentMutation[]>('/comments?news_id=' + id);
        return response.data;
    }
);

export const deleteComment = createAsyncThunk<void, CommentMutation, {dispatch: AppDispatch}>(
    'comments/deleteComment',
    async (comment, thunkAPI ) => {
        await axiosApi.delete('/comments/' + comment.id);
        await thunkAPI.dispatch(fetchComments(comment.news_id));
    }
);