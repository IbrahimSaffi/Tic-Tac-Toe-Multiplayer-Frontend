import { useState } from "react";
import GameContainer from "./GameContainer";
import HistoryContainer from "./HistoryContainer"
function Game() {
    let gameArray = [["","",""],["","",""],["","",""]]
    function gameStatus(matrix,currPlayer){
        if((matrix[0][0]===matrix[1][1]&&matrix[0][0]===matrix[2][2]&&matrix[0][0]!=="")
           ||(matrix[0][0]===matrix[0][1]&&matrix[0][0]===matrix[0][2]&&matrix[0][0]!=="")
           ||(matrix[0][0]===matrix[1][0]&&matrix[0][0]===matrix[2][0]&&matrix[0][0]!=="")
           ||(matrix[1][0]===matrix[1][1]&&matrix[1][0]===matrix[1][2]&&matrix[1][0]!=="")
           ||(matrix[2][0]===matrix[2][1]&&matrix[2][0]===matrix[2][2]&&matrix[2][0]!=="")
           ||(matrix[0][1]===matrix[1][1]&&matrix[0][1]===matrix[2][1]&&matrix[0][1]!=="")
           ||(matrix[0][2]===matrix[1][2]&&matrix[0][2]===matrix[2][2]&&matrix[0][2]!=="")
           ||(matrix[0][2]===matrix[1][1]&&matrix[0][2]===matrix[2][0]&&matrix[0][2]!=="")
        ){
            setStatus(`Player ${currPlayer} has won the game`)
        }
        else if(matrix.every(ele=>ele.every(ele=>ele!==""))){
            setStatus(`Stalemate`)
        }
    }
    function handleClick(i,j){
        if(currMatrix[i][j]===""&&currGameStatus==="Game has started"){
            //Issue here
            // History is not exactly as it should be 
            // it is affecting currPlayer history too
            currMatrix = currMatrix.map(ele=>ele.map(ele=>ele))
            currMatrix[i][j] = currPlayer
            gameStatus(currMatrix,currPlayer)
            currPlayer==="X"?setCurrPlayer("O"):setCurrPlayer("X")
            currHistory.push([currMatrix,currPlayer])
            setCurrMatrix(currHistory[currHistory.length-1][0])
        }       
    }
    function handleHistoryClick(i){
            currHistory = currHistory.slice(0,i+1)
            setHistory(currHistory)
            setCurrPlayer(currHistory[i][1])
            setCurrMatrix(currHistory[i][0])
    }
    let [currGameStatus,setStatus] = useState("Game has started")
    let [currHistory,setHistory] = useState([])
    let [currPlayer,setCurrPlayer] = useState("X")
    let [currMatrix,setCurrMatrix] = useState(gameArray)
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