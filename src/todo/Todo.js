import { useState } from 'react'

export default 
function Todo ({ id, title, description, author, dateCreated, complete, dateCompleted, dispatch}) {

    function handleComplete () {
        dispatch({ 
            type: 'TOGGLE_TODO', 
            id: id,
            complete: !complete,
            dateCompleted: (!complete===true ? new Date(Date.now()).toLocaleString() : '')
        })
    }

    function handleDelete () {
        dispatch({ 
            type: 'DELETE_TODO', 
            id: id
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
            <form onSubmit={e => {e.preventDefault(); handleDelete();}}>
                <input type="submit" value="Delete" />
            </form>
        </div>
    )
}