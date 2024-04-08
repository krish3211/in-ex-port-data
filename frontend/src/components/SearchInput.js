import React from 'react';

const SearchInput = ({ searchText, onSearchTextChange }) => (
  <input
    type="text"
    placeholder="Search Inventory"
    value={searchText}
    onChange={onSearchTextChange}
  />
);

export default SearchInput;
