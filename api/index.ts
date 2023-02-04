import express from "express";
import cors from 'cors';
import newsRouters from "./routers/news";
import fileDb from "./fileDb";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/news', newsRouters);

const run = async () => {
    await fileDb.init();
    app.listen(port, () => {
       console.log('We are live on ' + port);
    });
};

run().catch(console.error);