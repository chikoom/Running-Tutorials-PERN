import http from "../http-common";

const getAll = () => {
  return http.get("/tutorials");
};

const getAllForUserId = userId => {
  return http.get(`/tutorials/user/${userId}`);
};

const get = id => {
  return http.get(`/tutorials/${id}`);
};

const create = data => {
  return http.post("/tutorials", data);
};

const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data);
};

const remove = id => {
  return http.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByTitle = title => {
  return http.get(`/tutorials?title=${title}`);
};

const findByStatus = status => {
  return http.get(`/tutorials?status=${status}`);
};


export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  findByStatus,
  getAllForUserId
};