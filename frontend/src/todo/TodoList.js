import { useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';

import Todo from './Todo';
import { StateContext } from "../contexts/StateContext";

export default 
function TodoList () {
    const { state } = useContext(StateContext);
    const { todos } = state;
    return (
        <div>
            {state.user && todos.length === 0 && <h2>No todos found.</h2>}
            <Accordion alwaysOpen>
                {todos.length > 0 && todos.map((t, i) => <Todo {...t} key={t._id} />)}
            </Accordion>
        </div>
    )
}