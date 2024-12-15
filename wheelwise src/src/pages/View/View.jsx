import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoMdTimer } from "react-icons/io";
import "./View.css"; 
import { useAuth } from "../../hooks/AuthProvider"; 
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";
import { toast, ToastContainer } from 'react-toastify';


const View = () => {
  const { user } = useAuth();
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [isCanceled, setIsCanceled] = useState(false); // Track cancellation status

  useEffect(() => {
    if (user?.UserId) {
      // Fetch booking details using the user ID and bookingId
      fetch(`http://localhost:8080/api/bookings/${user.UserId}/booking/${bookingId}`)
        .then((response) => response.json())
        .then((data) => {
          setBooking(data);
          // If the status is already CANCELLED, set isCanceled to true
          if (data.status === "CANCELLED") {
            setIsCanceled(true);
          }
        })
        .catch((error) => console.error("Error fetching booking details:", error));
    }
  }, [user?.id, bookingId]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  const handleCancel = () => {
    fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vehicleId: booking.vehicle.id,
        userId: booking.customer.id,
        startDate: booking.startDate,
        endDate: booking.endDate,
        status: "CANCELED",
      }),
    })
      .then((response) => {
        if (response.ok) {
          setIsCanceled(true); // Set to true when the booking is successfully canceled
          toast.success("Booking canceled "); // Show success toast
        } else {
          throw new Error("Failed to cancel booking");
        }
      })
      .catch((error) => toast.error("Error: " + error.message)); // Show error toast
  };

  const {
    vehicle = {},
    totalPrice = "Not Available",
    startDate = "Not Available",
    endDate = "Not Available",
    status = "Not Available",
    customer = {},
  } = booking || {};

  const durationInMs = new Date(endDate) - new Date(startDate) || "Not Available";
  const durationInDays =
    durationInMs !== "Not Available"
      ? Math.ceil(durationInMs / (1000 * 60 * 60 * 24))
      : "Not Available";

  return (
    <div className="booking-confirmation">
      {/* Status Message: Centered text */}
      <div
        style={{
          backgroundColor: isCanceled ? "red" : "green",
          color: "white",
          padding: "10px",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "20px",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center", // Horizontally center the text
          alignItems: "center", // Vertically center the text
          height: "50px", // Set a fixed height for the status message
        }}
      >
        {isCanceled ? "CANCELLED" : "CONFIRMED"}
      </div>

      <div className="confirmation-wrapper">
        {/* Left Section: Car Details */}
        <div className="car-details-box">
          <div className="car-details-content">
            {/* Left Section: Dates and Duration */}
            <div className="car-info">
              <p>
                <strong>{vehicle.companyName || "Hyundai"} {vehicle.model || "Elantra"}</strong>
              </p>
              <div className="car-dates-row" style={{ display: "flex", gap: "60px" }}>
                <span>{startDate ? new Date(booking.startDate).toLocaleString() : "N/A"}</span>
                <span>{endDate ? new Date(endDate).toLocaleString() : "N/A"}</span>
              </div>

              <div className="time-icon" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <IoMdTimer size={20} style={{ marginLeft: "150px", color: "#0A2139" }} />
                <span>{durationInDays} {durationInDays > 1 ? "days" : "day"}</span>
              </div>

              <div className="car-dates" style={{ marginLeft: "120px" }}>
                <span><strong>Location:</strong> {vehicle.location || "Not Provided"}</span>
              </div>
            </div>

            {/* Right Section: Car Image */}
            <img
              src={`http://localhost:8080/images?imagePath=${vehicle.imagePaths[0] || 'default-image.jpg'}`}
              alt={vehicle.model || "Car"}
              className="car-image"
            />
          </div>
          <br></br>
          <br></br>
          {/* Booking Details */}
          <div className="user-booking-details">
            <h3 
              className="section-heading" 
              style={{
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                gap: "10px"
              }}
            >
              <span style={{ flex: 1, height: "1px", backgroundColor: "#fff" }}></span>
              Booking Details
              <span style={{ flex: 1, height: "1px", backgroundColor: "#fff" }}></span>
            </h3>

            <p style={{ display: "flex", width: "100%" ,marginTop:"20px"}}>
              <strong style={{ width: "80px", textAlign: "left" }}>Name: </strong>
              <span style={{ width: "300px", textAlign: "left" }}>{customer.firstname} {customer.lastname}</span>
              <strong style={{ width: "80px", textAlign: "left" }}>Email:</strong>
              <span style={{ width: "300px", textAlign: "left" }}>{customer.email}</span>
            </p>

            <p style={{ display: "flex", width: "100%" }}>
              <strong style={{ width: "80px", textAlign: "left" }}>Contact Number:</strong>
              <span style={{ width: "300px", textAlign: "left" }}>{customer.contactNo}</span>
              <strong style={{ width: "80px", textAlign: "left" }}>Pickup Address:</strong>
              <span style={{ width: "300px", textAlign: "left" }}>{customer.address}</span>
            </p>

            <br></br>
            <p style={{ fontWeight: "bold", fontSize: "25px" }}>
              <strong style={{ marginRight: "30px",marginLeft: "50px"  }}>  LICENSE NUMBER:</strong>
              {customer.licenseUrl}
            </p>
          </div>
        </div>

        {/* Right Section: Fare Details & Booking Details */}
        <div className="booking-details-box">
          {/* Fare Details */}
          <div className="fare-details-box">
            <h3 
              className="section-heading" 
              style={{
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                gap: "10px"
              }}
            >
              <span style={{ flex: 1, height: "1px", backgroundColor: "#fff" }}></span>
              Fare Details
              <span style={{ flex: 1, height: "1px", backgroundColor: "#fff" }}></span>
            </h3>
            <div className="fare-details">
              <div className="fare-row">
                <span>Base fare</span>
                <span>₹{totalPrice || "N/A"}</span>
              </div>
              <div className="fare-row">
                <span>Doorstep delivery & pickup</span>
                <span>₹250</span>
              </div>
              <div className="fare-row">
                <span>Insurance & GST</span>
                <span>₹1000</span>
              </div>
              <div className="fare-row">
                <span>Additional charge</span>
                <span>₹1500</span>
              </div>
              <hr className="divider" />
              <div className="fare-row total">
                <span>Total</span>
                <span>₹{(totalPrice + 1000 + 250 + 2000).toFixed(2) || "N/A"}</span>
              </div>
              <hr className="divider" />
              <div className="fare-row">
                <span>Kms limit</span>
                <span>168 kms</span>
              </div>
              <div className="fare-row">
                <span>Fuel</span>
                <span>Excluded</span>
              </div>
              <div className="fare-row">
                <span>Extra kms charge</span>
                <span>₹9/km</span>
              </div>
              <div className="fare-row">
                <span>Tolls, Parking & Inter-state taxes</span>
                <span>To be paid directly to the owner</span>
              </div>
            </div>
          </div>

          {/* Cancel Booking Button */}
          <div className="cancel-booking-section" style={{ marginTop: "30px" ,marginLeft:"280px"}}>
            <button
              onClick={handleCancel}
              className="cancel-booking-button"
              disabled={isCanceled}
              style={{
                backgroundColor: isCanceled ? "#b2b2b2" : "red",
                color: "white",
                cursor: isCanceled ? "not-allowed" : "pointer",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </div>

      <ToastContainer /> {/* Toast container to display messages */}
      <FeedbackForm id="feedback-section" userId={customer.userId} vehicleId={vehicle.id} bookingId={booking.id}/>
    </div>
  );
};

export default View;