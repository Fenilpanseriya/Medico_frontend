import React, { useCallback, useEffect, useState } from 'react'
import {Stack,VStack,Input,Button} from "@chakra-ui/react"
import { useSocket } from '../../providers/ScoketProvider';
import { useNavigate } from 'react-router-dom';
const VideoConsult = () => {

  const [email,setEmail]=useState("");
  const [room,setRoom]=useState("");
  const socket=useSocket();
  const navigate=useNavigate();
  
  console.log(socket);

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  

  return (
    <Stack height={"100vh"} width={"100vw"}>

    
     <VStack spacing={"1rem"} margin={"auto"} width={"40%"} justifyContent={"center"} mt={"auto"}>
      <form onSubmit={handleSubmitForm}>
          <Input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email' type='email' width={"100%"}/>
          <Input value={room} onChange={(e)=>setRoom(e.target.value)} placeholder='roomId' type='text' width={"100%"}/>
          <Button type='submit' variant={"solid"} color={"blue.700"} width={"100%"} >
            Enter room
          </Button>

      </form>
        
     </VStack>
     </Stack>
  )
}

export default VideoConsult
