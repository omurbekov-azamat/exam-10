import React from 'react';
import {Grid} from "@mui/material";
import {CommentMutation} from "../../../types";
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {deleteComment} from "../commentsThunks";

interface Props {
    item: CommentMutation;
}

const Comment: React.FC<Props> = ({item}) => {
    const dispatch = useAppDispatch();

    const onDeleteComment = async (comment: CommentMutation) => {
        await dispatch(deleteComment(comment));
    };

    return (
        <Grid item sx={{border: '2px solid red', mb: 2}}>
            <Grid container direction='row' spacing={30} sx={{alignItems: 'center'}}>
                <Grid item xs>
                    <p>{item.author} wrote: {item.comment}</p>
                </Grid>
                <Grid item xs>
                    <NavLink to={'/news/' + item.news_id} onClick={() => onDeleteComment(item)}>delete</NavLink>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Comment;