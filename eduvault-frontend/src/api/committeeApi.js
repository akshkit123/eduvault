import { authenticatedFetch } from "./apiClient";

// =====================================================
// GET COMMITTEE STUDENTS
// =====================================================
export const getCommitteeStudents = async () => {
  const response = await authenticatedFetch("/api/committee/students/", {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.detail ||
      errorData?.message ||
      `Failed to load students (${response.status})`
    );
  }

  return response.json();
};

// =====================================================
// GRADUATE STUDENT
// =====================================================
export const graduateStudent = async (studentId, graduationDate) => {
  const response = await authenticatedFetch(
    `/api/committee/students/${studentId}/graduate/`,
    {
      method: "PATCH",
      body: JSON.stringify({
        graduation_date: graduationDate,
      }),
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.error ||
      data?.detail ||
      data?.graduation_date?.[0] ||
      "Failed to graduate student."
    );
  }

  return data;
};

// =====================================================
// GET COMMITTEE DOCUMENTS
// =====================================================
export const getCommitteeDocuments = async () => {
  const response = await authenticatedFetch("/api/committee/documents/", {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.detail ||
      errorData?.message ||
      `Failed to load committee documents (${response.status})`
    );
  }

  return response.json();
};

// =====================================================
// VERIFY DOCUMENT
// =====================================================
export const verifyDocument = async (documentId) => {
  const response = await authenticatedFetch(
    `/api/committee/documents/${documentId}/verify/`,
    {
      method: "PATCH",
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.error ||
      data?.detail ||
      "Failed to verify document."
    );
  }

  return data;
};

// =====================================================
// REJECT DOCUMENT
// =====================================================
export const rejectDocument = async (documentId, rejectionReason) => {
  const response = await authenticatedFetch(
    `/api/committee/documents/${documentId}/reject/`,
    {
      method: "PATCH",
      body: JSON.stringify({
        rejection_reason: rejectionReason,
      }),
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.error ||
      data?.rejection_reason?.[0] ||
      data?.detail ||
      "Failed to reject document."
    );
  }

  return data;
};
