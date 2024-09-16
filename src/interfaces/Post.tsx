export enum Language {
    EN = "EN",
    PT = "PT",
}

export type Author = {
    fullName: string;
}

export type Tag = {
    /**
     * @type uuid
     */
    id: string;
    title: string;
    language: Language;
    tagline: string;
}

export type PostMeta = {
    /**
     * @type uuid
     */
    id: string;
    url: string;
    title: string;
    tagline: string;
    author: Author,
}

export type PostListResponse = PostMeta[];

export type PostBase = {
    /**
     * @type uuid
     */
    id: string;
    url: string;
    content: string;
    title: string;
    language: Language;
    tagline: string;
    /**
     * @type date-time
     */
    created: string;
    /**
     * @type date-time
     */
    modified: string;
    showAuthor: boolean;
    page: boolean;
    author: Author,
    tags?: Tag[];
}