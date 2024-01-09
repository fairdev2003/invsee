"use client"

import Navbar from '@/components/navbar';

import dynamic from 'next/dynamic' 

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { FaArrowRight, FaArrowLeft, FaUser } from "react-icons/fa6";
import { GiDeathSkull } from "react-icons/gi";
import { io } from 'socket.io-client';
import '@/app/globals.css'


const data: any = [
    {
        message: "Dev left the game",
        type:"player_left",
        user_name: "Dev",
        uuid: "380df991-f603-344c-a090-369bad2a924a"}
]


export const senddatatoDatabase = () => {
    'use php'
}


function Chat() {
  
  const [message, setmessage] = useState("")
  const [messages, setmessages]: any = useState([])
  const [isClient, setIsClient] = useState(false)
  const [socket] = useState<any>(io("http://localhost:3005")) 

  const [playerscount, setplayerscount] = useState(0)

  useEffect(() => {

    socket.emit("server_info")

    setIsClient(true)

    socket.on("connect", () => {
        console.log("Connected")
    })
    
    socket.on("receive_message", (mess: any) => {
        setmessages((prevMessages: any) => [...prevMessages, mess]);
    })

    socket.on("receive_server_info", (server_info: any) => {
        setplayerscount(server_info)
    })
    
    return () => {
        socket.off("connect");
        socket.off("receive_message");
        socket.off("server_info");
    };

  })

  const input_ref = useRef(null)

  const sendMessage = ( message_query: any ) => {
    setmessages((prevMessages: any) => [...prevMessages, message_query]);
    socket.emit("send", `<Web Message> ${message}`)
  }
  

  const message_handler = ( object: any ) => {
    if (object.type === "player_joined") {
        return (<Alert variant="joined" className='flex gap-2 items-center bg-[#88dd88]'>
            <div className='text-[green]'><FaArrowRight size={20}/></div>
            <AlertDescription className='font-[600]'>{object.message}</AlertDescription>
        </Alert>) 
    } 
    if ( object.type === "player_left") {
        return (<Alert variant="left" className='flex gap-2 items-center bg-[#e7a4a4]'>
            <div className='text-destructive'><FaArrowLeft size={20}/></div>
            <AlertDescription className='font-[600]'>{object.message}</AlertDescription>
        </Alert>)
    }
    if (object.type === "player_chat") {
        return (<Alert variant="message" className='gap-2 items-center bg-[#dad2d2]'>
            <AlertTitle>{object.user_name}</AlertTitle>
            <AlertDescription>{object.message}</AlertDescription>
        </Alert>)
    }
    if (object.type === "web_chat") {
        return (<Alert variant="message" className='gap-2 items-center bg-[#d2d3da]'>
            <AlertTitle>You</AlertTitle>
            <AlertDescription>{object.message}</AlertDescription>
        </Alert>)
    }
    if ( object.type === "player_death") {
        return (<Alert variant="left" className='flex gap-2 items-center bg-[#e7a4a4]'>
            <div className='text-destructive'><GiDeathSkull size={20}/></div>
            <AlertDescription className='font-[600]'>{object.message}</AlertDescription>
        </Alert>)
    }
    }

  
  return (

    <div>
        {isClient ? <div><Navbar></Navbar>
        <div className='px-[100px] py-[50px] flex flex-grow flex-row gap-5 justify-center'>
            <div key='left-menu' className='w-[400px] h-[850px] bg-[#26292f] rounded-lg px-10 py-10'>
                <h1 className='text-white text-2xl font-[700] ml-1 mb-3 flex items-center'>Server Info</h1>
                <div className='bg-[#213f21] w-full h-[60px] rounded-lg flex items-center gap-3 px-5'>
                    <FaUser size={25} className="text-white "/>
                    <p className='font-[700] text-lg text-white'>{playerscount}/8 Players Online</p>
                </div>
            </div>
            <div className='w-[1000px] h-[850px] bg-[#26292f] rounded-lg'>
                <div id="chat-box" className='h-[88%] bg-[#26292f] m-5 mb-0 rounded-lg flex flex-col gap-3 overflow-y-scroll max-h-[85%]'>
                    <h1 className='text-white text-2xl font-[700] ml-1 mb-3 flex items-center'>Live Chat</h1>
                    
                    
                    {messages && messages.length > 0 ? messages.map((item: any) => {
                        return (message_handler( item ))
                    }) : null}
                </div>
                <div id="message-box" key="message-box" className='px-5 pt-2 flex flex-grow gap-2 items-center mt-6'>
                    <div className='flex grow items-center gap-4'>
                        <p className='text-white font-[600] text-lg ml-1'>#</p>
                        <Input ref={input_ref} onChange={(input => {
                            setmessage(input.target.value)
                            
                        })}></Input>
                    </div>
                    
                    <Button size='lg' variant='admin' onClick={() => {
                        sendMessage({message: message, type: "web_chat"})
                        input_ref.current.value = '';
                        }}>Send Message</Button>
                </div>
            </div>
        </div>
        </div>: null}
    </div>
  )
}

export default Chat;