import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom"

import toast from "react-hot-toast"

import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import Checkbox from "../components/ui/Checkbox"

import { API_URL } from "../config" // http://127.0.0.1:8000/api

export default function ExcursionDatos() {

    const { onLogin, user } = useOutletContext();

    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [currentTour, setCurrentTour] = useState(null);
    const [loading, setLoading] = useState(true);

    const [nombre, setNombre] = useState(user ? user.name : "");
    const [apellido, setApellido] = useState(user ? user.surname : "");
    const [email, setEmail] = useState(user ? user.email : "");
    const [telefono, setTelefono] = useState(user ? user.phone : "");

    const [nombre2, setNombre2] = useState("");
    const [apellido2, setApellido2] = useState("");

    const [acceptedTerms, setAcceptedTerms] = useState({ terms: false, policy: false, consent: false });

    const { tour, date, precioFinal, adultos, ninos, cama, extraCama } = location.state || {};


    useEffect(() => {
        fetch(`${API_URL}/tours/${id}`)
            .then(res => res.json())
            .then(data => {
                setCurrentTour(data);
                setLoading(false);
            })
            .catch(err => console.error("Error loading config:", err));
    }, [id]);

    useEffect(() => {
        if (user) {
            setNombre(user.name || "");
            setApellido(user.surname || "");
            setEmail(user.email || "");
            setTelefono(user.phone || "");
        }
    }, [user]);


    if (loading) return <div className="text-white text-center p-20">Cargando configuración...</div>;
    if (!currentTour) return <div className="text-white text-center p-20">Error: Tour no encontrado</div>;

    if (!tour || !date) return <div className="text-white text-center p-20">No hay datos de reserva</div>;

    const IVA = 21;
    const precioIva = precioFinal ? (precioFinal / (100 + IVA) * IVA) : 0;

    function handleNombre(e) {
        setNombre(e.target.value);
    }

    function handleApellido(e) {
        setApellido(e.target.value);
    }

    function handleNombre2(e) {
        setNombre2(e.target.value);
    }

    function handleApellido2(e) {
        setApellido2(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handleTelefono(e) {
        setTelefono(e.target.value);
    }

    function handleCheckboxChange(name) {
        setAcceptedTerms(prev => ({
            ...prev, [name]: !prev[name]
        }));
    }

    const isButtonDisabled = !acceptedTerms.terms || !acceptedTerms.policy || !acceptedTerms.consent;

    const handleBooking = async () => {

        if (adultos === 2 && (!nombre2.trim() || !apellido2.trim())) {
            toast.error("Por favor rellena los datos de todos los turistos");
            return; // Останавливаем выполнение
        }
        const bookingData = {
            tour_id: id,
            nombre: nombre,
            apellido: apellido,
            email: email,
            telefono: telefono,
            adultos: adultos,
            ninos: ninos,
            status: "pendiente",
            precio_total: precioFinal,
            tipo_cama: cama,
            cama_extra: extraCama ? 1 : 0,
            nombre2: adultos === 2 ? nombre2 : null,
            apellido2: adultos === 2 ? apellido2 : null
        };

        try {
            const response = await fetch(`${API_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });

            const data = await response.json();

            // los errores de validacion
            if (data.errors) {
                Object.values(data.errors).forEach(err => {
                    toast.error(err[0]);
                });
                return;
            }

            if (response.ok) {
                toast.success('Reserva fue creada con exito!');
                navigate('/exito');
            } else {
                toast.error(data.message || 'Error al procesar la reserva');
            }
        } catch (error) {
            console.error("Error enviando reserva:", error);
            toast.error("Error de conexión con el servidor");
        }
    };


    return (
        <div>
            <section className="styleSection">

                <div className="flex items-baseline gap-5">
                    <h1 className='text-center sm:text-left'>{currentTour.titulo}</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5">

                    <div className="flex items-baseline gap-5">
                        <h4 className='font-semibold'>País:</h4>
                        <h4 className='capitalize'>{currentTour.pais}</h4>
                    </div>

                    <div className="flex items-baseline gap-5">
                        <h4 className='font-semibold'>Ciudades:</h4>
                        <h4>{currentTour.ciudades_texto}</h4>
                    </div>

                    <div className="flex items-baseline gap-5">
                        <h4 className='font-semibold'>Fechas:</h4>
                        <h4>{date.label} ({currentTour.duracion} dias)</h4>
                    </div>

                    <div className="flex items-baseline gap-5">
                        <h4 className='font-semibold'>Alojamiento:</h4>
                        <h4>
                            Cama {cama === 'twin' ? 'doble (Twin)' : 'Queen Size'}
                            {extraCama && " + Cama adicional para niño"}
                        </h4>
                    </div>

                    <div className="flex flex-col sm:flex-row items-baseline">
                        <div className='flex gap-5'>
                            <h4 className='font-semibold'>Precio:</h4>
                            <h4>{precioFinal} €</h4>
                        </div>
                        <div className="flex items-center gap-2">
                            (<h4>adultos:</h4>
                            <h4>{adultos}</h4>
                            /
                            <h4>niños:</h4>
                            <h4>{ninos}</h4>)
                        </div>
                    </div>

                </div>

                <p className="w-full h-0.5 bg-white"></p>

                <div className="flex flex-col gap-5 items-center">
                    <div className="flex flex-col md:flex-row items-center gap-5">
                        <h2>Datos de la persona 1</h2>
                        <Checkbox variant="labelButton" label={"comprador"} checked={true} />
                    </div>

                    <form action="" className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Input placeholder="Nombre" value={nombre} name="nombre" onChange={handleNombre} />
                        <Input placeholder="Apellido" value={apellido} name="apellido" onChange={handleApellido} />
                        <Input placeholder="Correo" value={email} name="email" onChange={handleEmail} />
                        <input placeholder="Telefono" type="tel" name="telefono" required pattern="[0-9\s\-\+\(\)]+"
                            title="El teléfono solo debe contener números, espacios o símbolos (+, -, parentesis)"
                            value={telefono}
                            onChange={handleTelefono}
                        />
                    </form>
                    <p>Estos datos se utilizarán para confirmar la reserva y crear una cuenta personal.</p>

                </div>

                {(adultos === 2) && (
                    <div className="flex flex-col gap-5 items-center">
                        <p className="w-full h-0.5 bg-white"></p>

                        <div className="flex flex-col md:flex-row items-center gap-5">
                            <h2>Datos de la persona 2</h2>
                        </div>
                        <form action="" className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Input placeholder="Nombre" value={nombre2} onChange={handleNombre2} />
                            <Input placeholder="Apellido" value={apellido2} onChange={handleApellido2} />
                        </form>
                    </div>
                )}

                <p className="w-full h-0.5 bg-white"></p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    <div className="flex flex-col items-center gap-5 md:gap-10 lg:border-r-2 border-white">
                        <div>
                            <h3>Suma total: {precioFinal} €</h3>
                            <h3>IVA (incluido): {precioIva.toFixed(2)} €</h3>
                        </div>
                        <div className="flex gap-5">
                            <Button onClick={() => navigate(-1)}>volver</Button>
                            <Button onClick={handleBooking} disabled={isButtonDisabled}>pagar</Button>
                        </div>
                    </div>
                    <div className="lg:col-span-2 flex flex-col justify-center">
                        <Checkbox variant="labelBlack" label={"He leído y acepto los términos del contrato de oferta para la prestación del producto turístico."} checked={acceptedTerms.terms} onChange={() => handleCheckboxChange('terms')} />
                        <Checkbox variant="labelBlack" label={"Confirmo que he leído y comprendido la política de tratamiento de datos personales."} checked={acceptedTerms.policy} onChange={() => handleCheckboxChange('policy')} />
                        <Checkbox variant="labelBlack" label={"Doy mi consentimiento para el tratamiento de mis datos personales."} checked={acceptedTerms.consent} onChange={() => handleCheckboxChange('consent')} />
                    </div>
                </div>

            </section>




        </div>
    )
}