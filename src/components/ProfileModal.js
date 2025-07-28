"use client"

const ProfileModal = ({ onClose }) => {
  const allData = JSON.parse(localStorage.getItem("allData"))
  const usuarioActivo = localStorage.getItem("usuarioActivo")

  const handleUserChange = (userName) => {
    localStorage.setItem("usuarioActivo", userName)
    window.location.reload()
  }

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal-bg")) {
      onClose()
    }
  }

  if (!allData) return null

  const usuarios = allData.usuarios.map((u) => u.nombre)

  return (
    <div className="modal-bg" onClick={handleBackdropClick}>
      <div className="modal">
        <h3>Usuario actual</h3>
        <div>
          <b>{usuarioActivo}</b>
        </div>
        <div className="user-list">
          {usuarios.map((user) => (
            <a
              key={user}
              href="#"
              className={user === usuarioActivo ? "active-user" : ""}
              onClick={(e) => {
                e.preventDefault()
                handleUserChange(user)
              }}
            >
              {user}
            </a>
          ))}
        </div>
        <button className="close-btn" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default ProfileModal
