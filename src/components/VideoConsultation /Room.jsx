// import React, { useCallback, useEffect, useState } from 'react'
// import { useSocket } from '../Providers/Socket'
// import { usePeer } from './Peer'
// import ReactPlayer from 'react-player'
// import { Button } from '@chakra-ui/react'

// const Room = () => {
  
//     const {socket}=useSocket()
//     const[email,setEmail]=useState()
//     const {peer,createOffer,createAnswer,createRemoteAns,sendStream,remoteStream}=usePeer()
//     const [stream,setStream]=useState(null)
//     const handleNewUserJoined=useCallback(async(data)=>{
//         const {emailId,roomId}=data;
//         console.log("new user is joined with "+emailId)
//         setEmail(emailId)
//         const offer=await createOffer()
//         socket?.emit("call-user",{emailId,offer,roomId})

//     },[socket,createOffer])

//     const handleIncomminCall=useCallback(async(data)=>{
//       const {from,offer}=data;
//       console.log("incomming call from  ",from," with ",offer); 
//       const ans=await createAnswer(offer)
//       socket?.emit("call-accepted",{emailId:from,ans})

//     },[socket,createAnswer])

//     const handleIncomminCallAccepted=useCallback(async(data)=>{
//       const {ans}=data;
//       console.log("call got accepted")
//       await createRemoteAns(ans)
//       sendStream(stream)

//     },[createRemoteAns])

//     const handleStream=useCallback(()=>{
//       let myStream=navigator.mediaDevices.getUserMedia({audio:true,video:true})
      
//       setStream(myStream)
//     },[])

//     const handleNegotiation=useCallback(()=>{
//       console.log("negotiation needed")
//       const localOffer=peer?.localDescription;
//       socket?.emit("call-user",{emailId:email,offer:localOffer})
//     },[])

//     useEffect(()=>{
//         socket?.on("user-joined",handleNewUserJoined)
//         socket?.on("incomming-call",handleIncomminCall)
//         socket?.on("call-accepted",handleIncomminCallAccepted)
//         return () => {
//           // Clean up event listeners on component unmount
//           socket?.off("user-joined", handleNewUserJoined);
//           socket?.off("incomming-call", handleIncomminCall);
//       };
//     },[socket])

//     useEffect(()=>{
//       peer.addEventListener("negotiationneeded",handleNegotiation)
//       return (()=>{
//          peer.removeEventListener("negotiationneeded",handleNegotiation)
//       })
//     },[peer,handleNegotiation])

//     useEffect(()=>{
//       handleStream()
//     },[])

//   return (
//     <>
//       <div>Room</div>
//       <h3>
//         you are connected with {email}
//       </h3>
//       <Button color={"blue.700"} onClick={e=>sendStream(stream)}>
//         Start
//       </Button>
//       <ReactPlayer url={stream} playing muted/>
//       <ReactPlayer url={remoteStream} playing muted/>
//     </>
    
//   )
// }

// export default Room