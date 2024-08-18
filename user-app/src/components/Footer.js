import React from 'react'

const Footer = () => {
  return (
    <div>
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>Kabul bus is the first bus booking software system around Afghanistan and have very suitable facility for your journey and booking ticket.</p>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: ajmalebrahemi2020@gmail.com</li>
              <li>Phone: +93784969899</li>
              <li>Address: 1 Street Baraki, Kabul, Afghanistan</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="https://www.facebook.com" className="text-white">Facebook</a></li>
              <li><a href="https://www.facebook.com" className="text-white">Twitter</a></li>
              <li><a href="https://www.facebook.com" className="text-white">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>&copy; 2024 KabulBus. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer