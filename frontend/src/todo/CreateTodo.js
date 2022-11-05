import { useState, useContext, useEffect } from 'react'
import { useResource } from "react-request-hook"

import { StateContext } from "../contexts/StateContext";

export default 
function CreateTodo () {

    const { state, dispatch } = useContext(StateContext);
    const{ user } = state;

    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ error, setError ] = useState(false);

    // Create new todo on the backend
    const [todo , createTodo ] = useResource(({ title, description, author, dateCreated, complete, dateCompleted }) => ({
        url: '/todos',
        method: 'post',
        data: { title, description, author, dateCreated, complete, dateCompleted }
    }))

    function handleTitle (evt) { setTitle(evt.target.value) }
    function handleDescription (evt) { setDescription(evt.target.value) }
    // Creating a todo function
    function handleCreate () {
        createTodo({ 
            title, 
            description, 
            author: user,
            dateCreated:  new Date(Date.now()).toLocaleString(),
            complete: false,
            dateCompleted: ''
        });
    }

    // Check if backend successfully created todo and then dispatch
    useEffect(() => {
        if (todo?.error) {
          setError(true);
          //alert("Something went wrong creating todo.");
        }
        if (todo?.isLoading === false && todo?.data) {
          dispatch({
            type: "CREATE_TODO",
            id: todo.data.id,
            title: todo.data.title, 
            description: todo.data.description,
            author: todo.data.author,
            dateCreated:  todo.data.dateCreated,
            complete: todo.data.complete,
            dateCompleted: todo.data.dateCompleted
          });
        }
      }, [todo]);

    return (
        <form onSubmit={e => {
                e.preventDefault(); 
                handleCreate();
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