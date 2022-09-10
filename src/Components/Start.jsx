import React, { useEffect, useState } from 'react'
import { Routes,Route,useNavigate } from "react-router-dom"
import Game from './Game'
import Rooms from './Rooms'
import { nanoid } from 'nanoid'
import { io } from "socket.io-client";
import EnterName from './EnterName'


export default function Start() {
  let goTo =useNavigate(null)
  // const socket = io("localhost:8000")
  let [roomId,setRoomId] = useState()
  let [user,setName] = useState(null)
  let [socket,setSocket]  = useState(null)
  useEffect(() => {
   setSocket(io("localhost:8000"))
  }, [])
  
  function createRoom(){
    let id = nanoid()
    setRoomId(id)
    socket.emit("create-room" ,id)
  }
  function updateId(id){
    setRoomId(id)
  }
  function updateName(name){
    console.log(name)
    setName(name)
    goTo(`/${roomId}`)
  }
  return (
    <div>
    <Routes>
      <Route path='/' element={<div className='start' >
   <p>
     Select Game Mode
      </p>
    <div className='row' >
      <button onClick={()=>goTo("/game")} >Play with computer</button>
      <button onClick={()=>goTo("/rooms")}>Multiplayer</button>
    </div>
   </div>}/>
      <Route path='/game' element={<Game/>}/>
      <Route path='/rooms' element={<Rooms updateName = {updateName} createRoom ={createRoom} roomId = {roomId} />}/>
      <Route path='/:id' element={<Game  socket ={socket} user = {user} updateId={updateId}/>}/>
      <Route path='/login' element={<EnterName updateName = {updateName} />}/>
    </Routes>
    </div>
  )
}
