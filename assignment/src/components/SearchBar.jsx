import React, { useState, useEffect } from 'react';
import './SearchBar.css';

// Simple Search Component with Debounce
function SearchBar({ searchTerm, onSearchChange }) {
  const [inputValue, setInputValue] = useState(searchTerm);

  // Debounce: Wait 500ms after user stops typing before filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(inputValue);
    }, 500);

    // Cleanup: Cancel timer if user types again before 500ms
    return () => clearTimeout(timer);
  }, [inputValue, onSearchChange]);

  // Clear search and reset
  const handleClear = () => {
    setInputValue('');
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="🔍 Search by product name..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {inputValue && (
        <button className="search-clear" onClick={handleClear}>
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
