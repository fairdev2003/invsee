"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";

import Google from "@/assets/google.svg";
import Discord from "@/assets/discord.svg";
import { Eye, EyeOff, Key } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { AuthProvider } from "@/components/AuthProviders";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setserror] = useState("");
  const [loading, setloading] = useState(false);
  const [showpass, setshowpass] = useState<boolean>(false);

  const passRef = useRef<any>(null);
  const emailRef = useRef<any>(null);

  async function Login() {
    setloading(true);
    setserror("");

    setTimeout(async () => {
      try {
        setemail(email.trim())
        setpassword(password.trim())
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (res?.ok) {
          setloading(false)
          window.location.href = '/dashboard'
        }
        
      } catch (error) {
      } finally {
      }
    }, 3000);
  }

  useEffect(() => {
    setserror("");
  }, [password, email]);

  return (
    <AuthProvider>
      <section className="flex items-center justify-center">
        <div className="w-[500px] h-[auto] bg-[#26292f] rounded-xl p-10">
          <div className="flex flex-col justify-center gap-4 items-center">
            <Image
              className=" select-none"
              width={75}
              height={75}
              src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/a/a4/Grass_Block_%28item%29_BE5.png/revision/latest?cb=20200901112517"
              alt="grass_block"
            ></Image>
            <h2 className="text-white font-[600] text-3xl">Login</h2>
            <p className="text-white font-[600] text-md">Welcome back!</p>
          </div>
          <div className="flex flex-col justify-start mt-[30px] px-10">
            <p className="text-white mb-2">Email:</p>
            <div className="flex gap-3 items-center mb-5 h-10 rounded-xl bg-[#32343a] py-6 px-3 text-white font-[400] w-full">
              <input
                ref={emailRef}
                id="input"
                autoComplete="off"
                onChange={(input) => {
                  setemail(input.target.value);
                }}
                className="bg-transparent outline-none w-full"
                placeholder="Enter your email"
                type="email"
              ></input>
            </div>
            <p className="text-white mb-2">Password:</p>
            <div className="flex gap-3 items-center mb-5 h-10 rounded-xl bg-[#32343a] py-6 px-3 text-white font-[400] w-full">
              <input
                ref={passRef}
                id="input"
                autoComplete="off"
                onChange={(input) => {
                  setpassword(input.target.value);
                }}
                className="bg-transparent outline-none w-full"
                placeholder="Enter your password"
                type={showpass ? "text" : "password"}
              ></input>
              {showpass ? (
                <Eye
                  className="cursor-pointer"
                  onClick={() => {
                    setshowpass(!showpass);
                  }}
                ></Eye>
              ) : (
                <EyeOff
                  className="cursor-pointer"
                  onClick={() => {
                    setshowpass(!showpass);
                  }}
                ></EyeOff>
              )}
            </div>
            {!loading ? (
              <button
                onClick={Login}
                className="bg-[#32343a] select-none w-full h-[50px] rounded-xl text-white flex items-center justify-center mb-3 gap-3 hover:bg-[#222327] transition-colors"
              >
                <p>Sign in</p>
              </button>
            ) : (
              <button
                onClick={Login}
                className="bg-[#32343a] w-full h-[50px] rounded-xl text-white flex items-center justify-center mb-3 gap-3 opacity-30 cursor-default"
              >
                <p>Sign in</p>
              </button>
            )}
            <div className="text-red-500 flex items-center justify-center mb-3">
              {error.length > 0 ? error : null}
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div className="bg-[#41454d] h-[2px] w-full"></div>
              <p className="text-white">OR</p>
              <div className="bg-[#41454d] h-[2px] w-full"></div>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center mt-5">
              <button className="bg-[#32343a] hover:bg-[#222327] transition-colors w-full h-[50px] rounded-xl text-white flex items-center justify-center gap-3">
                <div className="flex select-none gap-4 justify-center items-center">
                  <p>Login with Discord</p>
                </div>
              </button>
              <button className="bg-[#32343a] select-none hover:bg-[#222327] transition-colors w-full h-[50px] rounded-xl text-white flex items-center justify-center gap-3">
                <div className="flex gap-4 justify-center items-center">
                  <Image alt="google" width={35} height={35} src={Google} />
                  <p>Login with Google</p>
                </div>
              </button>
              <p className="text-white flex gap-1 mt-3">
                You dont have an account yet?
                <Link href="/register" className="underline text-blue-500">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </AuthProvider>
  );
}
