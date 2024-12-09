import React from "react";

const SearchBar = ({ search, onSearchChange }) => {
  return (
    <div className="input-group mb-4">
      <span className="input-group-text bg-primary text-white" id="search-icon">
        🔍
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Search by Name or PID"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search"
        aria-describedby="search-icon"
      />
    </div>
  );
};

export default SearchBar;
