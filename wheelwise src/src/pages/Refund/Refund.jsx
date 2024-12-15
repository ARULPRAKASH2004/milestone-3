import React from "react";
import "./Refund.css";

const Refund = () => {
  return (
    <div className="refund-wrapper">
      <div className="refund-container">
        <h1 className="refund-heading">Refund Policy</h1>
        <p className="refund-intro">
          At <span className="brand-name">WheelWise</span>, we value our customers and strive to provide transparent and customer-friendly policies. This Refund Policy outlines the terms and conditions for cancellations and refunds.
        </p>

        <h2 className="refund-subheading">1. Cancellation Policy</h2>
        <p className="refund-paragraph">
          Customers may cancel their reservations up to 24 hours prior to the scheduled pickup time without incurring any charges. Cancellations made within 24 hours of the pickup time may incur a cancellation fee.
        </p>

        <h2 className="refund-subheading">2. Refund Eligibility</h2>
        <p className="refund-paragraph">
          Refunds are eligible under the following circumstances:
        </p>
        <ul className="refund-list">
          <li>Reservations canceled at least 24 hours in advance.</li>
          <li>Service issues caused by <span className="brand-name">WheelWise</span> (e.g., unavailability of the reserved vehicle).</li>
          <li>Overpayment or billing errors.</li>
        </ul>

        <h2 className="refund-subheading">3. Refund Process</h2>
        <p className="refund-paragraph">
          Refunds will be processed within 7-10 business days after approval. Customers will be notified via email once the refund has been initiated.
        </p>

        <h2 className="refund-subheading">4. Non-Refundable Cases</h2>
        <p className="refund-paragraph">
          Refunds are not provided for the following:
        </p>
        <ul className="refund-list">
          <li>No-shows or failure to pick up the vehicle without prior cancellation.</li>
          <li>Late returns resulting in additional charges.</li>
          <li>Violations of the rental agreement terms.</li>
        </ul>

        <h2 className="refund-subheading">5. Contact Us</h2>
        <p className="refund-paragraph">
          For any questions or concerns regarding our Refund Policy, please contact us at <a href="mailto:support@wheelwise.com" className="contact-link">support@wheelwise.com</a>.
        </p>
      </div>
    </div>
  );
};

export default Refund;
