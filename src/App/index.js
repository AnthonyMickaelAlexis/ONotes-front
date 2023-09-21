import React from 'react';
import { Routes, Route } from "react-router-dom"
import Auth from "../views/Auth";
import Homepage from '../views/Homepage';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path="/authentication" element={ <Auth /> } />
      </Routes>
    </div>
  );
}

export default App;
