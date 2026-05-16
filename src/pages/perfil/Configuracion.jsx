import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"

import madrid from "../../assets/fotoTour/spain/madrid.png"

import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import { API_URL } from "../../config"

const linkState = ({ isActive }) => isActive ? "font-bold" : "";

export default function Configuracion() {

    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`${API_URL}/user`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Error al obtener perfil");
                return res.json();
            })
            .then(data => {
                setNombre(data.name || "");
                setApellidos(data.surname || "");
                setCorreo(data.email || "");
                setTelefono(data.phone || "");
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [token]);

    if (loading) return <div className="text-white text-center py-20">Cargando perfil...</div>;

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

                <form className="w-full grid grid-cols-2 gap-5" onSubmit={(e) => e.preventDefault()}>
                    <Input 
                        placeholder="Nombre" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                    />
                    <Input 
                        placeholder="Apellidos" 
                        value={apellidos} 
                        onChange={(e) => setApellidos(e.target.value)} 
                    />
                    <Input 
                        placeholder="Correo" 
                        value={correo} 
                        onChange={(e) => setCorreo(e.target.value)} 
                        disabled
                    />
                    <Input 
                        placeholder="Telefono" 
                        value={telefono} 
                        onChange={(e) => setTelefono(e.target.value)} 
                    />
                    
                    <Input placeholder="Apodo" />
                    <Input placeholder="F.D.N." />

                    <div className="col-span-2 flex justify-center">
                        <Button type="submit">confirmar</Button>
                    </div>
                </form>
            </div>

        </div>
    )
}