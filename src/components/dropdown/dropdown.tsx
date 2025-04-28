import Image from "next/image";

interface dropdown{
    id:number,
    option:string,
}
interface DropdownProps {
    options: dropdown[];
  }
  
  export default function Dropdown({ options }: DropdownProps) {
    return (
      <div className="relative">
        <select className="border px-2 py-1 w-full focus:outline-none border-[#e5e5e5] h-[60px] rounded-[10px]" style={{appearance:"none"}}>
          {/* <option value="">Select an option</option> */}
          {options.map((value) => (
            <option key={value?.id} value={value?.option}>
              {value?.option}
            </option>
          ))}
        </select>
          <Image src={"/svg/arrow-down.svg"} alt="arrow" width={20} height={20} className="absolute right-3 top-1/2 -translate-y-1/2" />
      </div>
    );
  }
  