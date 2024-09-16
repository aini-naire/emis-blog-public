import { api } from "./API";

export const TagsAPI = {
  get: async function (tagID: string) {
    return api.get("/tags/" + tagID);
  },
  list: async function () {
    return api.get("/tags");
  },
};
