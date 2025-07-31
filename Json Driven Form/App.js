// data for form rendering
import DATA from './data.js';
import React, { useState } from 'react';

export default function App() {
  const { form } = DATA;
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const currentStep = form.steps[stepIndex];

  const validateField = (field, value) => {
    const rules = field.validation || {};
    if (field.required && !value) return 'This field is required';
    if (rules.pattern && !new RegExp(rules.pattern).test(value)) return rules.message;
    if (rules.minLength && value.length < rules.minLength) return rules.message;
    return null;
  };

  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
    const field = currentStep.fields.find(f => f.id === id);
    setErrors({ ...errors, [id]: validateField(field, value) });
  };

  const handleNext = () => {
    const newErrors = {};
    currentStep.fields.forEach(field => {
      const value = formData[field.id] || '';
      const error = validateField(field, value);
      if (error) newErrors[field.id] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (currentStep.navigation.next.isSubmit) {
      console.log('Submitted Data:', formData);
    } else {
      setStepIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setStepIndex(prev => prev - 1);
  };

  return (
    <div className="form-wizard">
      <h1>{form.title}</h1>
      <div className="step-indicator">
        {form.steps.map((step, index) => (
          <div className='parent-step' key={step.id}>
            <div className={`step1 ${index === stepIndex ? 'active1' : ''}`}>{'😊'} </div>
            <span>{step.title}</span>

          </div>
        ))}
        <div className="line1"></div>
        <div style={{ width: stepIndex === 1 ? '40%' : stepIndex === 2 ? '80%' : '0%' }} className="line2"></div>
      </div>

      <div className="form-step">
        {currentStep.fields.map(field => (
          <div key={field.id} className="form-field">
            <label>{field.label}</label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id] || ''}
              onChange={e => handleChange(field.id, e.target.value)}
            />
            {errors[field.id] && <p className="error">{errors[field.id]}</p>}
          </div>
        ))}
      </div>

      <div className="navigation">
        {currentStep.navigation.previous.enabled && (
          <button onClick={handlePrevious}>{currentStep.navigation.previous.label}</button>
        )}
        {currentStep.navigation.next.enabled && (
          <button onClick={handleNext}>{currentStep.navigation.next.label}</button>
        )}
      </div>
    </div>
  );
};