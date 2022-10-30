import { useContext } from 'react'
import { v4 as uuidv4 } from "uuid";
import { useResource } from 'react-request-hook';
import Accordion from 'react-bootstrap/Accordion';

import { StateContext } from "../contexts/StateContext";

export default 
function Todo ({ id, title, description, author, dateCreated, complete, dateCompleted}) {

    const { state, dispatch } = useContext(StateContext);

    const [ dupTodo , duplicateTodo ] = useResource(({ id, title, description, author, dateCreated, complete, dateCompleted }) => ({
        url: '/todos',
        method: 'post',
        data: { id, title, description, author, dateCreated, complete, dateCompleted }
    }))

    const [ delTodo , deleteTodo ] = useResource(({ id }) => ({
        url: `/todos/${id}`,
        method: 'delete'
    }))

    const [ compTodo , completeTodo ] = useResource(({ id, complete, dateCompleted }) => ({
        url: `/todos/${id}`,
        method: 'patch',
        data: { complete, dateCompleted }
    }))

    function handleComplete () {
        const d = (!complete===true ? new Date(Date.now()).toLocaleString() : '');
        completeTodo({
            id,
            complete: !complete,
            dateCompleted: d
        });
        dispatch({ 
            type: 'TOGGLE_TODO', 
            id,
            complete: !complete,
            dateCompleted: d
        });
    }

    function handleDuplicate () {
        const i = uuidv4();
        const d = new Date(Date.now()).toLocaleString();
        duplicateTodo({ 
            id: i,
            title: title.concat(' ','(copy)'),  
            description, 
            author: state.user,
            dateCreated:  d,
            complete: false,
            dateCompleted: ''
        });
        dispatch({ 
            type: 'CREATE_TODO', 
            id: i,
            title: title.concat(' ','(copy)'), 
            description, 
            author: state.user,
            dateCreated:  d,
            complete: false,
            dateCompleted: ''
        });
    }

    function handleDelete () {
        deleteTodo({
            id
        });
        dispatch({ 
            type: 'DELETE_TODO', 
            id
        });
    }

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