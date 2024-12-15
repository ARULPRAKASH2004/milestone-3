import React from "react";
import "./Privacy.css";

const Privacy = () => {
  return (
    <div className="privacy-wrapper">
      <div className="privacy-container">
        <h1 className="privacy-heading">Privacy Policy</h1>
        <p className="privacy-intro">
          Your privacy is important to us at <span className="brand-name">WheelWise</span>. This policy explains how we collect, use, and protect your information when you use our services.
        </p>

        <h2 className="privacy-subheading">1. Information We Collect</h2>
        <p className="privacy-paragraph">
          We collect personal information such as your name, email, phone number, and payment details to facilitate our rental services.
        </p>

        <h2 className="privacy-subheading">2. How We Use Your Information</h2>
        <ul className="privacy-list">
          <li>To process your bookings and manage your rentals</li>
          <li>To enhance customer service and address inquiries</li>
          <li>To send promotional offers and updates</li>
        </ul>

        <h2 className="privacy-subheading">3. Data Protection Measures</h2>
        <p className="privacy-paragraph">
          We implement robust security protocols to safeguard your data against unauthorized access, alteration, or misuse. Your trust is our priority.
        </p>

        <h2 className="privacy-subheading">4. Contact Us</h2>
        <p className="privacy-paragraph">
          If you have any concerns or questions about this Privacy Policy, please reach out to us at <a href="mailto:support@wheelwise.com" className="contact-link">support@wheelwise.com</a>.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
