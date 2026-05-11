import { API_BASE_URL, request } from "./client";

const fetchTShirts = () => request("/api/tshirts");

const createOrderIntent = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/orders/intent`, {
    method: "POST",
    body: payload,
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const message = data?.message || "Upload failed";
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export { fetchTShirts, createOrderIntent };
