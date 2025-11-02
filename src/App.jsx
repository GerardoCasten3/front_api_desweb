import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Buscar from "./pages/Buscar";
import Crear from "./pages/Crear";
import Actualizar from "./pages/Actualizar";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buscar/:cve_plan/:clave" element={<Buscar />} />
          <Route path="/crear" element={<Crear />} />
          <Route path="/actualizar/:cve_plan/:clave" element={<Actualizar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
