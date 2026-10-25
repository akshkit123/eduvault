import { authenticatedFetch } from "./apiClient";

/**
 * Fetch students for Placement Team with filtering (search, department, min_cgpa, status, verified_only).
 */
export const getPlacementCandidates = async ({
  search = "",
  department = "",
  min_cgpa = "",
  status = "",
  verified_only = false,
} = {}) => {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (department && department !== "All") queryParams.append("department", department);
  if (min_cgpa) queryParams.append("min_cgpa", min_cgpa);
  if (status && status !== "All") queryParams.append("status", status);
  if (verified_only) queryParams.append("verified_only", "true");

  const url = `/api/placement/students/?${queryParams.toString()}`;
  const response = await authenticatedFetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to load placement candidates. Status: ${response.status}`);
  }

  return await response.json();
};
