import React from "react";

const AboutUs = () => {
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
       <b> <p style={styles.introText}>
          RTUpedia is a student-powered platform built to bring together 
          notes, PYQs, study tools, and resources for every RTU student — 
          all in one organized, clean and reliable place.  
          Our mission is to simplify academics and help students succeed 
          with the right guidance and accessible study material.
        </p></b>


        {/* What We Offer */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>What We Offer</h2>
      <b> <p style={styles.text}>
            ※ Complete Notes  <br></br>
            ※ Branch-wise and Semester-wise PYQs<br></br>  
            ※ SGPA/CGPA Calculators  <br></br>
            ※ Modern and intuitive interface  <br></br>
            ※ Verified and curated study material  <br></br>
            ※ Student-first features and tools  
          </p> </b>   
        </div>

        {/* Team Section */}
        <h2 style={styles.sectionTitle}>Meet Our Team</h2>

        <div style={styles.teamContainer}>

          <div style={styles.teamCard}>
            <p style={styles.teamName}>Kanchan Prajapat</p>
            <p style={styles.teamRole}><b>Founder & Lead Developer</b></p>
            <p style={styles.text}>
              Handles full-stack development, UI/UX design, optimization, 
              and keeps RTUpedia running smoothly with new tools and features.
            </p>
          </div>

          <div style={styles.teamCard}>
            <p style={styles.teamName}>Manan Gupta</p>
            <p style={styles.teamRole}><b>UI/UX Designer</b></p>
            <p style={styles.text}>
               Designs visuals, icons, and enhances the user experience 
              with clean, modern interface elements.
            </p>
          </div>

          <div style={styles.teamCard}>
            <p style={styles.teamName}>Koustubh Chouhan</p>
            <p style={styles.teamRole}><b>Content Advisor</b></p>
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
            ※ Launched in 2025, RTUpedia has quickly grown to support thousands of RTU students.<br></br>
            ※ Continuously adding new features based on student feedback and needs.<br></br>
            ※ Committed to expanding our offerings and supporting the RTU student community. 
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
