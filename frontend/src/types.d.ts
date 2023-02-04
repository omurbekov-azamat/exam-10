export interface SendPost {
    title: string;
    content: string;
    image: string | null;
}

export interface NewsMutation  extends SendPost {
    date: string
    id: string;
}

export interface SendPostWithDate extends SendPost {
    date: string
}

export type ApiNews = Omit<NewsMutation, 'content'>;


