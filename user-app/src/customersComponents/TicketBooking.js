import React, { useState, useRef, useEffect } from 'react';
import './TicketBooking.css';

const TicketBooking = ({ buses, routes }) => {
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedBus, setSelectedBus] = useState('');
  const [passengerName, setPassengerName] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookedSeats, setBookedSeats] = useState([]); // اضافه کردن حالت برای ذخیره صندلی‌های رزرو شده
  const ticketRef = useRef();

  useEffect(() => {
    if (selectedBus && selectedRoute) {
      fetchBookedSeats(); // دریافت صندلی‌های رزرو شده وقتی مسیر و اتوبوس انتخاب می‌شوند
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBus, selectedRoute]);

  const fetchBookedSeats = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tickets?busName=${selectedBus}&route=${selectedRoute}`);
      if (response.ok) {
        const tickets = await response.json();
        const seats = tickets.map(ticket => ticket.seatNumber);
        setBookedSeats(seats);
      } else {
        setBookedSeats([]);
      }
    } catch (error) {
      console.error('Error fetching booked seats:', error);
      setBookedSeats([]);
    }
  };

  const handleRouteChange = (e) => {
    setSelectedRoute(e.target.value);
    setSelectedBus('');
    setSeatNumber('');
    setBookingError('');
    setBookedSeats([]);
  };

  const handleBusChange = (e) => {
    setSelectedBus(e.target.value);
    setSeatNumber('');
    setBookingError('');
    setBookedSeats([]);
  };

  const handleSeatSelect = (seat) => {
    if (!bookedSeats.includes(seat)) {
      setSeatNumber(seat);
      setBookingError('');
    }
  };

  const handleBooking = async () => {
    if (selectedRoute && selectedBus && passengerName && seatNumber) {
      const bus = buses.find(b => b._id === selectedBus);
      const route = routes.find(r => r._id === selectedRoute);

      const ticketData = {
        passengerName,
        route: `${route.from} - ${route.to}`,
        busName: bus.name,
        seatNumber,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };

      try {
        const response = await fetch('http://localhost:3000/book-ticket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ticketData),
        });

        if (response.ok) {
          setBookingSuccess(true);
          setBookingError('');
          setTimeout(() => {
            printTicket();
            setSelectedRoute('');
            setSelectedBus('');
            setPassengerName('');
            setSeatNumber('');
            setBookedSeats([]);
            setTimeout(() => {
              setBookingSuccess(false);
            }, 3000);
          }, 1000);
        } else if (response.status === 400) {
          const result = await response.json();
          setBookingError(result.message);
        } else {
          setBookingError('Error booking ticket');
        }
      } catch (error) {
        setBookingError('Error booking ticket');
      }
    } else {
      alert('Please fill in all the fields.');
    }
  };

  const renderSeats = () => {
    if (!selectedBus) return null;

    const bus = buses.find(b => b._id === selectedBus);
    const totalSeats = bus ? bus.capicity : 0;

    const seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      seats.push(
        <div
          key={i}
          className={`seat ${seatNumber === i || bookedSeats.includes(i) ? 'selected' : ''}`}
          onClick={() => handleSeatSelect(i)}
        >
          {i}
        </div>
      );
    }

    return <div className="seats-container">{seats}</div>;
  };

  const printTicket = () => {
    const originalContent = document.body.innerHTML;
    const ticketContent = ticketRef.current.innerHTML;
    document.body.innerHTML = ticketContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <div className="container mt-5">
      <h2>Book Your Ticket</h2>
      <div className="form-group">
        <label htmlFor="routeSelect">Select Route</label>
        <select id="routeSelect" className="form-control" value={selectedRoute} onChange={handleRouteChange}>
          <option value="">Choose a route</option>
          {routes.map((route, index) => (
            <option key={index} value={route._id}>
              {route.from} - {route.to}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="busSelect">Select Bus</label>
        <select id="busSelect" className="form-control" value={selectedBus} onChange={handleBusChange}>
          <option value="">Choose a bus</option>
          {buses.map((bus, index) => (
            <option key={index} value={bus._id}>
              {bus.name} (Capacity: {bus.capicity})
            </option>
          ))}
        </select>
      </div>
      
      {selectedBus && (
        <div className="mt-3">
          <h5>Select a Seat:</h5>
          {renderSeats()}
        </div>
      )}

      <div className="form-group mt-3">
        <label htmlFor="passengerName">Passenger Name</label>
        <input
          type="text"
          id="passengerName"
          className="form-control"
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
        />
      </div>
      
      {bookingError && (
        <div className="alert alert-danger mt-3 text-center">
          {bookingError}
        </div>
      )}

      {bookingSuccess && (
        <div className="alert alert-success mt-3 text-center">
          Booking Successful!
        </div>
      )}
      
      <button className="btn btn-primary mt-3" onClick={handleBooking}>
        Book Ticket
      </button>

      {/* Hidden Ticket Template for Printing */}
      <div style={{ display: 'none' }} ref={ticketRef}>
        <h2>Ticket</h2>
        <p><strong>Passenger Name:</strong> {passengerName}</p>
        <p><strong>Route:</strong> {routes.find(route => route._id === selectedRoute)?.from} - {routes.find(route => route._id === selectedRoute)?.to}</p>
        <p><strong>Bus:</strong> {buses.find(bus => bus._id === selectedBus)?.name}</p>
        <p><strong>Seat Number:</strong> {seatNumber}</p>
        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default TicketBooking;
