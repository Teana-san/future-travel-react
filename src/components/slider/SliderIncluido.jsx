import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import SliderIncluidoCard from './SliderIncluidoCard';

export default function SliderIncluido({ services }) {

    if (!services || services.length === 0) {
        return <div>Cargando servicios...</div>;
    }

    return (
        <section className="bg-black">

            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {services.map((service) => (
                    <SwiperSlide key={service.id}>
                        <SliderIncluidoCard service={service} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}