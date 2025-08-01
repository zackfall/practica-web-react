"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/login-styles.css"

const Login = () => {
  const navigate = useNavigate()
  const [isToggled, setIsToggled] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [errors, setErrors] = useState({})

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const evaluatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[\W]/.test(password)) strength++
    return strength
  }

  const handlePasswordChange = (e) => {
    const password = e.target.value
    setRegisterForm({ ...registerForm, password })
    setPasswordStrength(evaluatePasswordStrength(password))
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setErrors({})

    if (!loginForm.email || !loginForm.password) {
      alert("Por favor, complete todos los campos.")
      return
    }

    if (!validateEmail(loginForm.email)) {
      alert("Ingrese un correo válido.")
      return
    }

    alert("Inicio de sesión exitoso")
    navigate("/")
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!registerForm.nombre || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      newErrors.form = "Por favor, complete todos los campos."
    }

    if (!validateEmail(registerForm.email)) {
      newErrors.email = "Ingrese un correo electrónico válido."
    }

    if (registerForm.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres."
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden."
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      alert("Registro exitoso")
      navigate("/")
    }
  }

  const getStrengthColor = () => {
    const colors = ["red", "orange", "yellow", "blue", "green"]
    return colors[passwordStrength - 1] || "gray"
  }

  const getStrengthText = () => {
    const texts = ["Muy débil", "Débil", "Regular", "Fuerte", "Muy fuerte"]
    return texts[passwordStrength - 1] || ""
  }

  return (
    <div className={`container ${isToggled ? "toggle" : ""}`}>
      {/* Forms Container - Fixed position */}
      <div className="forms-container">
        {/* Login Form */}
        <div className={`container-form ${!isToggled ? "active" : ""}`}>
          <form className="inicio-session" onSubmit={handleLoginSubmit}>
            <h2>Inicio</h2>
            <span>Ingrese su correo y contraseña para ingresar</span>
            <div className="container-input">
              <input
                type="text"
                placeholder="Correo Electrónico"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              />
            </div>
            <div className="container-input">
              <input
                type="password"
                placeholder="Contraseña"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              />
            </div>
            <a href="#">¿Olvidaste tu contraseña?</a>
            <button className="button" type="submit">
              Inicio
            </button>
          </form>
        </div>

        {/* Register Form */}
        <div className={`container-form ${isToggled ? "active" : ""}`}>
          <form className="registro" onSubmit={handleRegisterSubmit}>
            <h2>Registro</h2>
            <span>Ingrese sus datos</span>
            <div className="container-input">
              <input
                type="text"
                placeholder="Nombre"
                value={registerForm.nombre}
                onChange={(e) => setRegisterForm({ ...registerForm, nombre: e.target.value })}
              />
              {errors.nombre && <span className="error">{errors.nombre}</span>}
            </div>
            <div className="container-input">
              <input
                type="text"
                placeholder="Correo Electrónico"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="container-input">
              <input
                type="password"
                placeholder="Contraseña"
                value={registerForm.password}
                onChange={handlePasswordChange}
              />
              <div className="strength-container">
                <div
                  className="strength-bar"
                  style={{
                    width: `${passwordStrength * 20}%`,
                    backgroundColor: getStrengthColor(),
                  }}
                />
              </div>
              <span id="strengthText">{getStrengthText()}</span>
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="container-input">
              <input
                type="password"
                placeholder="Confirma tu contraseña"
                value={registerForm.confirmPassword}
                onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
            <button className="button" type="submit">
              Registrarse
            </button>
            {errors.form && <span className="error">{errors.form}</span>}
          </form>
        </div>
      </div>

      {/* Welcome Panel - This moves */}
      <div className="container-bienvenido">
        <div className={`bienvenido-sign-up bienvenido ${!isToggled ? "active" : ""}`}>
          <h3>¡Bienvenido!</h3>
          <p>Ingrese sus datos personales para iniciar sesión</p>
          <button className="button" onClick={() => setIsToggled(true)}>
            Registrarse
          </button>
        </div>
        <div className={`bienvenido-sign-in bienvenido ${isToggled ? "active" : ""}`}>
          <h3>Hola</h3>
          <p>Ingrese sus datos para registrarse:</p>
          <button className="button" onClick={() => setIsToggled(false)}>
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
