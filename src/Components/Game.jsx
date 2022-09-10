import { io, Socket } from "socket.io-client";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameContainer from "./GameContainer";
import HistoryContainer from "./HistoryContainer"
function Game(props) {
    let gameArray = [["", "", ""], ["", "", ""], ["", "", ""]]
    let [currGameStatus, setStatus] = useState("Game has started")
    let [currHistory, setHistory] = useState([])
    let [currPlayer, setCurrPlayer] = useState("X")
    let [currMatrix, setCurrMatrix] = useState(gameArray)
    let [joined, setJoined] = useState(null)
    let [mode, setMode] = useState("bot")
    let [assignedSymb, setSymb] = useState(null)
    let [waiting,setWait] = useState(true)
    let goTo = useNavigate(null)
    let roomId = useParams().id
    useEffect(() => {
        if (roomId) {
            setMode("multiplayer")
            if (props.user === null) {
                props.updateId(roomId)
                goTo("/login")
            }
            else {
                setJoined("loading")
                props.socket.emit("join-room", { id: roomId, user: props.user })
                props.socket.on("room-status", (bool) => {
                    if (bool) {
                        setJoined("joined")
                    }
                    else {
                        setJoined("rejected")
                    }
                })
                props.socket.on("set-player", (player) => {
                    if (assignedSymb === null) {
                        setSymb(() => player)
                    }
                })
                
                props.socket.on("client-update-matrix", (matrix) => {
                    setCurrMatrix(matrix)
                })
                props.socket.on("waiting-status",(bool)=>{
                    setWait(bool)
                })
            }
        
        }
    }, [])
    useEffect(() => {
        console.log("HERE", Date.now())
        let tempPlayer = currPlayer
        let tempStatus = currGameStatus
        tempStatus= gameStatus(currMatrix,tempPlayer,tempStatus)
        setStatus(tempStatus)
        tempPlayer === "X" ? tempPlayer = "O" : tempPlayer = "X"
        setCurrPlayer(tempPlayer)
    }, [currMatrix])
    function gameStatus(matrix, player, status) {
        console.log(currMatrix,player,status)
        // if (currPlayer === assignedSymb || mode === "bot") {
            if ((matrix[0][0] === matrix[1][1] && matrix[0][0] === matrix[2][2] && matrix[0][0] !== "")
                || (matrix[0][0] === matrix[0][1] && matrix[0][0] === matrix[0][2] && matrix[0][0] !== "")
                || (matrix[0][0] === matrix[1][0] && matrix[0][0] === matrix[2][0] && matrix[0][0] !== "")
                || (matrix[1][0] === matrix[1][1] && matrix[1][0] === matrix[1][2] && matrix[1][0] !== "")
                || (matrix[2][0] === matrix[2][1] && matrix[2][0] === matrix[2][2] && matrix[2][0] !== "")
                || (matrix[0][1] === matrix[1][1] && matrix[0][1] === matrix[2][1] && matrix[0][1] !== "")
                || (matrix[0][2] === matrix[1][2] && matrix[0][2] === matrix[2][2] && matrix[0][2] !== "")
                || (matrix[0][2] === matrix[1][1] && matrix[0][2] === matrix[2][0] && matrix[0][2] !== "")
            ) {
                if(mode==="bot"){
                    status = `Player ${player} has won the game`
                }
                else{
                    if(player===assignedSymb){
                        status = `You have won the game`
                    }
                    else{
                        status = `You have lost the game`
                    }
                }
            }
            else if (matrix.every(ele => ele.every(ele => ele !== ""))) {
                status = `Stalemate`
            }
            return status
        // }
    }
    function handleClick(i, j) {
        if (currPlayer === assignedSymb || mode === "bot") {
            if (currMatrix[i][j] === "" && currGameStatus === "Game has started") {
                let tempMatrix = currMatrix.map(ele => ele.map(ele => ele))
                tempMatrix[i][j] = currPlayer
                let currMove;
                if (i === 0) {
                    currMove = 1 + j
                }
                else if (i === 1) {
                    currMove = 4 + j
                }
                else if (i === 2) {
                    currMove = 7 + j
                }
                setCurrMatrix(tempMatrix)
                // let tempStatus = currGameStatus
                // let tempPlayer = currPlayer
                // tempStatus= gameStatus(tempMatrix,tempPlayer,tempStatus)
                // setStatus(tempStatus)
                if (mode !== "bot") {
                    props.socket.emit("update-matrix", { matrix: tempMatrix, id: roomId })
                }
                if(mode==="bot"){
                    let tempHistory = currHistory
                    tempHistory.push([currMatrix, currPlayer, currGameStatus, currMove])
                    setHistory(tempHistory)
                }
            }
        }
    }
    function handleHistoryClick(i) {
        if (currPlayer === assignedSymb || mode === "bot") {
            let tempHistory = currHistory.slice(0, i)
            setHistory(tempHistory)
            setCurrMatrix(currHistory[i][0])
            setCurrPlayer(currHistory[i][1])
            setStatus(currHistory[i][2])

        }
    }
    return (
        <div>
            {joined === "loading" ? <h1>Joining room</h1> : (joined === "rejected" ? <h1>No such room found</h1> : <div className="game">
                <h1>Tic-Tac-Toe Game</h1>
                {mode==="bot"?<p>Current Player : {currPlayer}</p>:(currGameStatus==="Game has started"?(currPlayer===assignedSymb?"Your Move":"Opponents Move")
                :"")}
                
                <div className="outer-container">
                    <GameContainer
                        currPlayer={currPlayer} handleClick={handleClick} gameArray={currMatrix} />
                    {currHistory.length > 1 &&
                        <HistoryContainer mode={mode} handleHistoryClick={handleHistoryClick} history={currHistory} />
                    }
                </div>
                <p>{currGameStatus}</p>
                <p>{waiting&&mode!=="bot"?"Waiting for opponent to join":null}</p>
            </div>)}

        </div>
    )
}
export default Game;
//Whole design should be re consider espesially background cropping and box sizes
//Incorrect bug history also need to be addressed when it is addressed I can use handleHistoryCLick function to take care of game status and curr player at that time