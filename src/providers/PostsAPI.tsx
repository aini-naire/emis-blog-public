import { api } from "./API";

export const PostsAPI = {
  get: async function (postID: string) {
    return api.get("/post/" + postID);
  },
  list: async function (language: string) {
    return api.get("/posts/"+language);
  },
};
