

export default function Input({ label, labelPosition = "top", value, onChange, placeholder = "", type = "text", variant = "black", className = "", error, ...props }) {

    const basicStyle = "w-full py-2 px-3 bg-white/20 border-2 rounded-3xl transition disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";
   
    const variants = {
        white: "text-white border-white",
        black: "text-black border-black"
    }

    const styleWrapper = labelPosition === "left" ? "w-full flex items-center gap-4" : "w-full flex flex-col gap-1";

    const states = error ? "border-red-500 focus:border-red-500" : "focus:border-black";

    // --- ЛОГИКА ДЛЯ ФАЙЛА ---
    if (type === "file") {
        return (
            <div className={styleWrapper}>
                {label && <label className="font-main text-xl">{label}</label>}

                {/* Создаем визуальную оболочку, которая имитирует инпут */}
                <label className={`${basicStyle} ${variants[variant]} ${states} ${className}`}>
                    <span className="text-sm opacity-70">
                        {/* Если файл выбран (value — это объект File), покажем его имя, иначе текст */}
                        {value ? value.name : (placeholder || "Seleccionar archivo")}
                    </span>

                    <input
                        type="file"
                        className="hidden" // Прячем настоящий системный инпут
                        onChange={onChange}
                        {...props}
                    />
                </label>

                {error && <span className="text-sm font-semibold text-red-500">{error}</span>}
            </div>
        );
    }

    return (
        <div className={styleWrapper}>
            {label && (<label className={`${labelPosition === "left" ? "whitespace-nowrap font-main text-xl" : "font-main text-xl"}`}>{label}</label>)}

            <input
                type={type}
                value={value} // value — значение, которое отправится на сервер.
                onChange={onChange}
                placeholder={placeholder}
                className={`${basicStyle} ${variants[variant]} ${states} ${className} `}
                {...props} />

            {error && (<span className="text-sm font-semibold text-red-500">{error}</span>)}

        </div>
    )

}