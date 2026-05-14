import { Link } from 'react-router-dom';
import Button from "./ui/Button"

import { STORAGE_URL } from "../config"; // http://127.0.0.1:8000/storage

export default function TourCard({ excursion, isOpen, onToggle }) {

    return (
        <div className="flex flex-col gap-2 items-end text-white excursion-anim">

            <h3 onClick={onToggle} className={`cursor-pointer ${isOpen ? "font-semibold underline" : ""}`}>{excursion.titulo}</h3>

            {isOpen && (
                <div className="relative sm:w-80 h-52">

                    <Link to={`/exc/${excursion.id}`}>
                        <Button className="absolute top-1/2 -translate-x-2 sm:-translate-x-1/2 -translate-y-1/2 z-10">
                            ver más
                        </Button>
                    </Link>
                    <img className="w-full h-full object-cover" src={`${STORAGE_URL}/${excursion.imagen_principal}`} alt={excursion.titulo} />

                    <p className="absolute w-full bottom-0 p-2 bg-black/70 text-xl font-bold">
                        {excursion.ciudades_texto}
                    </p>
                </div>
            )}

        </div>
    )
}