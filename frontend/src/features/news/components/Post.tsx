import React from 'react';
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {deletePost} from "../newsThunks";
import {styled, CardMedia, Grid} from "@mui/material";
import {apiUrl} from "../../../constants";
import noImageAvailable from '../../../assets/images/noImageAvailable.png'
import {ApiNews} from "../../../types";

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

interface Props {
    article: ApiNews;
}

const Post: React.FC<Props> = ({article}) => {
    const dispatch = useAppDispatch();

    const onDeletePost = async (id: string) => {
        await dispatch(deletePost(id));
    };

    let postImage = noImageAvailable;

    if (article.image) {
        postImage = apiUrl + '/' + article.image;
    }

    return (
        <Grid item sx={{border: '2px solid red', mb: 2}}>
            <Grid container direction='row' spacing={30} sx={{alignItems: 'center'}}>
                <Grid item xs>
                    <ImageCardMedia image={postImage} title={article.title}/>
                </Grid>
                <Grid item xs>
                    <Grid container direction='column' spacing={2}>
                        <Grid item>
                            <p>Title: {article.title}</p>
                        </Grid>
                        <Grid item>
                            <p>Date: {article.date}</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs>
                    <Grid container direction='column' spacing={2}>
                        <Grid item>
                            <NavLink to={'/news/' + article.id}>Read Full Post</NavLink>
                        </Grid>
                        <Grid item>
                            <NavLink to='/news' onClick={() => onDeletePost(article.id)}>delete</NavLink>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Post;