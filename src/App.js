import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Addvehicle from './components/Addvehicle';
import AddSenarios from './components/AddSenarios';
import AllSenarios from './components/AllSenarios';
import './App.css';

function App() {
  return (
    <div id="App">
      <Router>
        <nav>
          <div className="nav-bar">
            <ul>
              <li activeClassName="active">
                <NavLink exact to="/Home" >
                  Home
                </NavLink>
              </li>
              <li activeClassName="active">
                <NavLink exact to="/AddSenarios" >
                  Add Senarios
                </NavLink>
              </li>
              <li activeClassName="active">
                <NavLink exact to="/AllSenarios" >
                  All Senarios
                </NavLink>
              </li>
              <li activeClassName="active">
                <NavLink exact to="/Addvehicle" >
                  Add vehicle
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <div className="route">
          <Routes>
            <Route exact path="/Home" element={<Home />} />
            <Route exact path="/AddSenarios" element={<AddSenarios />} />
            <Route exact path="/AllSenarios" element={<AllSenarios />} />
            <Route exact path="/Addvehicle" element={<Addvehicle />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
