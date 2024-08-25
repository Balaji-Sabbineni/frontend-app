import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('Numbers');

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleSubmit = () => {
    try {
      // Parse the JSON input
      const parsedData = JSON.parse(jsonInput).data;
      
      // Filter data based on selected filter
      if (selectedFilter === 'Numbers') {
        const numbers = parsedData.filter(item => !isNaN(item));
        setFilteredData(numbers);
      } else if (selectedFilter === 'Characters') {
        const characters = parsedData.filter(item => isNaN(item));
        setFilteredData(characters);
      } else {
        setFilteredData([]);
      }
    } catch (error) {
      console.error('Invalid JSON input', error);
      setFilteredData([]);
    }
  };

  return (
    <div className="container">
      <h2>API Input</h2>
      <input
        type="text"
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='{"data":["M","1","334","4","B"]}'
      />
      <button onClick={handleSubmit}>Submit</button>

      <h3>Multi Filter</h3>
      <select value={selectedFilter} onChange={handleFilterChange}>
        <option value="Numbers">Numbers</option>
        <option value="Characters">Characters</option>
      </select>

      <div className="filtered-response">
        <h4>Filtered Response</h4>
        <p>{selectedFilter}: {filteredData.join(',')}</p>
      </div>
    </div>
  );
}

export default App;
