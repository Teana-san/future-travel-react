import madrid from "../assets/fotoTour/spain/madrid.png"
import Button from "./ui/Button"


export default function ReservacionesCard() {


    return (
        <div>

            <div className="w-full px-20 py-5 flex justify-between gap-10">

                <img className="w-60 h-36 object-cover" src={madrid} alt="" />

                <div className="w-full flex justify-between">

                    <div className="flex flex-col justify-between">
                        <h3>Tour nombre</h3>
                        <h3>12.07.2025 – 19.07.2025</h3>
                        <h3>Personas <span>2</span> </h3>
                    </div>

                    <div className="relative flex flex-col justify-between items-center">
                        <h3>Pagado</h3>
                        <Button>ver más</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}
