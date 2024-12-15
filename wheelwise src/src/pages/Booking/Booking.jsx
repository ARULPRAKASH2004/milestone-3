import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUsers, FaCogs, FaGasPump, FaCar } from "react-icons/fa"; // Import React Icons
import "./Booking.css";
import { IoMdTimer } from "react-icons/io";
import { toast } from "react-toastify"; // Import toast from react-toastify

const ConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate(); // Hook for navigation

  if (!state) {
    return <p>No booking details available.</p>;
  }

  const {
    carDetails = {},
    bookingDetails = {},
    userDetails = {},
  } = state || {};

  const convertToLocalDateTime = (dateString) => {
    const date = new Date(dateString);
    const tzOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    const localISOTime = new Date(date - tzOffset).toISOString().slice(0, -1); // Remove 'Z'
    return localISOTime;
  };

  const startDate = convertToLocalDateTime(bookingDetails.startTime);
  const endDate = convertToLocalDateTime(bookingDetails.endTime);

  const durationInMs = new Date(bookingDetails.endTime) - new Date(bookingDetails.startTime);
  const durationInDays = Math.ceil(durationInMs / (1000 * 60 * 60 * 24));
  const totalFare = durationInDays * carDetails.pricePerDay;
  const gstCost = totalFare * 0.18;

  const handleBooking = async () => {
    try {
      // First API call to update the booking
      const bookingResponse = await fetch("http://localhost:8080/api/bookings/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleId: carDetails.id,
          userId: userDetails.UserId,
          startDate: startDate,
          endDate: endDate,
        }),
      });

      if (bookingResponse.ok) {
        const bookingData = await bookingResponse.json(); // Parse the JSON response
        const bookingId = bookingData.id; // Get the booking ID from the response

        // Booking successful, now send the email
        const emailResponse = await fetch(
          `http://localhost:8080/api/email/send?bookingId=${bookingId}`, // Use the extracted booking ID
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (emailResponse.ok) {
          const emailData = await emailResponse.json();
          toast.success("Booking is successfully done! " + emailData.message); // Display success toast
          navigate("/your-booking"); // Navigate to bookings page
        } else {
          toast.error("Booking is successful, but email could not be sent."); // Error toast if email fails
        }
      } else {
        toast.error("Booking failed. Please try again."); // Error toast if booking fails
      }
    } catch (error) {
      toast.error("Error: " + error.message); // Error toast if there's a problem with the API call
    }
  };

  return (
    <div className="booking-confirmation">
      <div className="confirmation-wrapper">
        {/* Left Section: Car Details */}
        <div className="car-details-box">
          <div className="car-details-content">
            {/* Left Section: Dates and Duration */}
            <div className="car-info">
              <p>
                <strong>{carDetails.companyName || "Hyundai"} {carDetails.model || "Elantra"}</strong>
              </p>
              <div className="car-dates-row" style={{ display: "flex", gap: "60px" }}>
                <span>{bookingDetails.startTime ? new Date(bookingDetails.startTime).toLocaleString() : "N/A"}</span>
                <span>{bookingDetails.endTime ? new Date(bookingDetails.endTime).toLocaleString() : "N/A"}</span>
              </div>

              <div className="time-icon" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <IoMdTimer size={20} style={{ marginLeft: "150px", color: "#0A2139" }} />
                <span>{durationInDays} {durationInDays > 1 ? "days" : "day"}</span>
              </div>

              <div className="car-dates" style={{ marginLeft: "120px" }}>
                <span><strong>Location:</strong> {carDetails.location || "Not Provided"}</span>
              </div>
            </div>

            {/* Right Section: Car Image */}
            <img
              src={`http://localhost:8080/images?imagePath=${carDetails.imagePath || 'default-image.jpg'}`}
              alt={carDetails.model || "Car"}
              className="car-image"
            />
          </div>
          <br />
          <br />
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
              <span style={{ flex: 1, height: "1px", backgroundColor: "#fff" }}></span> {/* Left Line */}
              Booking Details
              <span style={{ flex: 1, height: "1px", backgroundColor: "#fff" }}></span> {/* Right Line */}
            </h3>

            {/* Name and Email on the same line with static space */}
            <p style={{ display: "flex", width: "100%" ,marginTop:"20px"}}>
              <strong style={{ width: "80px", textAlign: "left" }}>Name: </strong>
              <span style={{ width: "300px", textAlign: "left" }}>{userDetails.firstName} {userDetails.lastName}</span>
              <strong style={{ width: "80px", textAlign: "left" }}>Email:</strong>
              <span style={{ width: "300px", textAlign: "left" }}>{userDetails.email}</span>
            </p>

            {/* Contact Number and Pickup Address on the same line with static space */}
            <p style={{ display: "flex", width: "100%" }}>
              <strong style={{ width: "80px", textAlign: "left" }}>Contact Number:</strong>
              <span style={{ width: "300px", textAlign: "left" }}>{userDetails.contactNo}</span>
              <strong style={{ width: "80px", textAlign: "left" }}>Pickup Address:</strong>
              <span style={{ width: "300px", textAlign: "left" }}>{userDetails.address}</span>
            </p>

            <br />
            {/* License Number with larger text */}
            <p style={{ fontWeight: "bold", fontSize: "25px" }}>
              <strong style={{ marginRight: "30px", marginLeft: "50px" }}> LICENSE NUMBER:</strong>
              {userDetails.licenseUrl}
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
              <span style={{ flex: 1, height: "1px", backgroundColor: "#fff" }}></span> {/* Left Line */}
              Fare Details
              <span style={{ flex: 1, height: "1px", backgroundColor: "#fff" }}></span> {/* Right Line */}
            </h3>
            <div className="fare-details">
              <div className="fare-row">
                <span>Base fare</span>
                <span>₹{totalFare || "N/A"}</span>
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
                <span>₹{(totalFare + gstCost + 250 + 2000).toFixed(2) || "N/A"}</span>
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
                <span>To be paid by you</span>
              </div>
            </div>
          </div>

          {/* Confirm Booking Button */}
          <div className="confirm-button-box">
            <button
              className="confirm-booking-btn"
              onClick={handleBooking} // Calling handleBooking function
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;