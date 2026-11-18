import React, { useState } from "react";
import { FaWhatsapp, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import { submitReview } from "../utils/reviewApi";
import StarRating from "../components/Review/StarRating";
import { useAuth } from "../context/AuthContext";
import "./ContactUs.css";  
import "./SGPACalculator.css"; 

const ContactUs = () => {
  const SHOW_TEAM = true;

  const [showPopup, setShowPopup] = useState(false);
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to submit review");
      return;
    }

    if (!message) {
      alert("Please enter review");
      return;
    }

    try {
      await submitReview({ message, rating });

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);

      setMessage("");
      setRating(5);

    } catch (err) {
      alert(err.message || "Error submitting review");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-content">

        {/* ================= REVIEW ================= */}
     
       <div className="contact-page">

  <div className="main-contact-card">

    <h1 className="contact-title">Contact Us</h1>

   <p className="contact-subtext">
  Have questions, suggestions, or feedback about RTUpedia?
  Found an incorrect PDF, broken link, or missing study material?

  <br /><br />

  We are always happy to hear from students. Reach out to us
  through email or WhatsApp, and help us make RTUpedia better
  for everyone.

  <br /><br />

  Your feedback helps us improve our academic resources and
  create a better learning experience.
</p>


    {/* REVIEW SECTION */}
    <div className="review-section">
    
      <h2 className="card-title">Share your experience</h2>

      <p style={{marginTop:'10px', marginBottom:'10px'}}>Reviewing as <b>{user?.name}</b> <br></br> or contact us via Mail- rtupedia@gmail.com</p>

      <form className="review-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Your Review"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <StarRating value={rating} onChange={setRating} />

        <button type="submit">Submit Review</button>
      </form>
    </div>

  </div>

  

</div>

{/* ================= HELP & SUPPORT ================= */}

<div className="contact-help-section">

  <h2 className="card-title">How Can We Help You?</h2>

  <p className="contact-help-intro">
    Whether you have a question or want to help us improve
    RTUpedia, you can reach out to us for the following:
  </p>

  <div className="contact-help-grid">

    <div className="contact-help-card">
      <i className="fas fa-file-pdf"></i>
      <h3>Missing Study Materials</h3>
      <p>
        Let us know if notes, previous year papers,
        or practical resources are missing.
      </p>
    </div>

    <div className="contact-help-card">
      <i className="fas fa-exclamation-circle"></i>
      <h3>Report an Issue</h3>
      <p>
        Found a broken PDF link, incorrect information,
        or an issue while using the website?
        Please inform us.
      </p>
    </div>

    <div className="contact-help-card">
      <i className="fas fa-lightbulb"></i>
      <h3>Suggestions & Feedback</h3>
      <p>
        Share your ideas and suggestions for new
        features or improvements.
      </p>
    </div>

    <div className="contact-help-card">
      <i className="fas fa-handshake"></i>
      <h3>General Enquiries</h3>
      <p>
        Contact us for general questions or
        information about RTUpedia.
      </p>
    </div>

  </div>

  <div className="contact-email-box">
    <p>For all enquiries, email us at:</p>
    <a href="mailto:rtupedia@gmail.com">
      rtupedia@gmail.com
    </a>
  </div>

</div>

        {showPopup && (
          <div className="review-popup">
            ✅ Thanks! Your review is sent for approval.
          </div>
        )}

     
{SHOW_TEAM && (
  <div className="card">
    {/* Team section */}
 
        {/* ================= SOCIAL ================= */}
        <div className="follow-section">
  <h2 className="follow-title">Follow Us</h2>
<div className="social-container">

  <a href="https://wa.me/919257794431" target="_blank" rel="noreferrer" className="social-icon whatsapp">
    <FaWhatsapp />
  </a>

  <a href="https://www.youtube.com/@RTUpedia" target="_blank" rel="noreferrer" className="social-icon youtube">
    <FaYoutube />
  </a>

  <a href="https://www.linkedin.com/in/kanchan-prajapat92577/" target="_blank" rel="noreferrer" className="social-icon linkedin">
    <FaLinkedin />
  </a>

  <a href="https://github.com/Kanchan-Prajapat" target="_blank" rel="noreferrer" className="social-icon github">
    <FaGithub />
  </a>

</div>
</div>


        {/* ================= TEAM ================= */}
        <div className="card">
          <h2 className="card-title" >Team Contacts</h2>

          <div className="team-grid">

            {/* Kanchan */}
            <div className="team-card">
              <img src="/assets/team/kanchan.png" className="team-photo" alt="Kanchan" />
              <p className="member-name">Kanchan Prajapat</p>

              <p className="member-contact">
                📞 <a href="tel:+919257794431">+91 9257794431</a>
              </p>

              <p className="member-contact">
                ✉️ <a href="mailto:rtupedia@gmail.com">rtupedia@gmail.com</a>
              </p>
            </div>

            {/* Mayank */}
            <div className="team-card">
              <img src="/assets/team/Mayank.jpg" className="team-photo" alt="Mayank" />
              <p className="member-name">Mayank Phalodia</p>

              <p className="member-contact">
                📞 <a href="tel:+917976335222">+91 7976335222</a>
              </p>

              <p className="member-contact">
                ✉️ <a href="mailto:mayankphalodia@gmail.com">mayankphalodia@gmail.com</a>
              </p>
            </div>

            {/* Manan */}
            <div className="team-card">
              <img src="/assets/team/manan.jpg" className="team-photo" alt="Manan" />
              <p className="member-name">Manan Gupta</p>

              <p className="member-contact">
                📞 <a href="tel:+919887737271">+91 9887737271</a>
              </p>

              <p className="member-contact">
                ✉️ <a href="mailto:manangupta902@gmail.com">manangupta902@gmail.com</a>
              </p>
            </div>

            {/* Koustubh */}
            <div className="team-card">
              <img src="/assets/team/koustubh.jpg" className="team-photo" alt="Koustubh" />
              <p className="member-name">Koustubh Chouhan</p>

              <p className="member-contact">
                📞 <a href="tel:+919829734320">+91 9829734320</a>
              </p>

              <p className="member-contact">
                ✉️ <a href="mailto:koustubhchouhan9@gmail.com">koustubhchouhan9@gmail.com</a>
              </p>
            </div>

          </div>
        </div>

         </div>
)}

      </div>
    </div>
  );
};

export default ContactUs;