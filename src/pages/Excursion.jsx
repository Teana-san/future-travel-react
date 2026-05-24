import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom';


import Button from "../components/ui/Button"
import Checkbox from "../components/ui/Checkbox"
import Input from "../components/ui/Input"
import Select from "../components/ui/Select"

import Slider from "../components/slider/Slider"
import SliderIncluido from "../components/slider/SliderIncluido"
import IncluidoDesktop from "../components/IncluidoDesktop"

import ModalForm from "../components/ui/ModalForm";

import { API_URL } from "../config" // http://127.0.0.1:8000/api
import { STORAGE_URL } from "../config"; // http://127.0.0.1:8000/storage


export default function Excursion() {

    const { id } = useParams(); // работает за счет <Route path="/exc/:id" element={<Excursion1 />} />
    // А также в ExcursionCard у кнопки ver mas мы указали <Link to={`/exc/${excursion.id}`}>

    const [currentTour, setCurrentTour] = useState(null); // Стейт для данных из БД 
    // раньше так было  const currentTour = allTours.find(item => item.id.toString() === id);
    const [loading, setLoading] = useState(true);

    const [mes, setMes] = useState("");
    const [dia, setDia] = useState("");

    const [valores, setValores] = useState({
        nombre: "",
        apellido: ""
    });

    const [errores, setErrores] = useState({
        nombre: "",
        apellido: ""
    });

    const [isModalOpen, setIsModalOpen] = useState(false);



    // --- ЗАГРУЗКА ДАННЫХ ИЗ LARAVEL ---
    useEffect(() => {
        fetch(`${API_URL}/tours/${id}`)
            .then(res => res.json())
            .then(data => {
                setCurrentTour(data);

                const allDates = data.tour_dates || []; // подхватит вообще все даты одного тура

                if (allDates.length > 0) {
                    setMes(allDates[0].mes);
                    setDia(allDates[0].id.toString());
                }
                setLoading(false);
            })
            .catch(err => console.error("Error:", err));
    }, [id]);


    if (loading) return <div className="h-screen flex items-center justify-center text-white">Cargando...</div>;
    if (!currentTour) return <div className="text-white">Tour no encontrado</div>;


    const allDates = currentTour.tour_dates || []; // Получаем массив всех дат этого тура из того, что прислал Laravel

    // Формируем список уникальных месяцев для первого Select
    // Мы проходим по всем датам, берем поле 'mes' и оставляем только уникальные
    const uniqueMonths = [...new Set(allDates.map(d => d.mes))]; // получаем март/июнь/сентябрь

    const meses = uniqueMonths.map(m => ({
        id: m,
        value: m,
        label: m.charAt(0).toUpperCase() + m.slice(1)
    })); // получим так, только по всем 3 месяцам {id: 'marzo', value: 'marzo', label: 'Marzo'}


    function handleMes(e) {
        const selectedMes = e.target.value;
        setMes(selectedMes);

        // Автоматически выбираем первую доступную дату этого месяца
        const datesInMonth = allDates.filter(d => d.mes === selectedMes);
        if (datesInMonth.length > 0) {
            setDia(datesInMonth[0].id.toString()); // устанавливаем value первой даты (например, 'marzo1')
        } else {
            setDia("");
        }
    }

    // Список дней для второго Select (фильтруем по выбранному стейту 'mes')
    const diasDelMes = allDates.filter(d => d.mes === mes);

    const diasOptions = diasDelMes.map(d => ({
        id: d.id,
        value: d.id.toString(), // value = id, как и в стейте dia
        label: d.dia_texto || d.label || d.value // то поле, которое показывается пользователю
    }));

    // Находим объект выбранного дня, чтобы достать цену и другие данные
    const diaElegidoObject = allDates.find(el => String(el.id) === String(dia));

    // Цена теперь берется прямо из базы
    const precioActual = diaElegidoObject ? diaElegidoObject.precio : 0;

    function handleDia(e) {
        setDia(e.target.value);
    }


    function handleTextoChange(e) {
        const { name, value } = e.target;

        if (/[0-9]/.test(value)) {
            setErrores(prev => ({
                ...prev,
                [name]: `El ${name === "nombre" ? "nombre" : "apellido"} no puede contener números`
            }));
        } else {
            setErrores(prev => ({ ...prev, [name]: "" }));
        }

        const onlyLetters = value.replace(/[^A-Za-zА-Яа-яЁёáéíóúÁÉÍÓÚñÑüÜ\s]/g, "");

        setValores(prev => ({
            ...prev,
            [name]: onlyLetters
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setIsModalOpen(true);

        setValores({ nombre: "", apellido: "" });
        setErrores({ nombre: "", apellido: "" });
    }

    return (
        <div>

            <div className="relative">
                <img className="w-full h-screen object-cover object-top" src={`${STORAGE_URL}/${currentTour.imagen_principal}`}
                    alt={currentTour.titulo} />

                <div className="absolute bottom-0">
                    <p className="text-white bg-black/80 w-fit p-2 font-header text-3xl lg:text-6xl">{currentTour.titulo}</p>
                    <h2 className="bg-gray-400/80 p-2">{currentTour.ciudades_texto}</h2>
                </div>
            </div>

            <section className="styleSection items-center">
                <h1>{currentTour.excursion_titulo}</h1>

                <div className="w-full bg-white/20 py-3 px-2 md:px-10 xl:px-20 rounded-2xl flex flex-col md:flex-row gap-5 md:gap-5 justify-evenly">

                    <div className="w-full flex flex-col text-center gap-5">
                        <h2>Fechas</h2>

                        <div className="flex flex-col lg:flex-row gap-5">
                            <Select label={"Mes"} opciones={meses} value={mes} onChange={handleMes} variant="whiteBG" placeholder="Elige un mes" />
                            <Select label={"Día"} opciones={diasOptions} value={dia} onChange={handleDia} variant="whiteBG" placeholder="Elige un día" disabled={!mes} />
                        </div>
                    </div>


                    <div className=" flex flex-col justify-between  items-center">

                        <h2 className="text-center whitespace-nowrap">Precio para uno</h2>

                        <div className="flex flex-row md:flex-col lg:flex-row gap-10 items-center">
                            <h1 className={`whitespace-nowrap ${Number(precioActual) > 0 ? "visible" : "invisible"}`}>
                                {precioActual || "000"} €
                            </h1>

                            <Link
                                to={!dia ? "#" : `/exc-config/${id}`} // Если нет даты, никуда не идем
                                onClick={e => !dia && e.preventDefault()} // Если нет даты, отменяем клик
                                state={{ mesElegido: mes, diaElegido: dia, selectedDateObject: diaElegidoObject }}
                            >
                                <Button disabled={!dia}>reservar</Button>
                            </Link>

                        </div>
                    </div>

                </div>

                <div className="flex flex-col items-center gap-5">
                    <h3 className="font-semibold text-center">Inicio / fin del tour <span className="text-white font-semibold">{currentTour.inicio_fin}</span></h3>
                    <div className="flex text-center gap-5">
                        <h3 className="font-semibold">Duración <span className="text-white font-semibold">{currentTour.duracion} días</span></h3>
                        <h3 className="font-semibold">Cantidad máxima <span className="text-white font-semibold">{currentTour.cantidad} personas</span></h3>
                    </div>
                </div>


                <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">

                    <div className="h-full flex flex-col justify-center text-center italic py-5 px-4 md:px-10">
                        <h3>{currentTour.texto}</h3>
                    </div>

                    <div className="relative h-64 md:h-auto min-h-50 w-full">
                        <img
                            className="absolute inset-0 h-full w-full object-cover rounded-2xl"
                            src={`${STORAGE_URL}/${currentTour.imagen_section1}`}
                            alt={currentTour.titulo}
                        />
                    </div>
                </div>

                <div className="text-center font-semibold">
                    <p>Los turistas llegan por su cuenta a la ciudad. Encuentro en el hotel.</p>
                    <p>Los turistas organizan por su cuenta el vuelvo de regreso.</p>
                </div>

            </section>

            {currentTour.tour_days && <Slider days={currentTour.tour_days} />}


            <div className="relative z-10 overflow-x-clip">

                <IncluidoDesktop
                    services={currentTour.included_services}
                    tour={currentTour}
                />

                <div className="block md:hidden">
                    <SliderIncluido services={currentTour.included_services} />
                </div>
            </div>


            <section className="relative md:hidden styleSection">
                <div className="flex flex-col text-center gap-5 mt-5">
                    <h1 className="text-darkBlue">¿Qué NO está incluido?</h1>
                    <p className="font-semibold text-black">Gastos personales.</p>
                    <p className="font-semibold text-black">Vuelos desde y hacia el lugar de inicio de la excursión.</p>
                    <p className="font-semibold text-black">Excursiones adicionales.</p>
                    <p className="font-semibold text-black">Bebidas no incluidas en las comidas.</p>
                    <p className="font-semibold text-black">Seguro de viaje.</p>
                </div>
            </section>


            <section className="bg-black/50 styleSection">

                <div className="px-2 md:px-10 relative styleBefore styleAfter text-white flex flex-col gap-5 md:gap-10 items-center">

                    <h1 className="text-center">Necesitas ayuda para elegir un tour?</h1>
                    <p className="text-center">
                        Si tiene alguna pregunta sobre la ruta, las fechas o las condiciones de participación, póngase en contacto con nosotros. Le ayudaremos a tomar la decisión correcta.
                    </p>

                    <form onSubmit={handleSubmit} action="" className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">

                        <div className="flex flex-col gap-5">
                            <Input name="nombre" placeholder="Nombre*" value={valores.nombre} onChange={handleTextoChange} error={errores.nombre} variant="white" required />
                            <Input name="apellido" placeholder="Apellidos*" value={valores.apellido} onChange={handleTextoChange} error={errores.apellido} variant="white" required />
                            <Input placeholder="Correo*" variant="white" required />
                        </div>

                        <div>
                            <textarea className="bg-white/20 h-40 md:h-full w-full p-2 border-2 border-white rounded-3xl text-white" placeholder="Mensaje*" required></textarea>
                        </div>

                        <Checkbox label="He leído y acepto la Política de Privacidad." />

                        <div className="flex flex-col sm:flex-row gap-5 items-center sm:justify-center">
                            <Button type="submit">enviar mensaje</Button>
                            <Link
                                to={!dia ? "#" : `/exc-config/${id}`} // Если нет даты, никуда не идем
                                onClick={e => !dia && e.preventDefault()} // Если нет даты, отменяем клик
                                state={{ mesElegido: mes, diaElegido: dia, selectedDateObject: diaElegidoObject }}
                            >
                                <Button disabled={!dia}>reservar</Button>
                            </Link>
                        </div>
                    </form>

                </div>
            </section>


            <ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={"Mensage enviado!"} success={true}>
                Grasias por tu mensage. Nos ponemos en contacto contigo lo antes posible.
            </ModalForm>

        </div>
    )
}