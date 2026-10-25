import { authenticatedFetch } from "./apiClient";

// =====================================================
// GET ALL INTERNSHIPS
// =====================================================
export const getInternships = async () => {
  const response = await authenticatedFetch("/api/internships/", {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.detail ||
      errorData?.message ||
      "Failed to load internships."
    );
  }

  return response.json();
};

// =====================================================
// CREATE INTERNSHIP
// =====================================================
export const createInternship = async (internshipData) => {
  const response = await authenticatedFetch("/api/internships/", {
    method: "POST",
    body: JSON.stringify(internshipData),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.detail ||
      data?.role?.[0] ||
      data?.company?.[0] ||
      "Failed to create internship entry."
    );
  }

  return data;
};

// =====================================================
// UPDATE INTERNSHIP
// =====================================================
export const updateInternship = async (internshipId, internshipData) => {
  const response = await authenticatedFetch(`/api/internships/${internshipId}/`, {
    method: "PATCH",
    body: JSON.stringify(internshipData),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.detail ||
      data?.role?.[0] ||
      "Failed to update internship entry."
    );
  }

  return data;
};

// =====================================================
// DELETE INTERNSHIP
// =====================================================
export const deleteInternship = async (internshipId) => {
  const response = await authenticatedFetch(`/api/internships/${internshipId}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.detail ||
      "Failed to delete internship entry."
    );
  }

  return true;
};
