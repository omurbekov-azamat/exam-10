import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {fetchOnePost} from "../features/news/newsThunks";
import {selectFetchOnePost, selectFetchOnePostLoading} from "../features/news/newsSlice";
import Article from '../../src/features/news/components/Article'
import Spinner from "../components/Spinner/Spinner";
import {fetchComments} from "../features/comments/commentsThunks";
import {selectComments, selectCommentsFetchLoading} from "../features/comments/commentsSlice";
import Comments from "../features/comments/components/Comments";
import CommentForm from "../features/comments/components/CommentForm";
import {Box} from "@mui/material";

const OneArticle = () => {
    const {id} = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const post = useAppSelector(selectFetchOnePost);
    const loading = useAppSelector(selectFetchOnePostLoading);
    const comments = useAppSelector(selectComments);
    const commentsLoading = useAppSelector(selectCommentsFetchLoading);

    useEffect(() => {
        dispatch(fetchOnePost(id));
        dispatch(fetchComments(id));
    }, [dispatch, id]);

    return (
        <>
            {loading && <Spinner/>}
            <Article post={post}/>
            {commentsLoading && <Spinner/>}
            {comments.length > 0 ? (
                <Comments items={comments}/>
            ) : <h5>There is no comments</h5>}
            <Box sx={{mt: 5}}>
                <h5>Add Comment</h5>
                <CommentForm news_id={id}/>
            </Box>
        </>
    );
};

export default OneArticle;