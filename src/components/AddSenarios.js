import React, { useState } from 'react';
import axios from 'axios'; 
import './AddSenarios.css'

const AddScenario = () => {
  const [scenarioName, setScenarioName] = useState('');
  const [scenarioTime, setScenarioTime] = useState('');

  const handleScenarioNameChange = (event) => {
    setScenarioName(event.target.value);
  };

  const handleScenarioTimeChange = (event) => {
    setScenarioTime(event.target.value);
  };

    const handleAddScenario = () => {
      axios.post('http://localhost:3033/scenarios', {
        "name": scenarioName ,
        "time": scenarioTime,
        "vehicleCount": 0,
        "AddVehicle": 0,
      });
    
    setScenarioName(''); //reset
    setScenarioTime('');
  };

  const handleReset = () => {
    setScenarioName('');
    setScenarioTime('');
  };

  const handleGoBack = () => {
    console.log("Go back");
  };

  return (
    <div className="main-container">
      <p>Scenario/add</p>
      <h2>Add Scenario</h2>
      <div className="containerr">
      <div className="box">
        <label htmlFor="scenarioName">Scenario Name</label>
        <input className="inputs"
          type="text"
          id="scenarioName"
          value={scenarioName}
          placeholder="Test Scenario"
          onChange={handleScenarioNameChange}
          required
        />
      </div>
      <div className="box">
        <label htmlFor="scenarioTime">Scenario Time (seconds)</label>
        <input className="inputs"
          type="number"
          id="scenarioTime"
          value={scenarioTime}
          placeholder="10"
          onChange={handleScenarioTimeChange}
          required
        />
      </div>
      </div>
      <div className="buttons">
      <button className="green" onClick={handleAddScenario}>Add </button>
      <button className="orange" onClick={handleReset}>Reset</button>
      <button className="blue" onClick={handleGoBack}>Go Back</button>
      </div>
    </div>
  );
};

export default AddScenario;