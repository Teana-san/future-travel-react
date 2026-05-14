import { useSwiper } from 'swiper/react'; // помогает настроить свайп по кнопочкам
import Button from "../ui/Button"

import { STORAGE_URL } from "../../config"; // http://127.0.0.1:8000/storage

export default function SliderCard({ tours, allDays }) {

    const swiper = useSwiper();

    // 1. Находим индекс текущего дня в общем массиве всех дней этого тура
    const currentIndex = allDays.findIndex(day => day.id === tours.id);

    // 2. Определяем, есть ли предыдущий и следующий дни
    const prevDay = allDays[currentIndex - 1];
    const nextDay = allDays[currentIndex + 1];

    return (
        <section className="relative h-screen overflow-hidden">

            <img className="absolute inset-0 w-full h-full object-cover" src={`${STORAGE_URL}/${tours.imagen}`} alt={tours.dia_label} />

            <div className="relative h-full bg-black/70 text-white mx-2 md:mx-8 lg:mx-14 lg:p-10">
                <h1 className="text-center py-5 lg:py-0 lg:pb-5">Que le espere?</h1>

                <div className="grid md:grid-cols-2 items-center h-fit gap-5 md:gap-10 lg:gap-20 md:px-10">

                    <div className="flex flex-col h-[90vh] md:h-full justify-around items-center gap-5 min-h-0 px-5 md:p-0">

                        <h1>{tours.titulo}</h1>

                        <div className="flex flex-col gap-5">
                            {Array.isArray(tours.descripcion) ? (
                                tours.descripcion.map((item, index) => (
                                    <p key={index}>{item}</p>
                                ))
                            ) : (
                                /* Если пришла строка (например, из-за JSON), выводим её просто текстом */
                                <p>{tours.descripcion}</p>
                            )}
                        </div>

                        <div className="flex gap-5 md:gap-10">
                            {/* Кнопка НАЗАД: показываем, если это не первый день (currentIndex > 0) */}
                            {prevDay && (
                                <Button onClick={() => swiper.slidePrev()}>
                                    {prevDay.titulo} {/* Выведет "Día 1" */}
                                </Button>
                            )}

                            {/* Кнопка ВПЕРЕД: показываем, если это не последний день */}
                            {nextDay && (
                                <Button onClick={() => swiper.slideNext()}>
                                    {nextDay.titulo} {/* Выведет "Día 3" */}
                                </Button>
                            )}
                        </div>

                    </div>

                    <div className="hidden md:block md:relative md:h-[70vh] ">
                        <img
                            className="h-full w-full object-cover rounded-2xl"
                            src={`${STORAGE_URL}/${tours.imagen}`}
                            alt={tours.dia_label}
                        />
                        <h2 className="absolute bottom-0 bg-black/80 w-full p-5 rounded-b-2xl text-center">
                            {tours.dia_label}
                        </h2>
                    </div>

                </div>
            </div>

        </section>
    )
}    