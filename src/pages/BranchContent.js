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

  const [loadingNotes, setLoadingNotes] = useState(false);
  const [loadingPYQ, setLoadingPYQ] = useState(false);


  /* =========================
     OPEN PDF
  ========================= */

  const openPDF = (pdfPath) => {
    if (!pdfPath) return;

    const encoded = encodeURIComponent(pdfPath);

    window.open(
      `/pdfview?file=${encoded}`,
      "_blank"
    );
  };


  /* =========================
     LOAD BRANCHES
  ========================= */

  useEffect(() => {
    const list = fetchBranches(yearSlug);

    setBranches(list);

    if (list.length > 0) {
      setSelectedBranch(list[0]);
    } else {
      setSelectedBranch("");
    }
  }, [yearSlug]);


  /* =========================
     LOAD SEMESTERS
  ========================= */

  useEffect(() => {
    const semList =
      yearSemesterMap[yearSlug] || [];

    setSemesters(semList);

    if (semList.length > 0) {
      setSelectedSemester(semList[0]);
    } else {
      setSelectedSemester("");
    }
  }, [yearSlug]);


  /* =========================
     RESET DATA WHEN
     BRANCH / SEMESTER CHANGES
  ========================= */

  useEffect(() => {
    setNotes([]);
    setPyqGrouped([]);
    setLabGrouped([]);
    setMoreGrouped([]);
    setExtraMore([]);
    setLoadingPYQ(false);

    // Always return user to Notes
    setTab("notes");

  }, [
    yearSlug,
    selectedBranch,
    selectedSemester
  ]);


  /* =========================
     LOAD NOTES
  ========================= */

  useEffect(() => {
    if (
      !yearSlug ||
      !selectedBranch ||
      !selectedSemester
    ) {
      setNotes([]);
      return;
    }

    setLoadingNotes(true);

    try {
      const data = loadNotes(
        yearSlug,
        selectedBranch,
        selectedSemester
      );

      setNotes(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {
      console.error(
        "Notes loading failed:",
        error
      );

      setNotes([]);

    } finally {
      setLoadingNotes(false);
    }

  }, [
    yearSlug,
    selectedBranch,
    selectedSemester
  ]);


  /* =========================
     LOAD PYQs
  ========================= */

  useEffect(() => {
    let isActive = true;

    if (tab !== "pyq") {
      return;
    }

    if (
      !yearSlug ||
      !selectedBranch ||
      !selectedSemester
    ) {
      setPyqGrouped([]);
      return;
    }

    // Wait until notes are available
    if (!Array.isArray(notes)) {
      setPyqGrouped([]);
      return;
    }

    const loadPYQs = async () => {
      setLoadingPYQ(true);

      try {
        const data =
          await fetchPYQFromBackend(
            yearSlug,
            selectedBranch,
            selectedSemester,
            notes
          );

        if (isActive) {
          setPyqGrouped(
            Array.isArray(data)
              ? data
              : []
          );
        }

      } catch (error) {
        console.error(
          "PYQ loading failed:",
          error
        );

        if (isActive) {
          setPyqGrouped([]);
        }

      } finally {
        if (isActive) {
          setLoadingPYQ(false);
        }
      }
    };

    loadPYQs();

    return () => {
      isActive = false;
    };

  }, [
    tab,
    yearSlug,
    selectedBranch,
    selectedSemester,
    notes
  ]);


  /* =========================
     LOAD LABS
  ========================= */

  useEffect(() => {
    if (tab !== "lab") {
      return;
    }

    if (
      !yearSlug ||
      !selectedBranch ||
      !selectedSemester
    ) {
      setLabGrouped([]);
      return;
    }

    try {
      const labs = loadLabs(
        yearSlug,
        selectedBranch,
        selectedSemester
      );

      setLabGrouped(
        Array.isArray(labs)
          ? labs
          : []
      );

    } catch (error) {
      console.error(
        "Lab loading failed:",
        error
      );

      setLabGrouped([]);
    }

  }, [
    tab,
    yearSlug,
    selectedBranch,
    selectedSemester
  ]);


  /* =========================
     LOAD MORE
  ========================= */

  useEffect(() => {
    if (tab !== "more") {
      return;
    }

    /*
      SUBJECT-WISE MORE
    */

    const subjectMore =
      Array.isArray(notes)
        ? notes
            .filter(
              (subject) =>
                Array.isArray(subject.More) &&
                subject.More.length > 0
            )
            .map((subject) => ({
              subjectName:
                subject.subjectName,

              subjectCode:
                subject.subjectCode,

              items:
                subject.More
            }))
        : [];

    setMoreGrouped(subjectMore);


    /*
      SEMESTER-LEVEL EXTRA
    */

    try {
      const extra =
        loadExtraMore(
          yearSlug,
          selectedBranch,
          selectedSemester
        );

      setExtraMore(
        Array.isArray(extra)
          ? extra
          : []
      );

    } catch (error) {
      console.error(
        "Extra resources loading failed:",
        error
      );

      setExtraMore([]);
    }

  }, [
    tab,
    notes,
    yearSlug,
    selectedBranch,
    selectedSemester
  ]);


  /* =========================
     PAGE TITLE
  ========================= */

  useEffect(() => {
    if (
      selectedBranch &&
      selectedSemester
    ) {
      document.title =
        `${selectedBranch} Semester ${selectedSemester} RTU Notes, PYQs & Lab Manuals | RTUpedia`;
    }

  }, [
    selectedBranch,
    selectedSemester
  ]);


  /* =========================
     UI
  ========================= */

  return (
    <div style={{ padding: 25 }}>

      <h2>
        RTU{" "}
        {yearSlug
          .replace("-", " ")
          .toUpperCase()}{" "}
        Notes, PYQs, Lab Manuals and Study Material
      </h2>


      <h4
        style={{
          marginBottom: "20px",
          fontWeight: "normal"
        }}
      >
        RTU{" "}
        {yearSlug
          .replace("-", " ")
          .toUpperCase()}{" "}
        is crucial for building core engineering concepts given the right approach.
        Students should focus on understanding concepts and practicing PYQs.
        <br />

        Below you can find subject-wise notes, video lectures,
        and important resources.
      </h4>


      {/* =========================
          BRANCH + SEMESTER
      ========================= */}

      <div className="select-row">

        <select
          value={selectedBranch}
          onChange={(e) =>
            setSelectedBranch(
              e.target.value
            )
          }
        >
          {branches.map((branch) => (
            <option
              key={branch}
              value={branch}
            >
              {branch}
            </option>
          ))}
        </select>


        <select
          value={selectedSemester}
          onChange={(e) =>
            setSelectedSemester(
              e.target.value
            )
          }
        >
          {semesters.map((semester) => (
            <option
              key={semester}
              value={semester}
            >
              Semester {semester}
            </option>
          ))}
        </select>

      </div>


      {/* =========================
          TABS
      ========================= */}

      <div className="tab-row">

        {[
          {
            id: "notes",
            label: "Notes"
          },
          {
            id: "pyq",
            label: "PYQ (Main Exam)"
          },
          {
            id: "lab",
            label: "Lab"
          },
          {
            id: "more",
            label: "More"
          }
        ].map((item) => (

          <button
            key={item.id}
            className={
              `rt-tab-btn ${
                tab === item.id
                  ? "active"
                  : ""
              }`
            }
            onClick={() =>
              setTab(item.id)
            }
          >
            {item.label}
          </button>

        ))}

      </div>


      {/* =========================
          NOTES
      ========================= */}

      {tab === "notes" && (
        <>

          <div
            style={{
              maxWidth: "100%",
              marginBottom: "25px",
              lineHeight: "1.8"
            }}
          >

            <h2>
              RTU Notes, Video Lectures & Study Materials
            </h2>


            <p
              style={{
                fontSize: "14px",
                color: "gray"
              }}
            >
              ⚠️ Note: Due to copyright policies,
              students are not allowed to download
              the PDF notes. These materials are
              provided only for online viewing and
              educational purposes.
            </p>


            <p>
              <b>Scroll down </b>
              to find subject-wise notes, unit-wise
              materials, and video lectures for RTU{" "}
              {yearSlug
                .replace("-", " ")
                .toUpperCase()}.
            </p>


            <p>
              RTU notes are essential for understanding
              core engineering subjects and preparing
              effectively for exams.
            </p>


            <p>
              This section provides subject-wise notes,
              unit-wise materials, and video lectures
              to help students learn concepts clearly.
            </p>

          </div>


          {loadingNotes && (
            <p>
              Loading Notes...
            </p>
          )}


          {!loadingNotes &&
            notes.length === 0 && (
              <div className="pyq-empty-text">
                No notes available for this branch
                and semester.
              </div>
            )}


          {notes.map((sub, i) => (

            <div
              className="resource-card subject-card"
              key={
                sub.subjectCode || i
              }
              data-aos="fade-up"
            >

              <details>

                <summary
                  style={{
                    fontWeight: "bold"
                  }}
                >
                  {sub.subjectName}{" "}
                  ({sub.subjectCode})

                  <span className="subject-units">
                    {Array.isArray(sub.units)
                      ? sub.units.length
                      : 0}{" "}
                    Units
                  </span>

                </summary>


                {Array.isArray(sub.units) &&
                  sub.units.map(
                    (unit, j) => (

                      <div
                        key={j}
                        className="unit-row"
                        style={{
                          marginTop: 10
                        }}
                      >

                        <strong>
                          {unit.unitName}
                        </strong>


                        <div
                          style={{
                            display: "flex",
                            gap: 12
                          }}
                        >

                          <button
                            className="resource-link-notes"
                            onClick={() =>
                              openPDF(
                                unit.notesPDF ||
                                unit.pdf
                              )
                            }
                          >
                            📑 View Notes
                          </button>


                          {unit.lectureLink && (
                            <a
                              className="resource-link"
                              href={
                                unit.lectureLink
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              ▶ Video
                            </a>
                          )}

                        </div>

                      </div>

                    )
                  )}

              </details>

            </div>

          ))}

        </>
      )}


      {/* =========================
          PYQ
      ========================= */}

      {tab === "pyq" && (
        <>

          <div
            style={{
              maxWidth: "900px",
              marginBottom: "25px",
              lineHeight: "1.8"
            }}
          >

            <h2>
              RTU Previous Year Question Papers
            </h2>

            <p>
              Previous Year Question Papers help
              students understand the RTU exam pattern,
              important topics and frequently asked
              questions.
            </p>

          </div>


          {loadingPYQ && (
            <p>
              Loading PYQs...
            </p>
          )}


          {!loadingPYQ &&
            pyqGrouped.length === 0 && (
              <div className="pyq-empty-text">
                No PYQs available for this selection.
              </div>
            )}


          {pyqGrouped.map((grp, i) => (

            <div
              className="pyq-subject-box"
              key={
                grp.subjectCode || i
              }
              data-aos="fade-up"
            >

              <div className="pyq-subject-title">
                {grp.subjectName}{" "}
                ({grp.subjectCode})
              </div>


              {grp.pyqs.map(
                (paper, idx) => (

                  <a
                    key={idx}
                    className="pyq-paper-link"
                    href={paper.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📄 {paper.title}
                  </a>

                )
              )}

            </div>

          ))}

        </>
      )}


      {/* =========================
          LABS
      ========================= */}

      {tab === "lab" && (
        <>

          <div
            style={{
              maxWidth: "900px",
              marginBottom: "25px",
              lineHeight: "1.8"
            }}
          >

            <h2>
              RTU Lab Manuals, Files &
              Practical Resources
            </h2>

            <p>
              Below you can find subject-wise
              lab manuals, practical files,
              and important resources.
            </p>

          </div>


          {labGrouped.length === 0 && (
            <div className="pyq-empty-text">
              No lab resources available for
              this selection.
            </div>
          )}


          {labGrouped.map((grp, i) => (

            <div
              className="pyq-subject-box"
              key={
                grp.subjectCode || i
              }
              data-aos="fade-up"
            >

              <div className="pyq-subject-title">
                {grp.subjectName}{" "}
                ({grp.subjectCode})
              </div>


              {grp.examPapers?.map(
                (paper, idx) => (

                  <button
                    key={idx}
                    className="pyq-paper-link"
                    onClick={() =>
                      openPDF(
                        paper.pdfLink
                      )
                    }
                  >
                    📄 {paper.examType}
                  </button>

                )
              )}

            </div>

          ))}

        </>
      )}


      {/* =========================
          MORE
      ========================= */}

      {tab === "more" && (
        <>

          <h4
            style={{
              marginBottom: "15px"
            }}
          >
            How to pass RTU exams in 1 week
          </h4>


          <p>
            Scroll for Guess Papers,
            Important Topics and Short Notes.
          </p>


          {moreGrouped.map((grp, i) => (

            <div
              key={
                grp.subjectCode || i
              }
              style={{
                marginBottom: "30px"
              }}
            >

              <div
                className="pyq-subject-box"
                data-aos="fade-up"
              >

                <div className="pyq-subject-title">
                  {grp.subjectName}{" "}
                  ({grp.subjectCode})
                </div>


                {grp.items.map(
                  (item, idx) => (

                    <button
                      key={idx}
                      className="pyq-paper-link"
                      onClick={() =>
                        openPDF(
                          item.pdfLink
                        )
                      }
                    >
                      📄 {item.examType}
                    </button>

                  )
                )}

              </div>

            </div>

          ))}


          {/* EXTRA RESOURCES */}

          {extraMore.length > 0 && (

            <div
              className="pyq-subject-box"
              data-aos="fade-up"
            >

              <div className="pyq-subject-title">
                Extra Resources
              </div>


              {extraMore.map(
                (item, idx) => (

                  <button
                    key={idx}
                    className="pyq-paper-link"
                    onClick={() =>
                      openPDF(
                        item.pdfLink
                      )
                    }
                  >
                    📄 {item.examType}
                  </button>

                )
              )}

            </div>

          )}


          {moreGrouped.length === 0 &&
            extraMore.length === 0 && (

              <div className="pyq-empty-text">
                No additional resources available
                for this selection.
              </div>

            )}

        </>
      )}

    </div>
  );
};


export default BranchContent;