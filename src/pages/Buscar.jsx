import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";
import "../styles/Buscar.css";

const Buscar = () => {
  const { cve_plan, clave } = useParams();
  const [materia, setMateria] = useState({
    cve_plan: "",
    grado: "",
    clave: "",
    materia: "",
    horas_prac: "",
    horas_teo: "",
    creditos: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMateria = async () => {
      try {
        const response = await api.get(
          `busca_plan_materia.php?cve_plan=${cve_plan}&clave=${clave}`
        );
        setMateria(response.data);
      } catch (error) {
        console.error("Error al obtener la materia:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se encontró la materia o hubo un problema con la conexión.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMateria();
  }, [cve_plan, clave]);

  if (loading)
    return <p style={{ textAlign: "center" }}>Cargando información...</p>;

  return (
    <div className="buscar-container">
      <h2 className="buscar-title">Información de la Materia</h2>

      <form>
        <div className="form-group">
          <label>Cve Plan:</label>
          <input
            type="text"
            value={materia.cve_plan}
            readOnly
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Grado:</label>
          <input
            type="text"
            value={materia.grado}
            readOnly
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Clave:</label>
          <input
            type="text"
            value={materia.clave}
            readOnly
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Materia:</label>
          <input
            type="text"
            value={materia.materia}
            readOnly
            className="form-input"
          />
        </div>

        <div className="form-divider"></div>

        <div className="form-group">
          <label>Horas Práctica:</label>
          <input
            type="text"
            value={materia.horas_prac}
            readOnly
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Horas Teoría:</label>
          <input
            type="text"
            value={materia.horas_teo}
            readOnly
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Créditos:</label>
          <input
            type="text"
            value={materia.creditos}
            readOnly
            className="form-input"
          />
        </div>
      </form>

      <div className="buscar-footer">
        <p>Consulta generada con <a href="https://pycsoftwaremx.com/" target="_blank" rel="noopener noreferrer">Compcenter Saltillo</a></p>
      </div>
    </div>
  );
};

export default Buscar;
