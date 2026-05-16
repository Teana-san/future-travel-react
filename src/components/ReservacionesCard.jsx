import madrid from "../assets/fotoTour/spain/madrid.png"
import Button from "./ui/Button"


export default function ReservacionesCard({ reserva }) {

    if (!reserva) return null;

    return (
        <div className="w-full flex justify-between items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <div className="flex flex-col gap-1">

                <h3 className="text-xl font-bold">{reserva.tour?.titulo || 'Tour'}</h3>
                <p className=" text-amber-50/70 capitalize">{reserva.tour?.pais || '—'}</p>
                
                <p className="text-sm opacity-60">
                    Pasajeros: {reserva.adultos} adultos {reserva.ninos > 0 && `y ${reserva.ninos} niños`}
                </p>
            </div>

            <div className="text-right flex flex-col gap-2">

                <span className="text-xl font-main font-bold text-white">{reserva.precio_total} €</span>
                
                <span className={`text-xs uppercase px-3 py-1 rounded-full bg-black/30 font-bold
                    ${reserva.status === 'confirmado' ? 'text-green-600' : ''}
                    ${reserva.status === 'pendiente' ? 'text-yellow-400' : ''}
                    ${reserva.status === 'cancelado' ? 'text-red-600' : ''}
                    
                `}>
                    {reserva.status}
                </span>
            </div>
        </div>
    );
}