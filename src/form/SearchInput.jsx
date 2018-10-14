import React from 'react';

function SearchInput({ value, onKeyPress }) {
  return (
    <input
      value={value}
      type="serach"
      className="serach-input"
      placeholder="Search a post"
      onKeyPress={onKeyPress}
    />
  );
}

export default SearchInput;
