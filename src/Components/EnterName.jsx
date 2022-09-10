import React, { useRef } from 'react'

export default function EnterName(props) {
    let name = useRef(null)
    return (
        <div className='enter-name' >
            <p>
                Enter your name so opponent can recognize you
            </p>
            <input ref={name} type="text" required/>
            <button type='submit'  onClick={()=>props.updateName(name.current.value)}>Play</button>
        </div>
    )
}
