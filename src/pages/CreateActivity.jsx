"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserData, setUserData, addNotification, checkAndNotifyReminder } from "../utils/dataUtils"
import Header from "../components/Header"
import "../styles/crear-actividad-styles.css"

const CreateActivity = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    tipoActividad: "tareas",
    activityName: "",
    date: "",
    reminder: "",
    subject: "",
    description: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const userData = getUserData()
      if (!userData) return

      const tipo = formData.tipoActividad
      if (!userData[tipo]) userData[tipo] = []

      const nuevoIndice = userData[tipo].length
      const nuevaActividad = {
        nombre: formData.activityName,
        fecha: formData.date,
        recordatorio: formData.reminder,
        materia: formData.subject,
        descripcion: formData.description,
        calificacion: "",
        estado: "undone",
        url: `editar-actividad.html?categoria=${tipo}&actividad=${nuevoIndice}`,
      }

      userData[tipo].push(nuevaActividad)
      setUserData(userData)

      addNotification(
        `Nueva actividad creada: "${nuevaActividad.nombre}" (${nuevaActividad.materia}) para el ${nuevaActividad.fecha}`,
      )
      checkAndNotifyReminder(nuevaActividad)

      alert("Actividad creada correctamente")
      navigate("/actividades")
    } catch (error) {
      console.error("Error al crear actividad:", error)
      alert("Error al crear la actividad")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header title="Crear Actividad" />
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="tipoActividad">Tipo de actividad</label>
            <select
              id="tipoActividad"
              name="tipoActividad"
              value={formData.tipoActividad}
              onChange={handleChange}
              required
            >
              <option value="tareas">Tarea</option>
              <option value="examenes">Examen</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="activityName">Nombre</label>
            <input
              type="text"
              id="activityName"
              name="activityName"
              value={formData.activityName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Fecha</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="reminder">Recordatorio</label>
            <input
              type="date"
              id="reminder"
              name="reminder"
              value={formData.reminder}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Materia</label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Creando..." : "Crear Actividad"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/actividades")}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateActivity
