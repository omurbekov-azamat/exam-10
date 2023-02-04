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
          if (item.image) {
              const destDir = path.join(config.publicPath + '/' + item.image);
              await fs.unlink(destDir);
          }
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
    async addComment(comment: CommentMutation) {
        data.comments.push(comment);
        await this.save();
        return 'We got your comment for that post';
    },
    async getComments() {
        return data.comments;
    },
    async deleteComment(id: string) {
        const comment = data.comments.find(comment => comment.id === id)

        if (comment) {
            await fs.unlink(fileName);
            data.comments = data.comments.filter((item) => item.id !== id);
            await fs.writeFile(fileName, JSON.stringify(data));
            return ('Deletion was successful');
        } else {
            return 'There is no comment with that id';
        }
    },
    async save() {
        await fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;