import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import SliderCard from './SliderCard';

export default function Slider({ days }) {

    /*     
    days - это план по дням для слайдера по конкретной стране из массива excursiones:
{id: 1, imagen: '/src/assets/fotoTour/peru/cuzco.jpg', titulo: 'Día 1', dia: 'Día 1 — Cuzco', button2: 'Día 2', …}
{id: 2, imagen: '/src/assets/fotoTour/peru/pichu.jpg', titulo: 'Día 2', dia: 'Día 2 — Machu Picchu', button1: 'Día 1', …}
{id: 3, imagen: '/src/assets/fotoTour/peru/sagrado.jpeg', titulo: 'Día 3', dia: 'Día 3 — Regreso a Cuzco', button1: 'Día 2', …}  
    В day мы разбиваем этот массив по дням и показываем через слайдер

    SliderCard({ tours }) это дочка Slider({ days })
    SliderCard мы вызываем в Slider так - <SliderCard tours={day} /> day это элемент массива days, который является пропсом самого Slider.
    Slider({ days }) это дочка ExcursionCard({ exc })
    Slider мы вызываем в ExcursionCard так - <Slider days={exc.tourDays} exc это пропс ExcursionCard
    ExcursionCard({ exc }) это дочка Excursion() - У РОДИТЕЛЯ НЕТ ПРОПСОВ
    ExcursionCard мы вызываем в Excursion так - <ExcursionCard exc={currentTour} /> currentTour это текущий тур выцепленный по id


  так как Slider это дочка ExcursionCard, то в родителе мы вызвали Slider так -  <Slider days={exc.tourDays}
*/

    return (
        <div>

            <Swiper navigation pagination={{ clickable: true }}>
                {days.map(day => (
                    <SwiperSlide key={day.id}>
                        <SliderCard tours={day} allDays={days} />
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}