import './AddSenarios.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddVehicle() {
  const [scenarioOptions, setScenarioOptions] = useState([]);
  const [dropdown1Value, setDropdown1Value] = useState('');
  const [input1Value, setInput1Value] = useState('');
  const [input2Value, setInput2Value] = useState('');
  const [input3Value, setInput3Value] = useState('');
  const [input4Value, setInput4Value] = useState('');
  const [dropdown2Value, setDropdown2Value] = useState('');

  useEffect(() => {
    fetchScenarioData();
  }, []);


  const fetchScenarioData = async () => {
    try {
      const response = await axios.get('http://localhost:3033/scenarios');
      const scenarios = response.data;
      const options = scenarios.map((scenario) => (
        <option key={scenario.id} value={scenario.id}>
          {scenario.name}
        </option>
      ));
      setScenarioOptions(options);
    } catch (error) {
      console.error('Error fetching scenario data:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const vehicleData = {
      scenarioId: dropdown1Value,
      name: input1Value,
      speed: input2Value,
      positionX: input3Value,
      positionY: input4Value,
      direction: dropdown2Value
    };

    try {
      const response = await axios.post('http://localhost:3033/vehicles', vehicleData);
      if (response.status === 201) {
        console.log('Vehicle added successfully');
        // Clear the form input values
        setDropdown1Value('');
        setInput1Value('');
        setInput2Value('');
        setInput3Value('');
        setInput4Value('');
        setDropdown2Value('');
      } else {
        console.error('Error adding vehicle:', response.status);
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };


const handleReset = () => {
  setScenarioOptions('');
  setDropdown1Value('');
  setInput1Value('');
  setInput2Value('');
  setInput3Value('');
  setInput4Value('');
  setDropdown2Value('')
};

const handleGoBack = () => {
  console.log("Go back");
};

  return (
    <div className="main-container">
      <p>Vehicle/add</p>
      <h2>Add Vehicle</h2>
    <div className="form-container">
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="dropdown1">Scenario List:</label>
          <select
            className="inputs"
            id="dropdown1"
            value={dropdown1Value}
            onChange={(e) => setDropdown1Value(e.target.value)}
          >
            <option value="">Select a scenario</option>
            {scenarioOptions}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="input1">Vehicle Name:</label>
          <input
            type="text"
            className="inputs"
            id="input1"
            placeholder="Enter vehicle name"
            value={input1Value}
            onChange={(e) => setInput1Value(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="input2">Speed:</label>
          <input
            type="text"
            className="inputs"
            id="input2"
            placeholder="Enter speed"
            value={input2Value}
            onChange={(e) => setInput2Value(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="input3">Position X:</label>
          <input
            type="number"
            className="inputs"
            id="input3"
            placeholder="Enter X position"
            value={input3Value}
            onChange={(e) => setInput3Value(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="input4">Position Y:</label>
          <input className="inputs"
            type="number"
            id="input4"
            placeholder="Enter Y position"
            value={input4Value}
            onChange={(e) => setInput4Value(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dropdown2">Direction:</label>
          <select
            className="inputs"
            id="dropdown2"
            value={dropdown2Value}
            onChange={(e) => setDropdown2Value(e.target.value)}
          >
            <option value="">Select a direction</option>
            <option value="Towards">Towards</option>
            <option value="Backwards">Backwards</option>
            <option value="Upwards">Upwards</option>
            <option value="Downwards">Downwards</option>
          </select>
        </div>
        <div className='buttons'>
      <button className='green' onClick={handleFormSubmit}>Add </button>
      <button className='orange' onClick={handleReset}>Reset</button>
      <button className='blue' onClick={handleGoBack}>Go Back</button>
      </div>
      </form>
    </div>
    </div>
  );
}

export default AddVehicle;
