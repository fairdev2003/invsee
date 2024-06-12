
import { cn } from "@/lib/utils"
import clsx from "clsx";
import { title } from "process";
import { GrLike } from "react-icons/gr";
import { IoHappy, IoWarning } from "react-icons/io5";
import { MdError } from "react-icons/md";

interface NotificationProps {
    type?: "success" | "error" | "warning";
    message?: string;
    className?: string;
    title?: string; 
}

const warning = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi illo, ea provident rerum necessitatibus eaque eos sunt blanditiis corrupti perspiciatis incidunt. Dolores vitae corrupti quidem. Doloribus fuga distinctio earum dicta!";

const Notification = ({
    type = "success",
    message = warning,
    className,
    title = "Title"
} : NotificationProps) => {

    const getSectionBackground = () => {
        switch(type) {
            case "success":
                return "bg-green-500";
            case "error":
                return "bg-red-500";
            case "warning":
                return "bg-yellow-500";
            default:
                return "bg-green-500";
        }
    }

    const getSectionColor = () => {
        return "text-white";
        switch(type) {
            case "success":
                return "text-green-700";
            case "error":
                return "text-red-700";
            case "warning":
                return "text-yellow-700";
            default:
                return "text-green-300";
        }
    
    }

    const getSectionIcon = () => {
        switch(type) {
            case "success":
                return <IoHappy className="text-green-700 size-10" />;
            case "error":
                return <MdError className="text-red-700 size-10" />;
            case "warning":
                return <IoWarning className="text-yellow-700 size-10" />;
            default:
                return "text-green-300";
        }
    }

    const getSectionBorderColor = () => {
        switch(type) {
            case "success":
                return "border-4 border-green-500";
            case "error":
                return "border-4 border-red-500";
            case "warning":
                return "border-4 border-yellow-500";
            default:
                return "border-4 border-green-500";
        }
    }

    return (
        <div className={cn("select-none bg-black rounded-xl p-2", getSectionBorderColor())}>
            
            {message && <div className={cn("text-left items-center p-4 rounded-lg", className, getSectionBackground())}>
                <div className="flex gap-2 items-center">
                    {getSectionIcon()}
                    <h1 className={cn("text-xl font-medium", getSectionColor())}>{title}</h1>
                </div>
                <p className={`${getSectionColor()}`}>{message}</p>
            </div>}
        </div>
    )
};

export default Notification;