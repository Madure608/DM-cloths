import { API_BASE_URL, getAuthHeader, request } from "./client";

const loginAdmin = (payload) =>
  request("/api/admin/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

const bootstrapAdmin = (payload) =>
  request("/api/admin/bootstrap", {
    method: "POST",
    body: JSON.stringify({
      username: payload.username,
      email: payload.email,
      password: payload.password,
    }),
  });

const fetchAdminStatus = () => request("/api/admin/status");

const fetchTShirts = () => request("/api/tshirts");

const sendTShirtForm = async (path, formData, method) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: getAuthHeader(),
    body: formData,
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const message = data?.message || "Request failed";
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

const createTShirt = (formData) =>
  sendTShirtForm("/api/tshirts", formData, "POST");

const updateTShirt = (id, formData) =>
  sendTShirtForm(`/api/tshirts/${id}`, formData, "PUT");

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
  bootstrapAdmin,
  fetchAdminStatus,
  fetchTShirts,
  createTShirt,
  updateTShirt,
  deleteTShirt,
  fetchOrderIntents,
};
