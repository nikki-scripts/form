import React, { useState } from 'react';
// import './SurveyForm.css';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    techSection: {
      favoriteLanguage: '',
      yearsExperience: '',
    },
    healthSection: {
      exerciseFrequency: '',
      dietPreference: '',
    },
    educationSection: {
      highestQualification: '',
      fieldOfStudy: '',
    },
    feedback: '',
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTechSectionChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      techSection: {
        ...formData.techSection,
        [name]: value,
      },
    });
  };

  const handleHealthSectionChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      healthSection: {
        ...formData.healthSection,
        [name]: value,
      },
    });
  };

  const handleEducationSectionChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      educationSection: {
        ...formData.educationSection,
        [name]: value,
      },
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.surveyTopic.trim()) {
      newErrors.surveyTopic = 'Survey Topic is required';
    }

    if (formData.surveyTopic === 'Technology') {
      if (!formData.techSection.favoriteLanguage.trim()) {
        newErrors.favoriteLanguage = 'Favorite Programming Language is required';
      }
      if (!formData.techSection.yearsExperience.trim() || formData.techSection.yearsExperience <= 0) {
        newErrors.yearsExperience = 'Years of Experience must be a positive number';
      }
    } else if (formData.surveyTopic === 'Health') {
      if (!formData.healthSection.exerciseFrequency.trim()) {
        newErrors.exerciseFrequency = 'Exercise Frequency is required';
      }
      if (!formData.healthSection.dietPreference.trim()) {
        newErrors.dietPreference = 'Diet Preference is required';
      }
    } else if (formData.surveyTopic === 'Education') {
      if (!formData.educationSection.highestQualification.trim()) {
        newErrors.highestQualification = 'Highest Qualification is required';
      }
      if (!formData.educationSection.fieldOfStudy.trim()) {
        newErrors.fieldOfStudy = 'Field of Study is required';
      }
    }

    if (!formData.feedback.trim() || formData.feedback.trim().length < 50) {
      newErrors.feedback = 'Feedback is required and must be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Mock submission - Replace with actual API call to submit data
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
          setSubmittedData(data);
        } else {
          throw new Error('Failed to submit form');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div className="background">
      <div className="container">
        <div className="form-card">
          <h2>Survey Form</h2>
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
              <label>Survey Topic</label>
              <select
                name="surveyTopic"
                value={formData.surveyTopic}
                onChange={handleChange}
                className={errors.surveyTopic ? 'error' : ''}
              >
                <option value="">Select a topic</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
              </select>
              {errors.surveyTopic && <span className="error-message">{errors.surveyTopic}</span>}
            </div>

            {formData.surveyTopic === 'Technology' && (
              <div className="form-group">
                <label>Favorite Programming Language</label>
                <select
                  name="favoriteLanguage"
                  value={formData.techSection.favoriteLanguage}
                  onChange={handleTechSectionChange}
                  className={errors.favoriteLanguage ? 'error' : ''}
                >
                  <option value="">Select a language</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                </select>
                {errors.favoriteLanguage && (
                  <span className="error-message">{errors.favoriteLanguage}</span>
                )}

                <label>Years of Experience</label>
                <input
                  type="number"
                  name="yearsExperience"
                  value={formData.techSection.yearsExperience}
                  onChange={handleTechSectionChange}
                  className={errors.yearsExperience ? 'error' : ''}
                />
                {errors.yearsExperience && (
                  <span className="error-message">{errors.yearsExperience}</span>
                )}
              </div>
            )}

            {formData.surveyTopic === 'Health' && (
              <div className="form-group">
                <label>Exercise Frequency</label>
                <select
                  name="exerciseFrequency"
                  value={formData.healthSection.exerciseFrequency}
                  onChange={handleHealthSectionChange}
                  className={errors.exerciseFrequency ? 'error' : ''}
                >
                  <option value="">Select frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Rarely">Rarely</option>
                </select>
                {errors.exerciseFrequency && (
                  <span className="error-message">{errors.exerciseFrequency}</span>
                )}

                <label>Diet Preference</label>
                <select
                  name="dietPreference"
                  value={formData.healthSection.dietPreference}
                  onChange={handleHealthSectionChange}
                  className={errors.dietPreference ? 'error' : ''}
                >
                  <option value="">Select preference</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
                {errors.dietPreference && (
                  <span className="error-message">{errors.dietPreference}</span>
                )}
              </div>
            )}

            {formData.surveyTopic === 'Education' && (
              <div className="form-group">
                <label>Highest Qualification</label>
                <select
                  name="highestQualification"
                  value={formData.educationSection.highestQualification}
                  onChange={handleEducationSectionChange}
                  className={errors.highestQualification ? 'error' : ''}
                >
                  <option value="">Select qualification</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
                {errors.highestQualification && (
                  <span className="error-message">{errors.highestQualification}</span>
                )}

                <label>Field of Study</label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={formData.educationSection.fieldOfStudy}
                  onChange={handleEducationSectionChange}
                  className={errors.fieldOfStudy ? 'error' : ''}
                />
                {errors.fieldOfStudy && (
                  <span className="error-message">{errors.fieldOfStudy}</span>
                )}
              </div>
            )}

            <div className="form-group">
              <label>Feedback (at least 50 characters)</label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                className={errors.feedback ? 'error' : ''}
              />
              {errors.feedback && <span className="error-message">{errors.feedback}</span>}
            </div>

            <button type="submit" className="submit-button">
              Submit Survey
            </button>
          </form>
        </div>

        {submittedData && (
          <div className="submitted-data">
            <h2>Submitted Data</h2>
            <p>
              <strong>Full Name:</strong> {submittedData.fullName}
            </p>
            <p>
              <strong>Email:</strong> {submittedData.email}
            </p>
            <p>
              <strong>Survey Topic:</strong> {submittedData.surveyTopic}
            </p>
            {formData.surveyTopic === 'Technology' && (
              <div>
                <p>
                  <strong>Favorite Programming Language:</strong>{' '}
                  {submittedData.techSection.favoriteLanguage}
                </p>
                <p>
                  <strong>Years of Experience:</strong>{' '}
                  {submittedData.techSection.yearsExperience}
                </p>
              </div>
            )}
            {formData.surveyTopic === 'Health' && (
              <div>
                <p>
                  <strong>Exercise Frequency:</strong>{' '}
                  {submittedData.healthSection.exerciseFrequency}
                </p>
                <p>
                  <strong>Diet Preference:</strong>{' '}
                  {submittedData.healthSection.dietPreference}
                </p>
              </div>
            )}
            {formData.surveyTopic === 'Education' && (
              <div>
                <p>
                  <strong>Highest Qualification:</strong>{' '}
                  {submittedData.educationSection.highestQualification}
                </p>
                <p>
                  <strong>Field of Study:</strong>{' '}
                  {submittedData.educationSection.fieldOfStudy}
                </p>
              </div>
            )}
            <p>
              <strong>Feedback:</strong> {submittedData.feedback}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyForm;
