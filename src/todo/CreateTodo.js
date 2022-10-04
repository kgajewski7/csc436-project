import { useState } from 'react'
import { v4 as uuidv4 } from "uuid";

export default 
function CreateTodo ({user, todos, dispatch}) {

    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')

    function handleTitle (evt) { setTitle(evt.target.value) }
    function handleDescription (evt) { setDescription(evt.target.value) }
    function handleCreate () {
        dispatch({ 
            type: 'CREATE_TODO', 
            id: uuidv4(),
            title, 
            description, 
            author: user,
            dateCreated:  new Date(Date.now()).toLocaleString()
        })
    }

    return (
        <form onSubmit={e => {
            e.preventDefault(); 
            handleCreate()
            }}>
            <div>Author: <b>{user}</b></div>
            <div>
                <label htmlFor="create-title">Title:</label>
                <input type="text" value={title} onChange={handleTitle} name="create-title" id="create-title" />
            </div>
            <textarea value={description} onChange={handleDescription} />
            <input type="submit" value="Create" disabled={title.length === 0} />
        </form>
    )
}