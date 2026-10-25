import { API_BASE_URL, authenticatedFetch } from "./apiClient";


// =====================================================
// REGISTER USER
// =====================================================

export const registerUser = async (registerData) => {

  const response = await fetch(
    `${API_BASE_URL}/api/auth/register/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(registerData),
    }
  );


  const data = await response.json();


  if (!response.ok) {

    throw new Error(
      data.detail ||
      data.message ||
      "Registration failed. Please check your details."
    );

  }


  return data;
};


// =====================================================
// LOGIN USER
// =====================================================

export const loginUser = async (email, password) => {

  const response = await fetch(
    `${API_BASE_URL}/api/auth/login/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );


  const data = await response.json();


  if (!response.ok) {

    throw new Error(
      data.detail ||
      data.message ||
      "Invalid email or password."
    );

  }


  // ---------------------------------------------------
  // Store JWT tokens
  // ---------------------------------------------------

  localStorage.setItem(
    "accessToken",
    data.access
  );

  localStorage.setItem(
    "refreshToken",
    data.refresh
  );


  return data;
};


// =====================================================
// GET CURRENT USER
// =====================================================

export const getCurrentUser = async () => {

  const response = await authenticatedFetch(
    "/api/auth/me/",
    {
      method: "GET",
    }
  );


  const data = await response.json();


  if (!response.ok) {

    throw new Error(
      data.detail ||
      data.message ||
      "Unable to load user information."
    );

  }


  return data;
};