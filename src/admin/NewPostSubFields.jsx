import React from 'react';
import { InputBox, Select } from '../form/Input';

function NewPostSubFields({ Fields, onChange, otherData }) {
  return (
    <React.Fragment>
      <div className="sub-field-container">
        {Fields.map(field => (
          <div className="form-group-sub" key={field.name}>
            <label>{field.label}</label>
            {field.type === 'select' ? (
              <Select
                className="form-control"
                onChange={onChange}
                value={otherData[field.name]}
                {...field}
              />
            ) : (
              <InputBox
                className="form-control"
                onChange={onChange}
                value={otherData[field.name]}
                {...field}
              />
            )}

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
