"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getUserData, setUserData } from "../utils/dataUtils"
import "../styles/activities-styles.css"

const Activities = () => {
  const [userData, setUserDataState] = useState(null)

  useEffect(() => {
    const data = getUserData()
    setUserDataState(data)
  }, [])

  const handleDelete = (categoria, index) => {
    if (window.confirm("¿Seguro que deseas eliminar esta actividad?")) {
      const updatedData = { ...userData }
      updatedData[categoria].splice(index, 1)
      setUserData(updatedData)
      setUserDataState(updatedData)
    }
  }

  if (!userData) return <div>Cargando...</div>

  const tareas = userData.tareas || []
  const examenes = userData.examenes || []

  const ActivitySection = ({ title, activities, categoria }) => (
    <section className="activities">
      <h2>{title}</h2>
      {activities.map((activity, index) => (
        <div key={index} className="activity">
          <div className="left">
            <p>
              <Link to={`/editar-actividad?categoria=${categoria}&actividad=${index}`}>{activity.nombre}</Link>
            </p>
            <p>{activity.materia}</p>
          </div>
          <div className="right">
            <p>Calificación: {activity.calificacion || "-"}/10</p>
            <p>Fecha: {activity.fecha}</p>
          </div>
          <button className="btn-delete" aria-label="Delete activity" onClick={() => handleDelete(categoria, index)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
              />
            </svg>
          </button>
        </div>
      ))}
    </section>
  )

  return (
    <div className="container">
      <ActivitySection title="Tareas" activities={tareas} categoria="tareas" />
      <ActivitySection title="Examenes" activities={examenes} categoria="examenes" />
    </div>
  )
}

export default Activities
