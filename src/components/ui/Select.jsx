import down from "../../assets/svg/down_black.svg"


export default function Select({ opciones = [], iconUrl = down, label, labelPosition = "left", value, name, onChange, placeholder = "", variant = "white", className = "", error, ...props }) {

    const basicStyle = "w-full py-2 px-3 border-2 rounded-3xl appearance-none pr-10 bg-no-repeat bg-[length:16px] bg-[right_1rem_center]";

    const variants = {
        white: "border-white bg-white/20",
        black: "border-black bg-white/20",
        whiteBG: "border-black bg-white"
    }

    const states = error ? "border-red-500 focus:border-red-500" : "focus:border-black";

    const styleWrapper = labelPosition === "top" ? "w-full flex flex-col gap-1" : "w-full flex items-center gap-5";
    // если хотим контролировать расположение label, то создаем в пропс labelPosition = "left" и в styleWrapper, который потом пихнем в див-контейнер, указываем условия

    return (
        <div className={styleWrapper}>

            {label && (<label className={`${labelPosition === "top" ? "whitespace-nowrap font-main text-xl" : "font-main text-xl"}`}>{label}</label>)}

            <select
                {...props} // Сначала вываливаем все пропсы
                value={value}
                name={name}
                onChange={onChange}
                // Объединяем твой стиль фона с возможным стилем из пропсов
                style={{
                    ...props.style,
                    backgroundImage: `url("${iconUrl}")`
                }}
                className={`${basicStyle} ${variants[variant]} ${states} ${className}`}
            >

                {placeholder && <option value="" disabled>{placeholder}</option>}


                {opciones.map(item => {
                    const optionValue = item.value !== undefined ? item.value : item.id;

                    return (
                        <option key={item.id || item.value} value={optionValue} className="text-black">
                            {item.label || item.titulo || item.value}
                        </option>
                    );
                })}
            </select>

            {error && (<span className="text-sm text-red-500">{error}</span>)}

        </div>
    )
}

// {item.label || item.value} значит, что если реакт не увидел в массиве, с которым работаем заполненный label, то покажет value 

