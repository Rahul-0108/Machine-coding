import React, { useState, useEffect, useRef } from 'react';

const ComboBox = ({ suggestions = [], onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef();

  useEffect(() => {
    if (inputValue.trim() === '') {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    } else {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    }
  }, [inputValue, suggestions]);

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    if (e.key === 'ArrowDown') {
      setActiveIndex((prev) => (prev + 1) % filteredSuggestions.length);
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((prev) =>
        prev === 0 ? filteredSuggestions.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0) {
        selectSuggestion(filteredSuggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (value) => {
    setInputValue(value);
    setShowSuggestions(false);
    setActiveIndex(-1);
    if (onSelect) onSelect(value);
  };

  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        onFocus={() => inputValue && setShowSuggestions(true)}
        style={{ width: '100%', padding: '8px' }}
      />

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            position: 'absolute',
            width: '100%',
            border: '1px solid #ccc',
            background: '#fff',
            zIndex: 1,
            maxHeight: '150px',
            overflowY: 'auto',
          }}
        >
          {filteredSuggestions.map((item, index) => (
            <li
              key={item}
              onMouseDown={() => selectSuggestion(item)}
              style={{
                padding: '8px',
                background: index === activeIndex ? '#eee' : '#fff',
                cursor: 'pointer',
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;
