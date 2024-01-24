import config from "../config";

const HOST = config.BACKEND_HOST;

export const apiCallAddresses = {
  auth: {
    signin: `${HOST}/api/admin/signin`,
    signout: `${HOST}/api/admin/signout`,
  },
  advertisements: {
    create: `${HOST}/api/advertisement/`,
    read: (_, id) => `${HOST}/api/advertisement/${id}`,
    update: (_, id) => `${HOST}/api/advertisement/${id}`,
    delete: (_, id) => `${HOST}/api/advertisement/${id}`,
    listAll: `${HOST}/api/advertisement`,
    listByQuery: (_, query) =>
      `${HOST}/api/advertisement${query ? `?q=${query}` : ""}`,
  },
  categories: {
    create: `${HOST}/api/category/`,
    read: (_, id) => `${HOST}/api/category/${id}`,
    update: (_, id) => `${HOST}/api/category/${id}`,
    delete: (_, id) => `${HOST}/api/category/${id}`,
    listAll: `${HOST}/api/category`,
    listByName: (_, query) =>
      `${HOST}/api/category${query ? `?name=${query}` : ""}`,
    listByNameWithoutParent: (_, name) =>
      `${HOST}/api/category?parentCategory=&name=${name}`,
  },
  listings: {
    create: `${HOST}/api/listing/`,
    read: (_, id) => `${HOST}/api/listing/${id}`,
    update: (_, id) => `${HOST}/api/listing/${id}`,
    delete: (_, id) => `${HOST}/api/listing/${id}`,
    listByName: (_, query) =>
      `${HOST}/api/listing${query ? `?name=${query}` : ""}`,
    listAll: `${HOST}/api/listing`,
  },
};
