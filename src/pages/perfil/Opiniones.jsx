import { NavLink } from "react-router-dom"
import ValoracionesCard from "../../components/ValoracionesCard";
import Button from "../../components/ui/Button"

const linkState = ({ isActive }) => isActive ? "font-bold" : "";

export default function Opiniones() {


    return (
        <div className="flex py-10 px-14 gap-10">

            <div className="bg-white/20 h-fit px-6 py-12 rounded-2xl whitespace-nowrap flex flex-col gap-5">
                <NavLink to="/reserva" className={linkState}>
                    <p>Mis reservaciones</p>
                </NavLink>
                <NavLink to="." className={linkState}>
                    <p>Mis valoraciones</p>
                </NavLink>
                <NavLink to="/user-config" className={linkState}>
                    <p>Configuración</p>
                </NavLink>
            </div>

            <div className="bg-white/20 w-full px-6 py-12 rounded-2xl flex flex-col gap-5 items-center">
                <h1>Mis valoraciones</h1>

                <div className="max-h-80 overflow-y-scroll">
                    <ValoracionesCard>
                        <div className="flex justify-center gap-5">
                            <Button>editar</Button>
                            <Button>borrar</Button>
                        </div>
                    </ValoracionesCard>

                    <ValoracionesCard>
                        <div className="flex justify-center gap-5">
                            <Button>editar</Button>
                            <Button>borrar</Button>
                        </div>
                    </ValoracionesCard>
                </div>
            </div>
        </div>
    )
}
