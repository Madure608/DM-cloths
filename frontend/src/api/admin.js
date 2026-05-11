import { getAuthHeader, request } from "./client";

const loginAdmin = (payload) =>
  request("/api/admin/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

const fetchTShirts = () => request("/api/tshirts");

const createTShirt = (payload) =>
  request("/api/tshirts", {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify(payload),
  });

const updateTShirt = (id, payload) =>
  request(`/api/tshirts/${id}`, {
    method: "PUT",
    headers: getAuthHeader(),
    body: JSON.stringify(payload),
  });

const deleteTShirt = (id) =>
  request(`/api/tshirts/${id}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });

const fetchOrderIntents = () =>
  request("/api/orders/intents", {
    headers: getAuthHeader(),
  });

export {
  loginAdmin,
  fetchTShirts,
  createTShirt,
  updateTShirt,
  deleteTShirt,
  fetchOrderIntents,
};
