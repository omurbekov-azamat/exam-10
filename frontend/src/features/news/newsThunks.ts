import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {AppDispatch} from "../../app/store";
import {ApiNews, NewsMutation, SendPostWithDate} from "../../types";

export const createPost = createAsyncThunk<void, SendPostWithDate>(
    'news/createPost',
    async (post) => {
        const formData = new FormData();

        const keys = Object.keys(post) as (keyof SendPostWithDate)[];

        keys.forEach(key => {
            const value = post[key];
            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosApi.post('/news', formData);
    }
);

export const fetchPosts = createAsyncThunk<ApiNews[]>(
    'news/fetchAll',
    async () => {
        const response = await axiosApi.get<ApiNews[]>('/news');
        return response.data;
    }
);

export const fetchOnePost = createAsyncThunk<NewsMutation , string>(
    'news/fetchOnePost',
    async (id) => {
        const response =  await axiosApi.get('/news/' + id);
        return response.data
    }
);

export const deletePost = createAsyncThunk<void, string, {dispatch: AppDispatch}>(
    'news/deletePost',
    async (id, thunkAPI) => {
        await axiosApi.delete('/news/' + id);
        thunkAPI.dispatch(fetchPosts());
    }
);

