// import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";


// export const PeerContext=React.createContext(null);

// export const usePeer=()=>useContext(PeerContext)
// const [remoteStream,setRemoteStream]=useState(null)
// export const PeerProvider=(props)=>{
//     const peer=useMemo(()=>new RTCPeerConnection({
//         iceServers:[
//             {
//                 urls:[
//                     "stun:stun.l.google.com:19302",
//                     "stun:global.stun.twilio.com:3478"
//                 ]
//             }
//         ]
//     }),[])
//     const createOffer=async()=>{
//         const offer = await peer.createOffer();
//         await peer.setLocalDescription(offer)
//         return offer
//     }
//     console.log("peer is "+peer)

//     const createAnswer= async (offer) =>{
//         try{
//             await  peer.setRemoteDescription(offer);
//             const answer=await peer.createAnswer();
//             peer.setLocalDescription(answer);
//             return answer;
//         }
//         catch(e){
//             alert(e.message)
//         }
//     }
//     const createRemoteAns=async(ans)=>{
//         try {
//             if(ans){
//                 await peer.setRemoteDescription(ans);
//             }
            
//         } catch (error) {
//             alert(error.message)
//         }
        

//     }

//     const sendStream=async(stream)=>{
//         try {
//             const tracks=stream.getTracks();
//             for(let track of tracks){
//                 peer.addTrack(track, stream);
//             }
//         } catch (error) {
//             alert(error.message)
//         }
//     }

//     const handleRemoteStreamTracks=useCallback((ev)=>{
//         const stream=ev.streams;
//         setRemoteStream(stream[0]);
//     })

//     useEffect(()=>{
//         peer.addEventListener('track',handleRemoteStreamTracks)
//         return  () => {
//            peer.removeEventListener('track',handleRemoteStreamTracks)
//         }
//     },[peer,handleRemoteStreamTracks])

//     return <PeerContext.Provider value={{peer,createOffer,createAnswer,createRemoteAns,sendStream,remoteStream}}>
//             {props.children}
//     </PeerContext.Provider>
// }