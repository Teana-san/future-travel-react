import { useNavigate } from "react-router-dom"
import Button from "../components/ui/Button"


export default function ExitoBooking() {

    const navigate = useNavigate();


    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="styleSection w-full md:w-2/3 lg:w-1/2">
                <div className="flex flex-col items-center gap-10 border-y-2 border-white py-10">
                <h1>Pago aceptado!</h1>
                <Button onClick={() => navigate("/")}>volver al inicio</Button>
                </div>
            </div>
        </div>
    )
}