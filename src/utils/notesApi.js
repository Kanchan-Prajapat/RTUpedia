const BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://rtupedia-backend-2.onrender.com";

const getToken = () => localStorage.getItem("userToken");

const getErrorMessage = async (response) => {
  const data = await response.json().catch(() => ({}));
  return data.message || "Unable to complete notes request";
};

export const getUploadedNotes = async ({ yearSlug, branch, semester }) => {
  const params = new URLSearchParams({ yearSlug, branch, semester });
  const response = await fetch(`${BASE}/api/notes?${params}`);

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const notes = await response.json();
  return notes.map((note) => ({
    ...note,
    pdf: new URL(note.pdf, BASE).toString()
  }));
};

export const uploadNotesPdf = async ({
  yearSlug,
  branch,
  semester,
  subject,
  unit,
  pdfFile
}) => {
  const formData = new FormData();
  formData.append("yearSlug", yearSlug);
  formData.append("branch", branch);
  formData.append("semester", semester);
  formData.append("subject", subject);
  formData.append("unit", unit);
  formData.append("pdf", pdfFile);

  const response = await fetch(`${BASE}/api/notes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json();
};
