import React from 'react';
import { Link, Routes, Route } from "react-router-dom"
import Auth from "../views/Auth";

function App() {

  return (
    <div className="App">
      <Link to="/authentication">
        Auth
      </Link>

      <Routes>
        <Route path="/authentication" element={ <Auth /> } />
      </Routes>
    </div>
  );
}

export default App;
