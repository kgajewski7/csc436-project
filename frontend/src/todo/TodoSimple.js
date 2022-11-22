import { useContext, useEffect } from 'react'
import { useResource } from 'react-request-hook';
import { useNavigate } from "react-router-dom";

import { StateContext } from "../contexts/StateContext";

// Todo version without accordion from bootstrap
export default 
function TodoSimple ({ _id, title, description, author_name, dateCreated, complete, dateCompleted}) {

    const { state, dispatch } = useContext(StateContext);

    const navigate = useNavigate();

    // Create duplicate todo on the backend
    const [ dupTodo , duplicateTodo ] = useResource(({ title, description, dateCreated, complete, dateCompleted }) => ({
        url: '/todo',
        method: 'post',
        headers: {"Authorization": `${state.user.access_token}`},
        data: { title, description, dateCreated, complete, dateCompleted }
    }));

    // Delete todo on the backend
    const [ delTodo , deleteTodo ] = useResource(({ _id }) => ({
        url: `/todo/${_id}`,
        method: 'delete',
        headers: {"Authorization": `${state.user.access_token}`}
    }));

    // Update todo on the backend to complete/not complete
    const [ compTodo , completeTodo ] = useResource(({ _id, complete, dateCompleted }) => ({
        url: `/todo/${_id}`,
        method: 'patch',
        headers: {"Authorization": `${state.user.access_token}`},
        data: { complete, dateCompleted }
    }));

    // Completing a todo function
    function handleComplete () {
        const d = (!complete===true ? new Date(Date.now()).toLocaleString() : '');
        completeTodo({
            _id,
            complete: !complete,
            dateCompleted: d
        });
    }

    // Check if backend successfully updated todo and then dispatch
    useEffect(() => {
        if (compTodo.isLoading === false && compTodo.data) {
          dispatch({
            type: "TOGGLE_TODO",
            _id: compTodo.data._id,
            complete: compTodo.data.complete,
            dateCompleted: compTodo.data.dateCompleted
          });
          // Not the best user experience, should toggle without redirecting to the list, but for now it works like this because it would need a new reducer setup
          navigate(`/`);
        }
      }, [compTodo]);

    // Deleting a todo function
    function handleDelete () {
        deleteTodo({
            _id
        });
        dispatch({ 
            type: 'DELETE_TODO', 
            _id
        });
        navigate(`/`);
    }

    // Duplicating a todo function
    function handleDuplicate () {
        duplicateTodo({ 
            title: title.concat(' ','(copy)'),  
            description, 
            dateCreated:  new Date(Date.now()).toLocaleString(),
            complete: false,
            dateCompleted: ''
        });
    }
    // Check if backend successfully created duplicate todo and then dispatch
    useEffect(() => {
        if (dupTodo.isLoading === false && dupTodo.data) {
            dispatch({
                type: "CREATE_TODO",
                _id: dupTodo.data._id,
                title: dupTodo.data.title, 
                description: dupTodo.data.description,
                author_name: dupTodo.data.author_name,
                dateCreated:  dupTodo.data.dateCreated,
                complete: dupTodo.data.complete,
                dateCompleted: dupTodo.data.dateCompleted
            });
            navigate(`/`);
        }
    }, [dupTodo]);

    return (
       <div>
            <h3 style={{color: 'black'}}>{title}</h3>
            <div>{description}</div>
            <br />
            <i>Created by <b>{author_name}</b> on {dateCreated}</i>
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