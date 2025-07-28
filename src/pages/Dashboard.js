"use client"

import { useState, useEffect } from "react"
import { getUserData } from "../utils/dataUtils"
import "../styles/resumen.css"

const Dashboard = () => {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const userData = getUserData()
    if (userData) {
      const tareas = (userData.tareas || []).map((t) => ({ ...t, tipo: "Tarea" }))
      const examenes = (userData.examenes || []).map((e) => ({ ...e, tipo: "Examen" }))
      setActivities([...tareas, ...examenes])
    }
  }, [])

  const formatFecha = (fecha) => {
    if (!fecha) return ""
    const [year, month, day] = fecha.split("-")
    const d = new Date(Number(year), Number(month) - 1, Number(day))
    return d.toLocaleDateString("es-EC", { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  const getActivitiesForDay = (daysOffset) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return activities.filter((act) => {
      if (!act.fecha) return false
      const [year, month, day] = act.fecha.split("-")
      const fecha = new Date(Number(year), Number(month) - 1, Number(day))
      fecha.setHours(0, 0, 0, 0)
      const diff = Math.floor((fecha - today) / (1000 * 60 * 60 * 24))
      return diff === daysOffset
    })
  }

  const SVG_ICON = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2" />
    </svg>
  )

  return (
    <div className="main">
      <h3>Reporte semanal</h3>
      <div className="reporte">
        <div className="tareas-semanal">
          {activities.map((act, index) => (
            <div key={index} className="tarea">
              {SVG_ICON} {act.tipo}
              <br /> {act.nombre}
              <br />
              <span>
                {act.materia}
                <br />
                {formatFecha(act.fecha)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="actividades">
        <div className="actividad-box">
          <h4>Actividades de hoy</h4>
          {getActivitiesForDay(0).map((act, index) => (
            <p key={index}>
              <a href="#">{SVG_ICON}</a> {act.tipo}: {act.nombre}
              <br />
              <small>
                {act.materia}
                <br />
                {formatFecha(act.fecha)}
              </small>
            </p>
          ))}
        </div>
        <div className="actividad-box">
          <h4>Actividades de mañana</h4>
          {getActivitiesForDay(1).map((act, index) => (
            <p key={index}>
              <a href="#">{SVG_ICON}</a> {act.tipo}: {act.nombre}
              <br />
              <small>
                {act.materia}
                <br />
                {formatFecha(act.fecha)}
              </small>
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
