import { authenticatedFetch } from "./apiClient";

// =====================================================
// GET ALL PROJECTS
// =====================================================
export const getProjects = async () => {
  const response = await authenticatedFetch("/api/projects/", {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.detail ||
      errorData?.message ||
      "Failed to load projects."
    );
  }

  return response.json();
};

// =====================================================
// CREATE PROJECT
// =====================================================
export const createProject = async (projectData) => {
  const response = await authenticatedFetch("/api/projects/", {
    method: "POST",
    body: JSON.stringify(projectData),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.detail ||
      data?.title?.[0] ||
      data?.description?.[0] ||
      "Failed to create project."
    );
  }

  return data;
};

// =====================================================
// UPDATE PROJECT
// =====================================================
export const updateProject = async (projectId, projectData) => {
  const response = await authenticatedFetch(`/api/projects/${projectId}/`, {
    method: "PATCH",
    body: JSON.stringify(projectData),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.detail ||
      data?.title?.[0] ||
      "Failed to update project."
    );
  }

  return data;
};

// =====================================================
// DELETE PROJECT
// =====================================================
export const deleteProject = async (projectId) => {
  const response = await authenticatedFetch(`/api/projects/${projectId}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.detail ||
      "Failed to delete project."
    );
  }

  return true;
};
