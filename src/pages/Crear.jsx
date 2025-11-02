import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";
import "../styles/Buscar.css";

const Crear = () => {
  const navigate = useNavigate();

  const [materia, setMateria] = useState({
    cve_plan: "",
    grado: "",
    clave: "",
    materia: "",
    horas_prac: "",
    horas_teo: "",
    creditos: "",
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMateria((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar el formulario con validaciones
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos vacíos
    const camposVacios = Object.entries(materia).filter(
      ([, value]) => value === "" || value === null
    );

    if (camposVacios.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos antes de continuar.",
      });
      return;
    }

    try {
      const confirm = await Swal.fire({
        title: "¿Registrar materia?",
        text: "¿Deseas guardar la nueva materia en el sistema?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#1976d2",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, guardar",
        cancelButtonText: "Cancelar",
      });

      if (!confirm.isConfirmed) return;

      const response = await api.post("create_materia.php", materia);

      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Materia registrada",
          text: "Los datos se guardaron correctamente.",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate(-1); // volver a la página anterior
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al registrar",
        text:
          error.response?.data?.message ||
          "No se pudo registrar la materia. Intenta nuevamente.",
      });
    }
  };

  return (
    <div className="buscar-container">
      <h2 className="buscar-title">Registrar Nueva Materia</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cve Plan:</label>
          <input
            type="text"
            name="cve_plan"
            value={materia.cve_plan}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Grado:</label>
          <input
            type="text"
            name="grado"
            value={materia.grado}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Clave:</label>
          <input
            type="text"
            name="clave"
            value={materia.clave}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Materia:</label>
          <input
            type="text"
            name="materia"
            value={materia.materia}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-divider"></div>

        <div className="form-group">
          <label>Horas Práctica:</label>
          <input
            type="number"
            name="horas_prac"
            value={materia.horas_prac}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Horas Teoría:</label>
          <input
            type="number"
            name="horas_teo"
            value={materia.horas_teo}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Créditos:</label>
          <input
            type="number"
            name="creditos"
            value={materia.creditos}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-actualizar">
            Crear
          </button>
          <button
            type="button"
            className="btn-cerrar"
            onClick={() => navigate(-1)}
          >
            Cerrar
          </button>
        </div>
      </form>

      <div className="buscar-footer">
        <p>
          Registro realizado con{" "}
          <a
            href="https://pycsoftwaremx.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Compcenter Saltillo
          </a>
        </p>
        <p>Desarrollado por <a href="https://github.com/GerardoCasten3" target="_blank" rel="noopener noreferrer">Gerardo Castillo</a></p>
      </div>
    </div>
  );
};

export default Crear;
