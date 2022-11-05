import { useContext, useState, useEffect } from 'react'
import { useResource } from 'react-request-hook';
import Accordion from 'react-bootstrap/Accordion';

import { StateContext } from "../contexts/StateContext";

export default 
function Todo ({ id, title, description, author, dateCreated, complete, dateCompleted}) {

    const { state, dispatch } = useContext(StateContext);
    const [ error, setError ] = useState(false);

    // Create duplicate todo on the backend
    const [ dupTodo , duplicateTodo ] = useResource(({ title, description, author, dateCreated, complete, dateCompleted }) => ({
        url: '/todos',
        method: 'post',
        data: { title, description, author, dateCreated, complete, dateCompleted }
    }))

    // Delete todo on the backend
    const [ delTodo , deleteTodo ] = useResource(({ id }) => ({
        url: `/todos/${id}`,
        method: 'delete'
    }))

    // Update todo on the backend to complete/not complete
    const [ compTodo , completeTodo ] = useResource(({ id, complete, dateCompleted }) => ({
        url: `/todos/${id}`,
        method: 'patch',
        data: { complete, dateCompleted }
    }))

    // Completing a todo function
    function handleComplete () {
        const d = (!complete===true ? new Date(Date.now()).toLocaleString() : '');
        completeTodo({
            id,
            complete: !complete,
            dateCompleted: d
        });
    }

    // Check if backend successfully updated todo and then dispatch
    useEffect(() => {
        if (compTodo?.error) {
          setError(true);
          //alert("Something went wrong with the check box.");
        }
        if (compTodo?.isLoading === false && compTodo?.data) {
          dispatch({
            type: "TOGGLE_TODO",
            id: compTodo.data.id,
            complete: compTodo.data.complete,
            dateCompleted: compTodo.data.dateCompleted
          });
        }
      }, [compTodo]);

    // Deleting a todo function
    function handleDelete () {
        deleteTodo({
            id
        });
        dispatch({ 
            type: 'DELETE_TODO', 
            id
        });
    }

    // Duplicating a todo function
    function handleDuplicate () {
        duplicateTodo({ 
            title: title.concat(' ','(copy)'),  
            description, 
            author: state.user,
            dateCreated:  new Date(Date.now()).toLocaleString(),
            complete: false,
            dateCompleted: ''
        });
    }
    // Check if backend successfully created duplicate todo and then dispatch
    useEffect(() => {
        if (dupTodo?.error) {
          setError(true);
          //alert("Something went wrong creating todo.");
        }
        if (dupTodo?.isLoading === false && dupTodo?.data) {
          dispatch({
            type: "CREATE_TODO",
            id: dupTodo.data.id,
            title: dupTodo.data.title, 
            description: dupTodo.data.description,
            author: dupTodo.data.author,
            dateCreated:  dupTodo.data.dateCreated,
            complete: dupTodo.data.complete,
            dateCompleted: dupTodo.data.dateCompleted
          });
        }
      }, [dupTodo]);

    return (
        <Accordion.Item eventKey={id}>
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>
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
            </Accordion.Body>
        </Accordion.Item>
    )
}