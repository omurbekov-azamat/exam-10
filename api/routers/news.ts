import express from 'express';
import {randomUUID} from "crypto";
import {imageUpload} from "../multer";
import {ApiNews, NewsMutation} from "../types";
import fileDb from "../fileDb";

const newsRouters = express.Router();

newsRouters.post('/', imageUpload.single('image'), async (req, res) => {
    if (!req.body.title || !req.body.content) {
        return res.status(400).send({error: 'All fields are required'});
    }

    const article: NewsMutation = {
        id: randomUUID(),
        title: req.body.title,
        content: req.body.content,
        image: req.file ? req.file.filename : null,
        date: req.body.date,
    }
    const saveArticle = await fileDb.addArticle(article);
    res.send(saveArticle);
});

newsRouters.get('/', async (req, res) => {
    const news = await fileDb.getNews();

    if (!news) {
        return res.sendStatus(404);
    }

    const clearNews: ApiNews[] = news.map((item) => {
        return {
            id: item.id,
            title: item.title,
            image: item.image,
            date: item.date,
        }
    });
    res.send(clearNews);
});

newsRouters.get('/:id', async (req, res) => {
   const news = await fileDb.getNews();
   const article = news.find(item => item.id === req.params.id);

   if (!article) {
       return res.status(404).send({error: 'Wrong id, there is now article with that id!'});
   }

   res.send(article);
});

newsRouters.delete('/:id', async (req, res) => {
    const news = await fileDb.deleteArticleById(req.params.id);
    res.send(news);
});

export default newsRouters;