import React, { useState, useEffect } from "react";
import "./Review.css";

const Review = ({ id }) => {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews on component mount
  useEffect(() => {
    fetch(`http://localhost:8080/api/feedback/vehicle/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data); // Set the fetched reviews data
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [id]);

 
  if (reviews.length === 0) {
    return null;  
  }

  return (
    <div className="review-box">
      <h3>Customer Reviews</h3>
      <div className="reviews-container">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-profile">
              <div className="profile-placeholder">
                <span>{review.booking.customer.firstname[0]}</span>
              </div>
            </div>
            <div className="review-content">
              <p className="review-user">
                <strong>{review.booking.customer.firstname} {review.booking.customer.lastname}</strong> 
              </p>
              <p className="review-comment">{review.experience}</p>
              <div className="review-rating">
                {Array(review.rating)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;  // Ensure it's exported correctly
