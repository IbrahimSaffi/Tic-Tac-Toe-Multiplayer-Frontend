
function GameContainer(props){   
    let gameContainer = props.gameArray.map((row,i)=>{
          let tempRow = row.map((ele,j)=>{
            return <div key={`${i},${j}`} className="box" onClick={()=>props.handleClick(i,j)}>
                 <h1>
                 {ele}
                 </h1>
                 </div>
          })
          return <div key={i} className="row"> {tempRow}</div>
        })
    return (
        <div className="game-container">{gameContainer} </div>
    )
}
export default GameContainer