import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { fetchData } from '../utils/dataFetcher';
import syllabusLinks from '../data/syllabus_links';
import './YearSelection.css';

const YearSelection = () => {
  const [yearData, setYearData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData('yearData').then(data => {
      setYearData(data);
      setLoading(false);
    });
  }, []);

  const handleYearSelect = (yearSlug) => {
    navigate(`/year/${yearSlug}`);
  };

  const downloadSyllabus = (link) => {
    window.open(link, '_blank');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  //  Extract all unique branches from syllabusLinks
  const branches = [...new Set(syllabusLinks.map(item => item.branch))];

  //  Get syllabus per branch
  const getSyllabusForBranch = (branchName) => {
    return syllabusLinks.filter(item => item.branch === branchName);
  };

  return (
    <>
      {/*  Year Selection Section */}
      <h2>Select Your Academic Year</h2>
      <p>Choose your current B.Tech year to access notes, PYQs, and resources.</p>

      <div className="card-grid">
        {yearData.map((year) => (
          <Card
            key={year.id}
            title={`${year.year} Notes`}
            onClick={() => handleYearSelect(year.slug)}
          >
            <p style={{ marginTop: '10px', color: 'var(--color-text)' }}>
              Click to view branches and subjects.
            </p>
          </Card>
        ))}
      </div>

      <hr style={{ margin: '30px 0', borderColor: 'var(--color-border)' }} />

      {/*  Syllabus Download Section (Cards for Branches) */}
      <div style={{ textAlign: 'center' }}>
        <h2>Official RTU Syllabus</h2>
        <p style={{ marginBottom: '20px' }}>
          Download the official B.Tech syllabus (Local PDFs for each branch).
        </p>

        <div className="card-grid">
          {branches.map(branch => {
            const branchSyllabus = getSyllabusForBranch(branch);
            return (
              <Card
                key={branch}
                title={branchFullName(branch)}
                style={{ textAlign: 'center', minHeight: '180px' }}
              >
                {branchSyllabus.length > 0 ? (
                  branchSyllabus.map(linkItem => (
                    <Button
                      key={`${linkItem.branch}-${linkItem.year}`}
                      onClick={() => downloadSyllabus(linkItem.link)}
                      style={{
                        margin: '5px',
                        padding: '6px 10px',
                        fontSize: '0.9rem',
                      }}
                    >
                      {linkItem.year} Year
                    </Button>
                  ))
                ) : (
                  <p style={{ color: 'gray' }}>No syllabus available.</p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
 
      {/* SGPA Calculator Card */}
   <div className="home-container">
      
      {/* SGPA Calculator Card */}
      <div className="sgpa-card" onClick={() => navigate("/SGPACalculator")}>
        <h2>SGPA Calculator</h2>
        <p>Calculate your RTU SGPA instantly using semester-wise credits.</p>
        <button className="sgpa-btn">Open Calculator</button>
      </div>

    </div>


    </>
  );
};

//  Helper: full branch names for clarity
const branchFullName = (code) => {
  const map = {
    CSE: 'Computer Science & Engineering',
    EE: 'Electrical Engineering',
    ME: 'Mechanical Engineering',
    CE: 'Civil Engineering',
    CHEM: 'Chemical Engineering',
    CY: 'Cyber Security',
    IT: 'Information Technology',
    IOT: 'Internet of Things',
    AIDS: 'AI & Data Science'
  };
  return map[code] || code;
};

export default YearSelection;

