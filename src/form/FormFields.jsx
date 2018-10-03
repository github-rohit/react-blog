import React from 'react';
import TinyMCEEditor from './TinyMCEEditor';
import { InputBox, Textarea } from './Input';

function FieldMarkup({
  name,
  label,
  helperText,
  error,
  type,
  classess = '',
  ...props
}) {
  return (
    <div className={`form-group ${error ? 'is-invalid' : ''}`}>
      <label htmlFor={name}>{label}</label>
      {(type === 'text' || type === 'email' || type === 'password') && (
        <InputBox
          className={`form-control ${classess} ${error ? 'is-invalid' : ''}`}
          type={type}
          name={name}
          {...props}
        />
      )}
      {type === 'textarea' && (
        <Textarea
          className={`form-control ${classess} ${error ? 'is-invalid' : ''}`}
          type={type}
          name={name}
          {...props}
        />
      )}
      {type === 'tinymce' && <TinyMCEEditor name={name} {...props} />}
      {error && <div className="invalid-feedback">{error}</div>}
      <span className="form-text">{helperText}</span>
    </div>
  );
}

export default FieldMarkup;
