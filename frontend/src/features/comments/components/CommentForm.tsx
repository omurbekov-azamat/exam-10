import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectCreateComment} from "../commentsSlice";
import {createComment} from "../commentsThunks";
import {Grid, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {SendComment} from "../../../types";

interface Props {
    news_id: string;
}

const CommentForm: React.FC<Props> = ({news_id}) => {
    const dispatch = useAppDispatch();
    const createLoading = useAppSelector(selectCreateComment);

    const [comment, setComment] = useState<SendComment>({
        author: '',
        comment: '',
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setComment(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createComment({
            ...comment,
            news_id,
        }));
        setComment({
            author: '',
            comment: '',
        });
    };

    return (
        <form onSubmit={submitFormHandler}>
            <Grid container direction='column' spacing={2}>
                <Grid item xs>
                    <TextField
                        id="author" label="author"
                        value={comment.author}
                        onChange={inputChangeHandler}
                        name="author"
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="comment" label="comment"
                        value={comment.comment}
                        onChange={inputChangeHandler}
                        name="comment"
                        required
                    />
                </Grid>
                <Grid item xs>
                    <LoadingButton
                        type='submit'
                        color='primary'
                        loading={createLoading}
                        variant='contained'
                    >
                        Send
                    </LoadingButton>
                </Grid>
            </Grid>
        </form>
    );
};

export default CommentForm;