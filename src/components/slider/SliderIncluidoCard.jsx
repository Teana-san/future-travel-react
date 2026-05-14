

export default function SliderIncluidoCard({ service }) {

    const iconPath = `/svg-slider/${service.icon}.svg`;

    return (
        <div className="bg-black p-5 w-full flex flex-col gap-5 items-center">

            <h1 className="text-center text-white my-5 md:mb-10">¿Qué está incluido?</h1>
            <div className="icon-wrapper">
                <img src={iconPath} alt={service.title} />
            </div>
            <h2 className="text-white">{service.title}</h2>

            <ul className="flex flex-col text-center gap-5 text-white">
                {service.description.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

