const HOST = "http://localhost:8000";

export const apiCallAddresses = {
  auth: {
    signin: `${HOST}/api/admin/signin`,
  },
  categories: {
    create: `${HOST}/api/category/`,
    read: (_, id) => `${HOST}/api/category/${id}`,
    update: (_, id) => `${HOST}/api/category/${id}`,
    delete: (_, id) => `${HOST}/api/category/${id}`,
    list: (_, query) => `${HOST}/api/category${query ? `?${query}` : ""}`,
  },
};
