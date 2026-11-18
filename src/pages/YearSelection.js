// src/pages/YearSelection.js

import React, { useState, useEffect } from "react";
import { useNavigate , useLocation} from "react-router-dom";

import { Link } from "react-router-dom";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import yearDataJSON from "../data/year_data.json";
import syllabusLinks from "../data/syllabus_links.json";


import "./YearSelection.css";

import { FaRegHandshake } from "react-icons/fa6";
import { GiBookshelf } from "react-icons/gi";
import { MdVideoSettings } from "react-icons/md";
import { PiMedalFill } from "react-icons/pi";
import { getReviews } from "../utils/reviewApi";
import ReviewCard from "../components/Review/ReviewCard";


const YearSelection = () => {
  const [yearData, setYearData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  /* Load years from local JSON */
  useEffect(() => {
    if (yearDataJSON?.years) {
      setYearData(yearDataJSON.years);
    }
    setLoading(false);
  }, []);

useEffect(() => {
  if (location.state?.scrollTo) {
    const scrollId = location.state.scrollTo;

    setTimeout(() => {
      const el = document.getElementById(scrollId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 400); // little delay for DOM load
  }
}, [location]);


  const handleYearSelect = (yearSlug) => {
    navigate(`/year/${yearSlug}`);
  };

  const downloadSyllabus = (link) => {
    window.open(link, "_blank");
  };

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then(setReviews);
  }, []);


  if (loading) return <LoadingSpinner />;

  const branches = [...new Set(syllabusLinks.map((item) => item.branch))];

  return (
    <>
      {/* HERO SECTION */}
      {/* HERO SECTION */}

      <div className="hero-section">

        <div className="hero-content">

          <div className="hero-left">

            <h1 className="hero-title">
              <span className="hero-rtu">RTU</span>
              <span className="hero-pedia">pedia</span>
            </h1>

            <p className="hero-subtitle">
              Your complete RTU study companion for Notes, PYQs, Syllabus and Smart Tools.
            </p>

            <button
              className="hero-btn"
              onClick={() =>
                document
                  .querySelector(".year-card-grid")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Notes
            </button>

          </div>

          {/* RIGHT SIDE ILLUSTRATION */}

          <div className="hero-right">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
              alt="study illustration"
            />
          </div>

        </div>

      </div>

<div style={{ paddingRight: "20px", maxWidth: "1200px", margin: "auto", marginLeft:'10px', lineHeight: "1.8", textAlign: "justify" }}>
  
  <h2>RTU Notes, PYQs & Study Resources in One Place</h2>

  <p>
    RTUpedia is a dedicated learning platform designed for students of <b>Rajasthan Technical University (RTU)</b> Specially for B.Tech.
    It provides organized access to semester-wise notes, previous year question papers (PYQs),
    syllabus resources, and smart academic tools to help students prepare efficiently.
  </p>

  <p>
    Whether you are in your first year or final year, RTUpedia helps you find all important study materials
    in one place. Instead of searching across multiple websites, students can easily access structured
    content, subject-wise notes, relavent video lectures and exam-focused resources here.
  </p>
<br></br>
  <p>
    In addition to notes and PYQs, the platform also offers useful tools like <Link style={{ color: "var(--color-primary)" }} to="/SGPACalculator">RTU SGPA Calculator</Link> and curated
    learning resources to improve academic performance. All content is organized year-wise and branch-wise
    to ensure a smooth and simple learning experience.
  </p>
<br></br>
  <p>
    Explore your academic year below and start preparing smarter with RTUpedia.
  </p>

</div>

      <div id="notes"></div>

      <h2 style={{ marginTop: "30px", marginBottom:'20px' }}>Select Your Academic Year</h2>
      <p>Choose your current B.Tech year to access notes, PYQs, and resources. Find notes and study materials organized year-wise for RTU B.Tech students.</p>

      {/* YEAR CARDS SECTION */}

      <div className="year-card-grid" data-aos="fade-up">
        {yearData.map((year) => (
          <Card
            key={year.slug}
            title={`📚 ${year.year} Notes`}
            onClick={() => handleYearSelect(year.slug)}
            data-aos="fade-up"
          >
            <p style={{ marginTop: "10px", color: "var(--color-text)" }}>
              Click to view branches and subjects.
            </p>
          </Card>
        ))}
      </div>

      <div id="syllabus">

        <div className="section-divider" data-aos="fade-up"></div>



        {/* SYLLABUS SECTION */}
        <div style={{ textAlign: "center" }}>
          <h2>Official RTU Syllabus</h2>
          <p style={{ marginBottom: "20px" }}>
           Download official RTU B.Tech. syllabus for all branches and years.
          </p>

          <div className="card-grid" data-aos="fade-up">
            {branches.map((branch) => {
              const branchSyllabus = syllabusLinks.filter(
                (i) => i.branch === branch
              );

              return (
                <Card
                  key={branch}
                  title={branchFullName(branch)}
                  style={{ textAlign: "center", minHeight: "180px" }}
                  data-aos="fade-up"
                >
                  {branchSyllabus.map((linkItem) => (
                    <Button
                      key={`${linkItem.branch}-${linkItem.year}`}
                      onClick={() => downloadSyllabus(linkItem.link)}
                      style={{ margin: "5px", padding: "6px 10px" }}
                    >
                      {linkItem.year}
                    </Button>
                  ))}
                </Card>
              );
            })}
          </div>
        </div>

      </div>


{/* RTU EXAM PREPARATION GUIDE */}
<section className="exam-guide-section" data-aos="fade-up">
  <div className="exam-guide-container">
    <h2>How to Prepare for RTU Exams with RTUpedia</h2>

    <p className="exam-guide-intro">
      Preparing for Rajasthan Technical University examinations
      requires a clear understanding of the syllabus, regular
      revision, and consistent practice. RTUpedia brings together
      useful academic resources to help B.Tech students organize
      their semester preparation.
    </p>

    <div className="exam-guide-grid">

      <div className="exam-guide-card">
        <span className="exam-guide-number">01</span>
        <h3>Understand Your RTU Syllabus</h3>
        <p>
          Begin with the official RTU syllabus for your branch
          and semester. Review the units and topics prescribed
          for each subject before starting your preparation.
        </p>
      </div>

      <div className="exam-guide-card">
        <span className="exam-guide-number">02</span>
        <h3>Study Subject-wise Notes</h3>
        <p>
          Explore available subject-wise notes organized by
          academic year, branch, and semester. Use them to
          understand concepts and revise individual units.
        </p>
      </div>

      <div className="exam-guide-card">
        <span className="exam-guide-number">03</span>
        <h3>Practice Previous Year Papers</h3>
        <p>
          Solve available RTU previous year question papers
          to become familiar with question formats and
          understand how subjects are assessed.
        </p>
      </div>

      <div className="exam-guide-card">
        <span className="exam-guide-number">04</span>
        <h3>Prepare for Practical Exams</h3>
        <p>
          Explore available laboratory resources and practical
          materials to revise experiments, concepts, and
          subject-related practical topics.
        </p>
      </div>

      <div className="exam-guide-card">
        <span className="exam-guide-number">05</span>
        <h3>Check Your Semester Performance</h3>
        <p>
          Use the RTU SGPA Calculator to calculate your
          semester SGPA using subject grades and credits.
        </p>
        <Link to="/SGPACalculator" className="exam-guide-link">
          Try SGPA Calculator →
        </Link>
      </div>

    </div>
  </div>
</section>


      <div id="sgpa">

        <div className="section-divider" data-aos="fade-up"></div>

        {/* SGPA CALCULATOR */}

        <div className="sgpa-container">
          <div className="sgpa-card" data-aos="fade-up" onClick={() => navigate("/SGPACalculator")}>
            <h2>SGPA Calculator</h2>
            <p>Calculate your RTU B.tech. SGPA instantly using semester-wise credits.</p>
            <button className="sgpa-btn">Open Calculator</button>
          </div>
        </div>
      </div>

      <div className="section-divider" data-aos="fade-up"></div>

      {/* WHY CHOOSE US */}
      <div className="why-container" data-aos="fade-up">
        <h2 className="why-title">Why Choose RTUpedia?</h2>

        <div className="why-grid">
          <div className="why-card" data-aos="fade-up">
            <div className="why-icon">
              <FaRegHandshake />
            </div>
            <h3 className="why-heading">Student-Driven Platform</h3>
            <p className="why-text">
              Designed by RTU students to simplify the journey for every RTU B.tech. student
            </p>
          </div>

          <div className="why-card" data-aos="fade-up">
            <div className="why-icon">
              <GiBookshelf />
            </div>
            <h3 className="why-heading">Comprehensive Coverage</h3>
            <p className="why-text">
              Notes, PYQs, syllabus, tools, and branch-wise content — everything organized semester-wise.
            </p>
          </div>

          <div className="why-card" data-aos="fade-up">
            <div className="why-icon">
              <MdVideoSettings />
            </div>
            <h3 className="why-heading">Fast & Modern Tools</h3>
            <p className="why-text">
              SGPA calculators, utilities, and smart study features designed for speed and accuracy with reference videos.
            </p>
          </div>

          <div className="why-card" data-aos="fade-up">
            <div className="why-icon">
              <PiMedalFill />
            </div>
            <h3 className="why-heading">Trusted & Reliable</h3>
            <p className="why-text">
              Clean UI, accurate tools, and verified content make RTUpedia a dependable study companion.
            </p>
          </div>
        </div>
      </div>

      <div className="seo-optimized-footer-content" style={{ 
  maxWidth: "1200px", 
  margin: "60px auto", 
  padding: "0 20px", 
  lineHeight: "1.8",
  color: "var(--color-text-muted)", 
  fontSize: "0.95rem" 
}}>
  <h3 style={{ color: "var(--color-primary)", marginBottom: "15px" }}>
    Empowering RTU Students Across Rajasthan
  </h3>


  <p style={{ marginBottom: "20px" }}>
    RTUpedia serves as a digital bridge for students across all RTU-affiliated colleges in Jaipur, Kota, Udaipur, Jodhpur, and Bikaner. We understand the specific challenges of the <b>Rajasthan Technical University</b> examination pattern. That’s why our platform specifically highlights frequently asked questions (FAQs) and high-weightage topics that often appear in <b>RTU Main and Back examinations</b>. Our platform ensures that whether you are studying from a remote college or a top-tier institute in the city, you have equal access to the highest quality <b>B.Tech engineering notes</b>.
  </p>
    <h3>How RTUpedia Helps Engineering Students</h3>
  <p>
    Beyond standard academics, RTUpedia is built to support students during critical semester transitions and Mercy attempts. By providing the most recent <b>RTU Syllabus</b> and <b>digital lab manuals</b>, we help reduce the last-minute exam stress that engineering students often face. Our goal is to create a sustainable open-source education ecosystem where RTU scholars can find everything from <b>First-year</b> and <b>Second-year (CSE related department only)</b>, ensuring a smooth path toward graduation and successful career placements.
  </p>
</div>

      <div className="section-divider" data-aos="fade-up"></div>

      {/* STUDENT REVIEWS PREVIEW */}
      <div data-aos="fade-up" style={{ marginTop: "60px", textAlign: "center" }}>
        <h2>What Students Say</h2>

        <div className="review-preview-grid" data-aos="fade-up">
          {reviews.slice(0, 4).map((r) => (
            <ReviewCard key={r._id} review={r} preview />
          ))}
        </div>

        <Link to="/reviews" className="view-all-btn">
          View all reviews →
        </Link>
      </div>


{/* FREQUENTLY ASKED QUESTIONS */}
<section className="faq-section" data-aos="fade-up">
  <div className="faq-container">
    <h2>Frequently Asked Questions about RTUpedia</h2>

    <p className="faq-intro">
      Find answers to common questions about RTU notes,
      previous year question papers, syllabus resources,
      and academic tools available on RTUpedia.
    </p>

    <div className="faq-list">

      <details className="faq-item">
        <summary>What is RTUpedia?</summary>
        <p>
          RTUpedia is an independent educational platform
          designed for Rajasthan Technical University B.Tech
          students. It provides access to available notes,
          previous year question papers, syllabus documents,
          and academic tools.
        </p>
      </details>

      <details className="faq-item">
        <summary>How can I find notes for my RTU subject?</summary>
        <p>
          Select your academic year from the homepage,
          choose your branch and semester, and open the
          required subject to explore available study materials.
        </p>
      </details>

      <details className="faq-item">
        <summary>Does RTUpedia provide previous year question papers?</summary>
        <p>
          Yes. Available RTU previous year question papers
          are organized according to branch and semester
          to help students practice for examinations.
        </p>
      </details>

      <details className="faq-item">
        <summary>Can I download the official RTU syllabus?</summary>
        <p>
          Visit the Official RTU Syllabus section on the
          homepage or RTUpedia syllabus section to access the available syllabus documents
          for different engineering branches and academic years.
        </p>
      </details>

      <details className="faq-item">
        <summary>How can I calculate my RTU SGPA?</summary>
        <p>
          Visit the SGPA Calculator, select the relevant
          semester, enter your subject grades as instructed,
          and calculate your semester grade point average.
        </p>
        <Link to="/SGPACalculator">Open SGPA Calculator →</Link>
      </details>

      <details className="faq-item">
        <summary>Does RTUpedia provide laboratory study materials?</summary>
        <p>
          RTUpedia provides available laboratory resources
          for supported academic years, branches, and semesters.
        </p>
      </details>

      <details className="faq-item">
        <summary>Is RTUpedia officially affiliated with RTU?</summary>
        <p>
          No. RTUpedia is an independent educational platform
          created for students and is not an official website
          of Rajasthan Technical University.
        </p>
      </details>

      <details className="faq-item">
        <summary>How can I report incorrect or missing study material?</summary>
        <p>
          You can contact the RTUpedia team through the
          Contact Us page to report incorrect information,
          broken links, or missing academic resources.
        </p>
      </details>

    </div>
  </div>
</section>


<div style={{justifyContent:'center', alignItems:'center', margin: '20px'}}>
         <p >RTUpedia is an independent educational platform created for RTU students.
We do not represent Rajasthan Technical University officially.</p>
</div>

    </>
  );
};

const branchFullName = (code) => {
  const map = {
    CSE: "Computer Science & Engineering",
    EE: "Electrical Engineering",
    ME: "Mechanical Engineering",
    CE: "Civil Engineering",
    CHEM: "Chemical Engineering",
    CY: "Cyber Security",
    IT: "Information Technology",
    AIDS: "AI & Data Science",
  };
  return map[code] || code;
};

export default YearSelection;
