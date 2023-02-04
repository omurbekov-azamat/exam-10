import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {Box} from "@mui/material";
import {selectFetchPosts, selectFetchPostsLoading} from "../features/news/newsSlice";
import {fetchPosts} from "../features/news/newsThunks";
import Posts from "../features/news/components/Posts";
import Spinner from "../components/Spinner/Spinner";

const News = () => {
    const dispatch = useAppDispatch();
    const news = useAppSelector(selectFetchPosts);
    const loading = useAppSelector(selectFetchPostsLoading);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <>
            <Box sx={{mb: 3}}><span>Posts</span></Box>
            {loading && <Spinner/>}
            {news.length > 0 ? (
                <Posts articles={news}/>
            ) : <h2>No Posts</h2>}
        </>
    );
};

export default News;