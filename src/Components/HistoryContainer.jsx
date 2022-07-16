function HistoryContainer(props){
    return (
        <div className="history-container">
           {props.history.map((ele,i)=>{
           if(i!==props.history.length-1){
           return <div onClick={()=>props.handleHistoryClick(i)} className="history-card">
                 Move: {i+1}
            </div>
           }
           })}
        </div>
    )
}
export default HistoryContainer