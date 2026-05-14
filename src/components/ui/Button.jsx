

export default function Button({ children, icon: Icon, onClick, disabled, variant = "primary", type = "button", className = "", ...props }) {


    const basicStyle = "w-fit flex py-2 rounded-3xl font-semibold items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

    const variants = {
        primary: "px-5 bg-white text-black border-2 border-black",
        secondary: "px-5 bg-black text-white",
        blackNoBackground: "px-5 text-black border-2 border-black",
        whiteNoBackground: "px-5 text-white border-2 border-white",
        circle: "px-2 bg-white text-black border-2 border-black"
    }

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={`${basicStyle} ${variants[variant]} ${className}`} {...props}   >
            {children}
            {Icon && (<img src={Icon} />)}
        </button>
    )
}