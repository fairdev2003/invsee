import { Clipboard, Check } from "lucide-react";
import { useState } from "react";

interface CardProps {
  key: string;
  value: string | undefined | null;
}

const Card = ({
    key,
    value
  }: CardProps) => {

  const [ checked, setChecked ] = useState(false);

  const copyToClipboard = ( text: string | number | undefined ) => {
    navigator.clipboard.writeText(`${text}`);
    setChecked(true);
    setTimeout(() => {
      setChecked(false);
    }, 2000)
  }

  return (
    <div>
      <div className="bg-[#252222] h-full flex items-center w-full row-span-1 rounded-xl p-2 relative" >
        <h3 className="font-bold">{ key }</h3>
        {/* @ts-ignore */}

        
        
        {!checked && <Clipboard className="absolute right-5 h-5 w-5 ml-2 text-[#AAA3A3] hover:text-white transition-colors cursor-pointer" onClick={
          () => copyToClipboard(value || "")
        }/>}
        
        {checked && <Check className="absolute right-5 h-5 w-5 ml-2 text-white transition-colors cursor-pointer" onClick={
          () => copyToClipboard(value || "")
        }/>}
        <p className="text-[#AAA3A3] font-medium transition-colors cursor-pointer">
          { value?.replace("__", ":") }
        </p>
      </div>
    </div>
  );
};

export default Card;
