import { io } from "socket.io-client";
import React, { useRef } from 'react'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Rooms(props) {
  let goTo =useNavigate(null)
  let [currOption,setOption] = useState(null)
  let inp=useRef(null)
  return (
    <div className='rooms'>
        <button onClick={()=>setOption("join")} >Join Room</button>
        <div className='option' style={{display:currOption==="join"?"flex":"none"}} >
        <p>Paste room link</p>
        <input ref = {inp} type="text" />
        <button onClick={()=>{
          let id = inp.current.value.split("/")
          goTo(`/${id[id.length-1]}`)
        }
          } >Join</button>
        </div>
        <button onClick={()=>{
        setOption("create")
        props.createRoom()
          }
      } >Create Room</button>
        <div className='option' style={{display:currOption==="create"?"flex":"none"}} >
        <p>Room link generated</p>
        <input value={window.location.origin+"/"+props.roomId} type="text"/>
        <button onClick={() => {navigator.clipboard.writeText(window.location.origin+"/"+ props.roomId)}}>Copy Url</button>
        <p>Copy this link and send it to opponent</p>
        <button onClick={()=>{
          goTo("/login")
        }} >Enter room</button>
        </div>

    </div>
  )
}
