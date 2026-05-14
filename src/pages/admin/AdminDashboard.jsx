import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

import toast from "react-hot-toast"

import borrar from "../../assets/svg/delete.svg"
import editar from "../../assets/svg/edit.svg"

import Button from "../../components/ui/Button"
import ModalAdmin from "../../components/ui/ModalAdmin"

import { API_URL } from "../../config" // http://127.0.0.1:8000/api


export default function AdminDashboard() {

    const [allTours, setAllTours] = useState([]);
    const [loading, setLoading] = useState(true);

    // Храним ID тура, который хотим удалить (если null — модалка закрыта)
    const [tourToDelete, setTourToDelete] = useState(null);

    const selectedTourData = allTours.find(el => el.id === tourToDelete);

    useEffect(() => {
        fetch(`${API_URL}/tours`)
            .then(res => res.json())
            .then(data => {
                setAllTours(data);
                setLoading(false);
            })
            .catch(err => {
                console.log("Error al cargar datos", err);
                toast.error("No se pudieron cargar los tours");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-white">Cargando tours...</div>;


    return (
        <div className="w-full h-full p-5 bg-white/20 rounded-2xl">
            <div className="flex justify-between items-center">
                <h1 className="pb-10">Los tours</h1>
                <Link to="/tour-create">
                    <Button>create</Button>
                </Link>
            </div>


            <div className="overflow-x-auto w-full">
                <table className="w-full text-center min-w-200">
                    <thead className="border-b-2 border-white">
                        <tr>
                            <th className="py-3 text-2xl">Pais</th>
                            <th className="text-2xl">Ciudad Inicio</th>
                            <th className="text-2xl">Nombre del tour</th>
                            <th className="text-2xl">Duracion</th>
                            <th className="text-2xl">Estado</th>
                            <th className="text-2xl">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allTours.map(tour => {
                            const isSelected = tour.id === tourToDelete; // в этой переменной будет храниться true/false, а id тура записано в tourToDelete при кнопку на удалить

                            return (
                                <tr key={tour.id} className={`${isSelected ? "bg-red-300" : ""}`}>
                                    <td className="py-3 capitalize">{tour.pais}</td>
                                    <td>{tour.ciudades_list?.[0] || 'No definida'}</td>
                                    <td>{tour.titulo}</td>
                                    <td>{tour.duracion} días</td>
                                    <td>{tour.status === 1 || tour.status === 'activo' ? "Activo" : "Inactivo"}</td>
                                    <td>
                                        <div className="flex gap-5 justify-center items-center">
                                            <Link to={`/tour-cambiar/${tour.id}`}>
                                                <Button variant="circle" icon={editar}></Button>
                                            </Link>
                                            <Button variant="circle" icon={borrar} onClick={() => setTourToDelete(tour.id)}></Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>


            {tourToDelete && (
                <ModalAdmin
                    tourName={selectedTourData?.titulo} // ?. позволяет избежать белого экрана, если selectedTourData найден, то вернет titulo, если нет, то undefined
                    onClose={() => setTourToDelete(null)}
                    onConfirm={() => {
                        const token = localStorage.getItem("token");
                        const loadingToast = toast.loading("Borrando tour...");

                        fetch(`${API_URL}/tours/${tourToDelete}`, {
                            method: "DELETE",
                            headers: {
                                "Accept": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                        })
                            .then(async (res) => {
                                if (res.ok) {
                                    setAllTours(prev => prev.filter(tour => tour.id !== tourToDelete));
                                    toast.success("El tour fue borrado", { id: loadingToast });
                                } else {
                                    const errorData = await res.json();
                                    throw new Error(errorData.message || "Error al borrar");
                                }
                            })
                            .catch(err => {
                                toast.error(err.message || "Error de conexión con el servidor", { id: loadingToast })
                            })
                            .finally(() => {
                                setTourToDelete(null);
                            });
                    }}
                />
            )}

        </div>
    )
}