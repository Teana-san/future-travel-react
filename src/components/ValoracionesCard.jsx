import { STORAGE_URL } from "../config"; // http://127.0.0.1:8000/storage


export default function ValoracionesCard({ tour, children, isFirst }) {

    if(!tour) return null;


    return (
        <div className={`py-5 flex flex-col gap-5 border-b-2 border-white text-black ${isFirst ? "border-t-2" : "" }`}>
            <div className="flex flex-col sm:flex-row gap-10">
                <img className="w-full sm:size-40 object-cover rounded-2xl" src={`${STORAGE_URL}/${tour.imagen_principal}`} alt="" />

                <div className="flex flex-col justify-between">
                    <h1 className="capitalize">{tour.pais}</h1>
                    <h2>{tour.titulo}</h2>
                    <p>★★★★★</p>
                    <p>12.07.2025 – 19.07.2025</p>
                </div>
            </div>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            {children}
        </div>
    )
}