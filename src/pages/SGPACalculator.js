import React, { useState, useEffect } from "react";
import gradeData from "../data/grade_points.json";
import courseData from "../data/rtu_courses_by_branch_sem.json";
import "./SGPACalculator.css";

const SGPACalculator = () => {
  const branchOptions = ["CSE", "CE", "EE", "ME", "CHEM"];
  const semesterOptions = ["1","2","3","4","5","6","7","8"];

  // Default selection
  const [branch, setBranch] = useState("CSE");
  const [semester, setSemester] = useState("1");

  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState([]);

  // Load subjects when branch/semester changes
  useEffect(() => {
    let selectedCourses = courseData[branch]?.[semester] || [];

    // Remove placeholder object
    if (selectedCourses.length === 1 && selectedCourses[0].code === "NA") {
      selectedCourses = [];
    }

    setCourses(selectedCourses);

    // Default Grade = A++
    setGrades(selectedCourses.map(() => "A++"));
  }, [branch, semester]);

  const handleGradeChange = (i, grade) => {
    const updated = [...grades];
    updated[i] = grade;
    setGrades(updated);
  };

  const calculateSGPA = () => {
    let totalCredits = 0;
    let totalWeighted = 0;

    courses.forEach((course, i) => {
      const gp = gradeData.gradePoints[grades[i]] || 0;
      totalCredits += course.credits;
      totalWeighted += course.credits * gp;
    });

    return totalCredits ? (totalWeighted / totalCredits).toFixed(2) : "0.00";
  };

  return (
    <div className="sgpa-container">
      <h1 className="sgpa-title">RTU SGPA Calculator</h1>

      {/* 🔹 Branch & Semester Filters */}
      <div className="filter-box">
        <div className="filter-item">
          <label>Branch</label>
          <select value={branch} onChange={(e) => setBranch(e.target.value)}>
            {branchOptions.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Semester</label>
          <select value={semester} onChange={(e) => setSemester(e.target.value)}>
            {semesterOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grade Legend */}
      <div className="legend-box">
        <h2 className="legend-title">Grade Point Legend</h2>
        <div className="legend-grid">
          {Object.entries(gradeData.gradePoints).map(([g, p]) => (
            <div key={g} className="legend-item">
              <strong>{g}:</strong> {p}
            </div>
          ))}
        </div>
      </div>

      {/* Course Table */}
      <table className="course-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Credits</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <tr key={index}>
                <td>{course.name}</td>
                <td>{course.credits}</td>
                <td>
                  <select
                    value={grades[index]}
                    onChange={(e) => handleGradeChange(index, e.target.value)}
                    className="grade-select"
                  >
                    {gradeData.allowedGrades.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                ⚠ No subjects available for this branch & semester.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* SGPA Result */}
      <div className="sgpa-result-box">
       <div className="sgpa-result-wrapper">
  <h3>Calculated SGPA:</h3>
  <div className="sgpa-value-box">{calculateSGPA()}</div>
</div>
      </div>
    </div>
  );
};

export default SGPACalculator;
