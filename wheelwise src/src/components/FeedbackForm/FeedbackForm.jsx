import React, { useState } from "react";
import "./FeedbackForm.css";
import Alert from '@mui/material/Alert';
const FeedbackForm = ( { id,  userId, vehicleId ,bookingId}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
 
  const [experience, setExperience] = useState('');
  const [answers, setAnswers] = useState({
    bookingEase: "",
    carCondition: "",
    support: "",
    recommend: "",
    deliveryTimeliness: "",
    comfort: ""
  });

  const [alert, setAlert] = useState({ message: "", severity: "" });

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleStarHover = (star) => {
    setHoverRating(star);
  };

  const handleStarHoverLeave = () => {
    setHoverRating(0);
  };

  

  
  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };

 
  const handleAnswerChange = (question, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [question]: value
    }));
  };

  // Handle Form Submit (Send Data via Dummy POST API)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert "yes" and "no" to true and false
    const transformedAnswers = Object.fromEntries(
      Object.entries(answers).map(([key, value]) => [
        key,
        value === "yes" ? true : value === "no" ? false : value,
      ])
    );
  
    const formData = {
      rating, // Star rating
      experience, // User's experience
      bookingEasy: transformedAnswers.bookingEase, // Ease of booking
      carCondition: transformedAnswers.carCondition, // Condition of car
      supportHelpful: transformedAnswers.support, // Support team helpfulness
      recommend: transformedAnswers.recommend, // Recommendation field
      timeliness: transformedAnswers.deliveryTimeliness, // Delivery timeliness
      comfort: transformedAnswers.comfort, // Car comfort
      BOOKING_ID: bookingId, 
    };
  
   
    console.log("Data being sent:", formData);
  
    try {
      const response = await fetch("http://localhost:8080/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      console.log("Response from API:", result);
      setAlert({ message: "Feedback submitted successfully!", severity: "success" });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Something went wrong. Please try again later.");
    }
  };
  
  
  return (
    <div className="feedback-form" id={id}>
         {/* Alert */}
      
      <h1>Fill your feedback</h1>
      {alert.message && (
        <Alert severity={alert.severity} onClose={() => setAlert({ message: "", severity: "" })}>
          {alert.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        {/* Star Rating */}
        <div className="form-group">
          <label>Rate Your Experience:</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star || hoverRating >= star ? "filled" : ""}`}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarHoverLeave}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Textarea for Experience */}
        <div className="form-group">
          <label htmlFor="experience">Share Your Experience:</label>
          <textarea
            id="experience"
            name="experience"
            rows="4"
            placeholder="Describe your experience with our service..."
            value={experience}
            onChange={handleExperienceChange}
          ></textarea>
        </div>

        {/* Multiple Choice Questions */}
        <div className="form-group">
          <label>Was the booking process easy and convenient for you to complete ?</label>
          <div>
            <input
              type="radio"
              id="easy-yes"
              name="bookingEase"
              value="yes"
              onChange={() => handleAnswerChange('bookingEase', 'yes')}
            />
            <label htmlFor="easy-yes">Yes</label>
          </div>
          <div>
            <input
              type="radio"
              id="easy-no"
              name="bookingEase"
              value="no"
              onChange={() => handleAnswerChange('bookingEase', 'no')}
            />
            <label htmlFor="easy-no">No</label>
          </div>
        </div>

        <div className="form-group">
          <label>Was the car you received in good condition, free from any defects, and suitable for your needs?</label>
          <div>
            <input
              type="radio"
              id="car-good-yes"
              name="carCondition"
              value="yes"
              onChange={() => handleAnswerChange('carCondition', 'yes')}
            />
            <label htmlFor="car-good-yes">Yes</label>
          </div>
          <div>
            <input
              type="radio"
              id="car-good-no"
              name="carCondition"
              value="no"
              onChange={() => handleAnswerChange('carCondition', 'no')}
            />
            <label htmlFor="car-good-no">No</label>
          </div>
        </div>

        <div className="form-group">
          <label>Did you find the support team to be helpful, responsive, and able to resolve your issues promptly?</label>
          <div>
            <input
              type="radio"
              id="support-yes"
              name="support"
              value="yes"
              onChange={() => handleAnswerChange('support', 'yes')}
            />
            <label htmlFor="support-yes">Yes</label>
          </div>
          <div>
            <input
              type="radio"
              id="support-no"
              name="support"
              value="no"
              onChange={() => handleAnswerChange('support', 'no')}
            />
            <label htmlFor="support-no">No</label>
          </div>
        </div>

        <div className="form-group">
          <label>Based on your experience, would you recommend this service to others</label>
          <div>
            <input
              type="radio"
              id="recommend-yes"
              name="recommend"
              value="yes"
              onChange={() => handleAnswerChange('recommend', 'yes')}
            />
            <label htmlFor="recommend-yes">Yes</label>
          </div>
          <div>
            <input
              type="radio"
              id="recommend-no"
              name="recommend"
              value="no"
              onChange={() => handleAnswerChange('recommend', 'no')}
            />
            <label htmlFor="recommend-no">No</label>
          </div>
        </div>

        {/* Delivery Timeliness Question */}
        <div className="form-group">
          <label>How would you rate the timeliness of the delivery/pickup?</label>
          <div>
            <input
              type="radio"
              id="timeliness-excellent"
              name="deliveryTimeliness"
              value="excellent"
              onChange={() => handleAnswerChange('deliveryTimeliness', 'excellent')}
            />
            <label htmlFor="timeliness-excellent">Excellent</label>
          </div>
          <div>
            <input
              type="radio"
              id="timeliness-good"
              name="deliveryTimeliness"
              value="good"
              onChange={() => handleAnswerChange('deliveryTimeliness', 'good')}
            />
            <label htmlFor="timeliness-good">Good</label>
          </div>
          <div>
            <input
              type="radio"
              id="timeliness-poor"
              name="deliveryTimeliness"
              value="poor"
              onChange={() => handleAnswerChange('deliveryTimeliness', 'poor')}
            />
            <label htmlFor="timeliness-poor">Poor</label>
          </div>
          <div>
            <input
              type="radio"
              id="timeliness-better"
              name="deliveryTimeliness"
              value="could-be-better"
              onChange={() => handleAnswerChange('deliveryTimeliness', 'could-be-better')}
            />
            <label htmlFor="timeliness-better">Could be better</label>
          </div>
        </div>

        {/* Comfort Question */}
        <div className="form-group">
          <label>How would you rate the comfort of the car?</label>
          <div>
            <input
              type="radio"
              id="comfort-excellent"
              name="comfort"
              value="excellent"
              onChange={() => handleAnswerChange('comfort', 'excellent')}
            />
            <label htmlFor="comfort-excellent">Excellent</label>
          </div>
          <div>
            <input
              type="radio"
              id="comfort-good"
              name="comfort"
              value="good"
              onChange={() => handleAnswerChange('comfort', 'good')}
            />
            <label htmlFor="comfort-good">Good</label>
          </div>
          <div>
            <input
              type="radio"
              id="comfort-poor"
              name="comfort"
              value="poor"
              onChange={() => handleAnswerChange('comfort', 'poor')}
            />
            <label htmlFor="comfort-poor">Poor</label>
          </div>
          <div>
            <input
              type="radio"
              id="comfort-better"
              name="comfort"
              value="could-be-better"
              onChange={() => handleAnswerChange('comfort', 'could-be-better')}
            />
            <label htmlFor="comfort-better">Could be better</label>
          </div>
        </div>

        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
