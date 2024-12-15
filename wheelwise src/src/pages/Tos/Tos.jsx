import React from "react";
import "./Tos.css";

const Tos = () => {
  return (
    <div className="terms-wrapper">
      <div className="terms-container">
        <h1 className="terms-heading">Terms of Service</h1>
        <p className="terms-intro">
          Welcome to <span className="brand-name">WheelWise</span>! Please carefully review these terms and conditions, as they govern your access to and use of our car rental services.
        </p>

        <h2 className="terms-subheading">1. Agreement to Terms</h2>
        <p className="terms-paragraph">
          By accessing our website or using our services, you acknowledge that you have read, understood, and agreed to be bound by these terms. If you do not agree, please refrain from using our services.
        </p>

        <h2 className="terms-subheading">2. Eligibility</h2>
        <ul className="terms-list">
          <li>You must be at least 21 years old to rent a vehicle.</li>
          <li>A valid and unexpired driver’s license is mandatory.</li>
          <li>All drivers are subject to a background check and additional requirements.</li>
        </ul>

        <h2 className="terms-subheading">3. Reservations and Payments</h2>
        <p className="terms-paragraph">
          All reservations must be secured with a valid payment method. Changes or cancellations made at least 24 hours in advance will not incur any penalties. Late cancellations may result in fees.
        </p>

        <h2 className="terms-subheading">4. Vehicle Usage</h2>
        <ul className="terms-list">
          <li>Vehicles must be used in accordance with local traffic laws.</li>
          <li>Smoking, alcohol consumption, or illegal activities within the vehicle are strictly prohibited.</li>
          <li>Vehicles must be returned in the same condition as at the time of rental.</li>
        </ul>

        <h2 className="terms-subheading">5. Limitation of Liability</h2>
        <p className="terms-paragraph">
          WheelWise is not responsible for damages, losses, or injuries incurred during the rental period unless explicitly stated in our insurance policies.
        </p>

        <h2 className="terms-subheading">6. Contact Us</h2>
        <p className="terms-paragraph">
          If you have any questions or concerns regarding these terms, feel free to reach out to our support team at <a href="mailto:support@wheelwise.com" className="contact-link">support@wheelwise.com</a>.
        </p>
      </div>
    </div>
  );
};

export default Tos;
