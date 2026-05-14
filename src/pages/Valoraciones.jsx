import { useEffect, useState } from "react"
import { paises } from "../data"


import Select from "../components/ui/Select"
import ValoracionesCard from "../components/ValoracionesCard"

import { API_URL } from "../config" // http://127.0.0.1:8000/api


export default function Valoraciones() {

    const [country, setCountry] = useState("");
    const [allTours, setAlltours] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/tours`)
            .then(res => res.json())
            .then(data => {
                setAlltours(data);
                setLoading(false);
            })
            .catch(err => console.error("Error fetching tours:", err));
    }, []);

    const toursFiltrados = country ? allTours.filter(t => t.pais.toLowerCase() === country.toLowerCase()) : allTours;


    function handleCountry(e) {
        setCountry(e.target.value);
    }

    if (loading) return <div className="text-center p-10">Cargando tours...</div>;


    return (
        <div className="py-10 ">

            <div className="styleSection items-center">

                <h1>Valoraciones</h1>

                <div className="w-full sm:w-75 mb-10">
                    <Select
                        name="country"
                        opciones={paises}
                        value={country}
                        onChange={handleCountry}
                        placeholder="País de interes" />
                </div>

                <div className="w-full flex flex-col">
                    {toursFiltrados.length > 0 ? (
                        toursFiltrados.map((tour, index) => (
                            <ValoracionesCard
                                key={tour.id}
                                tour={tour}
                                isFirst={index === 0} />

                        ))
                    ) : (
                        <p className="text-center py-10">No hay tours disponibles para este país.</p>
                    )}
                </div>
            </div>
        </div>
    )
}