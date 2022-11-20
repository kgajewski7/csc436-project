import React, { useReducer, useEffect } from "react";
import { useResource } from 'react-request-hook'
import 'bootstrap/dist/css/bootstrap.min.css';

import UserBar from './user/UserBar';
import TodoList from './todo/TodoList';
import CreateTodo from './todo/CreateTodo';
import appReducer from "./Reducers";
import { StateContext } from "./contexts/StateContext";

function App() {

  const [ state, dispatch ] = useReducer(appReducer, { user: null, todos: [] })

  const [ todos, getTodos ] = useResource(() => ({
    url: '/todo',
    method: 'get',
    headers: { Authorization: `${state?.user?.access_token}` }
  }));

  useEffect(() => {
    if(state?.user) {
      getTodos();
    }
    else {
      dispatch({ type: 'CLEAR_TODOS' })
    }
  }, [state?.user?.access_token]);

  useEffect(() => {
    if (todos && todos.isLoading === false && todos.data) {
      dispatch({ type: "FETCH_TODOS", todos: todos.data.todos.reverse() });
    }
  }, [todos]);

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
