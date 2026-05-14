import { NavLink } from "react-router-dom"

export default function AdminMenu() {

    const linkState = ({ isActive }) => isActive ? "font-bold" : "";


    return (
        <div className="bg-white/20 h-auto md:h-full flex flex-row md:flex-col justify-between rounded-none md:rounded-r-2xl p-5">

            <div className="flex flex-row md:flex-col gap-5">
                <NavLink to="/admin" className={linkState}>
                    <p className="text-sm md:text-xl">Tours</p>
                </NavLink>
                <NavLink to={"/fechas"} className={linkState}>
                    <p className="text-sm md:text-xl">Fechas/Precio</p>
                </NavLink>
                <NavLink to={"/reservaciones"} className={linkState}>
                    <p className="text-sm md:text-xl">Reservaciones</p>
                </NavLink>
            </div>
            <p className="hidden md:block text-sm md:text-xl">Configuracion</p>

        </div>
    )
}