import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers";
import TextField from '@mui/material/TextField'; // Import TextField
import "./Filter.css";

const Filter = ({
  location,
  setLocation,
 // startTime,
 // setStartTime,
  //endTime,
  //setEndTime,
  handleSearch,
}) => {
  const [showLocationModal, setShowLocationModal] = useState(false);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  
  
  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setShowLocationModal(false); // Close the modal
  };

  

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="filter-container">
        <div className="filter-header">
          {/* Location Selector */}
          <div className="location-selector">
            <button
              onClick={() => setShowLocationModal(true)}
              className="location-button"
            >
              {location || "Select Location"}
              <FaMapMarkerAlt className="location-icon" />
            </button>
          </div>

          {/* Start Time Selector */}
          <div className="date-time-picker">
          <DateTimePicker
  label="Start Time"
  value={startTime ? new Date(startTime) : null} // Ensure value is a Date object
  onChange={(newValue) => setStartTime(newValue?.toISOString() || null)} // Store as ISO string
  onError={() => null} // Suppress all errors
  renderInput={(params) => (
    <TextField
      {...params}
      error={false}
      helperText=""
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#ccc !important',
          },
          '&:hover fieldset': {
            borderColor: '#007bff',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#007bff',
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#ccc !important',
        },
        '& .MuiInputBase-root': {
          backgroundColor: '#f8f9fa',
          fontSize: '16px',
          color: startTime ? '#000' : '#adb5bd',
        },
        '& .MuiFormHelperText-root': {
          display: 'none',
        },
      }}
    />
  )}
/>



          </div>

          {/* End Time Selector */}
          <div className="date-time-picker">
          <DateTimePicker
  label="End Time"
  value={endTime ? new Date(endTime) : null} // Convert to Date object
  onChange={(newValue) => setEndTime(newValue?.toISOString() || null)} // Store as ISO string
  minDateTime={startTime ? new Date(startTime) : null} // Ensure valid range
  onError={() => null}
  renderInput={(params) => (
    <TextField
      {...params}
      error={false}
      helperText=""
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#ccc',
          },
          '&:hover fieldset': {
            borderColor: '#007bff',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#007bff',
          },
        },
        '& .MuiInputBase-root': {
          backgroundColor: '#f8f9fa',
          fontSize: '16px',
          color: endTime ? '#000' : '#adb5bd',
        },
        '& .MuiFormHelperText-root': {
          display: 'none',
        },
      }}
    />
  )}
/>

          </div>

          {/* Search Button */}
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        {/* Location Modal */}
        {showLocationModal && (
          <div
            className="location-modal"
            onClick={() => setShowLocationModal(false)} 
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()} 
            >
              <h3>Select City</h3>
              <ul className="location-list">
                {[
                  "Hyderabad",
                  "Bangalore",
                  "Mumbai",
                  "Delhi",
                  "Chennai",
                  "Kolkata",
                  "Pune",
                  "Ahmedabad",
                  "Jaipur",
                  "Lucknow",
                ].map((city) => (
                  <li
                    key={city}
                    onClick={() => handleLocationSelect(city)}
                    className={`location-item ${
                      location === city ? "selected" : ""
                    }`}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
};

export default Filter;
