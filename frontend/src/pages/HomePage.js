import React, { useEffect, useContext } from 'react'
import { StateContext } from "../contexts/StateContext";
import { useResource } from 'react-request-hook'
import TodoList from '../todo/TodoList'

export default function HomePage() {

    const { state, dispatch } = useContext(StateContext);
    const [ todos, getTodos ] = useResource(() => ({
        url: '/todo',
        method: 'get',
        headers: { Authorization: `${state?.user?.access_token}` }
    }));

    useEffect(() => {
        if(state?.user) {
            getTodos();
            document.title = `${state.user.username}’s Todo List`;
        }
        else {
            dispatch({ type: 'CLEAR_TODOS' })
            document.title = "Todo List";
        }
    }, [state?.user?.access_token]);
    
    useEffect(() => {
        if (todos && todos.isLoading === false && todos.data) {
            dispatch({ type: "FETCH_TODOS", todos: todos.data.todos.reverse() });
        }
    }, [todos]);

    return (
      <>
        {todos?.isLoading && "Todos loading..."} <TodoList />
      </>
    );
}