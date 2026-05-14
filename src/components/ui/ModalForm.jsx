import { useEffect } from "react";
import Button from "./Button";


export default function ModalForm({ isOpen, onClose, title, children, success }) {


    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null; 


    return (
        <div
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="styleSection bg-blue items-center"
                onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри окна
            >
                {/* Иконка успеха (опционально, если success=true) */}
                {success && (
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100/10">
                        <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>
                )}

                {title && <h1 className="text-3xl">{title}</h1>}

                <div className="text-lg">
                    {children}
                </div>

                <div className="mt-5">
                    <Button onClick={onClose} className="w-full sm:w-auto">
                        Aceptar
                    </Button>
                </div>
            </div>
        </div>
    );
}