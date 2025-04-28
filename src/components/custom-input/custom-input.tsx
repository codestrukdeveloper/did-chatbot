export default function CustomInput({
    label,
    placeholder,
    type = "text",
    // value,
    onChange,
    className,
    labelClass
}: {
    label: string;
    placeholder: string;
    type?: string;
    // value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    labelClass?: string;
}) {
    return (
        <div className={`flex flex-col ${className}`}>
            <label className={`text-sm font-medium mb-2 ${labelClass}`}>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                // value={value}
                onChange={onChange}
                className="w-full h-[60px] px-4 border border-[#e5e5e5] rounded-[10px] focus:outline-none"
            />
        </div>
    );
}