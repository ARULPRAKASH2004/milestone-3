import React from "react";
import { useNavigate } from "react-router-dom";
import "./card.css";

const CarCard = ({
  id,
  model,
  companyName,
  fuelType,
  transmissionType,
  location,
  pricePerDay,
  rating,
  type,
  manufacturingYear,
  capacity,
  imagePath, 
  startTime = null,
  endTime = null,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const carDetails = {
      id,
      model,
      companyName,
      fuelType,
      transmissionType,
      location,
      pricePerDay,
      rating,
      type,
      manufacturingYear,
      capacity,
      startTime,
      endTime,
      imagePath,
    };
    
    // Log car details to the console
    console.log("Car details:", carDetails);

    // Navigate to the detailed page
    navigate(`/car/${id}`, { state: carDetails });
  };

  return (
    <div className="unique-car-card" onClick={handleCardClick}>
      <img
        src={`http://localhost:8080/images?imagePath=${imagePath}`}
        alt={model}
        className="unique-car-card-image"
      />
      <div className="unique-car-card-content">
        <div className="unique-car-card-rating">
          <span className="unique-rating-value">{rating} ★</span>
          <span className="unique-rating-location">| {location}</span>
        </div>
        <div>
          <h3 className="unique-car-card-title" style={{ display: "inline" }}>
            {companyName} {model}
          </h3>
          <span style={{ display: "inline", marginLeft: "10px" }}>{type}</span>
        </div>
        <br />
        <div className="unique-car-card-details">
          <span>{transmissionType}</span> • <span>{fuelType}</span> • <span>{capacity} seats</span>
        </div>
        <div className="unique-car-card-price">
          <span>₹{pricePerDay}/day</span>
          <span className="unique-price-exclude"> inclusive tax</span>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default CarCard;
