import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectCreatePost} from "../features/news/newsSlice";
import {createPost} from "../features/news/newsThunks";
import {Grid, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import FileInput from "../components/FileInput/FileInput";
import {SendPost} from "../types";
import {useNavigate} from "react-router-dom";

const PostForm = () => {
    const dispatch = useAppDispatch();
    const postLoading = useAppSelector(selectCreatePost);
    const navigate = useNavigate();

    const [post, setPost] = useState<SendPost>({
        title: '',
        content: '',
        image: null,
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setPost(prev => ({...prev, [name]: value}));
    };

    const fileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        setPost(prev => ({
            ...prev, [name]: files && files[0] ? files[0] : null,
        }));
    };

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createPost({
            ...post,
            date: new Date().toISOString(),
        }));
        await setPost({
            title: '',
            content: '',
            image: null,
        });
        await navigate('/news');
    };

    return (
        <form onSubmit={submitFormHandler}>
            <Grid container direction='column' spacing={2} sx={{m: 10}}>
                <Grid item xs>
                    <TextField
                        id='title' label='title'
                        name='title'
                        value={post.title}
                        required
                        onChange={inputChangeHandler}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id='content' label='content'
                        name='content'
                        value={post.content}
                        required
                        onChange={inputChangeHandler}
                    />
                </Grid>
                <Grid item xs>
                    <FileInput
                        onChange={fileInputHandler}
                        name='image'
                        label='image'
                    />
                </Grid>
                <Grid item xs>
                    <LoadingButton
                        type='submit'
                        color='secondary'
                        loading={postLoading}
                        variant='contained'
                    >
                        Post
                    </LoadingButton>
                </Grid>
            </Grid>
        </form>
    );
};

export default PostForm;