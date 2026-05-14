import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import toast from "react-hot-toast"

import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import Select from "../../components/ui/Select"

import { API_URL } from "../../config" // http://127.0.0.1:8000/api

const estados = [
    { id: 1, value: "confirmado", label: "confirmado" },
    { id: 2, value: "pendiente", label: "pendiente" },
    { id: 3, value: "cancelado", label: "cancelado" }
];

const camas = [
    { id: 1, value: "queen", label: "queen" },
    { id: 2, value: "twin", label: "twin" }
];

const opcionesCamaExtra = [
    { id: 1, value: "1", label: "Sí" },
    { id: 2, value: "0", label: "No" }
];



export default function AdminResCambiar() {

    const token = localStorage.getItem("token");

    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");

    const [nombre2, setNombre2] = useState("");
    const [apellido2, setApellido2] = useState("");

    const [email, setEmail] = useState("");

    const [pais, setPais] = useState("");
    const [titulo, setTitulo] = useState("");

    const [telefono, setTelefono] = useState("");
    const [adultos, setAdultos] = useState(0);
    const [ninos, setNinos] = useState(0);

    const [estado, setEstado] = useState("pendiente");
    const [totalPrecio, setTotalPrecio] = useState("");

    const [cama, setCama] = useState("");
    const [camaExtra, setCamaExtra] = useState("");


    useEffect(() => {
        fetch(`${API_URL}/bookings/${id}`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setNombre(data.nombre);
                setApellido(data.apellido);

                setEmail(data.email);
                setTelefono(data.telefono);

                setPais(data.tour.pais);
                setTitulo(data.tour.titulo);

                setAdultos(Number(data.adultos));
                setNinos(Number(data.ninos));
                setEstado(data.status);

                setTotalPrecio(data.precio_total);
                setCama(data.tipo_cama);
                setCamaExtra(String(data.cama_extra));

                setNombre2(data.nombre2);
                setApellido2(data.apellido2);

                // console.log(data)

            })
            .catch(error => console.log("Error al cargar", error));
    }, [id]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const loadingToast = toast.loading("Actualizando reserva...");

        const bookingData = {
            nombre,
            apellido,
            email,
            telefono,
            adultos: parseInt(adultos) || 0,
            ninos: parseInt(ninos) || 0,
            status: estado,
            precio_total: parseFloat(totalPrecio),
            tipo_cama: cama,
            cama_extra: camaExtra === "1" || camaExtra === 1 ? 1 : 0,
            nombre2,
            apellido2
        };

        fetch(`${API_URL}/bookings/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(bookingData)
        })
            .then(async (res) => {
                const data = await res.json();
                if (res.ok) {
                    toast.success("Reserva actualizada con éxito", { id: loadingToast });
                    navigate("/reservaciones");
                } else {
                    console.log(data.errors);
                    toast.error("Error al actualizar", { id: loadingToast });
                }
            })
            .catch(err => {
                console.error(err);
                toast.error("Error de conexión", { id: loadingToast });
            });
    };


    return (
        <div className="w-full h-full p-5 bg-white/20 rounded-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                <div className="flex justify-between">
                    <h1>Cambiar una Reservacion</h1>
                    <div className="flex gap-5">
                        <Button variant="secondary" type="submit">guardar</Button>
                        <Button onClick={() => navigate(-1)}>cancelar</Button>
                    </div>
                </div>


                <div className="grid grid-cols-2 gap-10">
                    <Input label={"Nombre del turisto 1"} value={nombre} onChange={e => setNombre(e.target.value)} />
                    <Input label={"Apellido del turisto 1"} value={apellido} onChange={e => setApellido(e.target.value)} />
                </div>

                <div className="grid grid-cols-2 gap-10">
                    <Input label={"Email del turisto 1"} value={email} onChange={e => setEmail(e.target.value)} />
                    <Input label={"Telefono del turisto 1"} value={telefono} onChange={e => setTelefono(e.target.value)} />
                </div>

                <div className="grid grid-cols-2 gap-10">
                    <Input className="capitalize" label={"Pais del tour"} value={pais} onChange={e => setPais(e.target.value)} />
                    <Input label={"Nombre del tour"} value={titulo} onChange={e => setTitulo(e.target.value)} />
                </div>

                <div className="grid grid-cols-3 gap-10">
                    <Input label={"Adultos"} value={adultos} onChange={e => setAdultos(e.target.value)} />
                    <Input label={"Niños"} value={ninos} onChange={e => setNinos(e.target.value)} />
                    <Select labelPosition="top" variant="black" label={"Estado"} value={estado} opciones={estados} onChange={e => setEstado(e.target.value)} />
                </div>

                <div className="grid grid-cols-3 gap-10">
                    <Select labelPosition="top" variant="black" label={"Cama"} value={cama} opciones={camas} onChange={e => setCama(e.target.value)} />
                    <Select labelPosition="top" variant="black" label={"Cama Extra"} value={camaExtra} opciones={opcionesCamaExtra} onChange={e => setCamaExtra(e.target.value)} />
                    <Input label={"Precio total €"} value={totalPrecio} onChange={e => setTotalPrecio(e.target.value)} />
                </div>

                {nombre2 && apellido2 && (
                    <div className="grid grid-cols-2 gap-10">
                        <Input label={"Nombre del turisto 2"} value={nombre2} onChange={e => setNombre2(e.target.value)} />
                        <Input label={"Apellido del turisto 2"} value={apellido2} onChange={e => setApellido2(e.target.value)} />
                    </div>
                )}

            </form>



        </div>
    )
}