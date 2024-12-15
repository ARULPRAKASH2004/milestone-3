import React from "react";
import "./Faq.css";

const Faqq = () => {
  const faqData = [
    {
      question: "How do I book a car with WheelWise?",
      answer: "Booking a car with WheelWise is simple. Just visit our website or mobile app, select your desired vehicle, choose the rental dates, and follow the checkout process."
    },
    {
      question: "What documents are required to rent a car?",
      answer: "You need a valid driver’s license, a government-issued ID, and a credit or debit card for payment. Additional documents may be required for international rentals."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellations made at least 24 hours before the scheduled pickup time are eligible for a full refund. Cancellations made within 24 hours may incur a fee."
    },
    {
      question: "Are there any age restrictions for renting a car?",
      answer: "Yes, renters must be at least 21 years old. Additional fees may apply for drivers under the age of 25."
    },
    {
      question: "What happens if the car breaks down during my rental period?",
      answer: "In the event of a breakdown, contact our 24/7 roadside assistance team immediately. We will ensure a prompt resolution, either by repairing the vehicle or providing a replacement."
    },
    {
      question: "Do you offer insurance coverage for rentals?",
      answer: "Yes, we offer various insurance plans to provide coverage during your rental period. You can select a plan during the booking process."
    }
  ];

  return (
    <div className="faq-wrapper">
      <div className="faq-container">
        <h1 className="faq-heading">Frequently Asked Questions</h1>
        <div className="faq-content">
          {faqData.map((faq, index) => (
            <div key={index} className="faq-item">
              <h2 className="faq-question">{faq.question}</h2>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqq;

/* Faq.css */
