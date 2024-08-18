import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './CustomerView.css';

const CustomerView = () => {
  const [busCompanies, setBusCompanies] = useState([]);

  const getBusCompanies = () => {
    fetch("http://localhost:3000/bus-companies")
      .then(response => response.json())
      .then(data => setBusCompanies(data))
      .catch(error => console.error('Error fetching bus companies:', error));
  };

  useEffect(() => {
    getBusCompanies();
    const carouselElement = document.getElementById('busCompaniesCarousel');

    const handleSlide = () => {
      // Apply your style changes here
      const activeItem = document.querySelector('.carousel-item.active .card');
      if (activeItem) {
        activeItem.style.backgroundColor = 'lightblue'; // Example: Change background color
        // Add other style changes as needed
      }
    };

    carouselElement.addEventListener('slid.bs.carousel', handleSlide);

    // Initial call to handleSlide to style the first active item
    handleSlide();

    return () => {
      carouselElement.removeEventListener('slid.bs.carousel', handleSlide);
    };
  }, []);

  return (
    <div className="container mt-5">
      <h1>Available Bus Companies</h1>
      <div id="busCompaniesCarousel" className="carousel slide mt-4" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="false">
        <div className="carousel-inner">
          {busCompanies.map((company, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="card mb-4">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title">{company.name}</h5>
                    <p className="card-text">{company.location}</p>
                  </div>
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="company-logo"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <a className="carousel-control-prev" href="#busCompaniesCarousel" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#busCompaniesCarousel" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a> */}
      </div>
    </div>
  );
};

export default CustomerView;
