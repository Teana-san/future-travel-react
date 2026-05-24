import { useState } from "react";
import { paises, asuntos } from "../data"

import ContactoCard from "../components/ContactoCard"

import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import Checkbox from "../components/ui/Checkbox"
import Select from "../components/ui/Select"

import ModalForm from "../components/ui/ModalForm";


export default function Contacto() {

    const [paisSeleccionado, setPaisSeleccionado] = useState("");
    const [asunto, setAsunto] = useState("");
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");

    const [errorNombre, setErrorNombre] = useState("");
    const [errorCorreo, setErrorCorreo] = useState("");
    const [errorPais, setErrorPais] = useState("");
    const [errorAsunto, setErrorAsunto] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);


    function handlePais(e) {
        setPaisSeleccionado(e.target.value);
    }

    function handleAsunto(e) {
        setAsunto(e.target.value);
    }

    function handleNombreChange(e) {
        const value = e.target.value;
        if (/[0-9]/.test(value)) {
            setErrorNombre("El nombre no puede contener números");
        } else {
            setErrorNombre("");
        }
        const onlyLetters = value.replace(/[^A-Za-zА-Яа-яЁёáéíóúÁÉÍÓÚñÑüÜ\s]/g, "");
        setNombre(onlyLetters);
    }

    function handleSubmit(e) {
        e.preventDefault();

        let valido = true;

        if (!nombre.trim()) {
            setErrorNombre("El nombre es obligatorio");
            valido = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correo.trim()) {
            setErrorCorreo("El correo es obligatorio");
            valido = false;
        } else if (!emailRegex.test(correo)) {
            setErrorCorreo("Por favor, introduce un correo válido");
            valido = false;
        } else {
            setErrorCorreo("");
        }

        if (!paisSeleccionado) {
            setErrorPais("Por favor, selecciona un país");
            valido = false;
        } else {
            setErrorPais("");
        }

        if (!asunto) {
            setErrorAsunto("Por favor, selecciona un asunto");
            valido = false;
        } else {
            setErrorAsunto("");
        }

        if (!valido) return;

        setIsModalOpen(true);

        setNombre("");
        setCorreo("");
        setPaisSeleccionado("");
        setAsunto("");

        setErrorNombre("");
        setErrorCorreo("");
        setErrorPais("");
        setErrorAsunto("");

        e.target.reset();
    }



    return (
        <div className="">

            <div className="styleSection">

                <div className="text-center flex flex-col gap-5">
                    <h1>Contacto</h1>
                    <p>
                        ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
                        Contamos con oficinas locales en los países donde organizamos nuestros tours, para ofrecer una atención más cercana y especializada.
                    </p>
                </div>


                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
                    {paises.map(pais => (
                        <ContactoCard key={pais.id} pais={pais} />
                    ))}

                </div>
            </div>

            <div className="bg-black/50 styleSection">

                <div className="relative px-2 md:px-10 styleBefore styleAfter flex flex-col gap-5">


                    <div className="text-center flex flex-col gap-5 text-white">

                        <h1>Envíanos un mensaje</h1>
                        <p>Tu mensaje será atendido por el equipo correspondiente al país seleccionado.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-5 place-items-center" action="">

                        <div className="flex flex-col gap-5 w-full h-full">
                            <Input variant="white" placeholder="Nombre*" value={nombre} onChange={handleNombreChange} error={errorNombre} required />

                            <Input
                                type="email"
                                variant="white"
                                placeholder="Correo*"
                                value={correo}
                                onChange={(e) => {
                                    setCorreo(e.target.value);
                                    if (errorCorreo) setErrorCorreo("");
                                }}
                                error={errorCorreo}
                                required
                            />

                            <div className="w-full flex flex-col gap-1">
                                <Select
                                    className="text-white"
                                    name="country"
                                    opciones={paises}
                                    placeholder="País de interes"
                                    value={paisSeleccionado}
                                    onChange={handlePais}
                                />
                                {errorPais && <span className="text-sm font-semibold text-red-500 pl-2">{errorPais}</span>}
                            </div>

                            <div className="w-full flex flex-col gap-1">
                                <Select
                                    className="text-white"
                                    name="questions"
                                    opciones={asuntos}
                                    placeholder="Asunto"
                                    value={asunto}
                                    onChange={handleAsunto}
                                />
                                {errorAsunto && <span className="text-sm font-semibold text-red-500 pl-2">{errorAsunto}</span>}
                            </div>
                        </div>

                        <div className="flex flex-col w-full h-50 lg:h-full">
                            <textarea className="bg-white/20 h-full w-full p-2 border-2 border-white rounded-3xl text-white" placeholder="Mensaje*" required></textarea>
                        </div>

                        <div className="w-full text-white">
                            <Checkbox required label="He leído y acepto la Política de Privacidad." />
                        </div>

                        <Button type="submit">
                            contactanos
                        </Button>
                    </form>
                </div>
            </div>

            <ModalForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={"Mensage enviado!"}
                success={true}>
                Grasias por tu mensage. Nos ponemos en contacto contigo lo antes posible.
            </ModalForm>

        </div>
    )
}