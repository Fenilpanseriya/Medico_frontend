import React, { useContext, useMemo } from "react";


export const PeerContext=React.createContext(null);

export const usePeer=()=>useContext(PeerContext)

export const PeerProvider=(props)=>{
    const peer=useMemo(()=>new RTCPeerConnection({
        iceServers:[
            {
                urls:[
                    "stun:stun.l.google.com:19302",
                    "stun:global.stun.twilio.com:3478"
                ]
            }
        ]
    }),[])
    const createOffer=async()=>{
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer)
        return offer
    }
    console.log("peer is "+peer)
    return <PeerContext.Provider value={{peer}}>
            {props.children}
    </PeerContext.Provider>
}