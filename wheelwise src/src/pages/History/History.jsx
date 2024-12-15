import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider"; 
import './History.css';

const History = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.UserId) {
      console.log("User ID:", user.UserId);
      fetch(`http://localhost:8080/api/bookings/user/${user.UserId}`)
        .then((response) => response.json())
        .then((data) => {
          setBookings(data);
          setLoading(false); // Stop loading after data is fetched
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          setLoading(false); // Stop loading in case of error
        });
    }
  }, [user?.UserId]);

  const handleView = (bookingId) => {
    navigate(`/view/${bookingId}`);
  };

  return (
    <div className="history-container">
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div> {/* Loading spinner */}
        </div>
      ) : bookings.length > 0 ? (
        <table className="history-table">
          <thead>
            <tr>
              <th>#Booking ID</th>
              <th>Model of the Car</th>
              <th>Number Plate</th>
              <th>Price Per Day</th>
              <th>Total Fare</th>
              <th>Location</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>
                  {booking.vehicle.companyName} {booking.vehicle.model}
                </td>
                <td>{booking.vehicle.numberPlate}</td>
                <td>{booking.vehicle.pricePerDay}</td>
                <td>{booking.totalPrice}</td>
                <td>{booking.vehicle.location}</td>
                <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                <td>{booking.status}</td>
                <td>
                  <button
                    onClick={() => handleView(booking.id)}
                    className="view-button"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-booking-message">No Booking Available</p> // No bookings message
      )}
    </div>
  );
};

export default History;
