// Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleBuscarClick = async (e) => {
    e.preventDefault();

    const { value: formValues } = await Swal.fire({
      title: "Buscar materia",
      html: `
        <input id="swal-cve-plan" class="swal2-input" placeholder="Cve Plan">
        <input id="swal-clave" class="swal2-input" placeholder="Clave de materia">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Buscar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const cve_plan = document.getElementById("swal-cve-plan").value.trim();
        const clave = document.getElementById("swal-clave").value.trim();

        if (!cve_plan || !clave) {
          Swal.showValidationMessage("Debes completar ambos campos");
          return false;
        }

        return { cve_plan, clave };
      },
    });

    if (formValues) {
      try {
        // Intentamos hacer la petición
        const response = await api.get(
          `busca_plan_materia.php?cve_plan=${formValues.cve_plan}&clave=${formValues.clave}`
        );

        // Si todo va bien y hay datos válidos
        if (response.status === 200 && response.data && response.data.clave) {
          navigate(`/buscar/${formValues.cve_plan}/${formValues.clave}`);
        } else {
          // Si responde 200 pero sin datos válidos
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se encontró la materia con los datos proporcionados.",
          });
        }
      } catch (error) {
        // Si el servidor devuelve un 404 u otro error
        if (error.response && error.response.status === 404) {
          Swal.fire({
            icon: "error",
            title: "No encontrada",
            text: error.response.data,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error de conexión",
            text: "Ocurrió un problema al conectar con la API.",
          });
        }
      }
    }

    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          Materias API
        </Link>
      </div>

      <div
        className={`menu-toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="#" className="nav-link" onClick={handleBuscarClick}>
          Buscar
        </Link>
        <Link
          to="/crear"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          Crear
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
