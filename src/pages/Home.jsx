import { useState, useEffect } from "react";

import Select from "../components/ui/Select";

import TourCard from "../components/TourCard"
import GlobeElement from "../components/GlobeElement";

import { API_URL } from "../config" // http://127.0.0.1:8000/api


export default function Home() {

    const [allTours, setAllTours] = useState([]); // Все туры из БД
    const [selectedCountry, setSelectedCountry] = useState(null); // название: "Spain" - это стейт для ГЛОБУСА
    const [countryKey, setCountryKey] = useState(""); // ключ: "spain" - это стейт для селектора - хранит в нижнем регистре
    const [tourActual, setTourActual] = useState(null); // тут у нас конкретно 1 карточка тура // Храним ID открытой карточки. null — все закрыты.
    const [loading, setLoading] = useState(true);

    const dynamicPaises = [...new Set(allTours.filter(tour => tour.status === "activo").map(tour => tour.pais))].map((country, index) => ({
        id: index,
        value: country,
        label: country.charAt(0).toUpperCase() + country.slice(1)
    }));
    // allTours.map(tour => tour.pais): Превращает массив туров в массив строк с названиями стран: ['spain', 'russia', 'peru', 'Proba'].
    // new Set(...): Убирает дубликаты. Остается: {'spain', 'peru', 'Proba'}.
    // [...]: Превращает этот набор обратно в обычный массив.
    // .map((country, index) => ({...})): Превращает каждую строку в объект, который понимает компонент Select.

/* dynamicPaises
{id: 0, value: 'spain', label: 'Spain'}
{id: 1, value: 'peru', label: 'Peru'}
{id: 2, value: 'russia', label: 'Russia'}
{id: 3, value: 'Proba', label: 'Proba'} */


    // ЗАГРУЗКА ДАННЫХ ---
    useEffect(() => {
        fetch(`${API_URL}/tours`)
            .then(res => res.json())
            .then(data => {
                setAllTours(data);
                setLoading(false);
            })
            .catch(err => console.error("Error al cargar datos", err));
    }, []);

    // ФИЛЬТРАЦИЯ ---
    // Вместо поиска в объекте по ключу, мы фильтруем массив по полю 'pais' по spain/peru/russia и находим три тура по конкретной стране
    const todosExcursionesDelPais = allTours.filter(t => t.pais.toLowerCase() === countryKey.toLowerCase() && t.status === "activo");
    // Это массив, в который попадают только те туры из allTours, поле pais которых совпадает с выбранным в селекторе countryKey.
       

    // Логика автоматического открытия средней карточки
    useEffect(() => {
        if (todosExcursionesDelPais.length > 0) {
            // Находим индекс среднего элемента
            // Например: если 3 тура, (3 / 2) = 1.5, floor = 1 (второй элемент)
            const middleIndex = Math.floor(todosExcursionesDelPais.length / 2);
            const middleTourId = todosExcursionesDelPais[middleIndex].id;

            setTourActual(middleTourId);
        } else {
            setTourActual(null); // Если туров нет, закрываем всё
        }
    }, [countryKey, allTours]); // 3. Эффект сработает каждый раз, когда меняется страна


    // Функция для глобуса
    const handleCountrySelect = (countryName) => {
        setSelectedCountry(countryName);
        setCountryKey(""); // Сбрасываем селектор, если выбрали глобусом
        
        setCountryKey(countryName.toLowerCase());// Просто переводим в нижний регистр: "Spain" -> "spain" потому что countryName берется из глобусной библиотеки и всегда пишется с большой буквы
    };

    // Функция для селектора
    const handleSelectChange = (e) => {
        setCountryKey(e.target.value);
        setSelectedCountry(null); // Сбрасываем глобус, если выбрали селектор
    };



    // const todosExcursionesDelPais = countryKey ? excursiones[countryKey] : []; // тут покажет все 3 тура по 1 стране
    // у нас есть массив excursiones с ключами, которые совпадают с value селектора - spain/peru/russia
    // у каждого ключа есть массив объектов с турами
    // соответственно если в массиве excursiones ключ совпадает с селектором, то показывает туры по стране

    function handleToggleExcursion(id) {
        setTourActual(prevExc => prevExc === id ? null : id);
        // Если кликнули по уже открытой — закрываем (null), иначе открываем новую
        // смотрим при активации карточки с экскурсией - если экскурсия равна id, то обнуляем ее, если не равно, то приравниваем к id?
    }


    if (loading) return <div className="text-white">Cargando tours...</div>;

    return (
        <section className="min-h-screen px-2 md:px-10 lg:px-14 py-10 grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">

            <div className="hidden lg:block lg:col-span-2">
                <GlobeElement onCountryClick={handleCountrySelect} />
            </div>

            <div className="col-span-1 flex flex-col items-center gap-5 w-full">

                <div className="flex flex-col gap-5">
                    <Select className="mb-5" placeholder="País de interes" opciones={dynamicPaises} value={countryKey} onChange={handleSelectChange} />

                    {!selectedCountry && !countryKey && (

                        <p className="font-semibold text-center lg:text-right text-white">
                            Para ver las excursiones disponibles, seleccione un país en el buscador o directamente en el globo terráqueo.
                        </p>
                    )}

                    <div className="relative pr-2 sm:pr-10 styleAfter">
                        {todosExcursionesDelPais.length > 0 ? ( // в todosExcursionesDelPais хранятся 3 тура по 1 стране из массива excursiones, 
                            // внутри [] у массива excursiones хранятся value из селекта
                            <section className="flex flex-col gap-5">
                                {todosExcursionesDelPais.map(exc => ( // exc это конкретно один тур
                                    <TourCard
                                        key={exc.id}
                                        excursion={exc}
                                        isOpen={tourActual === exc.id} // Карточка открыта, если её ID совпадает с активным в стейте tourActual
                                        onToggle={() => handleToggleExcursion(exc.id)} />
                                ))}
                            </section>
                        ) : // если в excursiones нет value из селекта, то покажет сообщение
                            (
                                countryKey && <p className="text-white">Lo sentimos, no hay tours disponibles para este país.</p>
                            )}

                    </div>
                </div>

            </div>

        </section>
    )
}