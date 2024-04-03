import React, { useCallback, useEffect } from 'react'
import { useSocket } from '../Providers/Socket'
import { usePeer } from './Peer'

const Room = () => {

    const {socket}=useSocket()
    const {peer,createOffer}=usePeer()
    const handleNewUserJoined=useCallback(async(data)=>{
        const {emailId}=data;
        console.log("new user is joined with "+emailId)
        const offer=await createOffer()
        socket?.emit("call-user",{emailId,offer})

    },[createOffer,socket])
    useEffect(()=>{
        socket?.emit("user-joined",handleNewUserJoined)
    },[socket])

  return (
    <div>Room</div>
  )
}

export default Room