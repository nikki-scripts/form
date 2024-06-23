import React, { useState } from 'react';

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: '',
    guestName: ''
  });

  const [errors, setErrors] = useState({});
  const [isGuestAttending, setIsGuestAttending] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'attendingWithGuest') {
      setIsGuestAttending(value === 'yes');
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age <= 0) {
      newErrors.age = 'Age must be greater than 0';
    }

    if (isGuestAttending && !formData.guestName) {
      newErrors.guestName = 'Guest Name is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(formData);
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Event Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={errors.age ? 'error' : ''}
            />
            {errors.age && <span className="error-message">{errors.age}</span>}
          </div>

          <div className="form-group">
            <label>Are you attending with a guest?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="attendingWithGuest"
                  value="yes"
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="attendingWithGuest"
                  value="no"
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>

          {isGuestAttending && (
            <div className="form-group">
              <label>Guest Name</label>
              <input
                type="text"
                name="guestName"
                value={formData.guestName}
                onChange={handleChange}
                className={errors.guestName ? 'error' : ''}
              />
              {errors.guestName && <span className="error-message">{errors.guestName}</span>}
            </div>
          )}

          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
      {submittedData && (
        <div className="submitted-data">
          <h2>Submitted Data</h2>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Age:</strong> {submittedData.age}</p>
          <p><strong>Attending with Guest:</strong> {submittedData.attendingWithGuest}</p>
          {submittedData.attendingWithGuest === 'yes' && (
            <p><strong>Guest Name:</strong> {submittedData.guestName}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EventRegistrationForm;
