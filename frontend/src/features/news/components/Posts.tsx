import React from 'react';
import {Grid} from "@mui/material";
import Post from "./Post";
import {ApiNews} from "../../../types";

interface Props {
    articles: ApiNews[];
}

const Posts: React.FC<Props> = ({articles}) => {
    return (
        <Grid container direction='column' spacing={1}>
            {articles.map((post) => (
                <Post
                    key={post.id}
                    article={post}
                />
            ))}
        </Grid>
    );
};

export default Posts;