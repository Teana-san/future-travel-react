import { NavLink } from "react-router-dom"

import madrid from "../../assets/fotoTour/spain/madrid.png"

import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"


const linkState = ({ isActive }) => isActive ? "font-bold" : "";

export default function Configuracion() {


    return (
        <div className="flex py-10 px-14 gap-10 ">

            <div className="bg-white/20 h-fit px-6 py-12 rounded-2xl whitespace-nowrap flex flex-col gap-5">
                <NavLink to="/reserva" className={linkState}>
                    <p>Mis reservaciones</p>
                </NavLink>
                <NavLink to="/opiniones" className={linkState}>
                    <p>Mis valoraciones</p>
                </NavLink>
                <NavLink to="." className={linkState}>
                    <p>Configuración</p>
                </NavLink>
            </div>

            <div className="bg-white/20 w-full px-6 py-12 rounded-2xl flex flex-col gap-5 items-center">
                <h1>Mi perfil</h1>

                <div className="flex justify-center items-center gap-5">
                    <img className="size-24 rounded-full object-cover" src={madrid} alt="" />

                    <div className="flex flex-col gap-2">
                        <div className="flex gap-5">
                            <Button>editar</Button>
                            <Button>borrar</Button>
                        </div>
                        <span className="text-black">El tamaño maximo es 8 mB.</span>
                    </div>
                </div>

                <form className="w-full grid grid-cols-2 gap-5" action="">
                    <Input placeholder="Nombre" />
                    <Input placeholder="Apellidos" />
                    <Input placeholder="Correo" />
                    <Input placeholder="Telefono" />
                    <Input placeholder="Apodo" />
                    <Input placeholder="F.D.N." />

                    <div className="col-span-2 flex justify-center">
                        <Button>confirmar</Button>
                    </div>
                </form>
            </div>

        </div>
    )
}
