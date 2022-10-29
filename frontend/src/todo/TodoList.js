import { useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';

import Todo from './Todo';
import { StateContext } from "../contexts/StateContext";

export default 
function TodoList () {
    const { state } = useContext(StateContext);
    const { todos } = state;
    return (
        <Accordion alwaysOpen>
            {todos.map((t, i) => <Todo {...t} key={t.id} />)}
        </Accordion>
    )
}