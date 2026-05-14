import { useState, useEffect } from "react";

import { fechas } from "../../data"
import borrar from "../../assets/svg/delete.svg"
import editar from "../../assets/svg/edit.svg"
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";

import { API_URL } from "../../config" // http://127.0.0.1:8000/api


export default function AdminCalendar() {

    const [allDates, setAllDates] = useState([]); // Храним вообще все даты из БД
    const [selectedTourId, setSelectedTourId] = useState(""); // ID выбранного тура
    const [fechasGrupadas, setFechasGrupadas] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/fechas`)
            .then(res => res.json())
            .then(data => {
                setAllDates(data);
                if (data.length > 0) {
                    setSelectedTourId(data[0].tour_id.toString());
                }
                setLoading(false);
            })
            .catch(err => console.error("Error al cargar fechas", err));
    }, []);

    useEffect(() => {
        if (allDates.length === 0) return;

        // 1. Фильтруем даты только для выбранного тура
        const filtered = allDates.filter(d => d.tour_id.toString() === selectedTourId);

        // 2. Группируем отфильтрованные даты по месяцам
        const grouped = filtered.reduce((acc, curr) => {
            const mes = curr.mes;
            if (!acc[mes]) acc[mes] = [];
            acc[mes].push(curr);
            return acc;
        }, {});
        setFechasGrupadas(grouped);
    }, [selectedTourId, allDates]);

    const uniqueTours = Array.from(new Set(allDates.map(d => JSON.stringify({id: d.tour_id, titulo: d.tour?.titulo}))))
                             .map(str => JSON.parse(str));

    if (loading) return <div className="text-white">Cargando fechas...</div>;

    const allMeses = Object.keys(fechas);

    return (
        <div className="w-full h-full p-2 sm:p-5 bg-white/20 rounded-2xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1>Fechas y Precios</h1>
                
                <div className="flex flex-col">
                    <Select 
                        label={"Seleccionar Tour:"}
                        labelPosition="top"
                        name="tours"
                        value={selectedTourId} 
                        opciones={uniqueTours}
                        onChange={(e) => setSelectedTourId(e.target.value)} 
                        variant="whiteBG"
                        className="w-full md:w-80"
                    >
                        {uniqueTours.map(tour => (
                            <option key={tour.id} value={tour.id}>
                                {tour.titulo || `Tour ID: ${tour.id}`}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>

            <div className="flex flex-col items-center">
                {Object.keys(fechasGrupadas).length > 0 ? (
                    Object.keys(fechasGrupadas).map((mes, index, arr) => (
                        <div key={mes} className={`w-full max-w-2xl grid sm:grid-cols-3 items-start py-5 border-white ${index !== arr.length - 1 ? "border-b-2" : ""}`}>
                            <h2 className="capitalize text-center col-span-2 sm:col-span-1 sm:text-left">{mes}</h2>
                            <div className="col-span-2">
                                {fechasGrupadas[mes].map(date => (
                                    <div key={date.id} className="flex justify-between items-center pb-4 last:pb-0">
                                        <h4>{date.label}</h4>
                                        <h4 className="font-bold">{date.precio} €</h4>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <Button variant="circle" icon={editar}></Button>
                                            <Button variant="circle" icon={borrar}></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white opacity-60">No hay fechas para este tour.</p>
                )}
            </div>
        </div>
    );
}