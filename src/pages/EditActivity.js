"use client"

import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getUserData, setUserData, addNotification, checkAndNotifyReminder } from "../utils/dataUtils"
import "../styles/editar-styles.css"

const EditActivity = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [activity, setActivity] = useState(null)
  const [isEditingScore, setIsEditingScore] = useState(false)
  const [scoreValue, setScoreValue] = useState("")

  const categoria = searchParams.get("categoria")
  const actividadIdx = Number.parseInt(searchParams.get("actividad"))

  useEffect(() => {
    const userData = getUserData()
    if (userData && userData[categoria] && userData[categoria][actividadIdx]) {
      const activityData = userData[categoria][actividadIdx]
      setActivity(activityData)
      setScoreValue(activityData.calificacion || "")
    }
  }, [categoria, actividadIdx])

  const handleScoreEdit = () => {
    setIsEditingScore(true)
  }

  const handleScoreBlur = () => {
    setIsEditingScore(false)
    setActivity((prev) => ({ ...prev, calificacion: scoreValue }))
  }

  const handleScoreKeyDown = (e) => {
    if (e.key === "Enter") {
      handleScoreBlur()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = getUserData()
    if (!userData || !userData[categoria] || !userData[categoria][actividadIdx]) return

    const formData = new FormData(e.target)
    const updatedActivity = {
      ...activity,
      nombre: formData.get("activityName"),
      fecha: formData.get("date"),
      recordatorio: formData.get("reminder"),
      materia: formData.get("subject"),
      descripcion: formData.get("description"),
      calificacion: scoreValue,
    }

    // Si antes no tenía calificación y ahora sí, marcar como done
    if ((!activity.calificacion || activity.calificacion === "") && scoreValue && scoreValue !== "") {
      updatedActivity.estado = "done"
    }

    userData[categoria][actividadIdx] = updatedActivity
    setUserData(userData)

    addNotification(
      `Actividad editada: "${updatedActivity.nombre}" (${updatedActivity.materia}) para el ${updatedActivity.fecha}`,
    )
    checkAndNotifyReminder(updatedActivity)

    alert("Actividad actualizada correctamente")
    navigate("/actividades")
  }

  if (!activity) return <div>Cargando...</div>

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h4 className="score">
          Calificación <span style={{ display: isEditingScore ? "none" : "inline" }}>{scoreValue || "?"}</span>
          /10{" "}
          <button type="button" className="edit-score-btn" onClick={handleScoreEdit}>
            ✏️
          </button>
          <input
            type="number"
            min="0"
            max="10"
            className="score-input"
            style={{ display: isEditingScore ? "inline-block" : "none", width: "50px" }}
            value={scoreValue}
            onChange={(e) => setScoreValue(e.target.value)}
            onBlur={handleScoreBlur}
            onKeyDown={handleScoreKeyDown}
          />
        </h4>
        <div className="form-group">
          <label htmlFor="activityName">Nombre</label>
          <input type="text" id="activityName" name="activityName" defaultValue={activity.nombre} required />
        </div>
        <div className="form-group">
          <label htmlFor="date">Fecha</label>
          <input type="date" id="date" name="date" defaultValue={activity.fecha} required />
        </div>
        <div className="form-group">
          <label htmlFor="reminder">Recordatorio</label>
          <input type="date" id="reminder" name="reminder" defaultValue={activity.recordatorio} required />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Materia</label>
          <input type="text" id="subject" name="subject" defaultValue={activity.materia} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea id="description" name="description" rows="4" defaultValue={activity.descripcion} required />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    </div>
  )
}

export default EditActivity
