export interface NewsMutation {
    id: string;
    title: string;
    content: string;
    image: string | null;
    date: string;
}

export type ApiNews = Omit<NewsMutation, 'content'>;

export interface CommentMutation {
    id: string;
    news_id: string;
    author: string;
    comment: string;
}

export interface Magazine {
    news: NewsMutation[],
    comments: CommentMutation[],
}