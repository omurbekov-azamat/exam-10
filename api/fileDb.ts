import {promises as fs} from "fs";
import {CommentMutation, Magazine, NewsMutation} from "./types";
import config from "./config";
import path from "path";

const fileName = './db.json';
let data: Magazine = {
    news: [],
    comments: [],
};

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = {
                news: [],
                comments: [],
            }
        }
    },
    async addArticle(article: NewsMutation) {
        data.news.push(article);
        await this.save();
        return article;
    },
    async getNews() {
        return data.news;
    },
    async deleteArticleById(id: string) {
      const item = data.news.find(item => item.id === id);

      if (item) {
          await fs.unlink(fileName);
          const destDir = path.join(config.publicPath + '/' + item.image);
          await fs.unlink(destDir);
          data.news = data.news.filter((article: NewsMutation) => article.id !== id);
          data.comments = data.comments.filter((comment:CommentMutation) => comment.news_id !== id);
          await fs.writeFile(fileName, JSON.stringify(data));
          return {
              message: 'Deletion article was successful',
          }
      } else {
          return {
              error: 'Article is not found',
          }
      }
    },
    async save() {
        await fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;