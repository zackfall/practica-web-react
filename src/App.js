"use client"

import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import Activities from "./pages/Activities"
import CreateActivity from "./pages/CreateActivity"
import EditActivity from "./pages/EditActivity"
import Login from "./pages/Login"
import { fetchData, checkTodayTasksAndNotify } from "./utils/dataUtils"
import "./styles/global.css"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeData = async () => {
      if (!localStorage.getItem("allData")) {
        await fetchData()
      }
      checkTodayTasksAndNotify()
      setIsLoading(false)
    }

    initializeData()
  }, [])

  if (isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="actividades" element={<Activities />} />
          <Route path="crear-actividad" element={<CreateActivity />} />
          <Route path="editar-actividad" element={<EditActivity />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
