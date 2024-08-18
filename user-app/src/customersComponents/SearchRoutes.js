import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchRoutes = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(''); // New state for date
  const [routes, setRoutes] = useState([]);

  const handleBooking = (routeId) => {
    // Implement the booking logic here
    console.log(`Booking route with id: ${routeId}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/search-routes?from=${from}&to=${to}&date=${date}`)
      .then(response => response.json())
      .then(data => setRoutes(data))
      .catch(error => console.error('Error fetching routes:', error));
  };

  return (
    <div className="container mt-5">
      <h1>Search Routes</h1>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="from">From:</label>
          <input
            type="text"
            className="form-control"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Enter starting location"
          />
        </div>
        <div className="form-group">
          <label htmlFor="to">To:</label>
          <input
            type="text"
            className="form-control"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Enter destination"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)} // Update date state
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Search</button>
      </form>
      <div className="row mt-4">
        {routes.map((route, index) => (
          <div key={index} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{route.from} to {route.to}</h5>
                <p className="card-text">Duration: {route.duration}</p>
                <p className="card-text">Date: {new Date(route.date).toLocaleDateString()}</p>
                <p className="card-text">Time: {route.time}</p>
                <p className="card-text">BusCompany: {route.buscompany}</p>
                <p className="card-text">Bus: {route.busname}</p>
                <button className="btn btn-primary" onClick={() => handleBooking(route._id)}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchRoutes;
