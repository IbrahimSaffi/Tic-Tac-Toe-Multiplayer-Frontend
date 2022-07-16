
function GameContainer(props){   
    let gameContainer = props.gameArray.map((row,i)=>{
          let tempRow = row.map((ele,j)=>{
            return <div className="box" onClick={()=>props.handleClick(i,j)}>
                 <h1>
                 {ele}
                 </h1>
                 </div>
          })
          return <div className="row"> {tempRow}</div>
        })
    return (
        <div className="game-container">{gameContainer} </div>
    )
}
export default GameContainer