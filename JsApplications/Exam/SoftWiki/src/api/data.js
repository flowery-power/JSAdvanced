import * as api from "./api.js"

const host = "http://localhost:3030";
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getData() {
  return await api.get(host + "/users/logout");
}

export async function getArticleById(id) {
  return await api.get(host + "/data/books/" + id)
}

export async function getCatalog() {
  return await api.get(host + "/data/books?sortBy=_createdOn%20desc");
}

export async function createArticle(data) {
  return await api.post(host + "/data/books", data)
}

export async function editArticle(id, data) {
  return await api.put(host + "/data/books/" + id, data)
}

export async function delArticle(id) {
  return await api.del(host + "/data/books?sortBy=_createdOn%20desc" + id)
}
