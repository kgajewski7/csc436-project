import { useState } from 'react'

export default 
function Todo ({ id, title, description, author, dateCreated }) {

    const [ complete, setComplete ] = useState(false)
    const [ dateCompleted, setDateCompleted ] = useState('')

    function handleComplete (evt) { 
        setComplete(evt.target.checked);

        if(evt.target.checked) {
            setDateCompleted(new Date(Date.now()).toLocaleString());
        }
        else {
            setDateCompleted('');
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