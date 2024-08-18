import React, { useEffect, useState } from 'react';
import '../App.css';

const AddBusForm = ({ onBusAdded, busToEdit, clearEdit }) => {
  const [name, setName] = useState('');
  const [capicity, setCapicity] = useState('');
  const [buscompany, setBuscompany] = useState('');
  const [busCompanies, setBusCompanies] = useState([]);

  useEffect(() => {
    const fetchBusCompanies = async () => {
      try {
        const response = await fetch('http://localhost:3000/bus-companies');
        const data = await response.json();
        setBusCompanies(data);
      } catch (error) {
        console.error('Error fetching bus companies:', error);
      }
    };

    fetchBusCompanies();
  }, []);

  useEffect(() => {
    if (busToEdit) {
      setName(busToEdit.name);
      setCapicity(busToEdit.capicity);
      setBuscompany(busToEdit.buscompany);
    }
  }, [busToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = busToEdit ? 'PUT' : 'POST';
      const url = busToEdit
        ? `http://localhost:3000/bus/${busToEdit._id}`
        : 'http://localhost:3000/add-bus';
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, buscompany, capicity: Number(capicity) }),
      });
      if (response.ok) {
        setName('');
        setCapicity('');
        setBuscompany('');
        onBusAdded();
        if (busToEdit) clearEdit();
      } else {
        console.error('Error adding/updating bus');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Bus</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter bus number"
        />
      </div>
      <div className="form-group">
        <label htmlFor="buscompany">Bus Company</label>
        <select
          className="form-control"
          id="buscompany"
          value={buscompany}
          onChange={(e) => setBuscompany(e.target.value)}
          required
        >
          <option value="">Select a bus company</option>
          {busCompanies.map((company) => (
            <option key={company._id} value={company.name}>
              {company.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="capicity">Capacity</label>
        <input
          type="number"
          className="form-control"
          id="capicity"
          value={capicity}
          onChange={(e) => setCapicity(e.target.value)}
          required
          placeholder="Enter bus capacity"
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3 mb-3">
        {busToEdit ? 'Update Bus' : 'Add Bus'}
      </button>
    </form>
  );
};

export default AddBusForm;
