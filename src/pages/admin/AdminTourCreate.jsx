import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast"

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import { error } from "three";

import { API_URL } from "../../config" // http://127.0.0.1:8000/api


const duraciones = [
    { id: 1, value: 1, label: "1 día" },
    { id: 2, value: 2, label: "2 días" },
    { id: 3, value: 3, label: "3 días" },
    { id: 4, value: 4, label: "4 días" }
];

const estados = [
    { id: 1, value: "activo", label: "Activo" },
    { id: 2, value: "inactivo", label: "Inactivo" }
];

const paisesOp = [
    { id: 1, value: "spain", label: "España" },
    { id: 2, value: "peru", label: "Perú" },
    { id: 3, value: "russia", label: "Rusia" },
];


export default function AdminTourCreate() {

    const navigate = useNavigate();

    const [titulo, setTitulo] = useState(""); // Andalucía: tesoros del sur
    const [pais, setPais] = useState(""); // spain
    const [ciudades, setCiudades] = useState([]); // ["Sevilla","Jerez","C\u00e1diz"]
    const [texto, setTexto] = useState(""); // Descubra el alma de Andalucía ...
    const [excursionesTitulo, setExcursionesTitulo] = useState(""); // ¡Tradiciones del Sur!
    const [ciudadesCant, setCiudadesCant] = useState(0);
    const [duracion, setDuracion] = useState(1);
    const [estado, setEstado] = useState("activo");

    const [imgPrincipal, setImgPrincipal] = useState(null);
    const [imgSection1, setImgSection1] = useState(null);
    const [imgIncluido, setImgIncluido] = useState(null);
    const [imgNoIncluido, setImgNoIncluido] = useState(null);


    // Функции-хендлеры, чтобы кнопки не отправляли форму (предотвращаем submit)
    const addCiudad = (e) => {
        e.preventDefault(); // Это важно, чтобы форма не перезагружалась
        if (ciudadesCant < 4) {
            setCiudadesCant(prev => prev + 1);
            setCiudades([...ciudades, ""]);
        }
    };

    const removeCiudad = (e) => {
        e.preventDefault();
        if (ciudadesCant > 0) {
            setCiudadesCant(prev => prev - 1);
            setCiudades(ciudades.slice(0, -1)); // удаляем последний элемент
        }
    };

    const handleCiudadChange = (index, value) => {
        const newCiudades = [...ciudades];
        newCiudades[index] = value;
        setCiudades(newCiudades);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const primerCiudad = ciudades[0] || "";

        const textoCompletoCiudades = ciudades.length > 0
            ? [...ciudades, ciudades[0]].join(" - ")
            : "";

        const formData = new FormData();

        formData.append("titulo", titulo);
        formData.append("pais", pais.toLowerCase().trim());
        formData.append("inicio_fin", primerCiudad.toUpperCase());
        formData.append("ciudades_texto", textoCompletoCiudades);
        formData.append("ciudades_list", JSON.stringify(ciudades));
        formData.append("texto", texto);
        formData.append("excursion_titulo", excursionesTitulo);
        formData.append("duracion", duracion);
        formData.append("status", estado);
        formData.append("cantidad", ciudadesCant);

        if (imgPrincipal) formData.append("imagen_principal", imgPrincipal);
        if (imgSection1) formData.append("imagen_section1", imgSection1);
        if (imgIncluido) formData.append("imagen_incluido", imgIncluido);
        if (imgNoIncluido) formData.append("imagen_no_incluido", imgNoIncluido);


        fetch(`${API_URL}/tours`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
            .then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    toast.error(data.message || 'No se pudo realizar la creacion');
                    return;
                }

                toast.success('Tour fue creado!');
                navigate("/admin");
            })
            .catch(error => {
                console.error("El error critico:", error);
                toast.error("Error de conexión con el servidor");
            });
    };




    return (
        <div className="w-full h-full p-5 bg-white/20 rounded-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                <div className="flex justify-between">
                    <h1>Crear Tour</h1>
                    <div className="flex gap-5">
                        <Button variant="secondary" type="submit">guardar</Button>
                        <Button onClick={() => navigate(-1)}>cancelar</Button>
                    </div>
                </div>

                <div className="flex gap-10">
                    <Input label={"Nombre del tour"} value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    <Select labelPosition="top" variant="black" label={"Pais"} value={pais} onChange={(e) => setPais(e.target.value)} opciones={paisesOp} />
                </div>
                <Input label={"Descripción"} value={texto} onChange={(e) => setTexto(e.target.value)} />
                <Input label={"Titulo de la excurcion"} value={excursionesTitulo} onChange={(e) => setExcursionesTitulo(e.target.value)} />


                <div className="flex flex-col gap-5 border-y border-white py-5">

                    <div className="flex items-center gap-5">
                        <h4>Ciudades en el tour:</h4>
                        <Button onClick={removeCiudad} disabled={ciudadesCant === 0}>-</Button>
                        <h4>{ciudadesCant}</h4>
                        <Button onClick={addCiudad} disabled={ciudadesCant === 4}>+</Button>
                    </div>

                    <div className="flex gap-3">
                        {ciudadesCant > 0 ? (
                            // Генерируем массив нужной длины и проходим по нему .map()
                            ciudades.map((ciudad, index) => (
                                <Input
                                    key={index}
                                    label={`Ciudad # ${index + 1}`}
                                    placeholder="Nombre de la ciudad"
                                    value={ciudad}
                                    onChange={(e) => handleCiudadChange(index, e.target.value)}
                                    className="max-w-70"
                                />
                            ))
                        ) : (
                            <p className="text-white/50 italic text-sm">
                                No hay ciudades añadidas. Pulsa "+" para agregar.
                            </p>
                        )}
                    </div>
                </div>


                <div className="flex gap-10">
                    <Select labelPosition="top" variant="black" label={"Duracion"} value={duracion} onChange={(e) => setDuracion(e.target.value)} opciones={duraciones} />
                    <Select labelPosition="top" variant="black" label={"Estado"} value={estado} onChange={(e) => setEstado(e.target.value)} opciones={estados} />
                </div>

                <div className="grid grid-cols-2 gap-5 border-t border-white py-5">
                    <Input value={imgPrincipal} label={"Imagen Principal"} type="file" onChange={(e) => setImgPrincipal(e.target.files[0])} accept="image/*" />
                    <Input value={imgSection1} label={"Imagen Seccion 1"} type="file" onChange={(e) => setImgSection1(e.target.files[0])} accept="image/*" />
                    <Input value={imgIncluido} label={"Imagen Incluido"} type="file" onChange={(e) => setImgIncluido(e.target.files[0])} accept="image/*" />
                    <Input value={imgNoIncluido} label={"Imagen No Incluido"} type="file" onChange={(e) => setImgNoIncluido(e.target.files[0])} accept="image/*" />
                </div>
            </form>

        </div>
    )
}