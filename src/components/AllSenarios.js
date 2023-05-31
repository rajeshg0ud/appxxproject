import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './AllScenario.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';


const AllScenarios = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [scenarios, setScenarios] = useState([]);
  const [editedScenario, setEditedScenario] = useState({
    id: '',
    name: '',
    time: '',
    vehicleCount: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3033/scenarios');
      setScenarios(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddVehicle = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3033/vehicles/${id}`);
      if (response.status === 200) {
        console.log('Vehicle added successfully');
        fetchData(); 
      } else {
        console.error('Error adding vehicle:', response.status);
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  const handleUpdateScenario = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3033/scenarios/${editedScenario.id}`,
        editedScenario
      );

      if (response.status === 200) {
        console.log('Scenario updated successfully');
        setShowEdit(false);
        setEditedScenario({
          id: '',
          name: '',
          time: '',
          vehicleCount: ''
        });
        fetchData(); 
      } else {
        console.error('Error updating scenario:', response.status);
      }
    } catch (error) {
      console.error('Error updating scenario:', error);
    }
  };

  const handleDeleteScenario = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3033/scenarios/${id}`);

      if (response.status === 200) {
        console.log('Scenario deleted successfully');
        fetchData(); 
      } else {
        console.error('Error deleting scenario:', response.status);
      }
    } catch (error) {
      console.error('Error deleting scenario:', error);
    }
  };

  return (
    <div className='main-container'><p>All Scenarios</p>
    <table className="table">
      <thead>
        <tr>
          <th>Scenario Id</th>
          <th>Scenario Name</th>
          <th>Scenario Time</th>
          <th>Number of Vehicles</th>
          <th>Add Vehicle</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {scenarios.map((scenario) => (
          <tr key={scenario.id}>
            <td>{scenario.id}</td>
            {showEdit && editedScenario.id === scenario.id ? (
              <>
                <td>
                  <input
                    type="text"
                    value={editedScenario.name}
                    onChange={(e) =>
                      setEditedScenario({ ...editedScenario, name: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editedScenario.time}
                    onChange={(e) =>
                      setEditedScenario({ ...editedScenario, time: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editedScenario.vehicleCount}
                    onChange={(e) =>
                      setEditedScenario({
                        ...editedScenario,
                        vehicleCount: e.target.value
                      })
                    }
                  />
                </td>
                <td>
                  <button  onClick={handleUpdateScenario}>
                    Update
                  </button>
                </td>
              </>
            ) : (
              <>
                <td>{scenario.name}</td>
                <td>{scenario.time}</td>
                <td>{scenario.vehicleCount}</td>
                <td>
                  <button
                    onClick={() => handleAddVehicle(scenario.id)}
                  >
                    <FontAwesomeIcon icon={faCirclePlus} style={{ color: 'black' }}/>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setShowEdit(true);
                      setEditedScenario(scenario);
                    }}
                  >
                    <FontAwesomeIcon icon={faPen} style={{ color: 'black' }}/>
                  </button>
                </td>
              </>
            )}
            <td>
              <button
                onClick={() => handleDeleteScenario(scenario.id)}
              >
                <FontAwesomeIcon icon={faTrashCan}  style={{ color: 'black' }}/>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default AllScenarios;
