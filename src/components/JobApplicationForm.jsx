import React, { useState } from 'react';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    additionalSkills: [],
    interviewTime: '',
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const newSkills = checked
        ? [...formData.additionalSkills, value]
        : formData.additionalSkills.filter((skill) => skill !== value);
      setFormData({
        ...formData,
        additionalSkills: newSkills,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number';
    }
    if ((formData.position === 'Developer' || formData.position === 'Designer') && !formData.relevantExperience) {
      newErrors.relevantExperience = 'Relevant Experience is required';
    } else if ((formData.position === 'Developer' || formData.position === 'Designer') && formData.relevantExperience <= 0) {
      newErrors.relevantExperience = 'Relevant Experience must be greater than 0';
    }
    if (formData.position === 'Designer' && !formData.portfolioUrl) {
      newErrors.portfolioUrl = 'Portfolio URL is required';
    } else if (formData.position === 'Designer' && !/^https?:\/\/\S+$/.test(formData.portfolioUrl)) {
      newErrors.portfolioUrl = 'Invalid URL';
    }
    if (formData.position === 'Manager' && !formData.managementExperience) {
      newErrors.managementExperience = 'Management Experience is required';
    }
    if (formData.additionalSkills.length === 0) {
      newErrors.additionalSkills = 'At least one skill must be selected';
    }
    if (!formData.interviewTime) {
      newErrors.interviewTime = 'Preferred Interview Time is required';
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
        <h2>Job Application Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
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
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? 'error' : ''}
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>

          <div className="form-group">
            <label>Applying for Position</label>
            <select name="position" value={formData.position} onChange={handleChange}>
              <option value="">Select a position</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          {(formData.position === 'Developer' || formData.position === 'Designer') && (
            <div className="form-group">
              <label>Relevant Experience (years)</label>
              <input
                type="number"
                name="relevantExperience"
                value={formData.relevantExperience}
                onChange={handleChange}
                className={errors.relevantExperience ? 'error' : ''}
              />
              {errors.relevantExperience && <span className="error-message">{errors.relevantExperience}</span>}
            </div>
          )}

          {formData.position === 'Designer' && (
            <div className="form-group">
              <label>Portfolio URL</label>
              <input
                type="text"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleChange}
                className={errors.portfolioUrl ? 'error' : ''}
              />
              {errors.portfolioUrl && <span className="error-message">{errors.portfolioUrl}</span>}
            </div>
          )}

          {formData.position === 'Manager' && (
            <div className="form-group">
              <label>Management Experience</label>
              <textarea
                name="managementExperience"
                value={formData.managementExperience}
                onChange={handleChange}
                className={errors.managementExperience ? 'error' : ''}
              />
              {errors.managementExperience && <span className="error-message">{errors.managementExperience}</span>}
            </div>
          )}

          <div className="form-group">
            <label>Additional Skills</label>
            <div className="checkbox-group">
              {['JavaScript', 'CSS', 'Python', 'React', 'Node.js'].map((skill) => (
                <label key={skill}>
                  <input
                    type="checkbox"
                    name="additionalSkills"
                    value={skill}
                    checked={formData.additionalSkills.includes(skill)}
                    onChange={handleChange}
                  />
                  {skill}
                </label>
              ))}
            </div>
            {errors.additionalSkills && <span className="error-message">{errors.additionalSkills}</span>}
          </div>

          <div className="form-group">
            <label>Preferred Interview Time</label>
            <input
              type="datetime-local"
              name="interviewTime"
              value={formData.interviewTime}
              onChange={handleChange}
              className={errors.interviewTime ? 'error' : ''}
            />
            {errors.interviewTime && <span className="error-message">{errors.interviewTime}</span>}
          </div>

          <button type="submit" className="submit-button">Submit Application</button>
        </form>
      </div>
      {submittedData && (
        <div className="submitted-data">
          <h2>Submitted Data</h2>
          <p><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
          <p><strong>Applying for Position:</strong> {submittedData.position}</p>
          {(submittedData.position === 'Developer' || submittedData.position === 'Designer') && (
            <p><strong>Relevant Experience:</strong> {submittedData.relevantExperience} years</p>
          )}
          {submittedData.position === 'Designer' && (
            <p><strong>Portfolio URL:</strong> {submittedData.portfolioUrl}</p>
          )}
          {submittedData.position === 'Manager' && (
            <p><strong>Management Experience:</strong> {submittedData.managementExperience}</p>
          )}
          <p><strong>Additional Skills:</strong> {submittedData.additionalSkills.join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {submittedData.interviewTime}</p>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
