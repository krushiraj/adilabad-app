import config from "../config";

const HOST = config.BACKEND_HOST;

export const apiCallAddresses = {
  auth: {
    signin: `${HOST}/admin/signin`,
    signout: `${HOST}/admin/signout`,
  },
  categories: {
    create: `${HOST}/category/`,
    read: (_, id) => `${HOST}/category/${id}`,
    update: (_, id) => `${HOST}/category/${id}`,
    delete: (_, id) => `${HOST}/category/${id}`,
    listAll: `${HOST}/category`,
    listByName: (_, query) =>
      `${HOST}/category${query ? `?name=${query}` : ""}`,
    listByNameWithoutParent: (_, name) =>
      `${HOST}/category?parentCategory=&name=${name}`,
  },
  listings: {
    create: `${HOST}/listing/`,
    read: (_, id) => `${HOST}/listing/${id}`,
    update: (_, id) => `${HOST}/listing/${id}`,
    delete: (_, id) => `${HOST}/listing/${id}`,
    listByName: (_, query) =>
      `${HOST}/listing${query ? `?name=${query}` : ""}`,
    listAll: `${HOST}/listing`,
  },
};
