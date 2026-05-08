import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchBranches,
  loadNotes,
  fetchPYQFromBackend,
  loadLabs,
  loadExtraMore
} from "../utils/dataFetcher";
import "./SGPACalculator.css";
import "../styles/global.css";

const yearSemesterMap = {
  "first-year": ["1", "2"],
  "second-year": ["3", "4"],
  "third-year": ["5", "6"],
  "fourth-year": ["7", "8"]
};

const BranchContent = () => {
  const { yearSlug } = useParams();

  /* =========================
     STATE
  ========================= */
  const [branches, setBranches] = useState([]);


  const [selectedBranch, setSelectedBranch] = useState("");

  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");

  const [tab, setTab] = useState("notes");

  const [notes, setNotes] = useState([]);
  const [pyqGrouped, setPyqGrouped] = useState([]);
  const [labGrouped, setLabGrouped] = useState([]);
  const [moreGrouped, setMoreGrouped] = useState([]);
  const [extraMore, setExtraMore] = useState([]);

  const [loadingPYQ, setLoadingPYQ] = useState(false);

  const openPDF = (pdfPath) => {
    const encoded = encodeURIComponent(pdfPath);
    window.open(`/pdfview?file=${encoded}`, "_blank");
  };
  /* =========================
     LOAD BRANCHES
  ========================= */
  useEffect(() => {
    const list = fetchBranches(yearSlug);
    setBranches(list);
    setSelectedBranch(list[0] || "");
  }, [yearSlug]);

  /* =========================
     LOAD SEMESTERS
  ========================= */
  useEffect(() => {
    const semList = yearSemesterMap[yearSlug] || [];
    setSemesters(semList);
    setSelectedSemester(semList[0] || "");
  }, [yearSlug]);

  /* =========================
     RESET VIEW ON SELECTION CHANGE
  ========================= */
  useEffect(() => {
    setTab("notes");
    setPyqGrouped([]);
    setLabGrouped([]);
    setMoreGrouped([]);
    setExtraMore([]);
  }, [yearSlug, selectedBranch, selectedSemester]);

  /* =========================
     LOAD NOTES
  ========================= */
  useEffect(() => {
    if (!selectedBranch || !selectedSemester) return;

    const data = loadNotes(yearSlug, selectedBranch, selectedSemester);
    setNotes(Array.isArray(data) ? data : []);
  }, [yearSlug, selectedBranch, selectedSemester]);

  /* =========================
     LOAD PYQs (BACKEND)
  ========================= */
  useEffect(() => {
    if (tab !== "pyq" || notes.length === 0) return;

    setLoadingPYQ(true);

    fetchPYQFromBackend(yearSlug, selectedBranch, selectedSemester, notes)
      .then((data) => setPyqGrouped(Array.isArray(data) ? data : []))
      .finally(() => setLoadingPYQ(false));

  }, [tab, yearSlug, selectedBranch, selectedSemester, notes]);

  /* =========================
     LOAD LABS
  ========================= */
  useEffect(() => {
    if (tab !== "lab") return;

    const labs = loadLabs(yearSlug, selectedBranch, selectedSemester);
    setLabGrouped(Array.isArray(labs) ? labs : []);

  }, [tab, yearSlug, selectedBranch, selectedSemester]);

  /* =========================
     LOAD MORE (SUBJECT + EXTRA)
  ========================= */
  useEffect(() => {
    if (tab !== "more") return;

    // SUBJECT-WISE MORE
    const subjectMore = notes
      .filter((s) => Array.isArray(s.More) && s.More.length > 0)
      .map((s) => ({
        subjectName: s.subjectName,
        subjectCode: s.subjectCode,
        items: s.More
      }));

    setMoreGrouped(subjectMore);

    // SEMESTER-LEVEL EXTRA
    const extra = loadExtraMore(yearSlug, selectedBranch, selectedSemester);
    setExtraMore(Array.isArray(extra) ? extra : []);

  }, [tab, notes, yearSlug, selectedBranch, selectedSemester]);

  useEffect(() => {
document.title = `${selectedBranch} Semester ${selectedSemester} RTU Notes, PYQs & Lab Manuals | RTUpedia`;
}, [yearSlug, selectedBranch, selectedSemester]); 


  /* =========================
     UI
  ========================= */
  return (
    <div style={{ padding: 25 }}>
      <h2> RTU {yearSlug.replace("-", " ")} Notes, PYQs, Lab Manuals and Study Material</h2>
      <h4 style={{marginBottom:"20px", fontWeight:"normal"}}>RTU {yearSlug.replace("-", " ").toUpperCase()} is crucial for building core engineering concepts given the right approach. Students should focus on understanding concepts and practicing PYQs. <br></br>
      Below you can find subject-wise notes, video lectures, and important resources.</h4>

      {/* Branch + Semester */}
      <div className="select-row">
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          {branches.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          {semesters.map((s) => (
            <option key={s} value={s}>Semester {s}</option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="tab-row">
        {[
          { id: "notes", label: "Notes" },
          { id: "pyq", label: "PYQ (Main Exam)" },
          { id: "lab", label: "Lab" },
          { id: "more", label: "More" }
        ].map((t) => (
          <button
            key={t.id}
            className={`rt-tab-btn ${tab === t.id ? "active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* NOTES */}
     {tab === "notes" && (
  <>
    {/* ✅ SEO Content Block */}
    <div style={{ maxWidth: "100%", marginBottom: "25px", lineHeight: "1.8" }}>
      
      <h2>RTU Notes, Video Lectures & Study Materials</h2>


      {/* ⚠️ Copyright Disclaimer */}
      <p style={{ fontSize: "14px", color: "gray" }}>
        ⚠️ Note: Due to copyright policies, students are not allowed to download the PDF notes.
        These materials are provided only for online viewing and educational purposes.
      </p>

        <p>
        <b>Scroll down </b> to find subject-wise notes, unit-wise materials, and video lectures for RTU {yearSlug.replace("-", " ").toUpperCase()}. 
      </p>
     


      <div style={{ maxWidth: "100%", marginBottom: "25px", lineHeight: "1.8", justifyContent: "center",  alignItems: "center"  , marginLeft: "auto", marginRight: "auto"}}>

      <p>
        RTU notes are essential for understanding core engineering subjects and preparing
        effectively for exams. Students should focus on unit-wise concepts, important topics,
        and practice regularly to score well in Rajasthan Technical University exams.
      </p>

      <p>
        This section provides subject-wise notes, unit-wise materials, and video lectures
        to help students learn concepts clearly and revise efficiently before exams.
      </p>

      <p>
        You can explore all subjects below and access notes along with video explanations
        for better understanding.
      </p>

    </div>

    </div>


    {/* ✅ Your existing notes UI */}
    {notes.map((sub, i) => (
      <div className="resource-card subject-card" key={i} data-aos="fade-up">
        
        <details>
          <summary style={{ fontWeight: "bold" }}>
            {sub.subjectName} ({sub.subjectCode})
            <span className="subject-units">
              {sub.units.length} Units
            </span>
          </summary>

          {sub.units.map((u, j) => (
            <div key={j} className="unit-row" style={{ marginTop: 10 }}>
              
              <strong>{u.unitName}</strong>

              <div style={{ display: "flex", gap: 12 }}>
                <button
                  className="resource-link-notes"
                  onClick={() => openPDF(u.notesPDF || u.pdf)}
                >
                  📑 View Notes
                </button>

                <a
                  className="resource-link"
                  href={u.lectureLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ▶ Video
                </a>
              </div>

            </div>
          ))}

        </details>

      </div>
    ))}


  </>
)}

      {/* PYQs */}
   {tab === "pyq" && (
  <>
 <div style={{ maxWidth: "900px", marginBottom: "25px", lineHeight: "1.8" }}>
      
      <h2>RTU Previous Year Question Papers (PYQs)</h2>

      <p>
        Previous Year Question Papers (PYQs) are one of the most effective ways to prepare
        for RTU exams. They help students understand the exam pattern, important topics,
        and frequently asked questions.
      </p>

      <p>
        By solving PYQs regularly, students can improve time management, identify important
        concepts, and gain confidence before exams. Many questions in RTU exams follow
        similar patterns, making PYQs a valuable resource.
      </p>

      <p>
        Below, you can find subject-wise RTU PYQs for your semester. Practice them properly
        to maximize your exam performance.
      </p>

    </div>

    {/* Loading */}
    {loadingPYQ && <p>Loading PYQs...</p>}

    {/* ✅ Your existing data */}
    {pyqGrouped.map((grp, i) => (
      <div className="pyq-subject-box" key={i} data-aos="fade-up">
        
        <div className="pyq-subject-title">
          {grp.subjectName} ({grp.subjectCode})
        </div>

        {grp.pyqs.map((q, idx) => (
          <a
            key={idx}
            className="pyq-paper-link"
            href={`${q.pdf}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            📄 {q.title}
          </a>
        ))}

      </div>
    ))}
    
  </>
)}

      {/* LABS */}
    {tab === "lab" && (
  <>

   <div style={{ maxWidth: "900px", marginBottom: "25px", lineHeight: "1.8" }}>
      
      <h2>RTU Lab Manuals, Files & Practical Resources</h2>

      <p>
        Lab work is an important part of RTU B.Tech curriculum, helping students understand
        practical applications of theoretical concepts. Subjects like programming, electronics,
        and mechanical labs require proper documentation and regular practice.
      </p>

      <p>
        To perform well in lab exams, students should focus on writing proper lab files,
        understanding experiments, and practicing viva questions. Referring to previous
        lab manuals and records can help in scoring better marks.
      </p>

      <p>
        Below, you can find subject-wise lab manuals, practical files, and important resources
        for your semester.
      </p>

    </div>

    {/* ✅ Your existing lab data */}
    {labGrouped.map((grp, i) => (
      <div className="pyq-subject-box" key={i} data-aos="fade-up">

        
        <div className="pyq-subject-title">
          {grp.subjectName} ({grp.subjectCode})
        </div>

        {grp.examPapers?.map((paper, idx) => (
          <button
            key={idx}
            className="pyq-paper-link"
            onClick={() => openPDF(paper.pdfLink)}
          >
            📄 {paper.examType}
          </button>
        ))}

      </div>
    ))}
   
   
  </>
)}

      {/* MORE (SUBJECT-WISE) */}
    {tab === "more" && (
  <>
    {/* ✅ Show only once */}
    <h4 style={{ marginBottom: "15px" }}>
      How to pass RTU exams in 1 week
    </h4>

    <p>Scroll for Guess papers and Important topics and short Notes</p>

       <div style={{ maxWidth: "900px", marginTop: "25px", marginBottom: "25px", lineHeight: "1.8" }}>
  
  <h2>RTU Exams Preparation tips in 1 Week (Smart Strategy)</h2>

  <p>
    Preparing for RTU exams in a short time can feel overwhelming, but with the right strategy,
    students can still score well. The key is to focus on important topics, practice previous
    year questions (PYQs), and revise concepts efficiently instead of trying to cover everything.
  </p>

  <h3>1. Focus on Important Topics</h3>
  <p>
    Start by identifying high-weightage topics from the syllabus. Subjects often have repeated patterns in exams.
    Prioritize these areas first.
  </p>

  <h3>2. Practice Previous Year Questions (PYQs)</h3>
  <p>
    Solving PYQs is one of the fastest ways to prepare for RTU exams. Many questions are repeated
    or follow similar patterns, so practicing them helps you understand exam trends and boosts confidence.
  </p>

  <h3>3. Use Short Notes and Formulas</h3>
  <p>
    Instead of reading full books, focus on short notes, formulas, and key concepts.
    This helps in quick revision during the last days before exams.
  </p>

  <h3>4. Revise Smartly</h3>
  <p>
    Allocate time for revision daily. Even 1–2 hours of focused revision can improve retention
    and help you recall concepts during the exam.
  </p>

  <p>
    Below, you can find subject-wise important resources, notes, and materials to help you
    prepare efficiently for your RTU exams.
  </p>

</div>

    {moreGrouped.map((grp, i) => (
      <div key={i} style={{ marginBottom: "30px" }}>
        <div className="pyq-subject-box" data-aos="fade-up">
          
          <div className="pyq-subject-title">
            {grp.subjectName} ({grp.subjectCode})
          </div>

          {grp.items.map((m, idx) => (
            <button
              key={idx}
              className="pyq-paper-link"
              onClick={() => openPDF(m.pdfLink)}
            >
              📄 {m.examType}
            </button>
          ))}

        </div>
      </div>
    ))}
   
  </>
)}

      {/* EXTRA (SEMESTER-LEVEL) */}
      {tab === "more"
      
      
       && (
        <div className="pyq-subject-box" data-aos="fade-up" >
          <div className="pyq-subject-title">Extra Resources</div>



          {extraMore.length > 0 ? (
            extraMore.map((m, idx) => (
              <button
                key={idx}
                className="pyq-paper-link"
                onClick={() =>openPDF(m.pdfLink)}
              >
                📄 {m.examType}
              </button>
            ))
          ) : (
            <div className="pyq-empty-text">
              No extra resources available for this selection.
            </div>
          )}
        
        </div>
      )}




    </div>
  );
};

export default BranchContent;
