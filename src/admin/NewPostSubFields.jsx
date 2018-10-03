import React from 'react';
import { InputBox } from '../form/Input';

function NewPostSubFields({ Fields, onChange, otherData }) {
  return (
    <React.Fragment>
      <div className="sub-field-container">
        {Fields.map(field => (
          <div className="form-group-sub" key={field.name}>
            <label>{field.label}</label>
            <InputBox
              className="form-control"
              onChange={onChange}
              value={otherData[field.name]}
              {...field}
            />
            {field.name === 'image' &&
              otherData[field.name] && (
                <img
                  src={otherData[field.name]}
                  alt={otherData[field.name]}
                  className="img-thumbnail"
                />
              )}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default NewPostSubFields;
