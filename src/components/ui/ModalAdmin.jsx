import Button from "./Button"

export default function ModalAdmin({ onClose, onConfirm, tourName }) {

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative flex flex-col items-center gap-5 bg-blue p-10 rounded-2xl">

                <div className="flex flex-col items-center">
                    <p>¿Estás seguro de que quieres eliminar este tour?</p>
                    <h4 className="text-red-200">{tourName}</h4>
                    <p>Esta acción no se puede deshacer.</p>
                </div>

                <div className="flex gap-5">
                    <Button onClick={onConfirm}>confirmar</Button>
                    <Button onClick={onClose}>cancelar</Button>
                </div>
            </div>
        </div>
    )
}