import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";
import "../styles/Home.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Home = () => {
  const [materias, setMaterias] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    obtenerMaterias();
  }, []);

  const obtenerMaterias = async () => {
    try {
      const response = await api.get("lista_planes_materias.php");
      setMaterias(Array.isArray(response.data.body) ? response.data.body : []);
    } catch (error) {
      console.error("Error al obtener las materias:", error);
    }
  };

  const handleEdit = async (cve_plan, clave) => {
    const confirmacion = await Swal.fire({
      title: "¿Editar materia?",
      text: `¿Deseas entrar a la ventana de modificación de la materia con Cve Plan ${cve_plan} y Clave ${clave}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, entrar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
        navigate(`/actualizar/${cve_plan}/${clave}`);
    }
  };

  const handleDelete = async (cve_plan, clave) => {
    const confirmacion = await Swal.fire({
      title: "¿Eliminar materia?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmacion.isConfirmed) return;

    try {
      await api.post("/delete_materia.php", { cve_plan, clave });

      // Eliminar del estado local
      setMaterias((prev) => prev.filter((m) => m.clave !== clave));

      Swal.fire({
        title: "Eliminado",
        text: "La materia fue eliminada correctamente.",
        icon: "success",
        confirmButtonColor: "#1976d2",
      });
    } catch (error) {
      console.error("Error al eliminar materia:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al eliminar la materia.",
        icon: "error",
        confirmButtonColor: "#1976d2",
      });
    }
  };

  // Paginación
  const totalPages = Math.ceil(materias.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentMaterias = materias.slice(indexOfFirst, indexOfLast);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="home-container">
      <h1>Listado de Materias</h1>

      <table className="materias-table">
        <thead>
          <tr>
            <th>Cve Plan</th>
            <th>Grado</th>
            <th>Clave</th>
            <th>Materia</th>
            <th>Horas Práctica</th>
            <th>Horas Teoría</th>
            <th>Créditos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentMaterias.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ padding: "1rem" }}>
                No hay materias registradas
              </td>
            </tr>
          ) : (
            currentMaterias.map((m, index) => (
              <tr key={`${m.clave}-${index}`}>
                <td>{m.cve_plan}</td>
                <td>{m.grado}</td>
                <td>{m.clave}</td>
                <td>{m.materia}</td>
                <td>{m.horas_prac}</td>
                <td>{m.horas_teo}</td>
                <td>{m.creditos}</td>
                <td className="acciones">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(m.cve_plan, m.clave)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(m.cve_plan, m.clave)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Controles de paginación */}
      {materias.length > 0 && (
        <div className="pagination">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            ← Anterior
          </button>
          <span className="page-info">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Siguiente →
          </button>
        </div>
      )}
      <div className="buscar-footer">
        <p>Consulta generada con <a href="https://pycsoftwaremx.com/" target="_blank" rel="noopener noreferrer">Compcenter Saltillo</a></p>
        <p>Desarrollado por <a href="https://github.com/GerardoCasten3" target="_blank" rel="noopener noreferrer">Gerardo Castillo</a></p>
      </div>

    </div>

    
  );
};

export default Home;
