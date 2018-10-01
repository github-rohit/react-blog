import React from 'react';
import InputBox from './Input';

function FieldMarkup({ name, label, helperText, error, type, ...props }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {(type === 'text' || type === 'email' || type === 'password') && (
        <InputBox
          className={`form-control ${error ? 'is-invalid' : ''}`}
          type={type}
          name={name}
          {...props}
        />
      )}
      {error && <div className="invalid-feedback">{error}</div>}
      <span className="form-text">{helperText}</span>
    </div>
  );
}

export default FieldMarkup;
