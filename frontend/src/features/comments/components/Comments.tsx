import React from 'react';
import {Grid} from "@mui/material";
import Comment from '../components/Comment'
import {CommentMutation} from "../../../types";

interface Props {
    items: CommentMutation[];
}

const Comments: React.FC<Props> = ({items}) => {
    return (
        <Grid container direction='column' spacing={1}>
            {items.map((comment) => (
                <Comment key={comment.id} item={comment}/>
            ))}
        </Grid>
    );
};

export default Comments;