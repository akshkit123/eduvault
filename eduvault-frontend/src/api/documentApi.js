import {
  authenticatedFetch,
} from "./apiClient";

// =====================================================
// GET STUDENT DOCUMENTS
// =====================================================

export const getDocuments = async () => {
  const response = await authenticatedFetch(
    "/api/documents/",
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    const errorData =
      await response.json().catch(() => null);

    throw new Error(
      errorData?.detail ||
        errorData?.message ||
        "Failed to fetch documents."
    );
  }

  return response.json();
};

// =====================================================
// GET SINGLE DOCUMENT
// =====================================================

export const getDocument = async (documentId) => {
  const response = await authenticatedFetch(
    `/api/documents/${documentId}/`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    const errorData =
      await response.json().catch(() => null);

    throw new Error(
      errorData?.detail ||
        errorData?.message ||
        "Failed to fetch document."
    );
  }

  return response.json();
};

// =====================================================
// UPLOAD DOCUMENT
// =====================================================

export const uploadDocument = async ({
  title,
  category,
  file,
}) => {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("category", category);
  formData.append("file", file);

  const response = await authenticatedFetch(
    "/api/documents/",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData =
      await response.json().catch(() => null);

    console.error("Upload API error:", errorData);

    throw new Error(
      errorData?.detail ||
        errorData?.message ||
        errorData?.file?.[0] ||
        errorData?.title?.[0] ||
        errorData?.category?.[0] ||
        "Failed to upload document."
    );
  }

  return response.json();
};

// =====================================================
// DELETE DOCUMENT
// =====================================================

export const deleteDocument = async (documentId) => {
  const response = await authenticatedFetch(
    `/api/documents/${documentId}/`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const errorData =
      await response.json().catch(() => null);

    throw new Error(
      errorData?.detail ||
        errorData?.message ||
        "Failed to delete document."
    );
  }

  return true;
};