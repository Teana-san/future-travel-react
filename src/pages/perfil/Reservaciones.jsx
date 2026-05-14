import { NavLink } from "react-router-dom"
import ReservacionesCard from "../../components/ReservacionesCard"

const linkState = ({ isActive }) => isActive ? "font-bold" : "";


export default function Reservaciones() {


    return (
        <div className="flex py-10 px-14 gap-10">

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

            <div className="bg-white/20 w-full px-6 py-12 rounded-2xl flex flex-col gap-5">
                <h1 className="text-center">Mis reservaciones</h1>
                <ReservacionesCard />
                <span className="w-full h-0.5 bg-amber-50 "></span>
                <ReservacionesCard />

            </div>


        </div>
    )
}
