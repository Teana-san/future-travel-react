

export default function Checkbox({ label, checked, onChange, variant = "labelWhite", className = "", ...props }) {

    const variants = {
        labelWhite: "text-white",
        labelBlack: "text-black",
        labelButton: "border border-black px-5 py-2 rounded-3xl bg-white/20"
    }

    return (
        <div>

            <label className={`w-fit flex gap-2 cursor-pointer ${variants[variant]}`}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="accent-black"
                    {...props} />

                <span>{label}</span>
            </label>

        </div>
    )

}