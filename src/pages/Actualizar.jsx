import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";
import "../styles/Buscar.css"; // reutilizamos los estilos del formulario

const Actualizar = () => {
  const { cve_plan, clave } = useParams();
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
  const [loading, setLoading] = useState(true);

  // Cargar los datos al montar el componente
  useEffect(() => {
    const fetchMateria = async () => {
      try {
        const response = await api.get(
          `busca_plan_materia.php?cve_plan=${cve_plan}&clave=${clave}`
        );
        if (response.status === 200 && response.data) {
          setMateria(response.data);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al cargar la materia",
          text:
            error.response?.data?.message ||
            "No se pudo obtener la información de la materia.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMateria();
  }, [cve_plan, clave]);

  // Actualizar el estado del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMateria((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar los datos actualizados con validación
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén completos
    const camposVacios = Object.entries(materia).filter(
      ([key, value]) =>
        !["cve_plan", "clave"].includes(key) && (value === "" || value === null)
    );

    if (camposVacios.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos antes de actualizar.",
      });
      return;
    }

    try {
      const update = await Swal.fire({
        title: "¿Actualizar materia?",
        text: "¿Estás seguro de que deseas actualizar los datos de esta materia?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#1976d2",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
      });
      if (!update.isConfirmed) return;

      const response = await api.post("update_materia.php", materia);

      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Materia actualizada",
          text: "Los datos se guardaron correctamente.",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate(-1);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text:
          error.response?.data?.message ||
          "No se pudo actualizar la materia. Intenta nuevamente.",
      });
    }
  };

  if (loading)
    return <p style={{ textAlign: "center" }}>Cargando información...</p>;

  return (
    <div className="buscar-container">
      <h2 className="buscar-title">Actualizar Materia</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cve Plan:</label>
          <input
            type="text"
            name="cve_plan"
            value={materia.cve_plan}
            readOnly
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
            readOnly
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
            Actualizar
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
          Modificación realizada con{" "}
          <a
            href="https://pycsoftwaremx.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Compcenter Saltillo
          </a>
        </p>
      </div>
    </div>
  );
};

export default Actualizar;
