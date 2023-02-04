import express from "express";
import fileDb from "../fileDb";
import {CommentMutation} from "../types";
import {randomUUID} from "crypto";

const commentsRouters = express.Router();

commentsRouters.post('/', async (req, res) => {
    if (!req.body.news_id || !req.body.comment) {
        return res.status(400).send({error: 'All fields are required'});
    }

    const getPosts = await fileDb.getNews();
    const article = getPosts.find(item => item.id === req.body.news_id);

    if (article) {
        const commentData: CommentMutation = {
            id: randomUUID(),
            news_id: req.body.news_id,
            author: req.body.author ? req.body.author : 'Anonymous',
            comment: req.body.comment,
        }
        const saveComment = await fileDb.addComment(commentData);
        res.send(saveComment);
    } else {
        res.send('Sorry, there is no that post');
    }
});

commentsRouters.get('/', async (req, res) => {
    if (req.query.news_id) {
        const newsId = req.query.news_id as string;
        const getPosts = await fileDb.getNews();
        const post = getPosts.find(item => item.id === newsId);
        if (post) {
            const comments = await fileDb.getComments();
            const newArrayComments = comments.filter(item => item.news_id === post.id);
            res.send(newArrayComments);
        } else {
            res.send({error: 'There is no that post'});
        }
    } else {
        const comments = await fileDb.getComments();
        res.send(comments);
    }
});

commentsRouters.delete('/:id', async (req, res) => {
    const comments = await fileDb.deleteComment(req.params.id);
    res.send(comments);
});

export default commentsRouters;