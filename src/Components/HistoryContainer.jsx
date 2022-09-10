function HistoryContainer(props){
    return (
        <div style={{display:props.mode==="bot"?"block":"none"}} className="history-container">
           {props.history.map((ele,i)=>{
           if(i>0){
           return <div key={i} onClick={()=>props.handleHistoryClick(i)} className="history-card">
               {props.history[i-1][1]==="X"?`Player 1 has played X in ${props.history[i-1][3]}`:`Player 2 has played O in ${props.history[i-1][3]}`}
            </div>
           }
           })}
        </div>
    )
}
export default HistoryContainer