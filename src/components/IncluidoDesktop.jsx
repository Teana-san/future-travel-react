import { STORAGE_URL } from "../config"; // http://127.0.0.1:8000/storage


export default function IncluidoDesktop({ services, tour }) {


    if (!services || !tour) return null;

    return (
        <section className="relative styleSection hidden md:block">

            <img className="absolute -top-5 -left-24 rounded-r-2xl md:max-w-[45%] lg:max-w-[38%] md:h-[70%] xl:h-[62%] object-cover" src={`${STORAGE_URL}/${tour.imagen_incluido}`} alt={tour.titulo} />
            <img className="absolute -bottom-5 -right-2 md:-right-8 lg:-right-10 xl:-right-20 rounded-l-2xl md:max-w-[50%] lg:max-w-[58%] md:h-[30%] xl:h-[38%] object-cover object-top" src={`${STORAGE_URL}/${tour.imagen_no_incluido}`} alt={tour.titulo} />


            <div className="grid grid-cols-3 gap-5 lg:pr-5 relative lg:styleAfter">

                <h1 className="col-start-2 col-span-2 text-end text-darkBlue">Que esta incluido?</h1>

                {services.map((service, index) => (
                    <div key={service.id} className={`${index % 2 === 0 ? "col-start-2" : ""} flex flex-col gap-2 `}>

                        <div className="flex items-center gap-3">
                            <img src={`/svg-slider/${service.icon}.svg`} className="lg:hidden w-8 h-8" alt="" />
                            <h2 className="font-bold">{service.title}</h2>
                        </div>

                        <div>
                            {service.description?.map((item, i) => (
                                <p key={i}>{item}</p>
                            ))}
                        </div>

                    </div>

                ))}

            </div>


            <div className="flex flex-col gap-5 lg:pl-5 mt-5 md:mt-10 relative md:styleBefore">
                <h1 className="text-darkBlue">¿Qué NO está incluido?</h1>
                <p className="font-semibold">Gastos personales.</p>
                <p className="font-semibold md:w-1/2">Vuelos desde y hacia el lugar de inicio de la excursión.</p>
                <p className="font-semibold">Excursiones adicionales.</p>
                <p className="font-semibold">Bebidas no incluidas en las comidas.</p>
                <p className="font-semibold">Seguro de viaje.</p>
            </div>

        </section>
    )
}