// src/pages/ContactUs.js
import React from "react";
import { FaInstagram, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";

const ContactUs = () => {
  const styles = {
    page: {
      padding: "40px 20px",
      color: "var(--color-text)",
      background: "var(--color-background)",
      fontFamily: "Poppins, sans-serif",
      minHeight: "100vh",
    },
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      textAlign: "center",
    },
    title: {
      fontSize: "32px",
      fontWeight: "700",
      color: "var(--color-primary)",
      marginBottom: "10px",
    },
    subtext: {
      fontSize: "16px",
      opacity: "0.8",
      marginBottom: "40px",
    },
    card: {
      background: "var(--color-card-bg)",
      border: "1px solid var(--color-border)",
      borderRadius: "16px",
      padding: "30px",
      marginBottom: "30px",
      transition: "0.3s",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    cardTitle: {
      fontSize: "22px",
      fontWeight: "700",
      color: "var(--color-primary)",
      marginBottom: "20px",
    },
    socialContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginBottom: "15px",
    },
    icon: {
      background: "var(--color-primary)",
      color: "var(--color-background)",
      textDecoration: "none",
      padding: "12px",
      borderRadius: "50%",
      fontSize: "20px",
      width: "35px",
      height: "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "5px",
      transition: "0.3s",
    },
    member: {
      marginBottom: "20px",
      textAlign: "center",
    },
    memberName: {
      fontWeight: "600",
      color: "var(--color-primary)",
      fontSize: "18px",
    },
    textSmall: {
      fontSize: "14px",
      opacity: "0.7",
    },
  };

  // -----------------------------
  // Responsive Grid (Inline CSS)
  // -----------------------------
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Desktop = 4, Tablet = 2, Mobile = 1
  let columns = 4;
  if (screenWidth <= 600) columns = 1;
  else if (screenWidth <= 1024) columns = 2;

  const teamGridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: "25px",
    justifyItems: "center",
    alignItems: "center",
    marginTop: "20px",
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Contact Us</h1>

        <p style={styles.subtext}>
          <b>
            Have any suggestions, queries or feedback about our content?
            <br />
            Then contact us on WhatsApp or email.
          </b>
          <br />
          We’d love to hear from you!
        </p>

        {/* Social Media Section */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Follow Us</h2>

          <div style={styles.socialContainer}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={styles.icon}
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.youtube.com/@RTUpedia"
              target="_blank"
              rel="noreferrer"
              style={styles.icon}
            >
              <FaYoutube />
            </a>

            <a
              href="https://www.linkedin.com/in/kanchan-prajapat-829336327/"
              target="_blank"
              rel="noreferrer"
              style={styles.icon}
            >
              <FaLinkedin />
            </a>

            <a
              href="https://github.com/Kanchan-Prajapat"
              target="_blank"
              rel="noreferrer"
              style={styles.icon}
            >
              <FaGithub />
            </a>
          </div>

          <p style={styles.textSmall}>
            Stay updated with RTUpedia announcements & releases.
          </p>
        </div>

        {/* Team Section */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Team Contacts</h2>

          <div style={teamGridStyle}>
            {/* Logo */}
            <div style={styles.member}>
              <img
                src="/favicon.ico"
                style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                alt="RTUpedia Logo"
              />
            </div>

            {/* Kanchan */}
            <div style={styles.member}>
              <img
                src="/assets/team/kanchan.png"
                style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                alt="Kanchan Prajapat"
              />
              <p style={styles.memberName}>Kanchan Prajapat</p>
              <p>+91 9257794431</p>
              <b>
                <p>rtupedia@gmail.com</p>
              </b>
            </div>

            {/* Manan */}
            <div style={styles.member}>
              <img
                src="/assets/team/manan.jpg"
                style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                alt="Manan Gupta"
              />
              <p style={styles.memberName}>Manan Gupta</p>
              <p>+91 9887737271</p>
            </div>

            {/* Koustubh */}
            <div style={styles.member}>
              <img
                src="/assets/team/koustubh.jpg"
                style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                alt="Koustubh Chouhan"
              />
              <p style={styles.memberName}>Koustubh Chouhan</p>
              <p>+91 9829734320</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
