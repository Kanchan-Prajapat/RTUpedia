import React, { useEffect, useState } from "react";


import { getReviews } from "../utils/reviewApi";
import ReviewCard from "../components/Review/ReviewCard";
import  { Link } from "react-router-dom";

const AboutUs = () => {
  const [reviews, setReviews] = useState([]);
useEffect(() => {
  getReviews().then(setReviews);
}, []);

  const styles = {
    page: {
      padding: "40px 20px",
      background: "var(--color-background)",
      color: "var(--color-text)",
      fontFamily: "Poppins, sans-serif",
      minHeight: "100vh",
    },
    container: {
      maxWidth: "950px",
      margin: "0 auto",
      textAlign: "center",
    },
    title: {
      fontSize: "34px",
      fontWeight: "700",
      color: "var(--color-primary)",
      marginBottom: "15px",
    },
    introText: {
      fontSize: "16px",
      opacity: "0.9",
      marginBottom: "40px",
      lineHeight: "1.6",
    },

    sectionTitle: {
      fontSize: "24px",
      fontWeight: "700",
      color: "var(--color-primary)",
      marginTop: "40px",
      marginBottom: "15px",
      textAlign: "left",
    },

    card: {
      background: "var(--color-card-bg)",
      border: "1px solid var(--color-border)",
      borderRadius: "16px",
      padding: "25px",
      marginBottom: "25px",
      textAlign: "left",
      transition: "0.3s",
      marginTop: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },

    teamContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: "20px",
      marginTop: "10px",
    },

    teamCard: {
      background: "var(--color-card-bg)",
      border: "1px solid var(--color-border)",
      borderRadius: "14px",
      padding: "20px",
      flex: "1 1 calc(50% - 20px)",
      minWidth: "260px",
      transition: "0.3s",
      boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    },

    teamName: {
      fontSize: "18px",
      fontWeight: "600",
      color: "var(--color-primary)",
      marginBottom: "5px",
    },

    teamRole: {
      fontSize: "14px",
      opacity: "0.8",
      marginBottom: "10px",
    },

    text: {
      fontSize: "15px",
      lineHeight: "1.6",
      opacity: "0.9",
    },

    // Mobile Friendly
    "@media (max-width: 768px)": {
      teamCard: {
        flex: "1 1 100%",
      },
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        
        {/* Title */}
        <h1 style={styles.title}>About RTUpedia</h1>

        {/* Intro */}
      <p style={{...styles.introText, fontWeight: "600"}}>
          RTUpedia is a student-powered platform built to bring together 
          notes, PYQs, study tools, and resources for every RTU B.tech. student — 
          all in one organized, clean and reliable place.  
          Our mission is to simplify academics and help students succeed 
          with the right guidance and accessible study material.
        </p>


        {/* What We Offer */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>What We Offer</h2>
       <p style={{...styles.text, fontWeight: "600"}}>
            ※ Initially Focused on B.tech (Computer science and engineering) students <br></br>
            ※ Complete Notes  <br></br>
            ※ Branch-wise and Semester-wise PYQs<br></br>  
            ※ SGPA/CGPA Calculators  <br></br>
            ※ Modern and intuitive interface  <br></br>
            ※ Verified and curated study material  <br></br>
            ※ Student-first features and tools  
          </p>    
        </div>

        {/* ================= HOME SEO CONTENT ================= */}



      <div style={styles.card}>
  <h2 style={styles.title2}>※ What is RTUpedia?</h2>

  <p>
    RTUpedia is a student-focused educational platform designed specially for
    Rajasthan Technical University (RTU) B.Tech students. The platform helps
    students access semester-wise notes, previous year question papers (PYQs),
    lab manuals, SGPA calculators, study materials, and important academic resources
    in one organized place.
  </p>

  <p>
    Many RTU students struggle to find proper study resources during semester exams.
    RTUpedia aims to simplify exam preparation by providing subject-wise materials,
    important questions, practical resources, and useful academic tools for engineering students.
  </p>
  <br></br>

  <h2 style={styles.title2}>※ Why RTU Students Use RTUpedia</h2>

  <p>
    Engineering students often waste a lot of time searching for notes,
    PYQs, formulas, and study materials across multiple websites and groups.
    RTUpedia helps students save time by organizing everything semester-wise
    and branch-wise in a clean and simple interface.
  </p>

  <p>
    The platform is useful for students from branches like Computer Science,
    Civil Engineering, Mechanical Engineering, Electrical Engineering,
    Artificial Intelligence, Cyber Security, IoT, and other RTU branches.
  </p>
  <br></br>

  <h2 style={styles.title2}>※ RTU Notes & Study Materials</h2>

  <p>
    RTUpedia provides unit-wise notes and study materials to help students
    understand difficult engineering concepts more effectively. Students can
    access important topics, derivations, formulas, and concept explanations
    for semester preparation and revision.
  </p>

  <p>
    Video lectures and additional resources are also provided for selected
    subjects to improve conceptual understanding and make learning easier.
  </p>
  <br></br>

  <h2 style={styles.title2}>※ Previous Year Question Papers (PYQs)</h2>

  <p>
    RTU Previous Year Question Papers (PYQs) are one of the best resources
    for exam preparation. Solving PYQs helps students understand exam patterns,
    important units, repeated questions, and marking schemes.
  </p>

  <p>
    Regular PYQ practice improves confidence, time management, and overall
    exam performance. RTUpedia organizes PYQs semester-wise and subject-wise
    for quick access and better preparation.
  </p>
  <br></br>

  <h2 style={styles.title2}>※ RTU SGPA Calculator</h2>

  <p>
    The RTU SGPA Calculator available on RTUpedia helps students calculate
    their semester performance easily using the official RTU grading system.
    Students can select grades and instantly estimate their SGPA without
    manual calculations.
  </p>

  <p>
    This tool is especially useful after exams and during result time when
    students want to predict their academic performance quickly and accurately.
  </p>
  <br></br>

  <h2 style={styles.title2}>※ Lab Manuals & Practical Resources</h2>

  <p>
    Practical exams and lab work are important components of RTU engineering courses.
    RTUpedia provides lab manuals, practical files, viva resources, and experiment-related
    materials to help students prepare effectively for practical examinations.
  </p>
  <br></br>

  <h2 style={styles.title2}>※ Why Choose RTUpedia?</h2>

  <ul style={{ paddingLeft: "20px" }}>
    <li>Semester-wise organized study materials</li>
    <li>Easy access to RTU notes and PYQs</li>
    <li>Helpful SGPA calculator tool</li>
    <li>Student-friendly and responsive interface</li>
    <li>Useful resources for semester exam preparation</li>
    <li>Free educational support for RTU students</li>
  </ul>

  <p>
    RTUpedia continues to improve its educational resources and tools to help
    engineering students learn efficiently, prepare smartly, and perform better
    in university exams.
  </p>
  </div>



   {/* STUDENT REVIEWS PREVIEW */}
<div style={{ marginTop: "60px", textAlign: "center",  }}>
  <h2 style={{textAlign: "left"}}>What Students Say</h2>

  <div className="review-preview-grid">
    {reviews.slice(0, 4).map((r) => (
      <ReviewCard key={r._id} review={r} preview />
    ))}
  </div>

  <Link to="/reviews" className="view-all-btn">
    View all reviews →
  </Link>
</div>
   

        {/* Team Section */}
        <h2 style={styles.sectionTitle}>Meet Our Team</h2>

        <div style={styles.teamContainer}>

          <div style={styles.teamCard}>
            <p style={styles.teamName}>Kanchan Prajapat</p>
            <p style={{...styles.teamRole, fontWeight: "600"}}>Founder & Lead Developer</p>
            <p style={styles.text}>
              Handles full-stack development, UI/UX design, optimization, 
              and keeps RTUpedia running smoothly with new tools and features.
            </p>
          </div>

           <div style={styles.teamCard}>
            <p style={styles.teamName}>Mayank Phalodia</p>
            <p style={{...styles.teamRole, fontWeight: "600"}}>Co-Founder & Developer</p>
            <p style={styles.text}>
              Focuses on backend development, security, Marketing and growth strategies,
              and keeps RTUpedia running smoothly with new tools and features.
            </p>
          </div>

          <div style={styles.teamCard}>
            <p style={styles.teamName}>Manan Gupta</p>
            <p style={{...styles.teamRole, fontWeight: "600"}}>UI/UX Designer</p>
            <p style={styles.text}>
               Designs visuals, icons, and enhances the user experience 
              with clean, modern interface elements.
            </p>
          </div>

          <div style={styles.teamCard}>
            <p style={styles.teamName}>Koustubh Chouhan</p>
            <p style={{...styles.teamRole, fontWeight: "600"}}>Content Advisor</p>
            <p style={styles.text}>
              ensure that all notes and PYQs are accurate, relevant, 
              and organized for easy access.
            </p>
          </div>

        </div>

        {/* Achievements */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Our Journey So Far</h2>
          <p style={styles.text}>
            ※ Launched in 2025, RTUpedia has quickly grown to support thousands of RTU B.tech. students.<br></br>
            ※ Continuously adding new features based on student feedback and needs.<br></br>
            ※ Committed to expanding our offerings and supporting the RTU B.tech. student community. 
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
