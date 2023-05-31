import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState('');
  const [scenarios, setScenarios] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [editVehicle, setEditVehicle] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false); // Flag for simulation state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scenariosResponse = await axios.get('http://localhost:3033/scenarios');
        const scenariosData = scenariosResponse.data;
        setScenarios(scenariosData);
        setSelectedScenarioId(scenariosData[0]?.id);

        const vehiclesResponse = await axios.get('http://localhost:3033/vehicles');
        const vehiclesData = vehiclesResponse.data;
        setVehicles(vehiclesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedScenarioId && vehicles.length > 0) {
      const filtered = vehicles.filter((vehicle) => vehicle.scenarioId === selectedScenarioId);
      setFilteredVehicles(filtered);
    }
  }, [selectedScenarioId, vehicles]);

  const handleScenarioChange = (event) => {
    const scenarioId = event.target.value;
    setSelectedScenarioId(scenarioId);
  };

  const handleEditVehicle = (vehicle) => {
    setEditVehicle(vehicle);
  };

  const handleCancelEdit = () => {
    setEditVehicle(null);
  };

  const handleDeleteVehicle = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3033/vehicles/${id}`);

      if (response.status === 200) {
        console.log('Vehicle deleted successfully');
        setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== id));
      } else {
        console.error('Error deleting vehicle:', response.status);
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleStartSimulations = () => {
    setIsSimulating(true);
  };
  
  const handleStopSimulations = () => {
    setIsSimulating(false);
    const graphCanvas = graphRef.current;
    const context = graphCanvas.getContext('2d');
    context.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
  };

  const graphRef = useRef(null);

  useEffect(() => {
    if (isSimulating && graphRef.current) {
      const graphCanvas = graphRef.current;
      const vehicleIds = filteredVehicles.map((vehicle) => vehicle.id);
      const positionsX = filteredVehicles.map((vehicle) => vehicle.positionX);
      const positionsY = filteredVehicles.map((vehicle) => vehicle.positionY);

      if (graphRef.current.chart) {
        graphRef.current.chart.data.labels = vehicleIds;
        graphRef.current.chart.data.datasets[0].data = positionsX;
        graphRef.current.chart.data.datasets[1].data = positionsY;
        graphRef.current.chart.update();
      } else {
        graphRef.current.chart = new Chart(graphCanvas, {
          type: 'line',
          data: {
            labels: vehicleIds,
            datasets: [
              {
                label: 'Position X',
                data: positionsX,
                borderColor: 'red',
                fill: false,
              },
              {
                label: 'Position Y',
                data: positionsY,
                borderColor: 'blue',
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      }
    }
  }, [isSimulating, filteredVehicles]);

  return (
    <div className="main-container">
      <div className="drop-down">
        <label htmlFor="scenarioDropdown">Scenarios:</label>
        <select id="scenarioDropdown" className="inputs" onChange={handleScenarioChange}>
          <option value="">Select a scenario</option>
          {scenarios.map((scenario) => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.name}
            </option>
          ))}
        </select>
      </div>
      {selectedScenarioId && (
        <div className="box-2">
          <table className="table">
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Vehicle Name</th>
                <th>Position X</th>
                <th>Position Y</th>
                <th>Speed</th>
                <th>Direction</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.id}</td>
                  <td>
                    {editVehicle?.id === vehicle.id ? (
                      <input type="text" name="name" defaultValue={editVehicle.name} />
                    ) : (
                      vehicle.name
                    )}
                  </td>
                  <td>
                    {editVehicle?.id === vehicle.id ? (
                      <input type="text" name="positionX" defaultValue={editVehicle.positionX} />
                    ) : (
                      vehicle.positionX
                    )}
                  </td>
                  <td>
                    {editVehicle?.id === vehicle.id ? (
                      <input type="text" name="positionY" defaultValue={editVehicle.positionY} />
                    ) : (
                      vehicle.positionY
                    )}
                  </td>
                  <td>
                    {editVehicle?.id === vehicle.id ? (
                      <input type="text" name="speed" defaultValue={editVehicle.speed} />
                    ) : (
                      vehicle.speed
                    )}
                  </td>
                  <td>
                    {editVehicle?.id === vehicle.id ? (
                      <input type="text" name="direction" defaultValue={editVehicle.direction} />
                    ) : (
                      vehicle.direction
                    )}
                  </td>
                  <div>
                    {editVehicle?.id === vehicle.id ? (
                      <div>
                        <td>
                          <button type="submit">Update</button>
                        </td>
                        <td>
                          <button type="button" onClick={handleCancelEdit}>
                            Cancel
                          </button>
                        </td>
                      </div>
                    ) : (
                      <div>
                        <td>
                          <button onClick={() => handleEditVehicle(vehicle)}>
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                        </td>
                        <td>
                          <button onClick={() => handleDeleteVehicle(vehicle.id)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </td>
                      </div>
                    )}
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="simulation-button">
            {!isSimulating && (
              <button className="green" onClick={handleStartSimulations}>Start Simulations</button>
            )}
            {isSimulating && (
              <button className="blue" onClick={handleStopSimulations}>Stop Simulations</button>
            )}
          </div>

          <div className="graph-container">
            {isSimulating && <canvas ref={graphRef} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
