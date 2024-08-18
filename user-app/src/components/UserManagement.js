import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [busCompanies, setBusCompanies] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);
  const [form, setForm] = useState({
    name: '',
    username: '',
    companyName: '',
    gender: '',
    contactNumber: '',
    role: '',
    address: '',
    email: '',
    password: '',
  });

  const getUsers = () => {
    fetch("http://localhost:3000/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  };

  const getBusCompanies = () => {
    fetch("http://localhost:3000/bus-companies")
      .then(response => response.json())
      .then(data => setBusCompanies(data))
      .catch(error => console.error('Error fetching bus companies:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const url = userToEdit ? `http://localhost:3000/user/${userToEdit._id}` : "http://localhost:3000/add-user";
    const method = userToEdit ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then(response => response.text())
      .then(data => {
        console.log('Success:', data);
        getUsers();
        clearForm();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleDeleteUser = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      fetch(`http://localhost:3000/user/${id}`, {
        method: 'DELETE',
      })
        .then(response => response.text())
        .then(data => {
          console.log('Success:', data);
          getUsers();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setForm(user);
  };

  const clearForm = () => {
    setUserToEdit(null);
    setForm({
      name: '',
      username: '',
      companyName: '',
      gender: '',
      contactNumber: '',
      role: '',
      address: '',
      email: '',
      password: '',
    });
  };

  useEffect(() => {
    getUsers();
    getBusCompanies();
  }, []);

  return (
    <div className="container mt-5">
      <h1>User Management</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" name="username" value={form.username} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <select className="form-select" name="companyName" value={form.companyName} onChange={handleInputChange} required>
            <option value="">Select Company</option>
            {busCompanies.map((company) => (
              <option key={company._id} value={company.name}>{company.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select className="form-select" name="gender" value={form.gender} onChange={handleInputChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Number</label>
          <input type="text" className="form-control" name="contactNumber" value={form.contactNumber} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select className="form-select" name="role" value={form.role} onChange={handleInputChange} required>
            <option value="">Select Role</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Company Admin">Company Admin</option>
            <option value="Simple User">Simple User</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input type="text" className="form-control" name="address" value={form.address} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleInputChange} required />
        </div>
        <button type="submit" className="btn btn-primary">{userToEdit ? 'Update User' : 'Add User'}</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={clearForm}>Clear</button>
      </form>
      <div className="mt-4">
        <h2>Users</h2>
        <div className="row">
          {users.map((user, index) => (
            <div key={index} className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">{user.email}</p>
                  <div className='d-flex gap-2'>
                    <button className="btn btn-primary" onClick={() => handleEditUser(user)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
