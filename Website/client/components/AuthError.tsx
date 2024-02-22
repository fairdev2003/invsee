import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

interface AuthErrorProps {
  reason?: string;
  explaination?: string;
  className?: string;
}

function AuthError({ 
    reason = "NO_REASON",
    explaination = "NO_EXPLAINATION" 
}: AuthErrorProps) {
  return (
    <div className="flex flex-col justify-center items-center  bg-red-500/20 p-10 h-auto rounded-lg gap-2">
      <X className="text-red-500" size={150}></X>
      <h2 className="text-red-500 text-2xl font-[600]">ACCESS DENIED</h2>
      <p className="text-white font-[400]">{reason}</p>
      <span className="text-gray-400">{explaination}</span>
      <Link
        href="/login"
        className="underline text-blue-500 hover:text-blue-400"
      >
        Go to Login page
      </Link>
    </div>
  );
}

export default AuthError;
