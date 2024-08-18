// AddRouteForm.js
import React, { useState, useEffect } from 'react';

const AddRouteForm = ({ onRouteAdded, routeToEdit, clearEdit }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [busname, setBusname] = useState('');
  const [image, setImage] = useState('');
  const [busNames, setBusNames] = useState([]);

  useEffect(() => {
    if (routeToEdit) {
      setFrom(routeToEdit.from);
      setTo(routeToEdit.to);
      setDuration(routeToEdit.duration);
      setDate(routeToEdit.date.split('T')[0]); // برای تنظیم مقدار تاریخ به فرمت درست
      setTime(routeToEdit.time);
      setBusname(routeToEdit.busname);
      setImage(routeToEdit.image);
    } else {
      clearForm();
    }
  }, [routeToEdit]);

  const fetchBusNames = async () => {
    try {
      const response = await fetch('http://localhost:3000/bus-names');
      const data = await response.json();
      setBusNames(data);
    } catch (error) {
      console.error('Error fetching bus names:', error);
    }
  };

  useEffect(() => {
    fetchBusNames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = routeToEdit ? 'PUT' : 'POST';
      const endpoint = routeToEdit ? `http://localhost:3000/route/${routeToEdit._id}` : 'http://localhost:3000/add-route';
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from, to, duration, date, time, busname, image }),
      });
      if (response.ok) {
        clearForm();
        onRouteAdded();
        if (routeToEdit) {
          clearEdit();
        }
      } else {
        console.error('Error adding/updating route');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const clearForm = () => {
    setFrom('');
    setTo('');
    setDuration('');
    setDate('');
    setTime('');
    setBusname('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="from">From</label>
        <input
          type="text"
          className="form-control"
          id="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
          placeholder="Enter the starting point"
        />
      </div>
      <div className="form-group">
        <label htmlFor="to">To</label>
        <input
          type="text"
          className="form-control"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
          placeholder="Enter the destination"
        />
      </div>
      <div className="form-group">
        <label htmlFor="duration">Duration</label>
        <input
          type="text"
          className="form-control"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          placeholder="Enter the duration"
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          className="form-control"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="time">Time</label>
        <input
          type="time"
          className="form-control"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="busname">Bus Name</label>
        <select
          className="form-control"
          id="busname"
          value={busname}
          onChange={(e) => setBusname(e.target.value)}
          required
        >
          <option value="">Select a bus</option>
          {busNames.map(bus => (
            <option key={bus._id} value={bus.name}>
              {bus.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="text"
          className="form-control"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3 mb-3">{routeToEdit ? 'Update Route' : 'Add Route'}</button>
    </form>
  );
};

export default AddRouteForm;
