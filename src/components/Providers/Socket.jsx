import React from 'react'
import {io} from "socket.io-client"


export const SocketContext=React.createContext(null);


export const useSocket=()=>{
    return React.useContext(SocketContext)
}

export const SocketProvider=(props)=>{
    const socket=io("http://localhost:8000")
   
    console.log(socket)
    return <SocketContext.Provider value={{socket}}>
            {props.children}
    </SocketContext.Provider>
}
