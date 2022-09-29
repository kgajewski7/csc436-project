import { useState } from 'react'

export default 
//function Todo ({ title, description, author, dateCreated, complete, dateCompleted }) {
function Todo ({ id, title, description, author, dateCreated }) {

    const [ complete, setComplete ] = useState(false)
    const [ dateCompleted, setDateCompleted ] = useState('')
    function handleComplete (evt) { 
        setComplete(evt.target.checked);
        handleDateCompleted(evt.target.checked);
    }
    function handleDateCompleted (check) { 
        if(check) {
            setDateCompleted(Date(Date.now())) 
        }
        else {
            setDateCompleted('') 
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>{description}</div>
            <br />
            <i>Created by <b>{author}</b> on {dateCreated}</i>
            <br />
            Completed? <input type="checkbox" checked={complete} onChange={handleComplete} id="complete" name="complete"></input> Date Completed: {dateCompleted}
        </div>
    )
}

//Completed? <input type="checkbox" checked={complete} onClick={handleComplete} id="complete" name="complete"></input> Date Completed: {dateCompleted}