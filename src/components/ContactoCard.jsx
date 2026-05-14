import { useState } from "react"


export default function ContactoCard({ pais }) {

    const [open, setOpen] = useState(false);

    return (
        <div onClick={() => setOpen(prev => !prev)} className="relative max-w-72 h-80 cursor-pointer">

            <img className="w-full h-full object-cover rounded-2xl" src={pais.imagen} alt={pais.label} />

            <div className="absolute bottom-0 w-full p-2 text-white bg-black/70 backdrop-blur-sm rounded-b-2xl">
                <h1>{pais.label}</h1>
                <h2>{pais.ciudad}</h2>

                {open && (
                    <div>
                        <p>{pais.telefono}</p>
                        <p>{pais.correo}</p>
                    </div>
                )}
            </div>

        </div>
    )
}

/*
                <div className={`absolute w-full bg-black/70 px-5 py-3 flex flex-col justify-center transition-all duration-300 ${open ? "inset-0 rounded-2xl" : "bottom-0 rounded-b-2xl"}`}>
*/