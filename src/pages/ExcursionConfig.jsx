import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Select from "../components/ui/Select"
import Button from "../components/ui/Button"
import Checkbox from '../components/ui/Checkbox';

import SliderIncluido from "../components/slider/SliderIncluido"

import queen from "../assets/queen.svg"
import twin from "../assets/twin.svg"

import { API_URL } from "../config" // http://127.0.0.1:8000/api
import { STORAGE_URL } from "../config"; // // http://127.0.0.1:8000/storage


export default function ExcursionConfig() {

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    // позволяет нам считать url и за счет state указанных на предыдущей странице у Link - state={{ mesElegido: mes, diaElegido: dia, precioFinal: precioActual }} - все это тоже подхватит наш location

    // Состояние для данных из БД
    const [currentTour, setCurrentTour] = useState(null); // Стейт для данных из БД
    const [loading, setLoading] = useState(true);

    const { mesElegido, diaElegido } = location.state || {}; // вытаскиваем state из location - названия должны быть ОДИНАКОВЫМИ с тем, что указали в Link на предыдущей странице

    const [mes, setMes] = useState(mesElegido || ""); // указываем как начальное значение то, что вытащили из location
    const [dia, setDia] = useState(diaElegido || ""); // указываем как начальное значение то, что вытащили из location

    const [adultos, setAdultos] = useState(1);
    const [ninos, setNinos] = useState(0);
    const [edad, setEdad] = useState(0);

    const [camaTipo, setCamaTipo] = useState("queen");
    const [extraCama, setExtraCama] = useState(false);

    const PRECIO_EXTRA_CAMA = 10;

    
    // --- FETCH ИЗ LARAVEL ---
    useEffect(() => {
        fetch(`${API_URL}/tours/${id}`)
            .then(res => res.json())
            .then(data => {
                setCurrentTour(data);
                setLoading(false);
            })
            .catch(err => console.error("Error loading config:", err));
    }, [id]);


    if (loading) return <div className="text-white text-center p-20">Cargando configuración...</div>;
    if (!currentTour) return <div className="text-white text-center p-20">Error: Tour no encontrado</div>;


    /* FECHAS */
    const allDates = currentTour.tour_dates || []; // tour_dates это название таблицы с датами из БД

    const uniqueMonths = [... new Set(allDates.map(d => d.mes))];
    const meses = uniqueMonths.map(mes => ({
        id: mes,
        value: mes,
        label: mes.charAt(0).toUpperCase() + mes.slice(1)
    }));

    function handleMes(e) {
        const selectedMes = e.target.value
        setMes(selectedMes);

        const datesInMonth = allDates.filter(el => el.mes === selectedMes);

        if (datesInMonth.length > 0) {
            setDia(datesInMonth[0].id.toString());
        } else {
            setDia("");
        }
    }


    const diasDelMes = allDates.filter(el => el.mes === mes);

    const diasOptions = diasDelMes.map(d => ({
        id: d.id,
        value: d.id.toString(), // value = id, как и в стейте dia
        label: d.dia_texto || d.label || d.value // то поле, которое показывается пользователю
    }));



    function handleDia(e) {
        setDia(e.target.value);
    }


    /*  ADULTOS/NIÑOS  */
    function handleAdultosMinus() {
        { !(adultos === 1) && setAdultos(prev => prev - 1) };
    }

    function handleAdultosPlus() {
        { !(adultos === 2) && setAdultos(prev => prev + 1) };
    }

    function handleNinosMinus() {
        { !(ninos === 0) && setNinos(prev => prev - 1) };
        setEdad(0);
    }

    function handleNinosPlus() {
        { !(ninos === 1) && setNinos(prev => prev + 1) };
    }

    function handleEdadMinus() {
        { !(edad === 0) && setEdad(prev => prev - 1) };
    }

    function handleEdadPlus() {
        { !(edad === 17) && setEdad(prev => prev + 1) };
    }


    /*  PRECIO  */

    const diaElegidoObject = allDates.find(el => String(el.id) === String(dia));
    
    const precioUnAdulto = diaElegidoObject ? diaElegidoObject.precio : null;

    let precioNinos = 0;

    if (ninos > 0) {
        if (edad < 4) {
            precioNinos = 0;
        } else if (edad < 12) {
            precioNinos = precioUnAdulto * 0.5 * ninos;
        } else {
            precioNinos = precioUnAdulto * ninos;
        }
    }

    const precioFinal = (precioUnAdulto * adultos) + precioNinos;

    const precioConExtras = precioFinal + (extraCama ? PRECIO_EXTRA_CAMA : 0);


    return (
        <div>

            <section className="styleSection relative">


                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_auto] gap-10 ">

                    <div className='relative h-48 lg:h-full'>
                        <img className="lg:absolute lg:inset-0 w-full h-full object-cover rounded-2xl" src={`${STORAGE_URL}/${currentTour.imagen_principal}`} alt={currentTour.titulo} />
                    </div>

                    <div className="flex flex-col gap-5">

                        <div className="flex flex-col sm:flex-row items-baseline gap-1 sm:gap-5">
                            <h4 className='font-semibold text-white'>Nombre del tour:</h4>
                            <h4>{currentTour.titulo}</h4>
                        </div>
                        <div className="flex flex-col sm:flex-row items-baseline gap-1 sm:gap-5">
                            <h4 className='font-semibold text-white'>País:</h4>
                            <h4 className="capitalize">{currentTour.pais}</h4>
                        </div>
                        <div className="flex flex-col sm:flex-row items-baseline gap-1 sm:gap-5">
                            <h4 className='font-semibold text-white'>Ciudades:</h4>
                            <h4>{currentTour.ciudades_texto}</h4>
                        </div>
                        <div className="flex flex-col sm:flex-row items-baseline gap-1 sm:gap-5">
                            <h4 className='font-semibold text-white'>Duracion:</h4>
                            <h4>{currentTour.duracion} dias</h4>
                        </div>
                        <div className="flex flex-col sm:flex-row items-baseline gap-1 sm:gap-5">
                            <h4 className='font-semibold text-white'>Plazas:</h4>
                            <h4>16 de {currentTour.cantidad}</h4>
                        </div>

                    </div>

                    <div className='w-full lg:w-70 bg-white p-5 rounded-2xl text-center flex flex-col justify-between'>
                        <div>
                            <h2>Precio</h2>
                            <h1 className={`text-blue ${precioFinal ? "visible" : "invisible"}`}>
                                {precioConExtras || "000"} €
                            </h1>
                        </div>
                        <p className='w-full my-5 lg:my-0 h-0.5 bg-black'></p>
                        <div>
                            <h4>Adultos: <span className='font-bold text-blue'>{adultos}</span></h4>
                            <h4>Niño: <span className='font-bold text-blue'>{ninos}</span> de <span className='font-bold text-blue'>{edad}</span> años</h4>
                        </div>
                    </div>

                </div>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-10 xl:gap-20">

                    <div className="flex flex-col items-center justify-between gap-5">
                        <Select label="Mes" opciones={meses} value={mes} onChange={handleMes} variant="whiteBG"></Select>
                        <Select label="Día" opciones={diasOptions} value={dia} onChange={handleDia} disabled={!mes} variant="whiteBG"></Select>
                    </div>


                    <div className='flex flex-col gap-5'>
                        <div className='flex justify-between'>
                            <div>
                                <h3>Adultos:</h3>
                                <p className='text-sm'>max 2</p>
                            </div>

                            <div className="flex items-center gap-5">
                                <Button onClick={handleAdultosPlus} disabled={adultos === 2}>+</Button>
                                <span>{adultos}</span>
                                <Button onClick={handleAdultosMinus} disabled={adultos === 1}>-</Button>
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <div>
                                <h3>Niños:</h3>
                                <p className='text-sm'>edad 0 de 17 - max 1</p>
                            </div>

                            <div className="flex items-center gap-5">
                                <Button onClick={handleNinosPlus} disabled={ninos === 1}>+</Button>
                                <span>{ninos}</span>
                                <Button onClick={handleNinosMinus} disabled={ninos === 0}>-</Button>
                            </div>
                        </div>
                    </div>

                    {(ninos === 1) && (
                        <div className='flex justify-between md:items-end'>
                            <h3>Edad del niño:</h3>

                            <div className="flex items-center gap-5">
                                <Button onClick={handleEdadPlus} disabled={edad === 17}>+</Button>
                                <span>{edad}</span>
                                <Button onClick={handleEdadMinus} disabled={edad === 0}>-</Button>
                            </div>
                        </div>
                    )}


                </section>

                <div className='text-center'>
                    <p>Los niños menores de 12 años viajan con un descuento del 50%.</p>
                    <p>Los niños menores de 4 años viajan gratis.</p>
                </div>


                <div className="w-full flex justify-center gap-10">
                    <Button onClick={() => navigate(-1)}>volver</Button>

                    <Link to={`/exc-datos/${currentTour.id}`}
                        state={{ tour: currentTour, date: diaElegidoObject, precioFinal: precioConExtras, adultos: adultos, ninos: ninos, cama: camaTipo, extraCama: extraCama }}>
                        <Button>finalizar</Button>
                    </Link>
                </div>

            </section>



            <section className='styleSection'>
                <div className='relative styleBefore styleAfter px-10 flex flex-col items-center gap-10 '>

                    <h1 className='text-center'>Elige el tipo de la habitacion</h1>
                    <div className='flex flex-col gap-5 items-center'>
                        <h2 className='text-center'>Hoteles en este tour:</h2>
                        {currentTour.ciudades_list.map((el, index) => (
                            <div key={index} className='flex items-center gap-10'>
                                <h4 className='font-semibold'>{el}</h4>
                                <h4 className='whitespace-nowrap'>Hotel número {index + 1}</h4>
                            </div>
                        ))}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 justify-items-center'>
                        <div className='flex flex-col items-center gap-5'>
                            <img src={twin} alt="" />
                            <Checkbox variant='labelBlack' label={"Habitación Estándar con 2 Camas"} checked={camaTipo === "twin"} onChange={() => setCamaTipo("twin")}   />
                        </div>
                        <div className='flex flex-col items-center gap-5'>
                            <img src={queen} alt="" />
                            <Checkbox variant='labelBlack' label={"Habitación Estándar con Cama Queen"} checked={camaTipo === "queen"} onChange={() => setCamaTipo("queen")} />
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row justify-center gap-5'>
                        <Checkbox variant='labelBlack' label={"Añadir una cama adicional para un niño"} checked={extraCama} onChange={() => setExtraCama(!extraCama)} />
                        <p className='whitespace-nowrap'>El precio: +10€</p>
                    </div>
                </div>
            </section>

            <div className="block md:hidden">
                <SliderIncluido services={currentTour.included_services} />
            </div>

            <section className='styleSection items-center'>

                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-5">

                    <h1 className='text-center md:col-span-2'>Incluido</h1>

                    <div className="flex flex-col gap-2">
                        <h2>Alimentación</h2>
                        <p>Desayunos diarios en el hotel
                            Cenas incluidas en el programa del tour
                            Bebidas no estan incluidas</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2>Programa de excursiones</h2>
                        <p>Excursiones según el programa del tour
                            Visita a los principales lugares de interés
                            Excursiones a pie con guía</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2>Acompañamiento</h2>
                        <p>Guía profesional / acompañante
                            Acompañamiento durante la excursión por la ruta</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2>Alojamiento</h2>
                        <p>Alojamiento en hotel durante todo el periodo de la excursión.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2>Transporte</h2>
                        <p>Todos los traslados por la ruta de la excursión.
                            Cómodo autobús turístico.
                            Traslados entre ciudades y hoteles.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2>Adicionalmente</h2>
                        <p>Entradas a los museos (si están indicadas en el programa)
                            Asistencia las 24 horas durante la excursión</p>
                    </div>

                </div>

                <div className="w-full flex flex-col lg:gap-5 relative px-10 styleAfter styleBefore">
                    <h1 className='text-center'>No Incluido</h1>

                    <div className='grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-5 lg:gap-0'>
                        <p className="font-semibold text-center">Gastos personales.</p>
                        <p className="font-semibold text-center">Vuelos desde y hacia el lugar de inicio de la excursión.</p>
                        <p className="font-semibold text-center">Excursiones adicionales.</p>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-5 lg:gap-0'>
                        <p className="font-semibold text-center">Bebidas no incluidas en las comidas.</p>
                        <p className="font-semibold text-center">Seguro de viaje.</p>
                    </div>
                </div>

                <div className='flex gap-5'>
                    <Button onClick={() => navigate(-1)}>volver</Button>
                    <Link to={`/exc-datos/${currentTour.id}`}
                        state={{ tour: currentTour, date: diaElegidoObject, precioFinal: precioConExtras, adultos: adultos, ninos: ninos, cama: camaTipo, extraCama: extraCama }}>
                        <Button>finalizar</Button>
                    </Link>
                </div>

            </section>



        </div>
    )
}