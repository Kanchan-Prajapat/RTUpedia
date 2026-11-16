import yearFirst from "../data/rtu_first_year.json";
import yearSecond from "../data/rtu_second_year.json";
import yearThird from "../data/rtu_third_year.json";
import yearFourth from "../data/rtu_fourth_year.json";

import yearFirstLab from "../data/rtu_first_year_lab.json";
import yearSecondLab from "../data/rtu_second_year_lab.json";
import yearThirdLab from "../data/rtu_third_year_lab.json";

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
    case "first-year":
      return yearFirst;

    case "second-year":
      return yearSecond;

    case "third-year":
      return yearThird;

    case "fourth-year":
      return yearFourth;

    default:
      return null;
  }
};

/* =========================
   NORMALIZE
========================= */

const normalize = (str) =>
  String(str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

/* =========================
   FIND BRANCH KEY
   Handles CSE / cse mismatch
========================= */

const findBranchKey = (data, branch) => {
  if (!data || !branch) return null;

  return (
    Object.keys(data).find(
      (key) =>
        String(key).toLowerCase() ===
        String(branch).toLowerCase()
    ) || null
  );
};

/* =========================
   FETCH BRANCHES
========================= */

export const fetchBranches = (yearSlug) => {
  if (yearSlug === "first-year") {
    return ["COMMON"];
  }

  const data = getYearJSON(yearSlug);

  if (!data) return [];

  return Object.keys(data).map((branch) =>
    branch.toUpperCase()
  );
};



/* =========================
   LOAD NOTES
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

  /* =========================
     FIRST YEAR
  ========================= */
  if (yearSlug === "first-year") {
    subjects =
      data.COMMON?.[String(semester)]?.subjects || [];
  }

  /* =========================
     OTHER YEARS
  ========================= */
  else {
    const branchKey = Object.keys(data).find(
      (key) =>
        key.toLowerCase() ===
        String(branch).toLowerCase()
    );

    if (!branchKey) {
      console.error(
        "❌ Branch not found:",
        branch
      );

      console.log(
        "Available branches:",
        Object.keys(data)
      );

      return [];
    }

    const semesterData =
      data[branchKey]?.[String(semester)];

    /*
      Supports both structures:

      Semester: [subjects]

      OR

      Semester: {
        subjects: [...]
      }
    */

    subjects = Array.isArray(semesterData)
      ? semesterData
      : semesterData?.subjects || [];
  }

  cache.notes[key] = subjects;

  return subjects;
};



/* =========================
   FETCH PYQs
========================= */

export const fetchPYQFromBackend = async (
  yearSlug,
  branch,
  semester,
  subjects
) => {
  const sem = String(semester);

  if (!Array.isArray(subjects) || subjects.length === 0) {
    return [];
  }

  // Include subject names to prevent incorrect cache reuse
  const subjectSignature = subjects
    .map((s) => `${s.subjectCode}-${s.subjectName}`)
    .join("|");

  const cacheKey =
    `${yearSlug}-${branch}-${sem}-${subjectSignature}`;

  if (
    Object.prototype.hasOwnProperty.call(
      cache.pyq,
      cacheKey
    )
  ) {
    return cache.pyq[cacheKey];
  }

  // Normalize spaces, punctuation, and "&" / "and"
  const normalizeSubject = (str) =>
    String(str || "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/\band\b/g, " ")
      .replace(/[^a-z0-9]/g, "");

  // Handle known subject naming variations
  const getSubjectAliases = (name) => {
    const normalized = normalizeSubject(name);

    const aliases = [normalized];

    if (normalized === "analysisofalgorithms") {
      aliases.push("analysisofalgorithm");
    }

    return [...new Set(aliases)];
  };

  try {
    const response = await fetch(
      `${BACKEND_BASE}/api/pyq/${encodeURIComponent(
        branch
      )}/${encodeURIComponent(sem)}`
    );

    if (!response.ok) {
      console.error("PYQ API failed:", response.status);
      return [];
    }

    const files = await response.json();

    if (!Array.isArray(files)) {
      return [];
    }

    const groups = subjects.map((subject) => ({
      subjectName: subject.subjectName,
      subjectCode: subject.subjectCode,
      pyqs: []
    }));

    files.forEach((file) => {
      const fileName = normalizeSubject(file.title);

      groups.forEach((group) => {
        const aliases = getSubjectAliases(group.subjectName);

        const nameMatch = aliases.some((alias) =>
          fileName.includes(alias)
        );

        const subjectCode = normalizeSubject(
          group.subjectCode
        );

        const codeMatch =
          subjectCode &&
          fileName.includes(subjectCode);

        if (nameMatch || codeMatch) {
          // Avoid duplicate entries
          const alreadyAdded = group.pyqs.some(
            (paper) => paper.pdf === file.pdf
          );

          if (alreadyAdded) return;

          const year =
            file.title.match(/\d{4}/)?.[0] ||
            "Unknown";

          group.pyqs.push({
            title: `${year} Paper`,
            pdf: file.pdf
          });
        }
      });
    });

    const finalGroups = groups.filter(
      (group) => group.pyqs.length > 0
    );

    cache.pyq[cacheKey] = finalGroups;

    console.log("✅ PYQ matching result:", finalGroups);

    return finalGroups;

  } catch (error) {
    console.error("PYQ fetch failed:", error);
    return [];
  }
};

/* =========================
   LOAD LABS
========================= */


export const loadLabs = (
  yearSlug,
  branch,
  semester
) => {
  const sem = String(semester);

  const cacheKey =
    `${yearSlug}-${branch}-${sem}`;

  if (
    Object.prototype.hasOwnProperty.call(
      cache.lab,
      cacheKey
    )
  ) {
    return cache.lab[cacheKey];
  }

  let subjects = [];

  /* ---------- FIRST YEAR ---------- */

  if (yearSlug === "first-year") {
    subjects =
      yearFirstLab?.COMMON?.[sem] || [];
  }

  /* ---------- SECOND YEAR ---------- */

  else if (yearSlug === "second-year") {
    const branchKey =
      findBranchKey(yearSecondLab, branch);

    if (branchKey) {
      subjects =
        yearSecondLab?.[branchKey]?.[sem] || [];
    }
  }

  /* ---------- THIRD YEAR ---------- */

  else if (yearSlug === "third-year") {
    const branchKey =
      findBranchKey(yearThirdLab, branch);

    if (branchKey) {
      subjects =
        yearThirdLab?.[branchKey]?.[sem] || [];
    }
  }

  if (!Array.isArray(subjects)) {
    subjects = [];
  }

  cache.lab[cacheKey] = subjects;

  return subjects;
};

/* =========================
   LOAD EXTRA / MORE
========================= */

/* =========================
   LOAD EXTRA MORE
========================= */
export const loadExtraMore = (
  yearSlug,
  branch,
  semester
) => {
  const key =
    `${yearSlug}-${branch}-${semester}`;

  if (cache.extraMore[key]) {
    return cache.extraMore[key];
  }

  const data = getYearJSON(yearSlug);

  if (!data) {
    return [];
  }

  let semesterData;

  /* FIRST YEAR */
  if (yearSlug === "first-year") {
    semesterData =
      data.COMMON?.[String(semester)];
  }

  /* OTHER YEARS */
  else {
    const branchKey = Object.keys(data).find(
      (key) =>
        key.toLowerCase() ===
        String(branch).toLowerCase()
    );

    semesterData =
      data[branchKey]?.[String(semester)];
  }

  const extra =
    semesterData?.Extra || [];

  cache.extraMore[key] = extra;

  return extra;
};


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