import React, { useCallback, useEffect } from 'react'
import { useSocket } from '../Providers/Socket'
import { usePeer } from './Peer'

const Room = () => {

    const {socket}=useSocket()
    const {peer,createOffer}=usePeer()
    const handleNewUserJoined=async(data)=>{
        const {emailId}=data;
        console.log("new user is joined with "+emailId)
        const offer=await createOffer()
        socket?.emit("call-user",{emailId,offer})

    }

    const handleIncomminCall=(data)=>{
      const {from,offer}=data;
      console.log("incomming call from  ",from," with ",offer); 
    }

    useEffect(()=>{
        socket?.on("user-joined",handleNewUserJoined)
        socket?.on("incomming-call",handleIncomminCall)

        return () => {
          // Clean up event listeners on component unmount
          socket?.off("user-joined", handleNewUserJoined);
          socket?.off("incomming-call", handleIncomminCall);
      };
    },[socket])

  return (
    <div>Room</div>
  )
}

export default Room