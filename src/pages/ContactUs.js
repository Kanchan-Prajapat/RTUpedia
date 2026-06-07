import React, { useState } from "react";
import { FaWhatsapp, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import { submitReview } from "../utils/reviewApi";
import StarRating from "../components/Review/StarRating";
import { useAuth } from "../context/AuthContext";
import "./ContactUs.css";  
import "./SGPACalculator.css"; 

const ContactUs = () => {

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
      <b>
        Have any suggestions, queries or feedback about our content?
        <br />
        Then contact us on WhatsApp or email.
      </b>
      <br /><br />
      We’d love to hear from you!
    </p>

    {/* REVIEW SECTION */}
    <div className="review-section">
      <h2 className="card-title">Share your experience</h2>

      <p style={{marginTop:'10px', marginBottom:'10px'}}>Reviewing as <b>{user?.name}</b></p>

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

        {showPopup && (
          <div className="review-popup">
            ✅ Thanks! Your review is sent for approval.
          </div>
        )}

     

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

  <a href="https://www.linkedin.com/in/kanchan-prajapat-829336327/" target="_blank" rel="noreferrer" className="social-icon linkedin">
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
    </div>
  );
};

export default ContactUs;