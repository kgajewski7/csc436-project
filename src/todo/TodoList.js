import { useContext } from 'react';

import Todo from './Todo';
import { StateContext } from "../contexts/StateContext";

export default 
function TodoList () {
    const { state } = useContext(StateContext);
    const { todos } = state;
    return (
        <div>
            {todos.map((t, i) => <Todo {...t} key={t.id} />)}
        </div>
    )
}