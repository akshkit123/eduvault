export const API_BASE_URL =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/$/, "")
    : "";

/**
 * Returns full absolute URL for uploaded media files (such as certificates and documents).
 * In production on Vercel, ensures relative /media paths point to the Render backend.
 */
export const getMediaUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${API_BASE_URL}${cleanPath}`;
};


// =====================================================
// REFRESH ACCESS TOKEN
// =====================================================

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/auth/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }
    );

    const data = await response.json();

    console.log("Refresh token response:", data);

    if (!response.ok || !data.access) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return null;
    }

    localStorage.setItem("accessToken", data.access);

    return data.access;
  } catch (error) {
    console.error("Refresh token error:", error);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    return null;
  }
};

// =====================================================
// AUTHENTICATED FETCH
// =====================================================

export const authenticatedFetch = async (
  endpoint,
  options = {}
) => {
  let accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("NO_ACCESS_TOKEN");
  }

  const makeRequest = async (token) => {
    const headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    };

    // IMPORTANT:
    // Do NOT manually set Content-Type for FormData.
    // Browser automatically creates multipart/form-data boundary.
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] =
        headers["Content-Type"] || "application/json";
    }

    return fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  };

  let response = await makeRequest(accessToken);

  if (response.status === 401) {
    console.log(
      "Access token expired. Trying to refresh..."
    );

    const newAccessToken = await refreshAccessToken();

    if (!newAccessToken) {
      throw new Error("SESSION_EXPIRED");
    }

    response = await makeRequest(newAccessToken);
  }

  return response;
};

// =====================================================
// LOGOUT
// =====================================================

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};