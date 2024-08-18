// src/components/AddBusCompanyForm.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../useTranslation';

const AddBusCompanyForm = ({ onBusCompanyAdded, busCompanyToEdit, clearEdit }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [logo, setLogo] = useState('');

  useEffect(() => {
    if (busCompanyToEdit) {
      setName(busCompanyToEdit.name);
      setLocation(busCompanyToEdit.location);
      setLogo(busCompanyToEdit.logo);
    }
  }, [busCompanyToEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const busCompany = { name, location, logo };

    const url = busCompanyToEdit 
      ? `http://localhost:3000/bus-company/${busCompanyToEdit._id}`
      : "http://localhost:3000/add-bus-company";

    const method = busCompanyToEdit ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(busCompany),
    })
    .then(response => response.text())
    .then(data => {
      console.log('Success:', data);
      onBusCompanyAdded(); // Refresh the bus companies list
      setName('');
      setLocation('');
      setLogo('');
      clearEdit();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <form className='bg-gray' onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">{t('busCompanies')}</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder={t('enterCompanyName')}
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">{t('location')}</label>
        <input
          type="text"
          className="form-control"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          placeholder={t('enterLocation')}
        />
      </div>
      <div className="form-group">
        <label htmlFor="logo">{t('logo')}</label>
        <input
          type="text"
          className="form-control"
          id="logo"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          required
          placeholder={t('enterLogo')}
        />
      </div>

      <button type="submit" className="btn btn-primary mt-3 mb-3">
        {busCompanyToEdit ? t('updateBusCompany') : t('addBusCompany')}
      </button>
    </form>
  );
}

export default AddBusCompanyForm;
