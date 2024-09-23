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

export type TagLink = {
    title: string;
    url: string;
}

export type PostMeta = {
    url: string;
    title: string;
    tagline: string;
    /**
     * @type date-time
     */
    created: string;
    author: Author,
    showAuthor: boolean;
    tags: TagLink[]
}

export type PostListResponse = {
    posts: PostMeta[];
    page: number;
    pages: number;
};

export type LanguageLink = {
    language: Language;
    url: string;
}

export type PostBase = {
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
    languages: LanguageLink[];
    tags?: Tag[];
}