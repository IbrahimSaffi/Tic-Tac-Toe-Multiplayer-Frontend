import { useState } from "react";
import GameContainer from "./GameContainer";
import HistoryContainer from "./HistoryContainer"
function Game() {
    let gameArray = [["","",""],["","",""],["","",""]]
    let [currGameStatus,setStatus] = useState("Game has started")
    let [currHistory,setHistory] = useState([])
    let [currPlayer,setCurrPlayer] = useState("X")
    let [currMatrix,setCurrMatrix] = useState(gameArray)
    function gameStatus(matrix,player,status){
        if((matrix[0][0]===matrix[1][1]&&matrix[0][0]===matrix[2][2]&&matrix[0][0]!=="")
           ||(matrix[0][0]===matrix[0][1]&&matrix[0][0]===matrix[0][2]&&matrix[0][0]!=="")
           ||(matrix[0][0]===matrix[1][0]&&matrix[0][0]===matrix[2][0]&&matrix[0][0]!=="")
           ||(matrix[1][0]===matrix[1][1]&&matrix[1][0]===matrix[1][2]&&matrix[1][0]!=="")
           ||(matrix[2][0]===matrix[2][1]&&matrix[2][0]===matrix[2][2]&&matrix[2][0]!=="")
           ||(matrix[0][1]===matrix[1][1]&&matrix[0][1]===matrix[2][1]&&matrix[0][1]!=="")
           ||(matrix[0][2]===matrix[1][2]&&matrix[0][2]===matrix[2][2]&&matrix[0][2]!=="")
           ||(matrix[0][2]===matrix[1][1]&&matrix[0][2]===matrix[2][0]&&matrix[0][2]!=="")
        ){
            status = `Player ${player} has won the game`
        }
        else if(matrix.every(ele=>ele.every(ele=>ele!==""))){
            status = `Stalemate`
        }
        return status
    }
    function handleClick(i,j){
        if(currMatrix[i][j]===""&&currGameStatus==="Game has started"){
            let tempMatrix = currMatrix.map(ele=>ele.map(ele=>ele))
            tempMatrix[i][j] = currPlayer
            let tempStatus = currGameStatus
            let tempPlayer = currPlayer
            tempStatus= gameStatus(tempMatrix,tempPlayer,tempStatus)
            setStatus(tempStatus)
            setCurrMatrix(tempMatrix)
            tempPlayer==="X"?tempPlayer="O":tempPlayer="X"
            setCurrPlayer(tempPlayer)
            let tempHistory = currHistory
            tempHistory.push([currMatrix,currPlayer,currGameStatus])
            setHistory(tempHistory)
            console.log(currHistory)
        }       
    }
    function handleHistoryClick(i){
        let tempHistory = currHistory.slice(0,i)
            setHistory(tempHistory)
            setCurrMatrix(currHistory[i][0])
            setCurrPlayer(currHistory[i][1])
            setStatus(currHistory[i][2])
    }
    return (
        <div className="game">
            <h1>Tic-Tac-Toe Game</h1>
            <p>Current Player : {currPlayer}</p>
            <div className="outer-container">
            <GameContainer 
            currPlayer = {currPlayer} handleClick={handleClick} gameArray = {currMatrix}/>
             {currHistory.length>1 && 
            <HistoryContainer handleHistoryClick={handleHistoryClick} history = {currHistory}/>
              }  
            </div>
            <p>{currGameStatus}</p>
        </div>
    )
}
export default Game;
//Whole design should be re consider espesially background cropping and box sizes
//Incorrect bug history also need to be addressed when it is addressed I can use handleHistoryCLick function to take care of game status and curr player at that time