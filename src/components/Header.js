"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import NotificationModal from "./NotificationModal"
import ProfileModal from "./ProfileModal"
import "./Header.css"

const Header = ({ title = "Resumen" }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()

  const handleAddClick = () => {
    navigate("/crear-actividad")
  }

  return (
    <>
      <header className="page-header">
        <span className="page-header-title">{title}</span>
        <div className="page-header-icons">
          <button className="page-header-icon" title="Notificaciones" onClick={() => setShowNotifications(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6zm-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2"
              />
            </svg>
          </button>
          <button className="page-header-icon" title="Perfil" onClick={() => setShowProfile(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.23 7.23 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10"
              />
            </svg>
          </button>
          <button className="page-header-icon" title="Agregar" onClick={handleAddClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
            </svg>
          </button>
        </div>
      </header>

      {showNotifications && <NotificationModal onClose={() => setShowNotifications(false)} />}

      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </>
  )
}

export default Header
