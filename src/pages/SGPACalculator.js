import React, { useState } from "react";
import gradeData from "../data/grade_points.json";
import defaultCourses from "../data/default_rtu_courses.json";
import "./SGPACalculator.css";  

const SGPACalculator = () => {
  const [courses] = useState(defaultCourses);
  const [grades, setGrades] = useState(defaultCourses.map(c => c.defaultGrade));

  const handleGradeChange = (index, grade) => {
    const updated = [...grades];
    updated[index] = grade;
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
      <p className="sgpa-subtext">Calculate your Semester Grade Point Average</p>

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
          {courses.map((course, index) => (
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
          ))}
        </tbody>
      </table>

      {/* SGPA Result */}
      <div className="sgpa-result-box">
        <h3>Calculated SGPA:</h3>
        <span className="sgpa-value">{calculateSGPA()}</span>
      </div>
    </div>
  );
};

export default SGPACalculator;
