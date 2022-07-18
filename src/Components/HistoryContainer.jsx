function HistoryContainer(props){
    return (
        <div className="history-container">
           {props.history.map((ele,i)=>{
           if(i>0){
           return <div key={i} onClick={()=>props.handleHistoryClick(i)} className="history-card">
                 Move: {i}
            </div>
           }
           })}
        </div>
    )
}
export default HistoryContainer