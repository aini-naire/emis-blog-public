import { api } from "./API";

export const NavAPI = {
  get: async function (language: string) {
    return api.get("/nav/"+language);
  },
};
