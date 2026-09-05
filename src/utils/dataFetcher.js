import yearFirst from "../data/rtu_first_year.json";
import yearSecond from "../data/rtu_second_year.json";
import yearThird from "../data/rtu_third_year.json";
import yearFourth from "../data/rtu_fourth_year.json";
import yearFirstLab from "../data/rtu_first_year_lab.json";
import yearSecondLab from "../data/rtu_second_year_lab.json";

/* =========================
   BACKEND
========================= */
const BACKEND_BASE = "https://rtupedia-backend-2.onrender.com";

/* =========================
   CACHE
========================= */
const cache = {
  notes: {},
  pyq: {},
  lab: {},
  extraMore: {}
};

/* =========================
   GET YEAR JSON
========================= */
const getYearJSON = (yearSlug) => {
  switch (yearSlug) {
    case "first-year": return yearFirst;
    case "second-year": return yearSecond;
    case "third-year": return yearThird;
    case "fourth-year": return yearFourth;
    default: return null;
  }
};

/* =========================
   NORMALIZER (PYQ MATCHING)
   ⚠️ DO NOT CHANGE – BACKEND SAFE
========================= */
const normalize = (str) =>
  String(str || "").toLowerCase().replace(/[^a-z0-9]/g, "");

/* =========================
   FETCH BRANCHES
========================= */
export const fetchBranches = (yearSlug) => {
  if (yearSlug === "first-year") return ["COMMON"];
  const data = getYearJSON(yearSlug);
  return data ? Object.keys(data).map((b) => b.toUpperCase()) : [];
};

/* =========================
   LOAD NOTES (NEW SCHEMA)
========================= */
export const loadNotes = (yearSlug, branch, semester) => {
  const key = `${yearSlug}-${branch}-${semester}`;

  if (cache.notes[key]) {
    return cache.notes[key];
  }

  const data = getYearJSON(yearSlug);

  if (!data) {
    console.error("❌ Year JSON not found:", yearSlug);
    return [];
  }

  let subjects = [];

  // =========================
  // FIRST YEAR
  // =========================
  if (yearSlug === "first-year") {
    subjects = data.COMMON?.[String(semester)] || [];
  }

  // =========================
  // OTHER YEARS
  // =========================
  else {
    const branchKey = Object.keys(data).find(
      (key) => key.toLowerCase() === String(branch).toLowerCase()
    );

    if (!branchKey) {
      console.error("❌ Branch not found:", branch);
      console.log("Available branches:", Object.keys(data));
      return [];
    }

    subjects = data[branchKey]?.[String(semester)] || [];
  }


  cache.notes[key] = subjects;

  return subjects;
};


/* =========================
   FETCH PYQs (BACKEND – UNCHANGED LOGIC)
========================= */
export const fetchPYQFromBackend = async ( yearSlug, branch, semester, subjects) => {
  const key = `${yearSlug}-${branch}-${semester}`;
  if (cache.pyq[key]) return cache.pyq[key];

  try {
    const res = await fetch(`${BACKEND_BASE}/api/pyq/${branch}/${semester}`);
    if (!res.ok) return [];

    const files = await res.json();
    if (!Array.isArray(files)) return [];

    const groups = subjects.map((s) => ({
      subjectName: s.subjectName,
      subjectCode: s.subjectCode,
      pyqs: []
    }));

    files.forEach((file) => {
      const clean = normalize(file.title);

      groups.forEach((g) => {
        if (
          clean.includes(normalize(g.subjectName)) ||
          clean.includes(normalize(g.subjectCode))
        ) {
          const year = file.title.match(/\d{4}/)?.[0] || "Unknown";
          g.pyqs.push({
            title: `${year} Paper`,
            pdf: file.pdf   // ✅ backend-controlled URL
          });
        }
      });
    });

    const final = groups.filter((g) => g.pyqs.length > 0);
    cache.pyq[key] = final;
    return final;

  } catch (err) {
    console.error("PYQ fetch failed", err);
    return [];
  }
};

/* =========================
   LOAD LABS (UNCHANGED)
========================= */
export const loadLabs = (yearSlug, branch, semester) => {
  const key = `${yearSlug}-${branch}-${semester}`;
  if (cache.lab[key]) return cache.lab[key];

  let subjects = [];

  if (yearSlug === "first-year") {
    subjects = yearFirstLab?.COMMON?.[semester] || [];
  } else if (yearSlug === "second-year") {
    subjects = yearSecondLab?.[branch]?.[semester] || [];
  }

  cache.lab[key] = subjects;
  return subjects;
};

/* =========================
   LOAD EXTRA MORE (NEW SCHEMA)
========================= */
export const loadExtraMore = (yearSlug, branch, semester) => {
  const key = `${yearSlug}-${branch}-${semester}`;
  if (cache.extraMore[key]) return cache.extraMore[key];

  const data = getYearJSON(yearSlug);
  if (!data) return [];

  let extra = [];

  if (yearSlug === "first-year") {
    extra = data.COMMON?.[semester]?.Extra || [];
  } else {
    extra = data[branch]?.[semester]?.Extra || [];
  }

  cache.extraMore[key] = extra;
  return extra;
};

/* =========================
   DEFAULT EXPORT
========================= */
/* =========================
   DEFAULT EXPORT
========================= */
const dataFetcher = {
  fetchBranches,
  loadNotes,
  fetchPYQFromBackend,
  loadLabs,
  loadExtraMore
};

export default dataFetcher;
