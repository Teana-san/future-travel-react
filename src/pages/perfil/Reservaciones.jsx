import { useState, useEffect } from "react" // Добавили хуки Реакта
import { NavLink } from "react-router-dom"
import ReservacionesCard from "../../components/ReservacionesCard"
import { API_URL } from "../../config" // Импортируем ссылку на бэкенд

const linkState = ({ isActive }) => isActive ? "font-bold" : "";

export default function Reservaciones() {
    // 1. Объявляем стейты для хранения данных и статуса загрузки
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    // 2. Делаем запрос к Ларавелю при загрузке страницы
    useEffect(() => {
        fetch(`${API_URL}/my-bookings`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}` // Передаем токен залогиненного юзера
            },
        })
            .then(res => res.json())
            .then(data => {
                setReservas(data); // Сохраняем полученные брони
                setLoading(false); // Выключаем статус загрузки
            })
            .catch(err => {
                console.error("Error al cargar mis reservas", err);
                setLoading(false);
            });
    }, [token]);

    // 3. Твоя верстка, которая теперь будет работать идеально
    return (
        <div className="flex py-10 px-14 gap-10">

            {/* Левое меню навигации профиля */}
            <div className="bg-white/20 h-fit px-6 py-12 rounded-2xl whitespace-nowrap flex flex-col gap-5">
                <NavLink to="." className={linkState}>
                    <p>Mis reservaciones</p>
                </NavLink>
                <NavLink to="/opiniones" className={linkState}>
                    <p>Mis valoraciones</p>
                </NavLink>
                <NavLink to="/user-config" className={linkState}>
                    <p>Configuración</p>
                </NavLink>
            </div>

            {/* Правый блок со списком бронирований */}
            <div className="bg-white/20 w-full px-6 py-12 rounded-2xl flex flex-col gap-5">
                <h1 className="text-center mb-5">Mis reservaciones</h1>

                {loading ? (
                    <p className="text-center opacity-70">Cargando...</p>
                ) : reservas.length === 0 ? (
                    <p className="text-center opacity-70">No tienes ninguna reserva activa todavía.</p>
                ) : (
                    reservas.map((res, index) => (
                        <div key={res.id} className="flex flex-col gap-5">
                            <ReservacionesCard reserva={res} />

                            {index < reservas.length - 1 && (
                                <span className="w-full h-0.5 bg-amber-50/20"></span>
                            )}
                        </div>
                    ))
                )}
            </div>

        </div>
    )
}