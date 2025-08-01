"use client"
import { getNotifications } from "../utils/dataUtils"

const NotificationModal = ({ onClose }) => {
  const notifications = getNotifications()

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal-bg")) {
      onClose()
    }
  }

  return (
    <div className="modal-bg" onClick={handleBackdropClick}>
      <div className="modal">
        <h3>Notificaciones</h3>
        <div className="notifications-list">
          {notifications.length === 0 ? (
            <div style={{ color: "#a7a7a7", textAlign: "center" }}>No hay notificaciones</div>
          ) : (
            notifications.map((notification, index) => (
              <div key={index} className="notification-item">
                <div>{notification.mensaje}</div>
                <div className="notification-date">{new Date(notification.fecha).toLocaleString()}</div>
              </div>
            ))
          )}
        </div>
        <button className="close-btn" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default NotificationModal
