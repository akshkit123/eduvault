import { API_BASE_URL } from "./apiClient";

/**
 * Fetch dynamic alumni network directory with optional search, department, and role filters.
 */
export const getAlumniNetwork = async ({ search = "", department = "", filter = "" } = {}) => {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (department && department !== "All") queryParams.append("department", department);
  if (filter && filter !== "All") queryParams.append("filter", filter);

  const url = `${API_BASE_URL}/api/alumni/?${queryParams.toString()}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load alumni directory.");
  }

  return await response.json();
};
