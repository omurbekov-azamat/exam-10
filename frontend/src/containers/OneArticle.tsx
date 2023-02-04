import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {fetchOnePost} from "../features/news/newsThunks";
import {selectFetchOnePost, selectFetchOnePostLoading} from "../features/news/newsSlice";
import Article from '../../src/features/news/components/Article'
import Spinner from "../components/Spinner/Spinner";

const OneArticle = () => {
    const {id} = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const post = useAppSelector(selectFetchOnePost);
    const loading = useAppSelector(selectFetchOnePostLoading);

    useEffect(() => {
        dispatch(fetchOnePost(id));
    }, [dispatch, id]);

    return (
        <>
            {loading && <Spinner/>}
            <Article post={post}/>
        </>
    );
};

export default OneArticle;