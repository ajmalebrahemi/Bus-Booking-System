// src/components/TopRoutes.js
import React, { useEffect, useState } from 'react';
import './TopRoute.css'


const TopRoutes = () => {
  const [topRoutes, setTopRoutes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/top-routes")
      .then(response => response.json())
      .then(data => setTopRoutes(data))
      .catch(error => console.error('Error fetching top routes:', error));
  }, []);


  return (
    <div className="container mt-5">
      <h1>Top Routes</h1>
      <div className="row g-4 mt-4">
        {topRoutes.map((route, index) => (
          <div key={index} className="col-md-4">
            <div className="card  mb-4 topRoute">
              <img
                src={route.image} // Use the image field from the route data
                className="card-img-top topRoute1"
                alt={`${route.from} to ${route.to}`}
              />
              <div className="card-body topRoute2">
                <p>Buses from</p>
                <h5 className="card-title"> {route.from} to {route.to}</h5>
              
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRoutes;
