import { api } from "./API";

export const TagsAPI = {
  get: async function (tagURL: string) {
    return api.get("/tag/" + tagURL);
  },
};
