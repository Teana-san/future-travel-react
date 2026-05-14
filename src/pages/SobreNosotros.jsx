import { Link } from "react-router-dom"

import Button from "../components/ui/Button";
import people from "../assets/fotoTour/happyPeople.png"
import people2 from "../assets/fotoTour/happyPeople3.jpg"


export default function SobreNosotros() {
    return (
        // На мобилке 1 колонка, на десктопе (lg) — 4. Гап тоже меняем.
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-8 py-5 lg:py-10 px-4 lg:px-14">
            
            {/* --- ПЕРВЫЙ РЯД --- */}

            {/* Картинка 1 */}
            <div className="lg:col-span-1 h-64 lg:h-auto">
                <img
                    className="w-full h-full object-cover rounded-2xl"
                    src={people}
                    alt="Happy People 1"
                />
            </div>

            <div className="lg:col-span-3 text-black bg-white/20 rounded-2xl p-6 lg:p-10 flex flex-col gap-5 justify-center items-center text-center lg:text-left">
                <h1>¿Quiénes somos?</h1>
                <p> 
                    En FutureTravel creemos que viajar no debería ser complicado.
                    Somos una plataforma especializada en excursiones organizadas de varios días por las ciudades más interesantes de Europa и otros destinos seleccionados.
                    Diseñamos rutas claras, con fechas fijas и programas definidos, para que nuestros viajeros solo tengan que preocuparse por disfrutar del viaje.
                </p>
            </div>


            {/* --- ВТОРОЙ РЯД --- */}

            <div className="text-black lg:col-span-3 bg-white/20 rounded-2xl p-6 lg:p-10 flex flex-col gap-5 justify-center items-center text-center lg:text-left">
                <h1>¿Por qué elegir FutureTravel?</h1>
                <ul className="list-none flex flex-col gap-2">
                    <li>Rutas únicas por varias ciudades en un solo viaje</li>
                    <li>Transporte incluido durante toda la excursión</li>
                    <li>Alojamiento seleccionado para cada etapa del recorrido</li>
                    <li>Fechas claras и precios transparentes</li>
                    <li>Atención clara и directa, sin intermediarios</li>
                </ul>
            </div>

            {/* Статистика 1 */}
            <div className="lg:col-span-1 bg-black/40 rounded-2xl p-6 flex flex-col justify-between items-center min-h-50">
                <div className="flex flex-col items-center text-white">
                    <h1>300+</h1>
                    <p>Viajes realizados</p>
                </div>
                <Link to="/" className="w-full">
                    <Button className="w-full">ver tours</Button>
                </Link>
            </div>


            {/* --- ТРЕТИЙ РЯД --- */}

            <div className="lg:col-span-1 bg-black/40 rounded-2xl p-6 flex flex-col justify-between items-center min-h-50">
                <div className="flex flex-col items-center text-white">
                    <h1>1500+</h1>
                    <p>Viajeros felices</p>
                </div>
                <Link to="/valoraciones" className="w-full">
                    <Button className="w-full">ver valoraciones</Button>
                </Link>
            </div>

            {/* Картинка 2 */}
            <div className="lg:col-span-3 h-64 lg:h-70">
                <img 
                    className="w-full h-full object-cover rounded-2xl" 
                    src={people2} 
                    alt="Happy People 2" 
                />
            </div>

        </div>
    )
}