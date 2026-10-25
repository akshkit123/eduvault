import { API_BASE_URL, authenticatedFetch } from "./apiClient";


// =====================================================
// GET PROFILE
// =====================================================

export const getProfile = async () => {
  const response = await authenticatedFetch(
    "/api/profile/",
    {
      method: "GET",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.message ||
      "Unable to load profile details."
    );
  }

  return data;
};


// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateProfile = async (profileData) => {
  const response = await authenticatedFetch(
    "/api/profile/",
    {
      method: "PATCH",
      body: JSON.stringify(profileData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.message ||
      "Unable to update profile."
    );
  }

  return data;
};


// =====================================================
// GET PUBLIC STUDENT PROFILE (FOR INTERVIEWERS & SCANNERS)
// =====================================================

export const getPublicStudentProfile = async (identifier) => {
  const response = await fetch(
    `${API_BASE_URL}/api/students/public/${identifier}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ||
      data.detail ||
      "Student profile not found or unavailable."
    );
  }

  return data;
};