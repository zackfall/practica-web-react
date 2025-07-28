const initialData = {
  usuarioActivo: "Usuario 1",
  notificaciones: [],
  usuarios: [
    {
      nombre: "Usuario 1",
      datos: {
        tareas: [
          {
            nombre: "Tarea 1",
            descripcion: "Esta es la primera tarea de matemáticas",
            materia: "Matemáticas",
            estado: "undone",
            fecha: "2000-02-21",
            recordatorio: "2000-02-20",
            calificacion: "",
            url: "http://127.0.0.1:5501/editar-actividad.html?categoria=tareas&actividad=0",
          },
        ],
        examenes: [
          {
            nombre: "Examen 1",
            descripcion: "Este es el primer examen de matemáticas",
            materia: "Matemáticas",
            estado: "undone",
            fecha: "2000-02-21",
            recordatorio: "2000-02-20",
            calificacion: "7",
            url: "http://127.0.0.1:5501/editar-actividad.html?categoria=examenes&actividad=0",
          },
        ],
      },
    },
    {
      nombre: "Usuario 2",
      datos: {
        tareas: [
          {
            nombre: "Tarea 1",
            descripcion: "Esta es la primera tarea de matemáticas",
            materia: "Matemáticas",
            estado: "undone",
            fecha: "2000-02-21",
            recordatorio: "2000-02-20",
            calificacion: "10",
            url: "http://127.0.0.1:5501/editar-actividad.html?categoria=tareas&actividad=0",
          },
        ],
        examenes: [
          {
            nombre: "Examen 1",
            descripcion: "Este es el primer examen de matemáticas",
            materia: "Matemáticas",
            estado: "undone",
            fecha: "2000-02-21",
            recordatorio: "2000-02-20",
            calificacion: "10",
            url: "http://127.0.0.1:5501/editar-actividad.html?categoria=examenes&actividad=0",
          },
        ],
      },
    },
    {
      nombre: "Usuario 3",
      datos: {
        tareas: [
          {
            nombre: "Tarea 1",
            descripcion: "Esta es la primera tarea de matemáticas",
            materia: "Matemáticas",
            estado: "undone",
            fecha: "2000-02-21",
            recordatorio: "2000-02-20",
            calificacion: "10",
            url: "http://127.0.0.1:5501/editar-actividad.html?categoria=tareas&actividad=0",
          },
        ],
        examenes: [
          {
            nombre: "Examen 1",
            descripcion: "Este es el primer examen de matemáticas",
            materia: "Matemáticas",
            estado: "undone",
            fecha: "2000-02-21",
            recordatorio: "2000-02-20",
            calificacion: "10",
            url: "http://127.0.0.1:5501/editar-actividad.html?categoria=examenes&actividad=0",
          },
        ],
      },
    },
  ],
}

export const fetchData = async () => {
  // Simulate fetching data - in a real app this would be an API call
  localStorage.setItem("allData", JSON.stringify(initialData))
  localStorage.setItem("usuarioActivo", initialData.usuarioActivo)
  return initialData
}

export const getUserData = () => {
  const allData = JSON.parse(localStorage.getItem("allData"))
  const usuarioActivo = localStorage.getItem("usuarioActivo")

  if (!allData || !usuarioActivo) return null

  const userIndex = allData.usuarios.findIndex((u) => u.nombre === usuarioActivo)
  if (userIndex === -1) return null

  return allData.usuarios[userIndex].datos
}

export const setUserData = (datos) => {
  const allData = JSON.parse(localStorage.getItem("allData"))
  const usuarioActivo = localStorage.getItem("usuarioActivo")

  if (!allData || !usuarioActivo) return

  const userIndex = allData.usuarios.findIndex((u) => u.nombre === usuarioActivo)
  if (userIndex === -1) return

  allData.usuarios[userIndex].datos = datos
  localStorage.setItem("allData", JSON.stringify(allData))
}

export const getNotifications = () => {
  const allData = JSON.parse(localStorage.getItem("allData"))
  return allData && allData.notificaciones ? allData.notificaciones : []
}

export const setNotifications = (notificaciones) => {
  const allData = JSON.parse(localStorage.getItem("allData"))
  if (!allData) return

  allData.notificaciones = notificaciones
  localStorage.setItem("allData", JSON.stringify(allData))
}

export const addNotification = (msg) => {
  const notificaciones = getNotifications()
  notificaciones.unshift({
    mensaje: msg,
    fecha: new Date().toISOString(),
  })
  setNotifications(notificaciones)
}

export const checkAndNotifyReminder = (actividad) => {
  if (!actividad || !actividad.recordatorio) return

  const today = new Date()
  const rec = new Date(actividad.recordatorio)

  if (
    today.getFullYear() === rec.getFullYear() &&
    today.getMonth() === rec.getMonth() &&
    today.getDate() === rec.getDate()
  ) {
    addNotification(`Recordatorio: "${actividad.nombre}" (${actividad.materia}) es para hoy.`)
  }
}

export const checkTodayTasksAndNotify = () => {
  const allData = JSON.parse(localStorage.getItem("allData"))
  if (!allData || !allData.usuarios || !localStorage.getItem("usuarioActivo")) return

  const usuarioActivo = localStorage.getItem("usuarioActivo")
  const user = allData.usuarios.find((u) => u.nombre === usuarioActivo)
  if (!user || !user.datos) return

  const today = new Date()
  const { tareas = [], examenes = [] } = user.datos
    ;[...tareas, ...examenes].forEach((actividad) => {
      if (!actividad.recordatorio) return

      const fechaAct = new Date(actividad.recordatorio)
      if (
        fechaAct.getFullYear() === today.getFullYear() &&
        fechaAct.getMonth() === today.getMonth() &&
        fechaAct.getDate() === today.getDate()
      ) {
        addNotification(`Tienes la actividad "${actividad.nombre}" (${actividad.materia}) para hoy.`)
      }
    })
}