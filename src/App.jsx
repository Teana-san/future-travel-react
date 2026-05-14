import { Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"

import Scroll from "./components/Scroll"
import { Toaster } from "react-hot-toast"

import MainLayout from "./layout/MainLayout"
import ExcursionLayout from "./layout/ExcursionLayout"
import AdminLayout from "./layout/AdminLayout"

import Home from "./pages/Home"

import Excursion from "./pages/Excursion"
import ExcursionConfig from "./pages/ExcursionConfig"
import ExcursionDatos from "./pages/ExcursionDatos"
import ExitoBooking from "./pages/ExitoBooking"

import Valoraciones from "./pages/Valoraciones"
import Contacto from "./pages/Contacto"
import SobreNosotros from "./pages/SobreNosotros"

import Login from "./pages/Login"
import Configuracion from "./pages/perfil/Configuracion"
import Opiniones from "./pages/perfil/Opiniones"
import Reservaciones from "./pages/perfil/Reservaciones"

import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminCalendar from "./pages/admin/AdminCalendar"
import AdminReservaciones from "./pages/admin/AdminReservaciones"
import AdminResCambiar from "./pages/admin/AdminResCambiar"
import AdminTourCreate from "./pages/admin/AdminTourCreate"
import AdminTourCambiar from "./pages/admin/AdminTourCambiar"

import NotFound from "./pages/NotFound"


export default function App() {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function handleLogin(userData, token) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token); // guardamos el token
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <>
      <Scroll />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000
        }} />

      <Routes>
        <Route element={<MainLayout user={user} onLogin={handleLogin} onLogout={handleLogout} />}>
          <Route path="/" element={<Home />} />

          <Route path="/valoraciones" element={<Valoraciones />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />


          {/* Если юзер уже вошел, незачем ему видеть страницу логина — редиректим на главную */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

          {/* ЗАЩИТА ЛИЧНОГО КАБИНЕТА: Если нет юзера, отправляем на логин */}
          <Route path="/user-config" element={user ? <Configuracion /> : <Navigate to="/login" />} />
          <Route path="/opiniones" element={user ? <Opiniones /> : <Navigate to="/login" />} />
          <Route path="/reserva" element={user ? <Reservaciones /> : <Navigate to="/login" />} />


          <Route path="/exc-config/:id" element={<ExcursionConfig />} />
          <Route path="/exc-datos/:id" element={<ExcursionDatos />} />

          <Route path="/exito" element={<ExitoBooking />} />

          <Route path="*" element={<NotFound />} />
        </Route>


        <Route element={<ExcursionLayout user={user} handleLogin={handleLogin} onLogout={handleLogout} />}>
          <Route path="/exc/:id" element={<Excursion />} />
        </Route>


        {/* ГРУППА 3: АДМИНКА (Самая строгая защита) */}
        {/* Проверяем не просто наличие user, а поле role из базы Laravel */}
        <Route element={user?.role === "admin" ? <AdminLayout user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/fechas" element={<AdminCalendar />} />
          <Route path="/reservaciones" element={<AdminReservaciones />} />
          <Route path="/res-cambiar/:id" element={<AdminResCambiar />} />
          <Route path="/tour-create" element={<AdminTourCreate />} />
          <Route path="/tour-cambiar/:id" element={<AdminTourCambiar />} />
        </Route>

      </Routes>

    </>
  )
}

