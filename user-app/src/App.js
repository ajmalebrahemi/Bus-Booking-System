import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import $ from 'jquery';
import 'datatables.net';
import AddBusCompanyForm from './components/AddBusCompanyForm';
import AddBusForm from './components/AddBusForm';
import AddRouteForm from './components/AddRouteForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import CustomerView from './customersComponents/CustomerView';
import SearchRoutes from './customersComponents/SearchRoutes';
import TopRoutes from './customersComponents/TopRoutes';
import FAQForm from './components/FAQForm';
import FAQAccordion from './components/FAQAccordion';
import LoginForm from './components/LoginForm';
import UserManagement from './components/UserManagement';
import TicketBooking from './customersComponents/TicketBooking'; // Import the TicketBooking component

const App = () => {
  const [busCompanies, setBusCompanies] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [faqs, setFAQs] = useState([]);
  const [busCompanyToEdit, setBusCompanyToEdit] = useState(null);
  const [busToEdit, setBusToEdit] = useState(null);
  const [routeToEdit, setRouteToEdit] = useState(null);
  const [faqToEdit, setFAQToEdit] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    getBusCompanies();
    getBuses();
    getRoutes();
    getFAQs();
  }, []);

  useEffect(() => {
    // Initialize DataTable after data is loaded
    if (busCompanies.length > 0) {
      $('#busCompaniesTable').DataTable();
    }
    if (buses.length > 0) {
      $('#busesTable').DataTable();
    }
    if (routes.length > 0) {
      $('#routesTable').DataTable();
    }
  }, [busCompanies, buses, routes]);

  const getBusCompanies = () => {
    fetch("http://localhost:3000/bus-companies")
      .then(response => response.json())
      .then(data => setBusCompanies(data))
      .catch(error => console.error('Error fetching bus companies:', error));
  };

  const getBuses = () => {
    fetch("http://localhost:3000/buses")
      .then(response => response.json())
      .then(data => setBuses(data))
      .catch(error => console.error('Error fetching buses:', error));
  };

  const getRoutes = () => {
    fetch("http://localhost:3000/routes")
      .then(response => response.json())
      .then(data => setRoutes(data))
      .catch(error => console.error('Error fetching routes:', error));
  };

  const getFAQs = () => {
    fetch("http://localhost:3000/faqs")
      .then(response => response.json())
      .then(data => setFAQs(data))
      .catch(error => console.error('Error fetching FAQs:', error));
  };

  const deleteBusCompany = (id) => {
    fetch(`http://localhost:3000/bus-company/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.text())
      .then(data => {
        console.log('Success:', data);
        getBusCompanies();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const deleteBus = (id) => {
    fetch(`http://localhost:3000/bus/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.text())
      .then(data => {
        console.log('Success:', data);
        getBuses();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const deleteRoute = (id) => {
    fetch(`http://localhost:3000/route/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.text())
      .then(data => {
        console.log('Success:', data);
        getRoutes();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const deleteFAQ = (id) => {
    fetch(`http://localhost:3000/faq/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.text())
      .then(data => {
        console.log('Success:', data);
        getFAQs();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const editBusCompany = (company) => {
    setBusCompanyToEdit(company);
  };

  const editBus = (bus) => {
    setBusToEdit(bus);
  };

  const editRoute = (route) => {
    setRouteToEdit(route);
  };

  const editFAQ = (faq) => {
    setFAQToEdit(faq);
  };

  const clearEdit = () => {
    setBusCompanyToEdit(null);
    setBusToEdit(null);
    setRouteToEdit(null);
    setFAQToEdit(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const logout = () => {
    setLoggedInUser(null);
  };

  return (
    <>
      <Navbar loggedInUser={loggedInUser} logout={logout} />
      <div id='home'>
        <img src="http://www.coachrental.it/wp-content/themes/yootheme/cache/noleggio-bus-56-posti-milano-a1b596ac.jpeg" className="img-fluid" alt="img" />
        <div className="content">
          <h3 className="headingOne">KabulBus</h3>
          <p className="slidParagraph">
            Kabul bus is the first bus booking software system<br /> around Afghanistan and have very suitable <br /> facility for your journey and booking ticket.
          </p>
        </div>
      </div>
      <div id='login' className="container mt-5">
        <h1>Register</h1>
        <UserManagement />
      </div>
      <div id='buscompanies' className="container mt-5">
        <h1>Bus Companies</h1>
        <AddBusCompanyForm
          onBusCompanyAdded={getBusCompanies}
          busCompanyToEdit={busCompanyToEdit}
          clearEdit={clearEdit}
        />
        <table id="busCompaniesTable" className="table table-striped ">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {busCompanies.map((company, index) => (
              <tr key={index}>
                <td>{company.name}</td>
                <td>{company.location}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2" onClick={() => editBusCompany(company)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteBusCompany(company._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id='buses' className="container mt-5">
        <h1>Buses</h1>
        <AddBusForm onBusAdded={getBuses} busToEdit={busToEdit} clearEdit={clearEdit} />
        <table id="busesTable" className="table table-striped ">
          <thead>
            <tr>
              <th>Bus ID Num</th>
              <th>Capicity</th>
              <th>Bus Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus, index) => (
              <tr key={index}>
                <td>{bus.name}</td>
                <td>{bus.capicity}</td>
                <td>{bus.buscompany}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2" onClick={() => editBus(bus)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteBus(bus._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <img src="https://wallpapercave.com/wp/wp10821578.jpg" className="img-fluid" alt="img" />
      </div>
      <div id='routes' className="container mt-5">
        <h1>Routes</h1>
        <AddRouteForm onRouteAdded={getRoutes} routeToEdit={routeToEdit} clearEdit={clearEdit} />
        <table id="routesTable" className="table table-striped ">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Time</th>
              <th>Bus Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route, index) => (
              <tr key={index}>
                <td>{route.from}</td>
                <td>{route.to}</td>
                <td>{route.duration}</td>
                <td>{formatDate(route.date)}</td>
                <td>{route.time}</td>
                <td>{route.busname}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2" onClick={() => editRoute(route)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteRoute(route._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container mt-5">
        <TopRoutes />
      </div>
      <div className="container mt-5">
        <SearchRoutes />
      </div>
      <div id='ticketBooking' className="container mt-5">
        <h1>Book Tickets</h1>
        <TicketBooking buses={buses} routes={routes} />
      </div>
      <div id='faqs' className="container mt-5">
        <h1>FAQs</h1>
        <FAQForm onFAQAdded={getFAQs} faqToEdit={faqToEdit} clearEdit={clearEdit} />
        <FAQAccordion faqs={faqs} editFAQ={editFAQ} deleteFAQ={deleteFAQ} />
      </div>
      <div>
        <CustomerView />
        <hr />
      </div>
      <Footer />
      <LoginForm setLoggedInUser={setLoggedInUser} />
    </>
  );
};

export default App;
