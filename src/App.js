import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('Numbers');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Parse the JSON input
      const parsedData = JSON.parse(jsonInput).data;

      // Call the REST API
      const apiResponse = await axios.post('http://your-api-endpoint.com/api', { data: parsedData });

      // Filter data based on selected filter
      if (selectedFilter === 'Numbers') {
        const numbers = apiResponse.data.filter(item => !isNaN(item));
        setFilteredData(numbers);
      } else if (selectedFilter === 'Characters') {
        const characters = apiResponse.data.filter(item => isNaN(item));
        setFilteredData(characters);
      } else if (selectedFilter === 'Highest Lowercase Alphabet') {
        const lowercases = apiResponse.data.filter(item => /^[a-z]$/.test(item));
        const highestLowercase = lowercases.length > 0 ? [lowercases.sort().pop()] : [];
        setFilteredData(highestLowercase);
      } else {
        setFilteredData([]);
      }
      setError('');
    } catch (error) {
      console.error('Invalid JSON input', error);
      setError('Invalid JSON input');
      setFilteredData([]);
    }
  };

  return (
    <div className="container">
      <h2>API Input</h2>
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='{"data":["M","1","334","4","B"]}'
        rows="10"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Multi Filter</h3>
      <select value={selectedFilter} onChange={handleFilterChange}>
        <option value="Numbers">Numbers</option>
        <option value="Characters">Characters</option>
        <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
      </select>

      <div className="filtered-response">
        <h4>Filtered Response</h4>
        <p>{selectedFilter}: {filteredData.join(',')}</p>
      </div>
    </div>
  );
}

export default App;
