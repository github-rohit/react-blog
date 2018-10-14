import React from 'react';

export function InputBox(props) {
  return <input {...props} />;
}

export function Textarea(props) {
  return <textarea {...props} />;
}

export function Select({ options, ...props }) {
  return (
    <select {...props}>
      <option />
      {options.map(({ _id, category }) => (
        <option key={_id} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
