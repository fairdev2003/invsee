import { cn } from "@/lib/utils";

interface WorkspaceInputProps {
  name: string;
  placeholder: string;
  className?: string;
  height?: string;
  width?: string;
  value?: string | number;
  required?: boolean;
  comment?: string;
  textarea?: boolean;
  onChange: (e: any) => void;
}

const WorkspaceInput = ({
  name,
  placeholder,
  height = "[40px]",
  width = "full",
  className,
  value,
  onChange,
  textarea,
  required,
  comment,
}: WorkspaceInputProps) => {
  return (
    <div className="text-white text-sm font-semibold">
      <p className="text-sm font-semibold mb-2">
        {name} {required && <span className="text-red-500">*</span>}{" "}
        {comment && (
          <span className="text-[10px] text-gray-500">{comment}</span>
        )}
      </p>

      {textarea ? (
        <textarea
          value={value}
          onChange={onChange}
          className={cn(
            className,
            `w-${width} h-${height} p-2 col-span-2 rouned px-2 rounded-sm text-black`
          )}
          placeholder={placeholder}
        />
      ) : (
        <input
          value={value}
          onChange={onChange}
          className={cn(
            className,
            `w-${width} h-${height} col-span-2 rouned px-2 rounded-sm text-black`
          )}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default WorkspaceInput;
