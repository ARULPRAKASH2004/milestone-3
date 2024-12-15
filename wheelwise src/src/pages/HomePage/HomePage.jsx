import React, { useState, useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Button, Menu, MenuItem } from "@mui/material";
import CarCard from '../../components/card/CarCard'
import Filter from '../../components/Filter/Filter'
import './HomePage.css';
import { FaCaretDown } from 'react-icons/fa';
const HomePage = () => {
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [searchBrand, setSearchBrand] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTransmission, setSelectedTransmission] = useState([]);
  const [selectedFuel, setSelectedFuel] = useState([]);
  const [cars, setCars] = useState([]); // State to store car data
  

  const brands = [
    "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Hyundai", "Kia",
    "Volkswagen", "BMW", "Buick", "Ram", "Mercedes", "Audi", "Lincoln"
  ];
  const transmissions = ["Manual", "Automatic"];
  const fuels = ["Petrol", "Diesel", "Electric"];

  // Set default start and end times
  useEffect(() => {
    const currentDateTime = new Date()
      .toLocaleString("sv-SE", { timeZone: "UTC" })
      .slice(0, 16);
    setStartTime(currentDateTime);
    setEndTime(currentDateTime);
  }, []);

  // Call the API when the component mounts (i.e., page is loaded)
  useEffect(() => {
    handleSearch(); // Call the handleSearch function to fetch the data initially
  }, []); // Empty dependency array means it runs only once when the component mounts

  const handleStartTimeChange = (newValue) => {
    setStartTime(newValue);
    const newEndTime = new Date(new Date(newValue).getTime() + 30 * 60000)
      .toLocaleString("sv-SE", { timeZone: "UTC" })
      .slice(0, 16);
    setEndTime(newEndTime);
  };

  const handleCheckboxChange = (type, value) => {
    const updateState = (prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value];

    if (type === "brand") setSelectedBrands(updateState);
    else if (type === "transmission") setSelectedTransmission(updateState);
    else if (type === "fuel") setSelectedFuel(updateState);
  };

  const handleClearFilters = () => {
    setSearchBrand("");
    setPriceRange({ min: "", max: "" });
    setSelectedBrands([]);
    setSelectedTransmission([]);
    setSelectedFuel([]);
  };

  const handlePriceChange = (type, value) => {
    setPriceRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSearch = async () => {
    const queryParams = new URLSearchParams();
    if (location) queryParams.append("location", location);
    if (priceRange.min) queryParams.append("minPrice", priceRange.min);
    if (priceRange.max) queryParams.append("maxPrice", priceRange.max);
    if (selectedBrands.length > 0) queryParams.append("companyName", selectedBrands.join(","));
    if (selectedTransmission.length > 0) queryParams.append("transmissionType", selectedTransmission.join(","));
    if (selectedFuel.length > 0) queryParams.append("fuelTypes", selectedFuel.join(","));
    if (startTime) queryParams.append("startTime", new Date(startTime).toISOString());
    if (endTime) queryParams.append("endTime", new Date(endTime).toISOString());
  
    const apiUrl = `http://localhost:8080/available?${queryParams.toString()}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCars(data); // Set fetched car data to state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Split brands for layout
  const leftBrands = brands.slice(0, 7);
  const rightBrands = brands.slice(7, 14);

  return (
    <div className="home-page-unique">
      {/* Filters Section */}
      <div className="filters-section-unique">
        <Filter
          location={location}
          setLocation={setLocation}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          handleStartTimeChange={handleStartTimeChange}
          handleSearch={handleSearch}
        />

        <div className="additional-filters-unique">
        <div className="price-range-container-unique" style={{ display: 'flex', flexDirection: 'column', marginRight: '160px' }}>
      <label style={{ marginBottom: '8px' }}>Price Range per Day</label>
      <div style={{ display: 'flex', gap: '15px' }}>
        
        {/* Min Price Button with Popup */}
        <PopupState variant="popover" popupId="min-price-popup">
          {(popupState) => (
            <>
     <Button 
  variant="contained" 
  {...bindTrigger(popupState)} 
  sx={{
    backgroundColor: 'white', 
    color: 'black !important', 
    border: '1px solid #ccc',
    boxShadow: 'none',  // Removes shadow
    padding: '8px 16px',  // Adjust padding for more space
    width: 'auto',  // Adjust width to fit content
    minWidth: '120px',  // Ensure minimum width for consistency
    textAlign: 'center',  // Center align text
    display: 'flex', // Aligns the icon and text in a row
    justifyContent: 'center', // Centers content horizontally
    alignItems: 'center' // Centers content vertically
  }}
>
  {priceRange.min ? `Rs. ${priceRange.min}` : "Min"}
  <FaCaretDown style={{ marginLeft: '8px' }} /> {/* Down arrow icon */}
</Button>


              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={() => { handlePriceChange("min", "1000"); popupState.close(); }}>Rs 1000</MenuItem>
                <MenuItem onClick={() => { handlePriceChange("min", "2000"); popupState.close(); }}>Rs 2000</MenuItem>
                <MenuItem onClick={() => { handlePriceChange("min", "3000"); popupState.close(); }}>Rs 3000</MenuItem>
                <MenuItem onClick={() => { handlePriceChange("min", "5000"); popupState.close(); }}>Rs 5000</MenuItem>
              </Menu>
            </>
          )}
        </PopupState>

        {/* Max Price Button with Popup */}
        <PopupState variant="popover" popupId="max-price-popup">
          {(popupState) => (
            <>
              <Button 
  variant="contained" 
  {...bindTrigger(popupState)} 
  sx={{
    backgroundColor: 'white', 
    color: 'black !important', 
    border: '1px solid #ccc',
    boxShadow: 'none',  // Removes shadow
    padding: '8px 16px',  // Adjust padding for more space
    width: 'auto',  // Adjust width to fit content
    minWidth: '120px',  // Ensure minimum width for consistency
    textAlign: 'center',  // Center align text
    display: 'flex', // Aligns the icon and text in a row
    justifyContent: 'center', // Centers content horizontally
    alignItems: 'center' // Centers content vertically
  }}
>
  {priceRange.max ? `Rs. ${priceRange.max}` : "Max"}
  <FaCaretDown style={{ marginLeft: '8px' }} /> {/* Down arrow icon */}
</Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={() => { handlePriceChange("max", "5000"); popupState.close(); }}>Rs 5000</MenuItem>
                <MenuItem onClick={() => { handlePriceChange("max", "7000"); popupState.close(); }}>Rs 7000</MenuItem>
                <MenuItem onClick={() => { handlePriceChange("max", "10000"); popupState.close(); }}>Rs 10000</MenuItem>
              </Menu>
            </>
          )}
        </PopupState>
      </div>
    </div>

          <div className="brands-container-unique">
            <div className="brands-column-unique">
              <label>Brands</label>
              {leftBrands.map((brand) => (
                <div key={brand}>
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleCheckboxChange("brand", brand)}
                  />
                  {brand}
                </div>
              ))}
            </div>
            <div className="brands-column-unique" style={{ marginTop: '20px' }}>
  {rightBrands.map((brand) => (
    <div key={brand}>
      <input
        type="checkbox"
        checked={selectedBrands.includes(brand)}
        onChange={() => handleCheckboxChange("brand", brand)}
      />
      {brand}
    </div>
  ))}
</div>

          </div>

          <div>
            <label>Transmission</label>
            {transmissions.map((type) => (
              <div key={type}>
                <input
                  type="checkbox"
                  checked={selectedTransmission.includes(type)}
                  onChange={() => handleCheckboxChange("transmission", type)}
                />
                {type}
              </div>
            ))}
          </div>

          <div>
            <label>Fuel</label>
            {fuels.map((type) => (
              <div key={type}>
                <input
                  type="checkbox"
                  checked={selectedFuel.includes(type)}
                  onChange={() => handleCheckboxChange("fuel", type)}
                />
                {type}
              </div>
            ))}
          </div>

          <button className="clear-filters-unique" onClick={handleClearFilters}>
            <FaTimesCircle /> Clear filter
          </button>
        </div>
      </div>

      {/* Car List */}
      <div className="car-list-unique">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            id={car.id}
            model={car.model}
            companyName={car.companyName}
            fuelType={car.fuelType}
            transmissionType={car.transmissionType}
            location={car.location}
            pricePerDay={car.pricePerDay}
            rating={car.rating}
            type={car.type}
            manufacturingYear={car.manufacturingYear}
            capacity={car.capacity}
            imagePath={car.imagePaths[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
