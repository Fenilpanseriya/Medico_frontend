import { Button, Input, Stack, VStack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { SocketContext, useSocket } from '../Providers/Socket'

const VideoConsult = () => {
    const [email,setEmail]=useState("")
    const [room,setRoom]=useState("")
    const {socket}=useSocket()
    
    const handleRoomJoin=()=>{
        console.log(socket)
        socket?.emit("join-room",{emailId:email,roomId:room})
    }
    const handleRoomJoined=({roomId})=>{
        console.log("joined room "+roomId)
    }
    useEffect(()=>{
        socket?.on("joined-room",handleRoomJoined)
    },[socket])

  return (
    <Stack height={"100vh"} width={"100vw"}>

    
    <VStack spacing={"1rem"} margin={"auto"} width={"40%"} justifyContent={"center"} mt={"auto"}>
        <Input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email' type='email' width={"100%"}/>
        <Input value={room} onChange={(e)=>setRoom(e.target.value)} placeholder='roomId' type='text' width={"100%"}/>
        <Button variant={"solid"} color={"blue.700"} width={"100%"} onClick={handleRoomJoin}>
            Enter room
        </Button>
    </VStack>
    </Stack>
  )
}

export default VideoConsult