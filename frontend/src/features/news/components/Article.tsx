import React from 'react';
import {NewsMutation} from "../../../types";
import {Box} from "@mui/material";
import dayjs from "dayjs";

interface Props {
    post: NewsMutation | null;
}

const Article: React.FC<Props> = ({post}) => {
    return (
        <>
            {post && (
                <Box>
                    <h3>Title: {post.title}</h3>
                    <p>Time: {dayjs(post.date).format('DD.MM.YYYY HH:mm:ss')}</p>
                    <p>Content: {post.content}</p>
                </Box>
            )}
        </>
    );
};

export default Article;