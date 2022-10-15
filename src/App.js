import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import UserBar from './user/UserBar';
import TodoList from './todo/TodoList';
import CreateTodo from './todo/CreateTodo';
import appReducer from "./Reducers";
import { StateContext } from "./contexts/StateContext";

function App() {

  const initialTodos = [
    {
      id: uuidv4(),
      title: "To Do 1",
      description: "Do this thing",
      author: "Kevin",
      dateCreated:  new Date(Date.now()).toLocaleString()
    },
    {
      id: uuidv4(),
      title: "To Do 2",
      description: "Do this other thing",
      author: "Kevin",
      dateCreated:  new Date(Date.now()).toLocaleString()
    }
  ]

  const [ state, dispatch ] = useReducer(appReducer, { user: '', todos: initialTodos })

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <UserBar />
        {state.user && <CreateTodo />}
        <br />
        <hr />
        <TodoList />
      </StateContext.Provider>
    </div>
  )
}

export default App;
