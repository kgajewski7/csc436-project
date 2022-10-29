import React, { useReducer, useEffect } from "react";
import { useResource } from 'react-request-hook'
import 'bootstrap/dist/css/bootstrap.min.css';

import UserBar from './user/UserBar';
import TodoList from './todo/TodoList';
import CreateTodo from './todo/CreateTodo';
import appReducer from "./Reducers";
import { StateContext } from "./contexts/StateContext";

function App() {

  const [ state, dispatch ] = useReducer(appReducer, { user: '', todos: [] })

  const [ todos, getTodos ] = useResource(() => ({
    url: '/todos',
    method: 'get'
  }))

  useEffect(getTodos, [])

  useEffect(() => {
    if (todos && todos.data) {
      dispatch({ type: 'FETCH_TODOS', todos: todos.data.reverse() })
    }
  }, [todos])

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <h1>My Todo List</h1>
        <br />
        <UserBar />
        <br />
        {state.user && <CreateTodo />}
        <br />
        <hr />
        <TodoList />
      </StateContext.Provider>
    </div>
  )
}

export default App;
