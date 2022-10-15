import { useContext } from 'react'
import { v4 as uuidv4 } from "uuid";

import { StateContext } from "../contexts/StateContext";

export default 
function Todo ({ id, title, description, author, dateCreated, complete, dateCompleted}) {

    const { state, dispatch } = useContext(StateContext);

    function handleComplete () {
        dispatch({ 
            type: 'TOGGLE_TODO', 
            id,
            complete: !complete,
            dateCompleted: (!complete===true ? new Date(Date.now()).toLocaleString() : '')
        })
    }

    function handleDuplicate () {
        dispatch({ 
            type: 'CREATE_TODO', 
            id: uuidv4(),
            title: title.concat(' ','(copy)'), 
            description, 
            author: state.user,
            dateCreated:  new Date(Date.now()).toLocaleString(),
            complete: false,
            dateCompleted: ''
        })
    }

    function handleDelete () {
        dispatch({ 
            type: 'DELETE_TODO', 
            id
        })
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>{description}</div>
            <br />
            <i>Created by <b>{author}</b> on {dateCreated}</i>
            <br />
            Completed? <input type="checkbox" checked={complete} onChange={handleComplete} id="complete" name="complete"></input> Date Completed: {dateCompleted}
            <br />
            <div>
                <form onSubmit={e => {e.preventDefault(); handleDuplicate();}} style={{display: 'inline'}}>
                    <input type="submit" value="Duplicate" style={{display: 'inline'}} disabled={!state.user}/>
                </form>
                <form onSubmit={e => {e.preventDefault(); handleDelete();}} style={{display: 'inline'}}>
                    <input type="submit" value="Delete" style={{display: 'inline'}}/>
                </form>
            </div>
        </div>
    )
}