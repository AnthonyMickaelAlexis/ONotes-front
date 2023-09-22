import React from 'react';
import { Routes, Route } from "react-router-dom"
import Auth from "../views/Auth";
import Homepage from '../views/Homepage';
import Layout from '../utils/layout';

function App() {

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={ <Homepage /> } />
          <Route path="/authentication" element={ <Auth /> } />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
