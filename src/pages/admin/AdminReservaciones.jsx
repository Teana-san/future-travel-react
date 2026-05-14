import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Button from "../../components/ui/Button"

import { API_URL } from "../../config" // http://127.0.0.1:8000/api

export default function AdminReservaciones() {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`${API_URL}/bookings`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(data => {
                setReservas(data);
                setLoading(false);
            })
            .catch(err => console.error("Error al cargar reservas", err));
    }, []);

    const estadoColor = (estado) => {
        switch (estado) {
            case "confirmado": return 'text-green-600 font-bold';
            case "pendiente": return 'text-yellow-400 font-bold';
            case "cancelado": return 'text-red-600 font-bold';
            default: return 'text-blue-400 font-bold';
        }
    };

    if (loading) return <div className="text-white">Cargando reservaciones...</div>;

    return (
        <div className="w-full h-full p-5 bg-white/20 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="pb-10">Las Reservaciones</h1>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-center">
                    <thead className="border-b-2 border-white">
                        <tr>
                            <th className="py-3 text-xl">Usuario</th>
                            <th className="text-xl">Pais</th>
                            <th className="text-xl">Nombre del tour</th>
                            <th className="text-xl">Personas</th>
                            <th className="text-xl">Estado</th>
                            <th className="text-xl">Total (€)</th>
                            <th className="text-xl">Cama</th>
                            <th className="text-xl">Cama extra</th>
                            <th className="text-xl">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map(res => (
                            <tr key={res.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                <td className="py-3 text-center">
                                    <p className="font-bold">{res.nombre} {res.apellido}</p>
                                    <p className="text-xs opacity-60">{res.email}</p>
                                </td>
                                <td className="capitalize">{res.tour?.pais || '—'}</td>
                                <td>{res.tour?.titulo || 'Tour eliminado'}</td>
                                <td>{res.adultos + res.ninos}</td>
                                <td className={estadoColor(res.status || "pendiente")}>
                                    {res.status || "pendiente"}
                                </td>
                                <td className="font-bold">{res.precio_total} €</td>
                                <td className="font-bold">{res.tipo_cama}</td>
                                <td className="font-bold">{res.cama_extra ? "Sí" : "No"}</td>
                                <td className="h-full">
                                    <div className="flex items-center justify-center h-full">
                                        <Link to={`/res-cambiar/${res.id}`}>
                                            <Button variant="circle">ver mas</Button>
                                        </Link>
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}