import { useEffect, useState } from "react";
import {
  getPendingReviews,
  approveReview,
  deleteReview
} from "../utils/reviewApi";
import { fetchBranches } from "../utils/dataFetcher";
import { uploadNotesPdf } from "../utils/notesApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/AdminReviews.css";

const adminEmails = [
  "rtupedia@gmail.com",
  "manangupta902@gmail.com",
  "kanchanprajapat208@gmail.com",
  "koustubhchouhan9@gmail.com",
  "manangupta9887@gmail.com",
  "kanchanprajapat2926@gmail.com",
  "mayankphalodia@gmail.com"
];

const yearOptions = [
  { value: "first-year", label: "1st Year", semesters: ["1", "2"] },
  { value: "second-year", label: "2nd Year", semesters: ["3", "4"] },
  { value: "third-year", label: "3rd Year", semesters: ["5", "6"] },
  { value: "fourth-year", label: "4th Year", semesters: ["7", "8"] }
];

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [uploadForm, setUploadForm] = useState({
    yearSlug: "first-year",
    branch: "COMMON",
    semester: "1",
    subject: "",
    unit: "",
    pdfFile: null
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  /* 🔐 AUTH CHECK */
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!adminEmails.includes(user.email)) {
      navigate("/");
    }
  }, [user, navigate]);

  /* 📥 LOAD REVIEWS */
  const loadReviews = async () => {
    try {
      const data = await getPendingReviews();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setReviews([]);
    }
  };

  useEffect(() => {
    if (!user) return;

    if (adminEmails.includes(user.email)) {
      loadReviews();
    }
  }, [user]);

  const handleUploadFormChange = (event) => {
    const { name, value, files } = event.target;
    setUploadError("");
    setUploadSuccess("");

    if (name === "yearSlug") {
      const year = yearOptions.find((option) => option.value === value);
      const branches = fetchBranches(value);
      setUploadForm((current) => ({
        ...current,
        yearSlug: value,
        branch: branches[0] || "",
        semester: year.semesters[0]
      }));
      return;
    }

    setUploadForm((current) => ({
      ...current,
      [name]: name === "pdfFile" ? files[0] || null : value
    }));
  };

  const handleUploadSubmit = async (event) => {
    event.preventDefault();
    setUploadError("");
    setUploadSuccess("");

    if (!uploadForm.pdfFile || !uploadForm.pdfFile.name.toLowerCase().endsWith(".pdf")) {
      setUploadError("Choose a PDF file to upload.");
      return;
    }

    setUploading(true);
    try {
      await uploadNotesPdf(uploadForm);
      setUploadForm((current) => ({
        ...current,
        subject: "",
        unit: "",
        pdfFile: null
      }));
      event.target.reset();
      setUploadSuccess("Notes PDF uploaded and added to the frontend.");
    } catch (error) {
      setUploadError(error.message || "Unable to upload notes PDF.");
    } finally {
      setUploading(false);
    }
  };

  /* ⛔ SAFETY UI */
  if (!user) return null;
  if (!adminEmails.includes(user.email)) return null;

  /* ✅ ADMIN DASHBOARD */
  return (
    <div className="admin-container">
      <h2 className="admin-title">Pending Reviews</h2>

      <section className="admin-upload-card">
        <h3 className="admin-upload-title">Upload Notes PDF</h3>
        <form className="admin-upload-form" onSubmit={handleUploadSubmit}>
          <label>
            Year
            <select
              name="yearSlug"
              value={uploadForm.yearSlug}
              onChange={handleUploadFormChange}
            >
              {yearOptions.map((year) => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Branch
            <select
              name="branch"
              value={uploadForm.branch}
              onChange={handleUploadFormChange}
              required
            >
              {fetchBranches(uploadForm.yearSlug).map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </label>

          <label>
            Semester
            <select
              name="semester"
              value={uploadForm.semester}
              onChange={handleUploadFormChange}
            >
              {yearOptions
                .find((year) => year.value === uploadForm.yearSlug)
                .semesters.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
            </select>
          </label>

          <label>
            Subject
            <input
              name="subject"
              value={uploadForm.subject}
              onChange={handleUploadFormChange}
              maxLength={120}
              required
            />
          </label>

          <label>
            Unit or notes title
            <input
              name="unit"
              value={uploadForm.unit}
              onChange={handleUploadFormChange}
              maxLength={160}
              required
            />
          </label>

          <label>
            PDF file
            <input
              name="pdfFile"
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleUploadFormChange}
              required
            />
          </label>

          {uploadError && (
            <p className="admin-upload-feedback admin-upload-error" role="alert">
              {uploadError}
            </p>
          )}
          {uploadSuccess && (
            <p className="admin-upload-feedback admin-upload-success" role="status">
              {uploadSuccess}
            </p>
          )}

          <button className="admin-approve" type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Notes PDF"}
          </button>
        </form>
      </section>

      {reviews.length === 0 && <p>No pending reviews</p>}

      {reviews.map((r) => (
        <div key={r._id} className="admin-card">
          <div className="admin-name">{r.name}</div>
          <div className="admin-message">{r.message}</div>
          <div className="admin-rating">⭐ {r.rating}</div>

          <div className="admin-actions">
            <button
              className="admin-approve"
              onClick={async () => {
                await approveReview(r._id);
                loadReviews();
              }}
            >
              Approve
            </button>

            <button
              className="admin-delete"
              onClick={async () => {
                await deleteReview(r._id);
                loadReviews();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}