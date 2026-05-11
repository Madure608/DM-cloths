const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const getAuthHeader = () => {
  const token = localStorage.getItem("dm_admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getUserAuthHeader = () => {
  const token = localStorage.getItem("dm_user_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
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

export { API_BASE_URL, getAuthHeader, getUserAuthHeader, request };
