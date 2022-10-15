import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import UserBar from './user/UserBar';
import TodoList from './todo/TodoList';
import CreateTodo from './todo/CreateTodo';
import appReducer from "./Reducers";

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
      <UserBar user={state.user} dispatch={dispatch}/>
      <TodoList todos={state.todos} dispatch={dispatch}/>
      {state.user && <CreateTodo user={state.user} dispatch={dispatch}/>}
    </div>
  )
}

export default App;
