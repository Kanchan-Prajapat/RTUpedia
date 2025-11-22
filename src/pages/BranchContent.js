// src/pages/BranchContent.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Navigation/Breadcrumbs';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Button from '../components/UI/Button';
import { fetchData, fetchBranchContent } from '../utils/dataFetcher';

const BranchContent = () => {
  const { yearSlug } = useParams();
  
  const [yearInfo, setYearInfo] = useState(null);
  const [branches, setBranches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBranchSlug, setSelectedBranchSlug] = useState('');
  const [contentType, setContentType] = useState('notes'); 

  // --- Fetch Year Data and Set Default Branch ---
  useEffect(() => {
    setLoading(true);
    fetchData('yearData').then(data => {
      const info = data.find(y => y.slug === yearSlug);
      setYearInfo(info);
      setBranches(info?.branches || []);
      
      if (info?.branches.length > 0) {
        setSelectedBranchSlug(info.branches[0].slug);
      } else {
        setLoading(false);
      }
    });
  }, [yearSlug]);

  // --- Fetch Branch Content ---
  useEffect(() => {
    if (yearSlug && selectedBranchSlug) {
      setLoading(true);
      fetchBranchContent(yearSlug, selectedBranchSlug).then(content => {
        setSubjects(content || []);
        setLoading(false);
      });
    }
  }, [yearSlug, selectedBranchSlug]);

  if (yearInfo === null && !loading) {
    return (
      <div className="container">
        <h2>Error: Year Not Found</h2>
        <p>Please return to the <Link to="/">Home Page</Link>.</p>
      </div>
    );
  }

  if (loading || !yearInfo) {
    return (
      <div className="container">
        <LoadingSpinner />
      </div>
    );
  }

  const currentBranch = yearInfo.branches.find(b => b.slug === selectedBranchSlug);
  const crumbs = [
    { label: 'Home', path: '/' },
    { label: yearInfo.year, path: `/year/${yearSlug}` },
    { label: currentBranch?.name || 'Content', path: `/year/${yearSlug}` }
  ];

  const pyqSubjects = subjects.filter(sub => sub.pyqs && sub.pyqs.length > 0);

  return (
    <div className="container">
      <Breadcrumbs crumbs={crumbs} />
      
      <h2 style={{ color: 'var(--color-text)' }}>
        {yearInfo.year} - {currentBranch?.name} Resources
      </h2>
      
      {/* Branch Selector */}
      <div style={{ marginBottom: '20px' }}>
        <label
          htmlFor="branch-select"
          style={{ marginRight: '10px', fontWeight: 'bold' }}
        >
          Select Branch:
        </label>
        <select
          id="branch-select"
          value={selectedBranchSlug}
          onChange={(e) => {
            setSelectedBranchSlug(e.target.value);
            setContentType('notes');
          }}
          style={{
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-card-bg)',
            color: 'var(--color-text)',
          }}
        >
          {branches.map(branch => (
            <option key={branch.slug} value={branch.slug}>
              {branch.name}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Only Notes and Main Exam PYQ */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '25px',
          overflowX: 'auto',
        }}
      >
        {['Notes', 'PYQ of Main Exam'].map(type => {
          const slug = type.toLowerCase().replace(/[\s-]/g, '');
          const isActive = contentType === slug;
          return (
            <Button
              key={slug}
              onClick={() => setContentType(slug)}
              className={isActive ? 'btn-primary' : 'btn'}
              style={{ flexShrink: 0, opacity: isActive ? 1 : 0.8 }}
            >
              {type}
            </Button>
          );
        })}
      </div>

      {/* Content Display */}
      {subjects.length === 0 ? (
        <p
          style={{
            padding: '20px',
            border: '1px solid var(--color-border)',
            borderRadius: '5px',
          }}
        >
          No resources currently available for {currentBranch?.name} in {yearInfo.year}.
        </p>
      ) : (
        <>
          {/* 📝 Notes Section */}
          {contentType === 'notes' && (
            <div className="notes-section">
              <h3>Unit-wise Notes and Videos</h3>
              {subjects.map(subject => (
                <details
                  key={subject.subjectCode}
                  style={{
                    border: '1px solid var(--color-border)',
                    margin: '15px 0',
                    borderRadius: '5px',
                    backgroundColor: 'var(--color-card-bg)',
                  }}
                >
                  <summary
                    style={{
                      padding: '15px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {subject.subjectName} ({subject.subjectCode}) - {subject.units.length} Units
                  </summary>
                  <div style={{ padding: '15px 15px 15px 30px' }}>
                    {subject.units.length > 0 ? (
                      subject.units.map((unit, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                          <p style={{ fontWeight: '600' }}>
                            Unit {index + 1}: {unit.unitName}
                          </p>
                          <div
                            style={{
                              display: 'flex',
                              gap: '15px',
                              marginTop: '5px',
                              fontSize: '0.9rem',
                            }}
                          >
                            <a
                              href={unit.notesPDF}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: 'var(--color-primary)',
                                textDecoration: 'underline',
                              }}
                            >
                              [📄 PDF Notes]
                            </a>
                            <a
                              href={unit.lectureLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: 'var(--color-primary)',
                                textDecoration: 'underline',
                              }}
                            >
                              [▶️ YouTube Lecture]
                            </a>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>Notes are currently being uploaded for this subject.</p>
                    )}
                  </div>
                </details>
              ))}
            </div>
          )}

          {/* 🧾 Main Exam PYQ Section */}
          {contentType === 'pyqofmainexam' && (
            <div className="pyq-section">
              <h3>Previous Year Question Papers (Main Exam)</h3>

              {pyqSubjects.length === 0 ? (
                <p>No Previous Year Questions available yet for this branch.</p>
              ) : (
                pyqSubjects.map(subject => (
                  <div
                    key={subject.subjectCode}
                    style={{
                      marginBottom: '20px',
                      padding: '15px',
                      borderLeft: '3px solid var(--color-secondary)',
                      backgroundColor: 'var(--color-card-bg)',
                      borderRadius: '5px',
                    }}
                  >
                    <h4 style={{ marginBottom: '10px' }}>
                      {subject.subjectName} ({subject.subjectCode})
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {subject.pyqs
                        .filter(pyq => pyq.examType === 'MainExam')
                        .map((pyq, index) => (
                          <li key={index} style={{ marginTop: '5px' }}>
                            <a
                              href={pyq.pdfLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: 'var(--color-primary)',
                                textDecoration: 'underline',
                              }}
                            >
                              {pyq.year} {pyq.sem} Paper (PDF Download)
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BranchContent;
