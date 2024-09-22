import { api } from "./API";

export const PostsAPI = {
  get: async function (postID: string) {
    return api.get("/post/" + postID);
  },
  list: async function (language: string, page: number) {
    return api.get("/posts/" + language + "/" + page);
  },
  listByTag: async function (tagURL: string, page: number) {
    return api.get("/tag/" + tagURL + "/" + page);
  },
};
